import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Transition from './components/Transition';

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    }
  }
  render() {
    return (
      <div className="App">
        <div style={{margin:'10ppx', padding:'100px'}}>
          <button onClick={e => this.setState({ items: [...this.state.items, this.input.value] })}>Add</button>
          <input type="text" ref={e => this.input = e} />
          <Transition>
            {this.state.items.map(p => <div>{p}</div>)}
          </Transition>
        </div>
      </div>
    );
  }
}

export default App;
