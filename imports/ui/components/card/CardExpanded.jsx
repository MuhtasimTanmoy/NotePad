import React, { Component } from 'react';



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

  hideBottom(){
    // var x=document.getElementById("bottomContent");
    // console.log("on it ");
    // x.className="bottomContentHide";

    this.setState({
      hover:false
    });
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
        <input type="text" defaultValue={this.props.title}></input>
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
  <textarea ref="text" placeholder="Content"  style={{width:"800px"}} rows="8" defaultValue={this.props.text}></textarea>
  </div>
  </div> ;

return content;


}



  render(){

    var hovered=this.state.hover?"":"bottomContentHide";
    var starred=this.state.starred?"right floated star icon yellow ":"right floated star icon";
    var editing=this.state.editing?"fullCardItem":"cardItem";
    


    return(
        <div id="fullCard" className={editing}  onClick={this.showFull.bind(this)} onMouseOver={this.showBottom.bind(this)} onMouseLeave={this.hideBottom.bind(this)}>








        
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
