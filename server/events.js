import { Meteor } from 'meteor/meteor';
import { Requests } from '../lib/collections'

import regex from '../lib/util/regex'
import { getBotMessage } from './lib/util'
import { getTeamJoinMessage } from './messages'


/**
 * Vanhack Premium only
 * https://api.slack.com/events/message
 */
export const message = (bot, data) => {
  const { watchedChannels } = Meteor.settings.vanhack_premium.vars;

  if (watchedChannels.find(c => c === data.channel)) {
    if (regex.linkedin.test(data.text) || regex.google.test(data.text)) {
      bot.getUsers()
      .then(Meteor.bindEnvironment(usersData => {
        const user = usersData.members.find(member => member.id === data.user);

        Requests.insert({
          ...data,
          date: new Date(),
          user: user,
          done: false
        }, () => {
          // The 'data.user' here is the user id and not user object.
          bot.postMessage(data.user, getBotMessage(data.text), { as_user: 'vanhackbot' })
          .then(() => console.log(`[message]: Message from ${user.name || data.user} received at ${new Date()}!`))
          .catch(err => console.error(err))
        });
      }))
      .catch(err => console.error(err))
    }
  }
}

/**
 * https://api.slack.com/events/user_change
 */
export const userChange = (bot, data) => {
  console.log(`[user_change]: ${data.user.name} just changed its profile data. Updating local cache... ${new Date()}`);
  const { users } = bot;

  const index = users.findIndex(u => u.id === data.user.id);
  const head = users.slice(0, index);
  const tail = users.slice(index + 1, users.length);

  bot.users = [].concat(head, data.user, tail);
}

/**
 * https://api.slack.com/events/team_join
 */
export const teamJoin = (bot, data) => {
  bot.users.push(data.user);

  let message;

  if (bot.team.domain === 'vanhackers') {
    const introductionsChannelId = 'C06TEQCRK'
    message = getTeamJoinMessage(data.user, introductionsChannelId);

    bot.postMessageToChannel('general', message, {
      as_user: 'vanhackbot'
    })

  } else if (bot.team.domain === 'vanhackathon') {
    message = `Welcome to VanHack Pro <@${data.user.id}>! Let’s get ready for the VanHackathon! Make sure to check out Trello to find a team and let us know if you have any questions.`

    bot.postMessage(data.user.id, message, {
      as_user: 'vanhackbot'
    })
  }

  console.log(`[team_join]: ${data.user.name} joined ${bot.team.domain} slack at ${new Date()}`);
}
