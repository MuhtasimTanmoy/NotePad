import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Notes} from '../Notes.js';

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('notes', function () {
    return Notes.find({});
  });

}
