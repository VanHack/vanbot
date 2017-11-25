import { Meteor } from 'meteor/meteor';
import { Requests, Replies } from '../lib/collections';

Meteor.methods({
  'Requests.methods.done': function(requestId) {
    Requests.update({
      _id: requestId
    }, {
      $set: {
        done: true
      }
    });
  },

  /**
   * VanhackPremium only
   */
  'Bot.methods.postMessage': function(botId, requestId, user, text) {
    text += "\n Don't reply this message. If you have any questions contact <@U06TBHP6U>."

    Bots[botId].postMessage(user.id, text, { as_user: true })
    .then(Meteor.bindEnvironment(() => {
      console.log(`Message sent to ${user.name}: ${text}`)

      Replies.insert({
        requestId, user, text,
        date: new Date()
      }, (err, res) => {
        console.log('Reply saved to database', res);
      })
    }))
    .catch(err => console.log(err))
  },
})
