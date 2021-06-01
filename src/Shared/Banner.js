import Carousel from 'react-bootstrap/Carousel'
import DatePicker from "react-datepicker";
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stationstart: '',
            stationend: '',
            typesticket: '',
            datafrom: [],
            dateto: false,
            thestation: [],
            oneway: 'true',
            sdateFrom: '',
            sdateTo: '',
            sAway: '',
            isSearch: 'false'
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://localhost:9999/ListTheStation',
            data: null
        }).then(res => {
            this.setState({
                thestation: res.data
            })
        }).catch(err => {
            console.log(err);
        });
    }
    // const history = useHistory();

    onChangeStart = (event) => {
        var target = event.target;
        var value = target.value;
        this.setState({
            stationstart: value
        });

    }

    onChangeEnd = (event) => {
        var target = event.target;
        var value = target.value;
        this.setState({
            stationend: value
        });

    }

    onChangeAWay = (event) => {
        var target = event.target;
        var value = target.value;
        var isaway = 'true';
        if (value === '2') {
            isaway = 'false'
        }
        this.setState({
            oneway: isaway,
            sAway: value
        });
    }

    handleChangedateF = date => {
        const yourDate = new Date(date)
        var cdate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(yourDate);
        this.setState({
            sdateFrom: cdate
        });
    }

    handleChangedateT = date => {
        const yourDate = new Date(date)
        var cdate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(yourDate);
        this.setState({
            sdateTo: cdate
        });
    }

    onClickSearch() {
        if (this.state.stationstart === 0 || this.state.stationstart === '') {
            alert("Vui lòng chọn ga đi.")
            return;
        }
        if (this.state.stationend === 0 || this.state.stationend === '') {
            alert("Vui lòng chọn ga đến.")
            return;
        }
        if (this.state.stationstart === this.state.stationend) {
            alert("Nơi đi không được trùng với nơi đến.")
            return;
        }
        if (this.state.sdateFrom === '') {
            alert("Vui lòng chọn ngày đi.")
            return;
        }
        axios.post('http://localhost:9999/SetValueSearch',
            {
                gaForm: this.state.stationstart,
                gaTo: this.state.stationend,
                dateFrom: this.state.sdateFrom,
                dateTo: this.state.sdateTo,
                away: this.state.sAway === '' ? "1" : this.state.sAway
            })
            .then(res => {
                this.setState({
                    isSearch: 'true'
                });
            })
    }

    render() {
        if (this.state.isSearch === 'true') {
            return (<Redirect to="/chi-tiet" />)
        }
        var elmstationstatrt = this.state.thestation.map((xvalue, index) => {
            return (<option classname="option-bg" key={index} value={xvalue.maGa} >{xvalue.tenGa}</option>)
        });
        return (
            <div>
                <div className="sub-bg sub-bg-train">
                    <div className="container1">
                        <div className="row">
                            <div class="col-sm-12">
                                <h1 class="text-grey">Đặt Mua Vé Tàu Hỏa</h1>
                            </div>
                        </div>
                        <div className="search-wrap">
                            <div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="notice-info">
                                            <ul>
                                                <li>
                                                    <span class="text-red">
                                                        Khuyến cáo người dân nên mua vé tại website chính thức của ngành đường sắt VeTauOnline2021 để tránh mua nhầm vé giả, vé không đúng giá
                                                 </span>
                                                </li>
                                                <li>Mọi thông tin thắc mắc quý khách hãy liên vệ trực tiếp Hotline: 0797867387</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="row1">
                                    <div className="cover-contain-search-banner">
                                        <div className="form-group align-self-center with20percent">
                                            <label class="control-label">Từ</label>
                                            <select className="form-control select-style-sarch" onChange={this.onChangeStart} value={this.state.stationstart}>
                                                <option className="option-bg"value="0">Chọn ga đi</option>
                                                {elmstationstatrt}
                                            </select>
                                        </div>
                                        <div className="form-group align-self-center with20percent" onChange={this.onChangeEnd} value={this.state.stationend}>
                                            <label class="control-label">Tới</label>
                                            <select className="form-control select-style-sarch">
                                                <option value="0">Chọn ga đến</option>
                                                {elmstationstatrt}
                                            </select>
                                        </div>
                                        <div className="form-group align-self-center with10percent">
                                            <label class="control-label">Loại vé</label>
                                            <select className="form-control select-style-sarch" onChange={this.onChangeAWay} >
                                                {/* <option value='0'>Loại vé</option> */}
                                                <option value='1'>Vé 1 chiều</option>
                                                <option value='2'>Vé khứ hồi</option>
                                            </select>
                                        </div>
                                        <div className="form-group align-self-center with15percent">
                                            <label class="control-label">Ngày khởi hành</label>
                                            <DatePicker className="form-control select-style-sarch"
                                                placeholderText="Ngày đi"
                                                onChange={this.handleChangedateF}
                                                value={this.state.sdateFrom}
                                                minDate={new Date()}
                                            />
                                        </div>
                                        <div className="form-group align-self-center with15percent" >
                                            <label class="control-label">Ngày về</label>
                                            <div className={this.state.oneway === 'true' ? '' : 'class-hide'}>
                                                <DatePicker className="form-control select-style-sarch" disabled
                                                    placeholderText="Ngày về"
                                                />
                                            </div>
                                            <div className={this.state.oneway === 'true' ? 'class-hide' : ''}>
                                                <DatePicker className="form-control select-style-sarch"
                                                    onChange={this.handleChangedateT}
                                                    placeholderText="Ngày về"
                                                    value={this.state.sdateFrom} value={this.state.sdateTo}
                                                    minDate={new Date()}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group align-self-center with20percent form-Tim">
                                            <button id="search" className="form-control1 btn-Tim" onClick={() => this.onClickSearch()}>Tìm kiếm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="banner-line"></div>
                <div className="banner-line1"></div>
            </div>
        );
    }
}

export default Banner;
