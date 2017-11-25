import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Requests } from '/lib/collections'

import './root.html';

const toReview = Requests.find({
  done: false
}, {
  sort: {
    date: 1,
  }}
);

const reviewed = Requests.find({
  done: true
}, {
  sort: {
    date: -1,
  }
});

Template.root.onCreated(function() {
  this.subscribe('requests')
})

Template.root.helpers({
  requestsToReview: function(){
    return toReview;
  },
  requestsReviewed: function(){
    return reviewed;
  },

  countToReview: function() {
    const count = toReview.fetch().length;

    document.title = `Vanbot (${count})`
    return count;
  },
  countReviewed: function() {
    return reviewed.fetch().length;

  }
})
