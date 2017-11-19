import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class CollectionSchema extends Mongo.Collection{
  insert(doc, callback){
    doc.createdAt = new Date();
    return super.insert(doc, callback);
  }

  update(doc, callback){
    return super.update(doc, callback);
  }

  remove(doc, callback){
    return super.remove(doc, callback);
  }
}

export const SampleCollection = new CollectionSchema('sampleCollection');

SampleCollection.schema = new SimpleSchema({
  name: {type: String},
  createdAt: {type: Date},
})
