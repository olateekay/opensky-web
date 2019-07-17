import React from 'react';

import instance from '../../Instance';
import { Modal, Button } from "react-bootstrap";
import Moment from 'react-moment';
import "./cards.css";
import "./style.css";
import "./div.css";
import moment from 'moment'
import { Link } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";

class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    // this.handleDateChange2 = this.handleDateChange2.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.state = {
      showError: false, dataError: "",
      showFlights: false, selectedAirport: "", selectedCode: "", endDate: "",
      startDate: "", unixStart: 0, unixEnd: 0, selectedTime: 0,
      data: { type: "arrival", time: 0 },
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
        <center key={i}>
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

  // handleDateChange2(date) {
  //   const FLIGHTS = "flights";
  //   this.setState({
  //     endDate: date,
  //     data: {
  //       ...this.state.data,
  //       endDate: date
  //     },
  //     unixEnd: moment(date).toDate().getTime()

  //   }, () => {
  //     const response = instance.get(`${FLIGHTS}/${this.state.data.type}`, { params: { airport: this.state.selectedCode, begin: this.state.unixStart, end: this.state.unixEnd } });
  //     response.then((res) => {
  //       this.setState({ dataForView: res.data }, () => {
  //       })
  //       console.log("response", this.state.dataForView)
  //     })
  //       .catch((err) => {
  //         console.log("error", err)
  //       })
  //   });
  // }

  handleSelectChange = (e) => {

    this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } }, () => {
      console.log("type:", this.state.data)
    })


  }

  handleTimeChange = (e) => {

    const ARRIVAL = "arrival";
    const DEPARTURE = "departure";
    const FLIGHTS = "flights";
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    }, () => {
      console.log("dtaa", this.state.data)

      // console.log("test", moment().subtract(120, 'seconds').t
      let calculated = moment().subtract(this.state.data.time * 60, 'seconds').unix()
      let actual = moment().unix()

      const response = instance.get(`${FLIGHTS}/${this.state.data.type}`, { params: { airport: this.state.selectedCode, begin: calculated, end: actual } });
      response.then((res) => {
        this.setState({ dataForView: res.data }, () => {
        })
        console.log("response", this.state.dataForView)
      })
        .catch((err) => {
          console.log("error", err)
          if (err) {
            this.setState({ dataForView: [] })
          }
        })
    })

  }

  renderFlights = (dataForView) => {

    let nodes = [];
    if (dataForView.length > 0) {
      for (let i = 0; i < dataForView.length; i++) {
        let icao = dataForView[i].icao24;
        let firstSeen = dataForView[i].firstSeen;
        let lastSeen = dataForView[i].lastSeen;
        let estDepartureAirpotHorizDistance = dataForView[i].estDepartureAirpotHorizDistance;
        let estArrivalAirportHorizDistance = dataForView[i].estArrivalAirportHorizDistance;
        nodes.push(
          <div>
            <label>ICAO Number: {icao}</label> <br />
            <label>First Seen: {firstSeen}</label> <br />
            <label>Last Seen: {lastSeen}</label> <br />
            <label>estDepartureAirpotHorizDistance: {estDepartureAirpotHorizDistance}</label> <br />
            <label>estArrivalAirportHorizDistance: {estArrivalAirportHorizDistance}</label> <br />


          </div>
        );
      }
    } else {
      nodes.push(
        <div>
          <label>No Records Found</label>
        </div>
      )
    }

    return nodes;
  }

  render() {
    console.log("dataforview", this.state.dataForView)
    return (
      <React.Fragment>
        {/* <BreadcrumSection /> */}
        <div class="w3-top">
          <div class="w3-bar w3-black">
            <Link to={"/"} className="w3-bar-item w3-button">Welcome to Opensky</Link>
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
                    Select flights in the last x-minutes

                    <select className="form-control" style={{ width: "29rem" }} name="time" id="time" value={this.state.data.time} onChange={this.handleTimeChange}>
                      <option value={1}>1mins</option>
                      <option value={5}>5mins</option>
                      <option value={15}>15mins</option>
                      <option value={20}>20mins</option>
                      <option value={25}>25mins</option>
                      <option value={30}>30mins</option>
                      <option value={35}>35mins</option>
                      <option value={40}>40mins</option>
                      <option value={45}>45mins</option>
                      <option value={50}>50mins</option>
                      <option value={55}>55mins</option>
                      <option value={60}>60mins</option>
                    </select>
                    <br />
                  </div>

                  <div className="col-md-6">

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

            <Button variant="primary" onClick={this.handleClose}>
              Close
</Button>

          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );

  }

}

export default DashboardPage;