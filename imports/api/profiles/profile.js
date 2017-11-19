import { Mongo } from 'meteor/mongo';

UserSchema = new SimpleSchema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    password1: {
        type: String,
    },
    contactNo: {
        type: String,
        optional:true,
    },
    address: {
        type: String,
        max: 500,
        optional: true,
    },
    online:{
        type:Boolean,
        optional: true,
    }

});
