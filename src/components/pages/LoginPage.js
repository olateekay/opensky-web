import React from 'react';
import { MDBRow } from 'mdbreact';
import AdminCardSection1 from './sections/AdminCardSection1';
import AdminCardSection2 from './sections/AdminCardSection2';
import TableSection from './sections/TableSection';
import BreadcrumSection from './sections/BreadcrumSection';
import ChartSection1 from './sections/ChartSection1';
import ChartSection2 from './sections/ChartSection2';
import MapSection from './sections/MapSection';
import ModalSection from './sections/ModalSection';
import './cards.css'
import './style.css'
class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      data: { email: "", password: "" },
      showError: true, ErrorValue: "", showLoading: false, LoadingValue: ""
    }
  }

  handleInputChange(e) {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    })
  }

  dologin = () => {
    const { email, password } = this.state.data
    if (email === "demo" && password === "demo") {
      this.props.history.push("/dashboard")
      return;
    } else {
      this.setState({ showError: true, ErrorValue: "Incorrect Email and Password", showLoading: false, LoadingValue: "" })
      return;
    }
  }

  submit = (e) => {
    e.preventDefault();
    this.setState({ showLoading: true, LoadingValue: "Loading", showError: false, ErrorValue: "" })


    setTimeout(this.dologin, 1000);


    // console.log("props", this.props)

    // console.log("state", this.state.data)
  }

  render() {
    return (
      <div>

        <center>
          <div class="card-body px-lg-5 pt-0">


            <div class="card" style={{ height: "100%", textAlign: "left", marginTop: "15rem", padding: "3rem" }}>
              <div class="card-block">

                <div class="form-header darken-4">
                  <h3> Login:</h3>
                </div>

                <div class="md-form">
                  <i class="fa fa-envelope prefix"></i>
                  <input placeholder="Email" type="text" id="form2" name="email" onChange={this.handleInputChange} class="form-control"></input>
                </div>

                <div class="md-form">
                  <i class="fa fa-lock prefix"></i>
                  <input placeholder="Password" type="password" name="password" id="form4" onChange={this.handleInputChange} class="form-control"></input>
                </div>

                {this.state.showError &&
                  <div style={{ textAlign: "center" }}>
                    <label style={{ color: "red" }}>{this.state.ErrorValue}</label>
                  </div>
                }
                <div class="text-center">
                  <button class="btn btn-deep-purple" onClick={this.submit}>Login</button>
                </div>
              </div>

            </div>
          </div>
        </center>

      </div >



    );

  }

}

export default LoginPage;