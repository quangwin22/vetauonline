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
            alert("Vui l??ng ch???n ga ??i.")
            return;
        }
        if (this.state.stationend === 0 || this.state.stationend === '') {
            alert("Vui l??ng ch???n ga ?????n.")
            return;
        }
        if (this.state.stationstart === this.state.stationend) {
            alert("N??i ??i kh??ng ???????c tr??ng v???i n??i ?????n.")
            return;
        }
        if (this.state.sdateFrom === '') {
            alert("Vui l??ng ch???n ng??y ??i.")
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
                                <h1 class="text-grey">?????t Mua V?? T??u H???a</h1>
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
                                                        Khuy???n c??o ng?????i d??n n??n mua v?? t???i website ch??nh th???c c???a ng??nh ???????ng s???t VeTauOnline2021 ????? tr??nh mua nh???m v?? gi???, v?? kh??ng ????ng gi??
                                                 </span>
                                                </li>
                                                <li>M???i th??ng tin th???c m???c qu?? kh??ch h??y li??n v??? tr???c ti???p Hotline: 0797867387</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="row1">
                                    <div className="cover-contain-search-banner">
                                        <div className="form-group align-self-center with20percent">
                                            <label class="control-label">T???</label>
                                            <select className="form-control select-style-sarch" onChange={this.onChangeStart} value={this.state.stationstart}>
                                                <option className="option-bg"value="0">Ch???n ga ??i</option>
                                                {elmstationstatrt}
                                            </select>
                                        </div>
                                        <div className="form-group align-self-center with20percent" onChange={this.onChangeEnd} value={this.state.stationend}>
                                            <label class="control-label">T???i</label>
                                            <select className="form-control select-style-sarch">
                                                <option value="0">Ch???n ga ?????n</option>
                                                {elmstationstatrt}
                                            </select>
                                        </div>
                                        <div className="form-group align-self-center with10percent">
                                            <label class="control-label">Lo???i v??</label>
                                            <select className="form-control select-style-sarch" onChange={this.onChangeAWay} >
                                                {/* <option value='0'>Lo???i v??</option> */}
                                                <option value='1'>V?? 1 chi???u</option>
                                                <option value='2'>V?? kh??? h???i</option>
                                            </select>
                                        </div>
                                        <div className="form-group align-self-center with15percent">
                                            <label class="control-label">Ng??y kh???i h??nh</label>
                                            <DatePicker className="form-control select-style-sarch"
                                                placeholderText="Ng??y ??i"
                                                onChange={this.handleChangedateF}
                                                value={this.state.sdateFrom}
                                                minDate={new Date()}
                                            />
                                        </div>
                                        <div className="form-group align-self-center with15percent" >
                                            <label class="control-label">Ng??y v???</label>
                                            <div className={this.state.oneway === 'true' ? '' : 'class-hide'}>
                                                <DatePicker className="form-control select-style-sarch" disabled
                                                    placeholderText="Ng??y v???"
                                                />
                                            </div>
                                            <div className={this.state.oneway === 'true' ? 'class-hide' : ''}>
                                                <DatePicker className="form-control select-style-sarch"
                                                    onChange={this.handleChangedateT}
                                                    placeholderText="Ng??y v???"
                                                    value={this.state.sdateFrom} value={this.state.sdateTo}
                                                    minDate={new Date()}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group align-self-center with20percent form-Tim">
                                            <button id="search" className="form-control1 btn-Tim" onClick={() => this.onClickSearch()}>T??m ki???m</button>
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
