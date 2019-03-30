import React, { Component } from 'react';
import Appointment from './Appointment';



class AllAppointments extends Component {

  render() {
    return (
      <div className="list">
          {this.props.allappointments.map(a => <Appointment refresh={this.props.refresh} key={a.ID} currentAppointment={a} />)}       
      </div>

    );
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

}

export default AllAppointments;
