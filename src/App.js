import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <h1>
          Header
        </h1>

        <div class="container-fluid text-center">
          <h1><small>Welcome to </small>NUS Events</h1>
        </div>

        <div>
          <h4>What type of Events do you want to see?</h4>
        </div>

        <p> <button type="button">Post New Event</button> </p>

        <ul>
          < ButtonListItem buttonText="hello there!">apple</ ButtonListItem>
          < ButtonListItem buttonText="hello there!">carrot</ ButtonListItem>
          < ButtonListItem buttonText="hello there!">orange</ ButtonListItem>
          < ButtonListItem buttonText="hello there!">banana</ ButtonListItem>
          < ButtonListItem buttonText="hello there!">papaya</ ButtonListItem>
        </ul>

      </div>
    );
  }
}

class ButtonListItem extends Component {
  render() {
    return (
      <li>
        <button>{this.props.buttonText}</button>
        {this.props.children}
      </li>
    )
  }
}

export default App;
