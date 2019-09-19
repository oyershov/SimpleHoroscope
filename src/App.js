import React, { Component } from 'react';
import './App.css';

const botsLogic = require('./logic.json');

class App extends Component {
  state = {
    count: 0,
    usersMessages: [],
  };

  componentDidMount() {
    const AOS = require('aos');
    AOS.init({
        duration : 1000,
    });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  renderHistoryItem = (item, index) => {
    return (
      <div className="history-item">
        {index !== -1 && (
          <div
            className="history-item-user"
            data-aos="fade-right"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="400"
          >
            <span>{item}</span>
          </div>
        )}
        <div
          className="history-item-bot"
          data-aos="fade-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="400"
          data-aos-delay="500"
        >
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
          <div id="chatHistory" className="chat-history" ref={(div) => { this.messageList = div }}>
            {this.renderHistoryItem(null, -1)}
            {usersMessages && usersMessages.map(this.renderHistoryItem)}
          </div>
          <input
            className="chat-input"
            id="mainInput"
            type="text"
            placeholder="Введите текст..."
            onKeyPress={this.handleKeyPress}
          />
        </div>
        <div className="chat-counter">Счётчик: <span>{this.state.count}</span></div>
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

  scrollToBottom() {
    const scrollHeight = this.messageList.scrollHeight;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }
}


export default App;
