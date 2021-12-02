import React from 'react';
import Admin from './register.component'
import 'bootstrap'
import axios from 'axios';
//import { Button } from 'react-bootstrap';
import AuthService from '../../services/auth.service';
import Appstream from './appstream';
import Stack from './stackassign';
export default class User extends React.Component {
  constructor(){
    super();
    this.state = {
      userlist:[],
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    }
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
    axios.get('http://localhost:5000/userlist')
        .then(response => this.setState({ userlist: response.data }));
   
  }

  
    render() {
      const userlist= this.state.userlist;
      const {  showAdminBoard } = this.state;
      return (
      <>
       {showAdminBoard && (
      <div className="col-10" style={{marginTop:"5%"}} >
       
        <h2 style={{marginRight:""}}>Welcome Admin</h2>
          <Admin />
          <Appstream />
          <Stack />
          {/*<Button href="/login" style={{marginLeft:"60%",marginTop:"10px"}}>User Login</Button>*/}
          <table class="table" style={{marginTop:"3%" , width:"80%",marginLeft:"120px"}}>
  <thead class="thead-light" >
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Username</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
      <th scope="col">CreatedAt</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
  {userlist.map(table => ( 
    <tr>
      <th scope="row">{table.id}</th>
      <td>{table.username}</td>
      <td>{table.email}</td>
      <td>User</td>
      <td>{table.createdAt}</td>
      <td>Active</td>
    </tr>
  ))}
    
    
  </tbody>
</table>
       
          </div>
           )}
          </>
      )
    }
  }