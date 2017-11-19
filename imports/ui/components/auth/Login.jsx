import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'react-mounter';
import Homepage from '/imports/ui/pages/HomePage.jsx';
import RegisterPage from '/imports/ui/pages/RegisterPage';



export default class Login extends Component{


  handleSubmit(){
    let code = ReactDOM.findDOMNode(this.refs.code).value;
    let password = ReactDOM.findDOMNode(this.refs.password).value;
    console.log(code, password);
    Meteor.loginWithPassword(code, password, (error) =>{
      if(error)window.alert("Error.");
      else {
        $('.ui.page.dimmer')
        .dimmer('hide');

        FlowRouter.go('/dashboard');
        
      };
    });
 
  }

  render(){
    return(
      <div className='loginSectionCon'>
        <h2>Login</h2>
        <div className='logFieldContainer'>
            <p>Username</p>
            <input type="text" className="loginField" ref='code' placeholder="Username"/>
            <p>Password</p>
            <input type="password" className="loginField" ref='password' placeholder="Password"/>
            <br/>
            <div className='two ui buttons'>
              <button className="ui blue button" onClick={this.handleSubmit.bind(this)}>Login</button>
            </div>

            <p style={{paddingTop:"10px"}}>Don't have an account? <a href="/register">Sign Up</a></p>

            
          

        </div>
      </div>
    )
  }
}
