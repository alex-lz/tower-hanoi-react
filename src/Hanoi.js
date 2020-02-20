import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import axios from 'axios';

const apiUrl = 'http://localhost:8083';

class Hanoi extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movements: [], 
      response: {},
      error:null,
      disks: '',
      i:0,
      towerA: 0,
      towerB: 0,
      towerC: 0,
      isLoading: false
    };
  }

  onHandleChange = e => {
    let number = e.target.value;
    let regexp = /^[0-9\b]+$/;

    if(regexp.test(number)) {
      this.setState({ [e.target.name]: number})
      this.setState({ towerA: number})
    } 
    if(number === '') {
      this.clear()
      this.setState({ [e.target.name]: number})
    }
  }

  clear() {
    this.setState({
      movements: [], 
      response: {},
      error:null,
      disks: '',
      i:0,
      towerA: 0,
      towerB: 0,
      towerC: 0,
      isLoading: false
    })
  }

  async play(n){
  this.setState({i:0,isLoading: true});

   axios.get(apiUrl + `/disks/${n}`).then(response => response.data).then(
        (result)=>{
            this.setState({
              movements:result, isLoading: false
            });
        },
        (error)=>{
            this.setState({error, isLoading: false});
        }
    )
  }

  moveDisk(disk, from, to) {
    let element = document.getElementById('t'+disk);
    element.style.transition = 'transform 1s';

    switch(from + to) {
      case 'AB':
        element.style.transform = 'translateX('+(30)+'vmin)';
        break;
      case 'AC':
        element.style.transform = 'translateX('+(60)+'vmin)';
        break;
      case 'BA':
        element.style.transform = 'translateX('+(0)+'vmin)';
        break;
      case 'BC':
        element.style.transform = 'translateX('+(60)+'vmin)';
        break;
      case 'CA':
        element.style.transform = 'translateX('+(0)+'vmin)';
        break;
      case 'CB':
        element.style.transform = 'translateX('+(30)+'vmin)';
        break;
      default:
        // code block
    }
  }

  moveDiskAnimation(disk, from, to) {
    let element = document.getElementById('t'+disk);
    
    element.style.animation = 'move'+from+to+' 3s';

    switch(from + to) {
      case 'AB':
        element.style.transform = 'translate(30vmin,0vmin)';
        break;
      case 'AC':
        element.style.transform = 'translate(60vmin,0vmin) ';
        break;
      case 'BA':
        element.style.transform = 'translate(0vmin,0vmin) ';
        break;
      case 'BC':
        element.style.transform = 'translate(60vmin,0vmin) ';
        break;
      case 'CA':
        element.style.transform = 'translate(0vmin,0vmin) ';
        break;
      case 'CB':
        element.style.transform = 'translate(30vmin,0vmin) ';
        break;
    }
  }

  async simulation(n) {
    let m = this.state.movements
    let i = this.state.i
   
    this.moveDiskAnimation(m[i].disk, m[i].source, m[i].destination)
    // this.moveDisk(m[i].disk, m[i].source, m[i].destination)
    this.towerCounter(m[i].source, m[i].destination)
    this.setState({ i: i + 1 });
  }

  towerCounter(from, to) {
    const { towerA, towerB, towerC } = this.state
      switch(from) {
        case 'A':
          this.setState({ towerA: towerA - 1})
          break;
        case 'B':
          this.setState({ towerB: towerB - 1})
          break;
        case 'C':
          this.setState({ towerC: towerC - 1})
          break;
        default:
          // code block
      }
      switch(to) {
        case 'A':
          this.setState({ towerA: towerA + 1})
          break;
        case 'B':
          this.setState({ towerB: towerB + 1})
          break;
        case 'C':
          this.setState({ towerC: towerC + 1})
          break;
        default:
          // code block
      }
  }

  render() {
    const {movements, disks, i, towerA, towerB, towerC, isLoading} = this.state;

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
          value={disks}
          onChange={this.onHandleChange}
        />
        </td>
        <td style={{width: '10px'}}></td>
        <td>
          <ButtonGroup>
            <Button 
              size="sm" 
              color="primary" 
              onClick={() => this.play(disks)}
            >Play</Button>
            <Button 
              size="sm" 
              color="success" 
              onClick={() => this.simulation(disks)}
              disabled={i === movements.length ? true : false}
            >Simulation</Button>
          </ButtonGroup>
        </td>
        <td style={{width: '50px'}}></td>
        <td>Tower A( {towerA} )</td>
        <td>Tower B( {towerB} )</td>
        <td>Tower C( {towerC} )</td>
      </tr>;

    const Hanoi = <form>
      <div className="discs">
        {disks >= 1 ? <div id="t1" className="disc one"></div>: null}
        {disks >= 2 ? <div id="t2" className="disc two"></div>: null}
        {disks >= 3 ? <div id="t3" className="disc three"></div>: null}
        {disks >= 4 ? <div id="t4" className="disc four"></div>: null}
        {disks >= 5 ? <div id="t5" className="disc five"></div>: null}
        {disks >= 6 ? <div id="t6" className="disc six"></div>: null}

        <div className="tower a"></div>
        <div className="tower b"></div>
        <div className="tower c"></div>
      </div>
      <div className="bottom"></div>
    </form>
   

    const Moves = movements.map((move, index) => {
      return <tr key={index}>
        <td style={{whiteSpace: 'nowrap'}}>{move.disk}</td>
        <td style={{whiteSpace: 'nowrap'}}>{move.source}</td>
        <td style={{whiteSpace: 'nowrap'}}>{move.destination}</td>
      </tr>
    })

    return (
      <div>
        <AppNavbar/>
        <Container style={{maxWidth: '1600px'}}fluid>
          <h3>Tower of Hanoi</h3>
          <table><tbody>{Controls}</tbody></table>
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