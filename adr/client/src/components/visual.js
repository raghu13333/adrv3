import React from 'react';

import axios from 'axios';
import '../Login.css'

export default class visual extends React.Component {
  state = {
    Inferenceout: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/input.json`)
      .then(res => {
        const Inferenceout = res.data;
        this.setState({ Inferenceout });
      })
  }

  render() {
    return (
       
    <div class="container">

    <div class="thumbnail">
    <div>
    
  
       
      
</div>
{ this.state.Inferenceout.map(output =>
<div class="card mb-3" style={{maxWidth:"540px", marginLeft:"300px"}}>
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src={output.s3_path} class="card-img" alt="..." />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{output.triton_output}</h5>
        <p class="card-text">Confidence:{output.confidence}</p>
      
      </div>
    </div>
  </div>
</div>
)}

       
        </div>

    </div>


    )
  }
}
