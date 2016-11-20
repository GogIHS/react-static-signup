'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

const {Component} = React;

class SignUp extends Component {
  constructor() {
    super();
    this.state = {counter: 0, data: []};
    this.click_handler = this.click_handler.bind(this);
  }

  componentDidMount(){
    console.log('Mounted');
  }

  click_handler(e) {
    this.setState({counter: this.state.counter + 1, data: this.state.data.concat([1])});
  }

  render() {
    let styles = {
      border: '1px solid rgba(19, 35, 47, 0.9)',
      borderRadius: '6px',
      display: 'flex',
      height: '500px',
    };
    return (
      <div style={styles}>
        <Form addUser={(newUser) => this.setState({data: [...this.state.data, newUser]})} />
        <Status data={this.state.data} />
      </div>
    );
  }
};

class Form extends Component {
  constructor() {
    super();
    this.state = {username: '', password: ''};
    this.userChange = this.userChange.bind(this);
    this.passChange = this.passChange.bind(this);
  }

  userChange(e) {
    this.setState({username: e.target.value});
  }

  passChange(e) {
    this.setState({password: e.target.value});
  }

  render() {
    const container = {
      display: 'flex',
      flexDirection: 'column',
      height: '500px',
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
    }
    return(
      <div className={'form'}>
        <div style={container}>
          <h1>Welcome Back!</h1>
          <div className={'field-wrap'}>
            <label>Username:<span className={'req'}>*</span></label>
            <input type={'text'} onChange={this.userChange} />
          </div>

          <div className={'field-wrap'}>
            <label>Password:<span className={'req'}>*</span></label>
            <input type={'password'} onChange={this.passChange} />
          </div>

          <p className={'forgot'}><a href="#">Forgot Password?</a></p>
          <br />

          <button onClick={() => this.props.addUser({user: this.state.username, pass: this.state.password, time: Date.now()})}
            className={'button button-block'}>Log In</button>
        </div>
      </div>
    );
  }
}

class Status extends Component {
  constructor() {
    super();
    this.state = {curUserTime: ''}
  }

  render() {
    let styles = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '90%',
      overflowY: 'scroll',
    };
    let container = {
      width: '50%',
      display: 'flex',
      flexDirection: 'column'
    }
    const currentUsers = this.props.data.map((thisItem, idx) => {
      return (
        <li className={'listItem button button-block'} key={idx}>
          <div  onDoubleClick={() => this.setState({curUserTime: `${(Date.now() - thisItem.time)/1000} Seconds`})}>{thisItem.user}</div>
        </li>
      );
    });
    return (
      <div style={container}>
        <div style={styles}>
          {currentUsers}
        </div>
        <div className={'show button button-block'} >
          {this.state.curUserTime}
        </div>
      </div>
    );
  }
};

ReactDOM.render(<SignUp />,
		document.getElementById('react-container'));
