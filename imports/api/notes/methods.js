import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Notes} from './Notes.js';
import controller from './controller';


Meteor.methods({

    'notes.insert'( data ){

        //pass data to this method as:  {patientId, reportId, dataEntryId}
        // if (!this.userId) {
        //     throw new Meteor.Error('not-authorized');
        // }
        console.log(data);
        // console.log(this);

        let usr = Meteor.user();
        let ret = controller.insert(data);

        return {
          statusCode: 1,
          statusId: ret,
        }

    },
    'notes.update'( data ){
      console.log(data);


      let ret=Notes.update(data.id, {
                $set: {
                  title:data.title,
                  text:data.text,
                },
            });

        // if ( Meteor.user() != null) {

            
        // }
        //  else {
        //     throw new Meteor.Error('not-authorized');
        // }
        return {
            statusCode: 1,
            statusId:ret
        }
    },
    'notes.delete'( id ){

        Notes.remove(id);

        // if ( Meteor.user() != null ) {
           
        // } else {
        //     throw new Meteor.Error('not-authorized');
        // }
        return {
            statusCode: 1,
        }

    }

});
