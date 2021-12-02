import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import Register from "./register.component";
export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <div className="container">
        
         <h3>{this.state.content}</h3>
        {/*  <h3>Welcome Admin</h3>
          <Register />
          <table class="table" style={{marginTop:"5%"}}>
  <thead class="thead-light" >
    <tr>
      <th scope="col">#</th>
      <th scope="col">Username</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>karthi</td>
      <td>karthi@gmail.com</td>
      <td>User</td>
    </tr>
    
  </tbody>
</table> */}
     
      </div>
    );
  }
}
