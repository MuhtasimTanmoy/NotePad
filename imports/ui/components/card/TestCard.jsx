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
  }

  showBottom(){
    // var x=document.getElementById("bottomContent");
    // console.log("on it ");
    // x.className="";

    this.setState({
      hover:true
    });
  }


  // updateThis(){

  //   if(this.state.editing){
      
  //           event.preventDefault();
  //           let data = {
  //             id:this.props.id,
  //            title : ReactDOM.findDOMNode(this.refs.title).value.trim(),
  //            text : ReactDOM.findDOMNode(this.refs.text).value.trim(),
  //         };
  //           console.log(data);
      
  //           Meteor.call("notes.update",data,function(error,result){
  //             if(error){
  //               console.log("error", error);
  //               window.alert(error.message)
  //             }
  //             if(result){
  //               console.log("Success");
  //               console.log(result);
  //               var x = document.getElementById("snackbar")
  //               x.className = "show";
  //               setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
  //            }
  //           });
      
  //           console.log("I am done");     
              
  //         }

      
     

  // }


  hideBottom(){
    // var x=document.getElementById("bottomContent");
    // console.log("on it ");
    // x.className="bottomContentHide";

    console.log("I will go");

    this.setState({
      hover:false
    });


    if(this.state.editing){
      
            event.preventDefault();
            let data = {
              id:this.props.id,
             title : ReactDOM.findDOMNode(this.refs.title).value.trim(),
             text : ReactDOM.findDOMNode(this.refs.text).value.trim(),
          };
            console.log(data);
      
            Meteor.call("notes.update",data,function(error,result){
              if(error){
                console.log("error", error);
                window.alert(error.message)
              }
              if(result){
                console.log("Success");
                console.log(result);
                var x = document.getElementById("snackbar")
                x.className = "show";
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
             }
            });
      
            console.log("I am done");
            
            this.setState({
              editing:false
            })
              
          }



   
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

random(){
  {this.state.editing &&
    
    {/* <div className="right floated" style={{padding:"5px"}} >
          <i className="checkmark large blue icon"></i>
        </div> */}
    
        }
}

showContent(){
  var content=
  <div className="description"   onClick={this.showFull.bind(this)} style={{minHeight:"110px",maxHeight:"110px",overflow:"hidden"}}>
  
  <p>
  {this.props.text}
</p>
</div>;

return content;
}

showEditableContent(){
  var content=
  <div className="description"   style={{minHeight:"110px",overflow:"hidden"}}> 
  <div className="ui form field input">
  <textarea ref="text" placeholder="Content"  style={{width:"400px" }} rows="8" defaultValue={this.props.text}></textarea>
  </div>
  </div> ;

return content;


}



  render(){

    var hovered=this.state.hover?"":"bottomContentHide";
    var starred=this.state.starred?"right floated star icon yellow ":"right floated star icon";
    


    return(
        <div id="fullCard" className="cardItem"   onMouseOver={this.showBottom.bind(this)} onMouseLeave={this.hideBottom.bind(this)}>
        <div id="snackbar">Note saved.</div>

  


        <div className="ui raised fluid red card ">
  <div className="content">
  
    
  {!this.state.editing && <i className={starred}    onClick={this.toggleStar.bind(this)}></i>}

        {!this.state.editing?this.showHeader():this.showEditableHeader()}

    

    {!this.state.editing?this.showContent():this.showEditableContent()}

    
 
  <div className="extra content"  >

  </div>
  {!this.state.editing &&
    <span className="left floated">
{this.props.createdAt.toLocaleDateString()+" "+this.props.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
 </span>
  }





    <div  id="bottomContent" className={hovered}>
    <div className="right floated" style={{padding:"5px"}}>
      <i className="add square large grey icon"></i>
    </div>

    <div className="right floated" style={{padding:"5px"}} onClick={this.deleteThis.bind(this)}>
      <i className="trash large grey icon"></i>
    </div>
    </div>
  </div>





</div>
</div>

    )
  }
}
