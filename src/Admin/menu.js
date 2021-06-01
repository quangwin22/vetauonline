import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import logo from './logo.svg';
import { BrowserRouter as Router, Link } from 'react-router-dom';


class MenuView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permission: '1',
            nameUser: '',
            login: 'false',
            userName: ''
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://localhost:9999/UserMenu',
            data: null
        }).then(res => {
            if (res.data.user.userName === undefined) {
                this.setState({
                    login: 'true'
                });
            } else {
                this.setState({
                    permission: '' + res.data.user.vaiTro + '',
                    userName: res.data.user.userName
                });
            }
        }).catch(err => {
            console.log(err);
        });
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
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" />
        if (this.state.login === 'true') {
            return (<Redirect to="/dang-nhap" />)
        }
        return (
            <div className="menu-admin">
                <div className="menu-br titlemenu1">
                    <div className="titlemenu">
                        Vé tàu online
                </div>
                </div>
                <div className="backgroud-in-menu">
                    <div className="padding-10">
                        <div className="logo-login">
                            <div className="logo-circle">                         
                                
                            </div>
                            <div className="none-select-text">{this.state.userName}</div>
                        </div>
                        <div className="input-group md-form form-sm form-2 pl-0">
                            {/* <input className="form-control my-0 py-1 red-border" type="text" placeholder="Tìm kiếm" aria-label="Search"/>
                        <div className="input-group-append">
                            <span className="input-group-text red lighten-3" id="basic-text1"><i className="fas fa-search text-grey"
                              aria-hidden="true"></i></span>
                        </div> */}
                        </div>
                        {/*
                    <div className="padding-top-10">
                        <a><Link to="/admin">
                            <div className="btn-menu" >
                                <i className="fas fa-home fa-menu">Trang chủ</i>
                            </div>
                            </Link>
                        </a >
                    </div>
                    */}
                        <div className={this.state.permission === '1' ? 'padding-top-10' : 'padding-top-10 class-hide'}>
                            <a><Link to="/quan-ly-lich-trinh">
                                <div className="btn-menu">
                                    <a><i className="fas fa-calendar-week fa-menu"></i>Quản lý lịch trình</a>
                                </div>
                            </Link>
                            </a>
                        </div>
                        <div className={this.state.permission === '1' ? 'padding-top-10' : 'padding-top-10 class-hide'} >
                            <a><Link to="/thong-ke-doanh-thu"> {/*/thong-ke-doanh-thu */}
                                <div className="btn-menu">
                                    <a><i className="fa fa-calculator fa-menu"></i>Thống kê</a>

                                </div>
                            </Link>
                            </a>
                        </div>
                        <div className={this.state.permission === '1' ? 'padding-top-10' : 'padding-top-10 class-hide'} >
                            <a><Link to="/thong-ke-theo-tuan-thang"> {/*/thong-ke-doanh-thu */}
                                <div className="btn-menu">
                                    <a><i className="fa fa-chart-bar fa-menu"></i>Chi tiết thống kê</a>

                                </div>
                            </Link>
                            </a>
                        </div>
                        <div className="padding-top-10" >
                            <a><Link to="/thong-tin-dat-ve"> {/*/thong-tin-dat-ve */}
                                <div className="btn-menu">
                                    <a><i className="fa fa-file fa-menu"></i>Thông tin vé đặt</a>
                                </div>
                            </Link>
                            </a>
                        </div>
                        <div className="padding-top-10" >
                            <a><Link to="/thong-tin-dat-ve-da-huy"> {/*/thong-tin-dat-ve */}
                                <div className="btn-menu">
                                    <a><i className="fa fa-ban fa-menu"></i>Thông tin vé đã hủy</a>
                                </div>
                            </Link>
                            </a>
                        </div>
                        <div className="padding-top-10" >
                            <a>
                                <div className="btn-menu" onClick={() => this.onClickLogOut()}>
                                    <a><i className="fas fa-angle-double-left fa-menu" ></i>Đăng xuất</a>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default MenuView;
