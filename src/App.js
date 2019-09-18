import React, { Component } from 'react';
import './App.css';

const botsLogic = require('./logic.json');

class App extends Component {
  state = {
    count: 0
  };

  render() {
    const { count } = this.state;

    return (
      <div className="App">
        {botsLogic[count].answer && <div>{botsLogic[count].answer}</div>}
        {botsLogic[count].question && <div>{botsLogic[count].question}</div>}
        <div>{this.state.count}</div>
        <input id="mainInput" type="text" onKeyPress={this.handleKeyPress} />
      </div>
    );
  }

  handleIncreaseCounter = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  handleSetDefaultCounter = () => {
    this.setState({ count: 0 });
  };

  handleKeyPress = event => {
    if (event.charCode === 13) {
      const mainInput = document.getElementById("mainInput");
      if (mainInput) {
        mainInput.value = "";

        if (botsLogic[this.state.count + 1]) {
          this.handleIncreaseCounter();
        } else {
          this.handleSetDefaultCounter();
        }
      }
    } 
  }
}


export default App;
