import React from 'react';

import instance from '../../Instance';
import { Modal, Button } from "react-bootstrap";
import Moment from 'react-moment';
import "./cards.css";
import "./style.css";
import "./div.css";
import DatePicker from "react-datepicker";
import moment from 'moment'
import { Link } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";

class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDateChange2 = this.handleDateChange2.bind(this);
    this.state = {
      showError: false, dataError: "",
      showFlights: false, selectedAirport: "", selectedCode: "", endDate: "",
      startDate: "", unixStart: 0, unixEnd: 0,
      data: { type: "", startDate: new Date(), endDate: new Date() },
      dataForView: [],
      form_data: [
        {
          header: "USA (GEORGIA)",
          airports: {
            name: "Hartsfield-Jackson Atlanta International Airport",
            code: "KATL"
          },
        },
        {
          header: "FRANCE",
          airports: {
            name: "Paris Charles de Gaulle Airport",
            code: "LFPG"
          }

        },

        {
          header: "TURKEY",
          airports: {
            name: "Istanbul's Atatürk International Airport",
            code: "LTBA"
          }

        },
        {
          header: "SOUTH KOREA",
          airports: {
            name: "Seoul's Incheon International Airport",
            code: "RKSI"
          }

        },
        {
          header: "CHINA",
          airports: {
            name: "Beijing Capital International Airport",
            code: "ZBAA"
          }
        },
        {
          header: "SOUTH AFRICA",
          airports: {
            name: "Cape town international airport",
            code: "FACT"
          }

        },

        {
          header: "INDIA",
          airports: {
            name: "New Delhi's Indira Gandhi International Airport",
            code: "VIDP"
          }

        },


        {
          header: "DUBAI",
          airports: {
            name: "Dubai International Airport",
            code: "OMDB"
          }

        },
        {
          header: "OMAN",
          airports: {
            name: "Muscat International Airport",
            code: "OOMS"
          },
        },
        {
          header: "JAPAN",
          airports: {
            name: "Tokyo's Haneda Airport",
            code: "RJIT"
          },
        }

      ]
    }
  }

  showAirport = (code, airport) => {
    console.log("code", code);
    const ARRIVAL = "arrival";
    const DEPARTURE = "departure";
    const FLIGHTS = "flights";
    const response = instance.get(`${FLIGHTS}/${ARRIVAL}`, { params: { airport: code, begin: 1517227200, end: 1517230800 } });
    response.then((res) => {
      this.setState({ dataForView: res.data }, () => {
        this.setState({ showFlights: true, selectedAirport: airport, selectedCode: code, showError: false, dataError: "" })
      })
      console.log("response", this.state.dataForView)
      console.log("response", res)
    })
      .catch((err) => {
        console.log("error", err.response)
        if (err.response.status === 404) {
          this.setState({ dataForView: {}, showFlights: true, selectedAirport: airport, selectedCode: code, dataError: "No Records Found", showError: true })
        }
      })
  }


  renderCard = () => {

    let cards = this.state.form_data;
    let nodes = [];
    for (let i = 0; i < cards.length; i++) {
      let header = cards[i].header;
      let airport = cards[i].airports.name;
      let code = cards[i].airports.code;
      nodes.push(
        <center>
          <div className={`w3-col w3-blue card card-1 w3-padding`} style={{ width: "500px" }} key={i}>
            <h2 className="w3-large">{header}</h2>

            <div className="w3-light-grey w3-tiny w3-round-large">

            </div>
            <br />
            <label>{airport}</label>

            <center>
              <button
                className="w3-button btn-primary btn-small"
                onClick={() => this.showAirport(code, airport)}
                style={{ textAlign: "center" }}
              >
                view more
</button>

            </center>
          </div>
        </center>
      );

    }

    return nodes;


  }

  componentDidMount() {
    console.log("props", this.props)

  }

  handleClose = () => {
    this.setState({ showFlights: false })
  }
  handleDateChange(date) {
    const FLIGHTS = "flights";
    this.setState({
      startDate: date,
      data: {
        ...this.state.data,
        startDate: date
      },
      unixStart: moment(date).toDate().getTime()

    }, () => {
      const response = instance.get(`${FLIGHTS}/${this.state.data.type}`, { params: { airport: this.state.selectedCode, begin: this.state.unixStart, end: this.state.unixStart } });
      response.then((res) => {
        this.setState({ dataForView: res.data }, () => {
        })
        console.log("response", this.state.dataForView)
      })
        .catch((err) => {
          console.log("error", err)
        })
    });
  }
  handleDateChange2(date) {
    const FLIGHTS = "flights";
    this.setState({
      endDate: date,
      data: {
        ...this.state.data,
        endDate: date
      },
      unixEnd: moment(date).toDate().getTime()

    }, () => {
      const response = instance.get(`${FLIGHTS}/${this.state.data.type}`, { params: { airport: this.state.selectedCode, begin: this.state.unixStart, end: this.state.unixEnd } });
      response.then((res) => {
        this.setState({ dataForView: res.data }, () => {
        })
        console.log("response", this.state.dataForView)
      })
        .catch((err) => {
          console.log("error", err)
        })
    });
  }

  handleSelectChange = (e) => {
    const ARRIVAL = "arrival";
    const DEPARTURE = "departure";
    const FLIGHTS = "flights";
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    }, () => {
      console.log("dtaa", this.state.data)
      const response = instance.get(`${FLIGHTS}/${this.state.data.type}`, { params: { airport: this.state.selectedCode, begin: 1517227200, end: 1517230800 } });
      response.then((res) => {
        this.setState({ dataForView: res.data }, () => {
        })
        console.log("response", this.state.dataForView)
      })
        .catch((err) => {
          console.log("error", err)
        })
    })


  }

  renderFlights = (dataForView) => {

    let nodes = [];
    for (let i = 0; i < dataForView.length; i++) {
      let icao = dataForView[i].icao24;
      let firstSeen = dataForView[i].firstSeen;
      let lastSeen = dataForView[i].lastSeen;
      let estDepartureAirpotHorizDistance = dataForView[i].estDepartureAirpotHorizDistance;
      let estArrivalAirportHorizDistance = dataForView[i].estArrivalAirportHorizDistance;
      nodes.push(
        <div>
          <label>ICAO Number: {icao}</label>
          <label>First Seen: <Moment unix>{firstSeen}</Moment></label>
          <label>Last Seen: <Moment unix>{lastSeen}</Moment></label>
          <label>Departure Airport Horizontal Distance: {estDepartureAirpotHorizDistance}</label>
          <label>Arrival Airport Horizontal Distance: {estArrivalAirportHorizDistance} meters</label>

        </div>
      );
    }

    return nodes;
  }

  render() {
    return (
      <React.Fragment>
        {/* <BreadcrumSection /> */}
        <div class="w3-top">
          <div class="w3-bar w3-red">
            <Link to={"/"} class="w3-bar-item w3-button">DashboardPage</Link>
          </div>
        </div>
        <br />
        <br />
        {this.renderCard()}

        <Modal
          show={this.state.showFlights}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.state.selectedAirport}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                Select Type
                <select className="form-control" style={{ width: "29rem" }} placeholder="Select Type" name="type" id="type" value={this.state.data.type} onChange={this.handleSelectChange}>
                  <option value="arrival">Arrival</option>
                  <option value="departure">Departure</option>
                </select>
                <div className="row">

                  <div className="col-md-6">
                    Select Start Date
                      <DatePicker
                      selected={this.state.data.startDate}
                      onChange={this.handleDateChange} //only when value has changed

                    />
                  </div>

                  <div className="col-md-6">
                    Select End Date
                    <DatePicker
                      selected={this.state.data.endDate}
                      onChange={this.handleDateChange2} //only when value has changed
                    />
                  </div>
                </div>

                <div className="flights">
                  {this.state.showError &&
                    <div>{this.state.dataError}</div>
                  }
                  {this.renderFlights(this.state.dataForView)}
                </div>

              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label>
                  <h3>


                  </h3>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label>
                  <h3>{}</h3>
                </label>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>

            <Button variant="secondary" onClick={this.handleClose}>
              Close
</Button>
            <Button
              variant="primary"
            >
              Okay
</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );

  }

}

export default DashboardPage;