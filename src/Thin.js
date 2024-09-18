import React, { Component } from 'react';
import './App.css';

export default class Thin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      printText: '',  // State to hold the text input
      responseText: '' // State to hold the response data from the backend
    };
  }

  handleTextChange = (event) => {
    this.setState({ printText: event.target.value });
  };

  handlePrint = () => {
    const { printText } = this.state;

    fetch('http://192.168.2.12:8081/api/print', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: printText })
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        this.setState({ responseText: data });
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleCashDrawer = () => {
    fetch('http://192.168.2.12:8081/api/cash-drawer', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        this.setState({ responseText: data });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div className="container">
        
        <textarea
          value={this.state.printText}
          onChange={this.handleTextChange}
          rows="4"
          className="text-area"
          placeholder="Enter text to print..."
        />
        <div className="button-container">
          <button
            onClick={this.handlePrint}
            className="button"
          >
            Print
          </button>
          <button
            onClick={this.handleCashDrawer}
            className="button"
          >
            Cash Drawer
          </button>
        </div>
        {this.state.responseText && <h1 className="response-text">{this.state.responseText}</h1>}
      </div>
    );
  }
}
