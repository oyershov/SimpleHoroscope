import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    count: 0
  };

  render() {
    return (
      <div className="App">
        <div>{this.state.count}</div>
        <input id="mainInput" type="text" onChange={this.handleInputValue} onKeyPress={this.handleKeyPress} />
      </div>
    );
  }

  handleIncreaseCounter = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  handleInputValue = event => {
    console.log('Value: ', event.target.value);
  }
  
  handleKeyPress = event => {
    if (event.charCode === 13) {
      const mainInput = document.getElementById("mainInput");
      if (mainInput) {
        mainInput.value = "";
        this.handleIncreaseCounter();
      }
    } 
  }
}


export default App;
