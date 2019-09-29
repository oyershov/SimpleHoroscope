import React, { Component } from 'react';
import './App.css';
import { Math } from 'core-js';

const horoscopes = require('./horoscopes.json');

const getRandomNumber = maxValue => {
  return Math.floor(Math.random() * Math.floor(maxValue));
}

class App extends Component {
  state = {
    userName: '',
    usersZodiacSign: '',
    isWrongDate: '',
  };

  componentDidMount() {
    const AOS = require('aos');
    AOS.init({
        duration : 1000,
    });
  }

  render() {
    const { userName, usersZodiacSign, isWrongDate } = this.state;
    const randomNumber = getRandomNumber(3);

    const isRightName = userName.match('^[A-Za-zаАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$');

    return (
      <div className="App">
        <div className="content-block">
          <div className="top-input">
            <input
              className="chat-input"
              id="nameInput"
              type="text"
              placeholder="Ваше имя..."
              onKeyPress={this.handleKeyPress}
            />
          </div>
          <div className="date-input">
            <span className="date-title">Введите дату вашего рождения:</span>
            <div className="date-input-birth">
              <input
                className="chat-input"
                id="dayInput"
                type="text"
                placeholder="День"
                onKeyPress={this.handleKeyPress}
              />
              <input
                className="chat-input"
                id="monthInput"
                type="text"
                placeholder="Месяц"
                onKeyPress={this.handleKeyPress}
              />
              <input
                className="chat-input"
                id="yearInput"
                type="text"
                placeholder="Год"
                onKeyPress={this.handleKeyPress}
              />
            </div>
          </div>
          {isRightName && userName.length && !isWrongDate ? (
            <div>
              {userName ? (
                <div className="user-name">
                  <span>Зравствуйте&nbsp;{userName}!&nbsp;</span>
                  <span>Вы {usersZodiacSign}.&nbsp;</span>
                  <span>Ваш гороскоп:</span>
                </div>
              ) : null}
              {usersZodiacSign ? (
                <div className="horoscope-answer">
                  {horoscopes[randomNumber].answer}
                </div>
              ) : null}
            </div>
          ) : null}
          {!isRightName && userName.length ? (
            <div className="horoscope-answer"><br/><br/>Некорректное имя.</div>
          ) : null}
          {isWrongDate ? (
            <div className="horoscope-answer"><br/>{isWrongDate}</div>
          ) : null}
        </div>
      </div>
    );
  }

  handleKeyPress = event => {
    if (event.charCode === 13) {
      const nameInput = document.getElementById("nameInput").value;
      const dayInput = +document.getElementById("dayInput").value;
      const monthInput = +document.getElementById("monthInput").value;
      const yearInput = +document.getElementById("yearInput").value;
      
      this.handleSetIsWrongDate(dayInput, monthInput, yearInput);
      this.handleSetUsersName(nameInput);

      if (nameInput && dayInput && monthInput && yearInput) {
        if ((dayInput >= 21 && monthInput === 3) || (dayInput <= 20 && monthInput <= 4)) {
          this.handleSetUsersZodiacSign('овен');
        } else if ((dayInput >= 21 && monthInput === 4) || (dayInput <= 21 && monthInput === 5)) {
          this.handleSetUsersZodiacSign('телец');
        } else if ((dayInput >= 22 && monthInput === 5) || (dayInput <= 21 && monthInput === 6)) {
          this.handleSetUsersZodiacSign('близнецы');
        } else if ((dayInput >= 22 && monthInput === 6) || (dayInput <= 22 && monthInput === 7)) {
          this.handleSetUsersZodiacSign('рак');
        } else if ((dayInput >= 23 && monthInput === 7) || (dayInput <= 22 && monthInput === 8)) {
          this.handleSetUsersZodiacSign('лев');
        } else if ((dayInput >= 24 && monthInput === 8) || (dayInput <= 22 && monthInput === 9)) {
          this.handleSetUsersZodiacSign('дева');
        } else if ((dayInput >= 23 && monthInput === 9) || (dayInput <= 23 && monthInput === 10)) {
          this.handleSetUsersZodiacSign('весы');
        } else if ((dayInput >= 24 && monthInput === 10) || (dayInput <= 22 && monthInput === 11)) {
          this.handleSetUsersZodiacSign('скорпион');
        } else if ((dayInput >= 23 && monthInput === 11) || (dayInput <= 21 && monthInput === 12)) {
          this.handleSetUsersZodiacSign('стрелец');
        } else if ((dayInput >= 22 && monthInput === 12) || (dayInput <= 20 && monthInput === 1)) {
          this.handleSetUsersZodiacSign('козерог');
        } else if ((dayInput >= 21 && monthInput === 1) || (dayInput <= 18 && monthInput === 2)) {
          this.handleSetUsersZodiacSign('водолей');
        } else {
          this.handleSetUsersZodiacSign('рыбы');
        }
      }
    } 
  }

  handleSetIsWrongDate = (day, month, year) => {
    if (!String(day).match('^[0-9]+$') || !String(month).match('^[0-9]+$') || !String(year).match('^[0-9]+$')) {
      this.setState({ isWrongDate: 'Дата должна содержать только цифры!' });
    } else if (day < 1 || day > 31) {
      this.setState({ isWrongDate: 'День должен быть в правильном диапазоне!' });
    } else if (month < 1 || month > 12) {
      this.setState({ isWrongDate: 'Месяц должен быть в правильном диапазоне!' });
    } else if (year < 1) {
      this.setState({ isWrongDate: 'Год должен быть в правильном диапазоне!' });
    } else {
      this.setState({ isWrongDate: '' });
    }
  }

  handleSetUsersName = value => {
    if (value) {
      this.setState({ userName: value });
    } else {
      this.setState({ userName: '' });
    }
  }

  handleSetUsersZodiacSign = value => {
    if (value) {
      this.setState({ usersZodiacSign: value });
    } else {
      this.setState({ usersZodiacSign: '' });
    }
  }
}


export default App;
