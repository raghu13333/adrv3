import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import 'bootstrap'
export class Logout extends Component {
    constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
  
      this.state = {
        showModeratorBoard: false,
        showAdminBoard: false,
        currentUser: undefined,
      };
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
  
    render() {
        return(
            <div style={{marginTop:"60px"}}>


                <a href="/" class="btn btn-danger" onClick={this.logOut}>
                  LogOut
                </a>
              
            
          
            </div>
        )
    }
}