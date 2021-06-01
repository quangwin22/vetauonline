import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Userview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stagUrl: '',
      nameUser: '',
      submenu: 'false',
      login: 'false'
    }
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:9999/UserMenu',
      data: null
    }).then(res => {
      if (res.data.user === undefined) {
        console.log("err");
      } else {
        this.setState({
          userName: res.data.user.userName
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }
  onClick() {
    if (this.state.submenu === 'true') {
      this.setState({
        submenu: 'false'
      });
    } else {
      this.setState({
        submenu: 'true'
      });
    }
  }

  onClickLogOut() {
    axios({
      method: 'GET',
      url: 'http://localhost:9999/Logout',
      data: null
    }).then(res => {
      this.setState({
        login: 'true'
      });
    }).catch(err => {
      console.log(err);
    });
  }
  render() {
    if (this.state.login === 'true') {
      return (<Redirect to="/dang-nhap" />)
    }
    return (
      <div className="name-backgr">
        <div className="header-title">{this.props.stagUrl}</div>
      </div>
    );
  }
}
export default Userview;
