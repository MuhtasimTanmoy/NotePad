import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {$} from 'meteor/jquery';
import {createContainer} from 'meteor/react-meteor-data';
import CardItem from '/imports/ui/components/card/TestCard.jsx';
import {Notes} from '/imports/api/notes/Notes.js';

class AllNotes extends Component {


    constructor(props) {
      super(props);

      this.state = {

      };
    }

	renderNotes(){
		let templates = [];
		if(this.props.notes.length != 0){
			let notes = this.props.notes;

      console.log(notes);

			for(var i in notes){

					templates.push( <CardItem key={notes[i]._id} id={notes[i]._id} createdAt={notes[i].createdAt} text={notes[i].text} title={notes[i].title}/> );

			}
		}


		return templates;
  }
  
  renderNotes2(){
    return this.props.notes.map((task) => (
      <CardItem key={task._id} id={task._id} createdAt={task.createdAt} text={task.text} title={task.title} />
    ));
  }

    render() {
        return (

          <div className="cardContainer">
            <div className='ui link stackable cards'>
          {this.renderNotes2()}
        </div>
      </div>

        );
    }
}
export default createContainer(  (props) => {
    Meteor.subscribe('notes');
    return{
        user:Meteor.user(),
        notes: Notes.find({createdBy:Meteor.user()._id},{ sort: { createdAt: -1 } }).fetch(),

    };
}, AllNotes);
