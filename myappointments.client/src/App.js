import React, { Component } from 'react';
import AddAppointment from './comp/AddAppointment';
import AllAppointments from './comp/AllAppointments';

 
class App extends Component {

state={
    allAppointments:[]
}

componentDidMount()
{
    this.refreshData();
}


  render() {
    return (
      <div className="App">
      <AddAppointment  refresh={this.refreshData.bind(this)}  allgroups={this.state.allGroups}  />
      <AllAppointments refresh={this.refreshData.bind(this)}  allappointments={this.state.allAppointments}   />  
      </div>
    );
  }

  refreshData()
  {
      fetch('http://localhost:3000/api/getallappointments').then(r=>r.json()).then(data=>
        {
                this.setState({allAppointments:data});
        }) 
     
  } 

}

export default App;
