import { Meteor } from 'meteor/meteor'
import SlackBot from 'slackbots'

import { userChange, teamJoin, message } from './events'

// Get the tokens for the bots
const VANHACK_PREMIUM_TOKEN = process.env.VANHACK_PREMIUM_TOKEN

if (!VANHACK_PREMIUM_TOKEN) {
  throw new Error('Please set a VANHACK_PREMIUM_TOKEN environemnt variable with the Slack App Token.')
}

// DISABLED
// const VANHACK_PRO_TOKEN = process.env.VANHACK_PRO_TOKEN


function start() {
  console.log('Starting bots...', new Date());
  const { vanhack_premium } = Meteor.settings;

  Bots[vanhack_premium.id] = new SlackBot({
    name: vanhack_premium.name,
    token: VANHACK_PREMIUM_TOKEN
  });

  // Setup start event
  Object.keys(Bots).forEach(id => {
    Bots[id].on('start', () => {
      console.info(`Bot ${id} started! ${new Date()}`)
    })

    Bots[id].on('close', () => {
      console.log(`Connection closed for ${id}, reconecting...`);

      // DISABLED
      // if (id === vanhack_pro.id) {
      //   Bots[id] = new SlackBot(vanhack_pro.config)
      // }

      if (id === vanhack_premium.id) {
        Bots[id] = new SlackBot({
          name: vanhack_premium.name,
          token: VANHACK_PREMIUM_TOKEN
        })
      }
    })
  })

  /**
   * https://api.slack.com/rtm
   */
  Bots[vanhack_premium.id].on('message', Meteor.bindEnvironment(data => {
    switch (data.type) {
      case 'message': return message(Bots[vanhack_premium.id], data);
      case 'team_join': return teamJoin(Bots[vanhack_premium.id], data);
      case 'user_change': return userChange(Bots[vanhack_premium.id], data);
      default: return;
    }
  }))

  // DISABLED VANHACKATON BOT
  // Bots[vanhack_pro.id].on('message', Meteor.bindEnvironment(data => {
  //   switch (data.type) {
  //     case 'team_join': return teamJoin(Bots[vanhack_pro.id], data);
  //     case 'message':
  //       const botId = 'D2Q11JXLN'
  //       const ilyaId = 'U0CL8K41K'
  //
  //       if (data.channel === botId) {
  //         Bots[vanhack_pro.id].postMessage(data.user, `I am not allowed to answer questions. Please ask <@${ilyaId}>.`, {
  //           as_user: 'vanhackbot'
  //         })
  //       }
  //
  //     default: return;
  //   }
  // }))
}

Meteor.startup(() => start())
