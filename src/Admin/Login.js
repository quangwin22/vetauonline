import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import logo from './logo.svg';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            username: '',
            password: ''
        }
    }

    onChangeAWay = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    onClickLogin() {
        axios.post('http://localhost:9999/Login',
            {
                userName: this.state.username,
                passwordUser: this.state.password
            })
            .then(res => {
                if (res.data.status === "true") {
                    this.setState({
                        login: 'true'
                    });
                } else {
                    this.setState({
                        login: 'false'
                    });
                }
            })
    }
    render() {
        if (this.state.login === 'true') {
            return (<Redirect to="/quan-ly-lich-trinh" />)
        }
        return (
            <div className="bga">
                <div className="cover-login">
                    <div className="logologin">
                        <img src={logo} className="App-logo lg2" alt="logo" />
                    </div>
                    <div className="titlelogin">
                        Vé tàu online 2021
                    </div>
                    <div className="cover-input-login">
                        <input className="ip" type="text" name="username" placeholder="Username" required="required" maxLength="50" onChange={this.onChangeAWay} />
                        <input className="ip" type="password" name="password" placeholder="Password" required="required" maxLength="50" onChange={this.onChangeAWay} />
                        <button type="submit" class="btn btn-primary btn-block btn-large btnlogin" id="login" onClick={() => this.onClickLogin()}>ĐĂNG NHẬP</button>
                        <Link to="/"><button type="submit" class="btn btn-primary btn-block btn-large btnback" id="login">QUAY LẠI TRANG CHỦ</button></Link>
                        <div className={this.state.login === 'false' ? 'text-error mt-3' : 'class-hide'}>* Sai thông tin đăng nhập</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Detail;
