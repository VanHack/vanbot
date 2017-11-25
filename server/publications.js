import { Requests, Replies } from '../lib/collections'

Meteor.publishComposite('requests', {
  find: () => {
    return Requests.find({}, {
      sort: {
        date: 1
      }
    })
  },
  children: [{
    find: (request) => {
      return Replies.find({requestId: request._id})
    }
  }]
})
