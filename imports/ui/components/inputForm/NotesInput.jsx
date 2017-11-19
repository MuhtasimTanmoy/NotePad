import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'react-mounter';
export default class NotesInput extends React.Component {

  constructor(props){
    super(props);
    this.state={
      edited:false,
    };
  }


  handleSubmit(event){
    event.preventDefault();
    let data = {
     title : ReactDOM.findDOMNode(this.refs.title).value.trim(),
     text : ReactDOM.findDOMNode(this.refs.text).value.trim(),
  };
    console.log(data);

    Meteor.call("notes.insert",data,function(error,result){
      if(error){
        console.log("error", error);
        window.alert(error.message)
      }
      if(result){
        console.log("Success");
        console.log(result);
     }
    });


    title=ReactDOM.findDOMNode(this.refs.title).value="";
    text=ReactDOM.findDOMNode(this.refs.text).value="";


    var x=document.getElementById("showContent");
    x.className="detailContent";

    var title=document.getElementById("title");
    title.placeholder="Take a note......."



  }

  contentShow(){
    var x=document.getElementById("showContent");
    x.className="";

    var title=document.getElementById("title");
    title.placeholder="Title"

    this.setState({
      edited:false
    });


  }

  contentHide(){

    if(this.state.edited==false){
    var x=document.getElementById("showContent");
    x.className="detailContent";

    var title=document.getElementById("title");
    title.placeholder="Take a note......."
  }


  }

  edited(){
    this.setState({
      edited:true
    });
  }





  render() {

    return (
      <div className="noteFormContainer" >

        <form className="ui form" >
          <div className="field" onMouseOver={this.contentShow.bind(this)} onMouseLeave={this.contentHide.bind(this)}>
            <div className="ui large icon fluid input">

              <input type="text" id="title" ref="title" placeholder="Take a note......." onChange={this.edited.bind(this)}></input>

            </div>
          </div>

          <div id="showContent" className="detailContent">
          <div className="field" >
            <textarea ref="text" placeholder="Content"  rows="5"></textarea>
          </div>
          <div className="ui blue fluid button" style={{width:"30%",marginLeft:"35%"}} onClick={this.handleSubmit.bind(this)}>Save</div>
        </div>
        </form>


      </div>

    )
  }
}
