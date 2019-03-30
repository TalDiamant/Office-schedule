import React, { Component } from 'react';
import { Card } from 'reactstrap';


class Appointment extends Component {
  render() {

    //reversing date display
    var d = this.props.currentAppointment.date
    var years = d.slice(0, 4);
    var months = d.slice(5, 7);
    var days = d.slice(8, 10);
    var reversedDate = days.concat("-").concat(months).concat("-").concat(years)

    return (
      <div className="Appointment">
          <Card>
              <h4>{this.props.currentAppointment.groupID}</h4>
              <h5>{this.props.currentAppointment.name}-{this.props.currentAppointment.description}</h5>
              <h5> {reversedDate},   {this.props.currentAppointment.start}-{this.props.currentAppointment.end}</h5>
          </Card>
      </div>
    );
  }







}

export default Appointment;
