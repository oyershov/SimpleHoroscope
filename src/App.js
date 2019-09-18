import React, { Component } from 'react';
import './App.css';

const botsLogic = require('./logic.json');

class App extends Component {
  state = {
    count: 0,
    usersMessages: [],
  };

  renderHistoryItem = (item, index) => {
    return (
      <div className="history-item">
        {index !== -1 && (
          <div className="histoty-item-user">
            <span>{item}</span>
          </div>
        )}
        <div className="history-item-bot">
          {botsLogic[index + 1].answer && <span>{botsLogic[index + 1].answer}</span>}
          {botsLogic[index + 1].question && <span>{botsLogic[index + 1].question}</span>}
        </div>
      </div>
    )
  }

  render() {
    const { usersMessages } = this.state;

    return (
      <div className="App">
        <div className="chat">
          <div className="chat-history">
            {this.renderHistoryItem(null, -1)}
            {usersMessages && usersMessages.map(this.renderHistoryItem)}
          </div>
          <input
            className="chat-input"
            id="mainInput"
            type="text"
            onKeyPress={this.handleKeyPress}
          />
        </div>
        <div className="chat-counter">Counter: <span>{this.state.count}</span></div>
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
        if (botsLogic[this.state.count + 1]) {
          this.handleIncreaseCounter();
          this.handlePushToChat(mainInput.value);
        } else {
          this.handleSetDefaultCounter();
          this.handleClearUserMessages();
        }

        mainInput.value = "";
      }
    } 
  }

  handlePushToChat = message => {
    this.setState(prevState => ({
      usersMessages: [ ...prevState.usersMessages, message ],
    }));
  }

  handleClearUserMessages = () => {
    this.setState({ usersMessages: [] });
  }
}


export default App;
