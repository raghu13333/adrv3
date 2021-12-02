import React, { Component } from "react";
import axios from 'axios';
import { Modal,Button,Form } from "react-bootstrap";
export default class appstream extends Component{
    constructor(){
        super();
        this.state = {
            fname:"",
            lname:"",
            email:"",
            appres:"",
            isOpen: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      openModal = () => this.setState({ isOpen: true });
      closeModal = () => this.setState({ isOpen: false });
    
      handleChange(event) {
        this.setState({fname: event.target.value});
      }
      handleChange2(event) {
        this.setState({lname: event.target.value});
      }
      handleChange1(event) {
        this.setState({email: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        const article = { 
      
            FirstName: this.state.fname,
            LastName:this.state.lname,
            UserName:this.state.email 
        
         };
  
        axios.post('http://localhost:5000/getmodell', article)
          .then(response => this.setState({  appres: response.data,
            
          
          }))
          .catch(error => {
              this.setState({ errorMessage: error.message });
              console.error('There was an error!', error);
          });
      }

    render(){
        return(
            <div className="mt-2">
                <Button  onClick={() => this.setState({isOpen: true})} style={{marginLeft:"60%"}}>Create Appstream User</Button>
                <Modal show={this.state.isOpen} onHide={this.closeModal}>
        <Modal.Header >
          <Modal.Title>Appstream User Creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             {/* <form onSubmit={this.handleSubmit} class="form-group" method="POST">
            <label for="exampleInputEmail2">
                 FirstName:
                <input type="text" value={this.state.fname}  class="form-control" id="exampleInputEmail2" onChange={this.handleChange} />
            </label><br/>
            <label>
                 LastName:
                <input type="text" value={this.state.lname}  class="form-control" onChange={this.handleChange2} />
            </label><br />
            <label>
                Email:
                <input type="email" value={this.state.email} class="form-control" id="exampleInputEmail1" onChange={this.handleChange1} />
            </label><br/>
                     <input type="submit" value="Submit" class="btn btn-primary" />
             </form> */}
             <Form onSubmit={this.handleSubmit} >
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email"value={this.state.email} onChange={this.handleChange1} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Firstname</Form.Label>
    <Form.Control type="text" value={this.state.fname} placeholder="FirstName"onChange={this.handleChange} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>LastName</Form.Label>
    <Form.Control type="text"value={this.state.lname} placeholder="LastName"onChange={this.handleChange2} />
  </Form.Group>
  
  <Button variant="primary" type="submit">
    Submit
  </Button>
  <p>{this.state.appres}</p>
</Form>
             
             
             </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal}>
            Close
          </Button>
        
        </Modal.Footer>
      </Modal>
            </div>
        )
    }
}