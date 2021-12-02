import React, { Component } from "react";
import axios from 'axios';
import { Modal,Button,Form } from "react-bootstrap";
export default class stack extends Component{
    constructor(){
        super();
        this.state = {
            stackname:"",
            email:"",
            appres:"",
            isOpen: false,
            errorMessage:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      openModal = () => this.setState({ isOpen: true });
      closeModal = () => this.setState({ isOpen: false });
    
      handleChange(event) {
        this.setState({stackname: event.target.value});
      }
      handleChange1(event) {
        this.setState({email: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        const article = { 
      
            stackname: this.state.stackname,
            
            UserName:this.state.email 
        
         };
  
        axios.post('http://localhost:5000/stack', article)
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
                <Button  onClick={() => this.setState({isOpen: true})} style={{marginLeft:"60%"}}>Assign Apps</Button>
                <Modal show={this.state.isOpen} onHide={this.closeModal}>
        <Modal.Header >
          <Modal.Title>Assign Stack to user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             <Form onSubmit={this.handleSubmit} >
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email"value={this.state.email} onChange={this.handleChange1} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>StackName</Form.Label>
    <Form.Control type="text" value={this.state.stackname} placeholder="StackName"onChange={this.handleChange} />
  </Form.Group>
  
  <Button variant="primary" type="submit">
    Submit
  </Button>
  <p>{this.state.appres}</p>
  <p>{this.state.errorMessage}</p>
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