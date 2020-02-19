import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const apiUrl = 'http://localhost:8083';

class Hanoi extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error:null, 
      movements: [], 
      disks: '',
      regexp: /^[0-9\b]+$/,
      response: {}, 
      isLoading: false
    };
  }

  onHandleChange = e => {
    let number = e.target.value;
    if(number === '' || this.state.regexp.test(number)) {
      this.setState({ [e.target.name]: number})
    }

  }

  async play(n){
  this.setState({isLoading: true});

   axios.get(apiUrl + `/disks/${n}`).then(response => response.data).then(
        (result)=>{
            this.setState({
              movements:result, isLoading: false
            });
        },
        (error)=>{
            this.setState({error});
        }
    )
}

  render() {
    const {movements, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const Controls = 
      <tr key={"hanoi_0"}>
        <td>
        <input
          type="number"
          name="disks"
          placeholder="Type here to play!"
          value={this.state.disks}
          onChange={this.onHandleChange}
        />
        </td>
        <td>
          <ButtonGroup>
            <Button 
              size="sm" 
              color="primary" 
              onClick={() => this.play(this.state.disks)}
            >Play</Button>
          </ButtonGroup>
        </td>
      </tr>;

const Moves = movements.map(move => {
  return <tr key={move.disk+move.source+move.destinacion}>
    <td style={{whiteSpace: 'nowrap'}}>{move.disk}</td>
    <td style={{whiteSpace: 'nowrap'}}>{move.source}</td>
    <td style={{whiteSpace: 'nowrap'}}>{move.destinacion}</td>
  </tr>
      
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <h3>Tower of Hanoi</h3>
          {Controls}
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="15%">Number of disk</th>
              <th width="15%">Source</th>
              <th width="15%">Destination</th>
            </tr>
            </thead>
            <tbody>
            {Moves}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Hanoi;