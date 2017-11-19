import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class RegisterPage extends Component{



  register(){
    data = { 
      username : ReactDOM.findDOMNode(this.refs.userName).value,
      password : ReactDOM.findDOMNode(this.refs.password).value,
      password1 : ReactDOM.findDOMNode(this.refs.password1).value,
      online:true,
    }
    if(data.password != data.password1){
      window.alert("Error! Passwords don't match.");
      return;
    }
    else if(
      data.username == '' ||
      data.password == ''
    ){
      window.alert("Please fill up all fields");
      return;
    }
    Meteor.call("user.create", data, function(error, result){
      if(error){
        console.log("error", error);
        window.alert(error.message)
      }
      if(result){
         console.log(result);
         Meteor.loginWithPassword(data.username, data.password, (error) =>{
           FlowRouter.go('/');
         })
      }
    });
  }

  render(){
    return(
      <div className="ui fullpage">
      <div className='loginSectionCon' >
        <h2>Sign Up</h2>
        <div className='logFieldContainer'>

            <p>UserName</p>
            <input type="text" className="loginField" ref='userName' placeholder="Username"/>
            <p>Password</p>
            <input type="password" className="loginField" ref='password' placeholder="Password"/>
            <p>Repeat Password</p>
            <input type="password" className="loginField" ref='password1' placeholder="Password"/>
            <br/>
            <div className='two ui buttons'>
              <button className="ui blue button" onClick={this.register.bind(this)}>Sign Up</button>
            </div>
        </div>
      </div>
      </div>
    )
  }
}
