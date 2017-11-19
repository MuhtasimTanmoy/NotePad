import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import { mount } from 'react-mounter';



export default class TestCard extends React.Component{

  constructor(){
    super();
    this.state={
      hover:false,
      starred:false,
      editing:false
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);           
    this.handleClickOutside = this.handleClickOutside.bind(this);
    
  }



  componentDidMount(){
    // document.body.addEventListener('click', (event)=>{
    //   console.log("Clicked anywhere");
    //   console.log(event.target);

    // }, true); 


    // $('html').click(function() {
    //   console.log("Is this works");    console.log(event.target);
      

    //   });
     
    //   $('textarea').click(function(event){
    //       event.stopPropagation();
    //       console.log(event.target);

    //   });

      document.addEventListener('mousedown', this.handleClickOutside);
      


  }

  setWrapperRef(node) {
    this.wrapperRef = node;
}

/**
 * Alert if clicked on outside of element
 */
handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        console.log('You clicked outside of me!');
    }
}

componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
}
  showBottom(){
    // var x=document.getElementById("bottomContent");
    // console.log("on it ");
    // x.className="";

    this.setState({
      hover:true
    });
  }


  onEditDone(){

    console.log("This one called");

    
  }

  hideBottom(){
    // var x=document.getElementById("bottomContent");
    // console.log("on it ");
    // x.className="bottomContentHide";

    this.setState({
      hover:false
    });


    // if(this.state.editing){
      
    //         event.preventDefault();
    //         let data = {
    //           id:this.props.id,
    //          title : ReactDOM.findDOMNode(this.refs.title).value.trim(),
    //          text : ReactDOM.findDOMNode(this.refs.text).value.trim(),
    //       };
    //         console.log(data);
      
    //         Meteor.call("notes.update",data,function(error,result){
    //           if(error){
    //             console.log("error", error);
    //             window.alert(error.message)
    //           }
    //           if(result){
    //             console.log("Success");
    //             console.log(result);
    //          }
    //         });
      
    //         this.setState({
    //           editing:false
    //         })
    //       }


    
  }

  deleteThis(){

    
    Meteor.call("notes.delete",this.props.id,function(error,result){
      if(error){
        console.log("error", error);
        window.alert(error.message)
      }
      if(result){
        console.log("Success");
        console.log(result);
     }
    });
  }

  toggleStar(){
    console.log("Working");
    this.setState({
      starred:!this.state.starred,
    });
  }

  showFull(){
    // console.log("Called");
    // var x=document.getElementById("fullCard");
    // x.className="fullCardItem";

    this.setState({
      editing:true
    })
  }


  showHeader(){
      var header=<div className="header">{this.props.title}</div>;
      return header;
  }

  showEditableHeader(){
    var header=<div className="header">
      <div className="ui fluid input">
        <input type="text" ref="title" defaultValue={this.props.title}></input>
      </div>
    </div>;
    return header;
}

showContent(){
  var content=
  <div className="description" style={{minHeight:"110px",maxHeight:"110px",overflow:"hidden"}}>
  
  <p>
  {this.props.text}
</p>
</div>;

return content;
}

showEditableContent(){
  var content=
  <div className="description" style={{minHeight:"110px",overflow:"hidden"}}> 
  <div className="ui form field input">
  <textarea className="tanmoy" ref="text" placeholder="Content"  style={{width:"800px"}} rows="8" defaultValue={this.props.text}></textarea>
  </div>
  </div> ;

return content;


}



  render(){

    var hovered=this.state.hover?"":"bottomContentHide";
    var starred=this.state.starred?"right floated star icon yellow ":"right floated star icon";
    var editing=this.state.editing?"fullCardItem":"cardItem";
    


    return(
        <div id="fullCard" ref={this.setWrapperRef} className={editing}  onClick={this.showFull.bind(this)}  onMouseOver={this.showBottom.bind(this)} onMouseLeave={this.hideBottom.bind(this)}>
    
        <div className="ui raised fluid red card ">
  <div className="content">
  
    
  {!this.state.editing && <i className={starred}    onClick={this.toggleStar.bind(this)}></i>}

        {!this.state.editing?this.showHeader():this.showEditableHeader()}

    

    {!this.state.editing?this.showContent():this.showEditableContent()}

    
  </div>
  {!this.state.editing &&
  <div className="extra content" >

  
    <span className="left floated">
{this.props.createdAt.toLocaleDateString()+" "+this.props.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
 </span>

    <div  id="bottomContent" className={hovered}>
    <div className="right floated" style={{padding:"5px"}}>
      <i className="add square large grey icon"></i>
    </div>

    <div className="right floated" style={{padding:"5px"}} onClick={this.deleteThis.bind(this)}>
      <i className="trash large grey icon"></i>
    </div>
    </div>
  </div>
  }
</div>
</div>

    )
  }
}
