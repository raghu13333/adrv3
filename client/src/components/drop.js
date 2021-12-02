import React from "react";
import axios from 'axios';

class Inference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      courses: [],
      course: "",
      model: "",
      path:"",
      options: [
        { label: "resnet-50torch", value: "resnet-50torch" },
        { label: "densenet_onnx", value: "densenet_onnx" },
        { label: "inception_graphdef", value: "inception_graphdef" },
      ],
    };
    this.handleChangeCourse = this.handleChangeCourse.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }



  handleChange = event => {
    this.setState({ model: event.target.value });
  };

  handleChangeCourse = event => {
    this.setState({ course: event.target.value });
  };

  getUnique(arr, comp) {
    const unique = arr
      //store the comparison values in array
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])

      .map(e => arr[e]);

    return unique;
  }
  
  handleSubmit(event) {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
    }
    event.preventDefault();
    axios.post('http://ec2-18-142-46-30.ap-southeast-1.compute.amazonaws.com:8888/home', {
      model: this.state.model,
      dataset:this.state.course,
      path:"https://karthiknbucket1.s3.ap-southeast-1.amazonaws.com/dog.jpg",
      id:"7"
    })
     .then((res) => {
      // Res.data is the response from your server
      console.log(res.data);
      
      
    });
  }

  componentDidMount() {
    
    axios.get('http://localhost:5000/files')
        .then(response => this.setState({ courses: response.data }));
}

  render() {


    const uniqueCouse = this.getUnique(this.state.courses, "dataset");

    const courses = this.state.courses;
    const course = this.state.course;
    const options = this.state.options;

    const filterDropdown = courses.filter(function(result) {
      return result.dataset === course;
    });

    return (
      <div className="container">
      <div className="row">
      <form onSubmit={this.handleSubmit.bind(this)}>
      <div  className="col-4"
            style={{
              paddingBottom: "100px",
              paddingTop: "20px",
              alignItems: "center",
            }}>
        
          <label style={{ paddingTop: "5px", marginTop: "40px" }}>
            Dataset
            <select classname="custom-select"
              value={this.state.course}
              onChange={this.handleChangeCourse}  style={{ paddingTop: "5px", marginTop: "10px" }}
            >
              {uniqueCouse.map(course => (
                <option key={course.id} value={course.dataset}>
                  {course.dataset}
                </option>
              ))}
            </select>
          </label>
          <div className="col-4">
          <button
                  type="submit"
                  class="btn"
                  style={{ marginTop: "" }}
                >
                  ok
                </button>
                </div>
          
          <div>
          {filterDropdown.map((course) => (
                  <div className="col-2">
                    <input type="checkbox" id="myCheckbox1" />
                    <label for="myCheckbox1" className="labell">
                      <img
                        key={course.id}
                        src={`${course.path}`}
                        height="80"
                        className="card-img-top img-responsive"
                        alt="img"
                      />
                     
                    </label>
                  </div>
                ))}
          </div>
     
      </div>
      <div
      className="col-4"
      style={{
        paddingBottom: "100px",
        paddingTop: "20px",
        alignItems: "center",
      }}
    >
      <label
        className=""
        style={{ paddingTop: "5px", marginTop: "40px" }}
      >
        Model
        
          <select
            className="custom-select"
            name="example"
            value={this.state.model}
            onChange={this.handleChange}
            style={{ paddingTop: "5px", marginTop: "10px" }}
          >
            <option>--Select--</option>
            {options.map((option) => (
              <option
                value={option.value}
                onChange={(e) => this.setState({ model: e.target.value })}
              >
                {option.label}
              </option>
            ))}
          </select>
      </label>
      
    </div>
    </form>
    </div>
    </div>
    );
  }
}

export default Inference;
