import { Mongo } from 'meteor/mongo'

export const Requests = new Mongo.Collection('requests');
export const Replies = new Mongo.Collection('replies');
