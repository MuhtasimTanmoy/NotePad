import React, {Component} from "react";
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import NotesInput from '/imports/ui/components/inputForm/NotesInput.jsx';
import AllNotes from '/imports/ui/components/notes/AllNotes.jsx';
import Note from '/imports/ui/components/card/TestCard.jsx';




export default class HomePageContent extends Component {
  constructor() {
    super();
  }

  render() {
    return (

      <div className="ui container">
        <div className="customContain">

          <NotesInput/>


  

          <AllNotes/>



        </div>

      </div>

    )
  }
}
