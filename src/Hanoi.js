import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
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

  async simulation(n) {
    let f = document.getElementById('t1');
    f.style.transform = 'translateY('+(-30)+'vmin)';
    f.style.transform += 'translateX('+(60)+'vmin)'; 
  }

  render() {
    const {movements, disks, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const Controls = 
      <tr key={"hanoi_0"}>
        <td>
        <input
          type="text"
          name="disks"
          placeholder="Type here to play!"
          value={this.state.disks}
          onChange={this.onHandleChange}
        />
        </td>
        <td style={{width: '10px'}}></td>
        <td>
          <ButtonGroup>
            <Button 
              size="sm" 
              color="primary" 
              onClick={() => this.play(this.state.disks)}
            >Play</Button>
            <Button 
              size="sm" 
              color="success" 
              onClick={() => this.simulation(this.state.disks)}
            >Simulation</Button>
          </ButtonGroup>
        </td>
      </tr>;

    const Hanoi = <form>
      <div className="discs">
        {disks >= 1 ? <div id="t1" class="disc one"></div>: null}
        {disks >= 2 ? <div id="t2" class="disc two"></div>: null}
        {disks >= 3 ? <div id="t3" class="disc three"></div>: null}
        {disks >= 4 ? <div id="t4" class="disc four"></div>: null}
        {disks >= 5 ? <div id="t5" class="disc five"></div>: null}
        {disks >= 6 ? <div id="t6" class="disc six"></div>: null}

        <div class="tower a"></div>
        <div class="tower b"></div>
        <div class="tower c"></div>
      </div>
      <div class="bottom"></div>
    </form>
   

    const Moves = movements.map(move => {
      return <tr key={move.disk+move.source+move.destinacion}>
        <td style={{whiteSpace: 'nowrap'}}>{move.disk}</td>
        <td style={{whiteSpace: 'nowrap'}}>{move.source}</td>
        <td style={{whiteSpace: 'nowrap'}}>{move.destinacion}</td>
      </tr>
    })

    return (
      <div>
        <AppNavbar/>
        <Container style={{maxWidth: '1600px'}}fluid>
          <h3>Tower of Hanoi</h3>
          {Controls}
          {Hanoi}
          <br />
          <h4>Movements</h4>
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