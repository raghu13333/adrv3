import React from "react";
import {  BrowserRouter } from "react-router-dom";
import AuthService from '../../src/services/auth.service'
import '../App.css'
import EventBus from '.././common/EventBus'
class SideBar extends React.Component {
  constructor(props) {
    super(props);
  this.state = { active: !this.props.open || true };
  this.logOut = this.logOut.bind(this);
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    EventBus.on("logout", () => {
      this.logOut();
    });
    
  }
  componentWillUnmount() {
    EventBus.remove("logout");
  }
  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render = () => {
    const {  showAdminBoard } = this.state;

    return (
      <nav id="sidebar">
        <div class="sidebar-header">
          <h3>Dashboard</h3>
        </div>
            <BrowserRouter>
            <div>
        <ul class="list-unstyled components">
        
          <li class="">
            <a
              href="/new"
              data-toggle="collapse"
              aria-expanded="false"
              
            >
              ADR
            </a>
            
          </li>
        </ul>
        <ul class="list-unstyled components">
        
          <li class="">
            <a
              href="https://appstream2.ap-southeast-1.aws.amazon.com/authenticate?parameters=eyJ0eXBlIjoiRU5EX1VTRVIiLCJleHBpcmVzIjoiMTYzODI3MjkwNiIsImF3c0FjY291bnRJZCI6IjAzNjc2MTIyNDgwMiIsInVzZXJJZCI6ImRodmFuaSIsImNhdGFsb2dTb3VyY2UiOiJzdGFjay9EaHZhbmkzYXBwc3N0YWNrIiwiZmxlZXRSZWYiOiJmbGVldC8zYXBwc2ZsZWV0IiwiYXBwbGljYXRpb25JZCI6IiIsInVzZXJDb250ZXh0IjoiIiwibWF4VXNlckR1cmF0aW9uSW5TZWNzIjoiNTc2MDAifQ%3D%3D&signature=sEj5Gd2NJekIq3FqltwSwjlTnfSJu89kQ30okRW4eEs%3D"
              data-toggle="collapse"
              aria-expanded="false"
              // target="_blank"
            >
             Annotation
            </a>
            
          </li>
        </ul>
        {showAdminBoard && (
        <ul class="list-unstyled components">
        
          <li class="">
            <a
              href="/user-management"
              data-toggle="collapse"
              aria-expanded="false"
              
            >
             User Management
            </a>
            
          </li>
        </ul>
        )}
       {/*  <ul class="list-unstyled components">
        
        <li class="">
          <a
            href="/"
            data-toggle="collapse"
            aria-expanded="false"
            onClick={this.logOut}
          >
          Logout
          </a>
          
        </li>
      </ul> */}
        
        </div>
        
        </BrowserRouter>
      </nav>
    );
  };
}

export default SideBar;
