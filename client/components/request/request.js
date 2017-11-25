import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Replies } from '/lib/collections'
import linkify from '../../util/linkify'
import './request.html';

// Refactor this
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function parse(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  const result = text
  .replaceAll('<', '')
  .replaceAll('>', '')
  .replaceAll('\n', '<br />')

  return linkify(result);
}

Template.request.helpers({
  parseText(text) {
    return parse(text)
  },
  replies() {
    return Replies.find({requestId: this._id})
  }
})

Template.request.events({
  'click [data-action="done"]': function(event) {
    Meteor.call('Requests.methods.done', this._id, (err, res) => {
      toastr.success(`Request for user <b>${this.user.name}</b> marked as done!`)
    })
  },
  'submit .form-message': function(event) {
    event.preventDefault();
    const message = event.target.message.value

    Meteor.call('Bot.methods.postMessage', 'vanhack_premium', this._id, this.user, message, (err, res) => {
      if (err) {
        console.error(err);
      }else{
        toastr.success('Message sent!')
        event.target.message.value = ""
        $(`#collapse-${this._id}`).collapse('toggle')
      }
    })
  }
})
