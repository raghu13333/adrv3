import React from "react";
import axios from 'axios'
import '../Login.css'
export default class Inference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      course: "",
      inferenceout: [],
      model: "",
      
      isLoading: false,
      options: [
        { label: "resnet-50torch", value: "resnet-50torch" },
        { label: "densenet_onnx", value: "densenet_onnx" },
        { label: "inception_graphdef", value: "inception_graphdef" },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
        this.handleChangeCourse = this.handleChangeCourse.bind(this);
        this.click = this.click.bind(this);
  }

  handleChange(e) {
    console.log("Model Selected!!");
    this.setState({ model: e.target.value });
  }


  handleChangeCourse = (event) => {
    this.setState({ course: event.target.value });
  };

  getUnique(arr, comp) {
    const unique = arr
      //store the comparison values in array
      .map((e) => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter((e) => arr[e])

      .map((e) => arr[e]);

    return unique;
  }
  click() {

    this.setState({ isLoading: true });

    axios
    .get(
      `http://localhost:5000/model-list`
    )
    .then((res) => {
      this.setState({
       inferenceout: res.data , isLoading: false,
      
       
      })
     
      let newWin = window.open("about:blank", "res.data", "width=400,height=400");
      newWin.document.write(JSON.stringify(res.data))
      localStorage.setItem("apiData", JSON.stringify(res.data));
      var data = JSON.parse(localStorage.getItem("apiData"));
      console.log(data)
    })
}
  
  handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:5000/getmodel', {
      model: this.state.model,
      dataset:this.state.course
    })
     .then((res) => {
    // Res.data is the response from your server
    localStorage.setItem("apiData1", JSON.stringify(res.data));
     console.log(res.data)
    });
    
   var data = JSON.parse(localStorage.getItem("apiData1"));
    console.log(data)
  }


  


  componentDidMount() {
     axios
  .get(`http://localhost:5000/files`)
  .then((response) =>
    this.setState(
      {
        courses: response.data 
      },

        
    )
  )
  .catch((err) => console.log(err))
    
  }

  render() {
    const uniqueCouse = this.getUnique(this.state.courses, "dataset");

    const { courses, course, options } = this.state;

    const filterDropdown = courses.filter(function (result) {
      return result.dataset === course;
    });

    return (
      <div className="container">
        <div className="row">
          <div
            className="col-6"
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
              Dataset
              <form onSubmit={this.handleSubmit.bind(this)}>
              <select
                className="custom-select"
                value={this.state.course}
                onChange={this.handleChangeCourse}
                style={{ paddingTop: "5px", marginTop: "10px" }}
              >
                <option>--Select--</option>
                {uniqueCouse.map((course) => (
                  <option key={course.id} value={course.dataset} 
                  onChange={(e) => this.setState({ dataset: e.target.value })}>
                    {course.dataset}
                  </option>
                ))}
              </select>
              <button
                  type="submit"
                  class="btn"
                  style={{ marginTop: "" }}
                >
                  ok
                </button>
              </form>
            </label>
          </div>
        
          <div
            className="col-6"
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
              <form onSubmit={this.handleSubmit.bind(this)}>
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
                <button
                  type="submit"
                  class="btn"
                  style={{ marginTop: "" }}
                >
                  ok
                </button>
                
               

                
              </form>
            </label>
            
          </div>
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
              
               <button
                  type="submit" onClick={this.click} disabled={this.state.isLoading}
                  class="btn btn-success"
                  style={{ marginLeft:"45%" ,marginBottom:"10px"}}
                >
                  Inference
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  style={{ marginLeft:"45%"}}  onClick={()=> window.open("/visual", "data","width=400,height=400")}
                >
                  Get Output
                </button>
               
        </div>
      </div>
    );
  }
}