import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';

class AddAppointment extends Component {

  state = {
    allGroups: [],
  }

  componentDidMount() {
    
    fetch('http://localhost:3000/api/getallgroups').then(r => r.json())
      .then(allGroups => {
        this.setState({ allGroups: allGroups });
        
      })
  }

  render() {
    return (

      <div className="add">

      <h1>Office schedule</h1>
        <Input onChange={this.handleChange.bind(this)} placeholder="Enter subject" name="name" />
        <Input onChange={this.handleChange.bind(this)} placeholder="Enter description" name="description" />
        <Input onChange={this.handleChange.bind(this)} placeholder="Enter date" name="date" type="date" />
        <Input onChange={this.handleChange.bind(this)} placeholder="Enter start time" name="start" type="time" />

        <select className="custom-select" onChange={this.handleChange.bind(this)} name="length">
          <option value>how long?</option>
          <option value="30">30min</option>
          <option value="60">1hr</option>
          <option value="120">2hr</option>
        </select>
        <br />

        <select className="custom-select" onChange={this.handleChange.bind(this)} name="groupID"  >
          <option>select group</option>
          {this.state.allGroups.map(g => <option key={g.ID} value={g.ID} >{g.groupname} </option>)}
        </select>
        <br />

        <Button outline color="warning" onClick={this.sendData.bind(this)} >Add meeting</Button>
        
      </div>
      
        

    );
  }


  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }


  sendData() {
    
    fetch('http://localhost:3000/api/addappointment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(r => r.json())
      .then(data => {
        alert('Your meeting was added to the list');
        this.props.refresh();
      });
      
  }

  

   
  


}

export default AddAppointment;
