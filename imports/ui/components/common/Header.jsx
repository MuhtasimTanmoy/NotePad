import React,{Component} from "react";
import {createContainer} from 'meteor/react-meteor-data';
import Login from '/imports/ui/components/auth/Login.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';



class Header extends Component {

  componentDidMount() {
	    $('.ui.basic.button')
	            .popup({
	                inline: true
	            })
	            ;
	    $('.ui.label')
	            .popup({
	                inline: true
	            })
	            ;

              $('.ui.dropdown')
                      .dropdown()
                      ;
	}
  constructor() {
    super();
  }
  logOut(){
        Meteor.logout(function(){
          FlowRouter.go('/');
        });
        

        $("#goHome").click();

    }
  renderLogin(){
      $('.ui.page.dimmer')
      .dimmer('show');

    }




    loggedInDiv(){


      let loggedIn=<div className="ui simple dropdown item">
        <i className="user icon"></i> {this.props.user.username} <i className="dropdown icon"></i>
        <div className="menu">
          <a className="item" href="/profile">My profile</a>
          <a className="item">Feedback</a>
          <a className="item" onClick={this.logOut}>Log out</a>
        </div>
      </div>;
      return loggedIn;
    }

    sideBarToggle(){
      $('.tag.sidebar')
  .sidebar('setting', 'transition', 'overlay')
  .sidebar('toggle')
;
    }

    notLoggedInDiv(){
      let notLoggedIn= <a className="item" onClick={this.renderLogin}>Login</a>
      return notLoggedIn;

    }
  render(){


    return (

      <div className="ui white large top fixed menu">

        <div className="ui page dimmer">
          <div className="content">
            <div className="center">
                <Login/>
            </div>
          </div>
        </div>

      <div className="sidebarContainer">
        <div className="ui tag sidebar vertical menu">

            <span  className="header center">
              <a href="/" id="goHome"></a>
              <h1>Note</h1>
            </span>

          <hr/>
          <a className="item">
     1
   </a>
   <a className="item">
     2
   </a>
   <a className="item">
     3
   </a>
        </div>
        </div>
          <div className="left menu">
            <a  className="item" >
              <i className="align justify large icon"></i>
            </a>
            <a href="/" className="item"><h2>Note</h2></a>


          </div>

  				<div className="right menu">


            <a className="item" href="/help"><h3>Help</h3></a>

            {this.props.user?this.loggedInDiv():this.notLoggedInDiv()}


  					<span className="item"></span>
  				</div>
  			</div>
    )
  }
}

export default createContainer(  (props) => {

    return{

        user: Meteor.user(),
    };
}, Header);
