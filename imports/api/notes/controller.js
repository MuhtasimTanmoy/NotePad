import { Notes } from './Notes';

class NotesController {
    constructor() {

    }
    printHello(){
        console.log("printed hello");
    }
    insert(data){
        this.printHello();
        let usr = Meteor.user();

        // let usr = Meteor.user();
        let ret = Notes.insert({
            title:data.title,
            text:data.text,
        });
        return ret;
    }

}

export default new NotesController();
