import Header from './Shared/Header';
import Footer from './Shared/Footer';
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Banner from './Shared/Banner';
import { max } from 'moment';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thestation: [],
            isReturnHome: 'false',
            stationstart: '',
            stationend: '',
            dateform: '',
            dateto: '',
            startSchedule: '',
            ghedadat:[],  
            gaDen:[],
            gaDi:[],
            Maxstation:'',
            Minstation:'',
            stoaTau: [],
            card: [],
            selectToa: '',
            nameToa: ''
            , txtTooltip: ''
            , ghe: []
            , infosearch: []
            , tickets: []
            , ticketss: []
            , ticketsss: []
            , goToPaymenth: 'false'
            , addghe: 'true'
            , khoanCach: ''
            , ticketss: []
            , lstDatamap2: []
            , lstDatamap1: []
            , lstData1: []
            , lstData2: []
        }
    }

    componentDidMount() { 
        
        axios.post('http://localhost:9999/get-all-thong-tin-dat-ve',
            { mave: this.state.mave, nameuser: this.state.username, email: this.state.email, sdt: this.state.sdt })
            .then(res => {
                this.setState({             
                     lstDatamap1: res.data.res.filter(x => x.trangThai !== "Hủy").map(x => x.maDat)          
                });
                console.log("thong tin dat chua huy",this.state.lstDatamap1)
            });
       
        axios({
            method: 'GET',
            url: 'http://localhost:9999/SearchThesShedule',
            
            data: null
        }).then(res =>  {
            if (res.data.schedulealv.length > 0) {
                this.setState({
                    thestation: res.data.schedulealv,
                    startSchedule: res.data.schedulealv[0].toaTau,
                    infosearch: res.data.objSearch,
                });      
                if (Number(res.data.objSearch.gaForm) > Number(res.data.objSearch.gaTo)) {
                    this.setState({
                        khoanCach: Number(res.data.objSearch.khoanCachFrom) - Number(res.data.objSearch.khoanCachTo)
                    })
                } else {
                    this.setState({
                        khoanCach: Number(res.data.objSearch.khoanCachTo) - Number(res.data.objSearch.khoanCachFrom)
                    })
                }
                this.onLoadTheTrain(res.data.schedulealv[0].toaTau);
            } else {
                alert("Không tìm thấy lịch trình")
                this.setState({
                    isReturnHome: 'true'
                })
            }
        }).catch(err => {
            console.log(err);
        });
        
        axios({
            method: 'GET',
            url: 'http://localhost:9999/SearchTicket',
            timeout: 2000,
            data: null
        }).then(res => {
                this.setState({
                    tickets: res.data.sticket,
                    ticketss: res.data.sticket.map(item=>item.maGhe),
                    ticketsss: res.data.sticket.filter(x => this.state.lstDatamap1.includes(x.maDat))
                });
                console.log("ma tat ca ve",this.state.tickets)
                console.log("ma tat ca ghe",this.state.ticketss)
                console.log("ma tat ca ve chua huy",this.state.ticketsss)      
        }).catch(err => {
            console.log(err);
        });
        } 

    onLoadTheTrain(ma) {
        axios.post('http://localhost:9999/Get-Tau',
            { maTau: ma })
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        stoaTau: res.data,
                        startSchedule: ma
                        , selectToa: res.data[0].maToa
                    });
                    this.onSelectToa(res.data[0].maToa);
                } else {
                    this.setState({
                        stoaTau: res.data,
                        startSchedule: ma,
                        selectToa: "0"
                    });
                }
            })
    }
    


    onSelectToa(maToa) {
        this.setState({
            selectToa: maToa   
        });
        axios.post('http://localhost:9999/ghe',
            { maToa: maToa })
            .then(res => {               
                this.setState({
                    ghe: res.data.res,      
                    nameToa: this.state.stoaTau.filter(item => item.maToa === this.state.selectToa)[0].tenToa,
                });
            
            });

    }

    oncClickGhe(maghe, soghe, gia) {
        var tauselected = this.state.thestation.filter(item => item.toaTau === this.state.startSchedule);
        var addcard = {};
        addcard.toaTau = this.state.startSchedule;
        addcard.day = this.state.infosearch.dateFrom;
        addcard.gio = tauselected[0].gioKhoiHanh;
        addcard.toa = this.state.selectToa;
        addcard.maghe = maghe;
        addcard.soghe = soghe;
        addcard.gia = Number(gia) * Number(this.state.khoanCach) / 1000 > 50000 ? Number(gia) * Number(this.state.khoanCach) / 1000 : 50000;
        addcard.gaTo = this.state.infosearch.gaTo;
        addcard.gaForm = this.state.infosearch.gaForm;
        addcard.gaFormName = this.state.infosearch.gaFormName;
        addcard.gaToName = this.state.infosearch.gaToName;
        addcard.loaiVe = this.state.infosearch.away === "1" ? "Vé 1 chiều" : "Vé khứ hồi";
        addcard.LoaiToa = this.state.stoaTau.filter(item => item.maToa === this.state.selectToa)[0].tenToa;

        if (this.state.card.length === 0) {
            this.setState({
                card: [addcard]
            });

        } else if (this.state.card.length === 1) {
            if (!(this.state.card.some(item => item.maghe === maghe && item.soghe === soghe))) {
                var next = this.state.card
                this.setState({
                    card: [next[0], addcard]
                });
            }

        } else if (this.state.card.length === 2) {
            if (!(this.state.card.some(item => item.maghe === maghe && item.soghe === soghe))) {
                var next9 = this.state.card
                this.setState({
                    card: [next9[0], next9[1], addcard]
                });
            }

        } else if (this.state.card.length === 3) {
            if (!(this.state.card.some(item => item.maghe === maghe && item.soghe === soghe))) {
                var next8 = this.state.card
                this.setState({
                    card: [next8[0], next8[1], next8[2], addcard]
                });
            }
        } else if (this.state.card.length === 4) {
            if (!(this.state.card.some(item => item.maghe === maghe && item.soghe === soghe))) {
                var next7 = this.state.card
                this.setState({
                    card: [next7[0], next7[1], next7[2], next7[3], addcard]
                });
            }

        } else if (this.state.card.length === 5) {
            if (!(this.state.card.some(item => item.maghe === maghe && item.soghe === soghe))) {
                var next6 = this.state.card
                this.setState({
                    card: [next6[0], next6[1], next6[2], next6[3], next6[4], addcard]
                });
            }

        } else if (this.state.card.length === 6) {
            if (!(this.state.card.some(item => item.maghe === maghe && item.soghe === soghe))) {
                var next5 = this.state.card
                this.setState({
                    card: [next5[0], next5[1], next5[2], next5[3], next5[4], next5[5], addcard]
                });
            }

        } else if (this.state.card.length === 7) {
            if (!(this.state.card.some(item => item.maghe === maghe && item.soghe === soghe))) {
                var next4 = this.state.card
                this.setState({
                    card: [next4[0], next4[1], next4[2], next4[3], next4[4], next4[5], next4[6], addcard]
                });
            }
        } else if (this.state.card.length === 8) {
            if (!(this.state.card.some(item => item.maghe === maghe && item.soghe === soghe))) {
                var next3 = this.state.card
                this.setState({
                    card: [next3[0], next3[1], next3[2], next3[3], next3[4], next3[5], next3[6], next3[7], addcard]
                });
            }
        } else if (this.state.card.length === 9) {
            if (!(this.state.card.some(item => item.maghe === maghe && item.soghe === soghe))) {
                var next2 = this.state.card
                this.setState({
                    card: [next2[0], next2[1], next2[2], next2[3], next2[4], next2[5], next2[6], next2[7], next2[8], addcard]
                });
            }
        } else if (this.state.card.length === 10) {
            if (!(this.state.card.some(item => item.maghe === maghe && item.soghe === soghe))) {
                var next1 = this.state.card
                this.setState({
                    card: [next1[0], next1[1], next1[2], next1[3], next1[4], next1[5], next1[6], next1[7], next1[8], next1[9], addcard]
                });
            }

        }
    }

    onClickAddToCard() {
        axios.post('http://localhost:9999/AddToCard',
            { card: this.state.card })
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        goToPaymenth: "true"
                    });
                }
            })
    }

    oncClickDeleteGhe(maghe, soghe) {
        console.log(maghe, soghe);
        var itemls = this.state.card;
        console.log(itemls);
        this.setState({
            card: itemls.filter(item => item.soghe !== soghe)
        })
    }
    getIndex(value, arr, prop) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    }
    render() {
        
        if (this.state.isReturnHome === 'true') {
            return (<Redirect to="/" />)
        }
        if (this.state.goToPaymenth === 'true') {
            return (<Redirect to="/thanh-toan" />)
        }
        const tooltipStyle = {
            display: this.state.hover ? 'block' : 'none'
        };

        var elmstationstatrt = this.state.thestation.map((xvalue, index) => {
            var backgr = this.state.startSchedule === xvalue.toaTau ? 'et-train-head backgroud-train-toa' : 'et-train-head';
            return (
                <div key={index} className="col-xs-4 col-sm-3 et-col-md-2 et-train-block" onClick={() => this.onLoadTheTrain(xvalue.toaTau)}>
                    <div className={backgr}>
                        <div className="row center-block train-se-lam-w">
                            <div className="et-train-lamp text-center">{xvalue.toaTau.substring(0, 3)}</div>
                        </div>
                        <div className="et-train-head-info">
                            <div className="row et-no-margin"><span className="pull-left et-bold widhth30-text-start">Ngày
                                            đi</span> <span className="pull-right width70-text-end">{this.state.infosearch.dateFrom}</span></div>
                            {/* <div className="row et-no-margin"><span className="pull-left et-bold widhth30-text-start">TG
                                            đến</span><span className="pull-right width70-text-end">21/11
                                            05:30</span></div> */}
                            {/* <div className="row et-no-margin">
                                        <div className="et-col-50">
                                            <div className="et-text-sm ">SL chỗ đặt</div>
                                            <div className="et-text-large et-bold pull-left margin-left-5px">0</div>
                                        </div>
                                        <div className="et-col-50 text-center">
                                            <div className="et-text-sm ">SL chỗ trống</div>
                                            <div className="et-text-large et-bold pull-right margin-right-5px" >184</div>
                                        </div>
                                    </div> */}
                        </div>
                        <div className="row et-no-margin">
                            <div className="et-col-50"><span className="et-train-lamp-bellow-left"></span></div>
                            <div className="et-col-50"><span className="et-train-lamp-bellow-right"></span></div>
                        </div>
                    </div>
                    <div className="et-train-base"></div>
                    <div className="et-train-base-2"></div>
                    <div className="et-train-base-3"></div>
                    <div className="et-train-base-4"></div>
                    <div className="et-train-base-5"></div>
                </div>
            )
        });
        var emlToa = this.state.stoaTau.map((xvalue, index) => {
            return (
                <div key={index} className="et-car-block ng-scope">
                    <div key={index} className="et-car-block" onClick={() => this.onSelectToa(xvalue.maToa)} >

                        <div className={this.state.selectToa === xvalue.maToa ? "et-car-icon et-car-icon-selected" : "et-car-icon et-car-icon et-car-icon-avaiable"}><img src="images/trainCar2.png" alt='Hinh' /></div>
                        <div className="text-center text-info et-car-label ng-binding">{index + 1}</div>
                    </div>
                </div>
            )
        }
        );

        var emltentoa = this.state.stoaTau.map((xvalue,index)=>{
            return (
                <div key={index} onClick={() => this.onSelectToa(xvalue.maToa)}>
                    {xvalue.tenToa}
                </div>
            )
        }
        );
        var emlghe = this.state.ghe.map((value, index) => {                
             if (this.state.ticketsss.map(item=>item.maGhe).includes(value.maGhe)) 
             {
                return (
                    <div key={index} className="et-car-nm-64-sit ng-isolate-scope">
                        <div className="et-car-seat-right et-seat-h-35">
                            <div className="et-col-16 et-sit-side"></div>
                            <div className="et-col-84 et-sit-sur-outer">
                                <div id=""
                                    className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                    <div className="et-sit-no ng-scope et-sit-bought"><span className="">{value.soGhe}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            else{
                return (
                    <div key={index} className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.oncClickGhe(value.maGhe, value.soGhe, value.giaGhe)}>
                        <div className="et-car-seat-right et-seat-h-35">
                            <div className="et-col-16 et-sit-side"></div>
                            <div className="et-col-84 et-sit-sur-outer">
                                <div id=""
                                    className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                    <div className={this.state.card.some(item => item.maghe === value.maGhe && item.soghe === value.soGhe) ? "et-sit-no ng-scope et-car-icon-selected" : "et-sit-no ng-scope"}><span className="">{value.soGhe}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            };
        });

        var elmcard = this.state.card.map((value, index) => {
            return (
                <div key={index} className="padding-10 d-fix">
                    <div className="width95percent">
                        <div className="text-center">{value.toaTau.substring(0, 3)} đi từ {this.state.infosearch.gaFormName} đến {this.state.infosearch.gaToName}</div>
                        <div>Ngày: {value.day} </div>
                        <div>Toa: {value.toa} </div>
                        <div>Chỗ: {value.soghe}</div>
                        <div>Giá: {value.gia}đ</div>
                        <div>Loại vé: {value.loaiVe}</div>
                        <div>Loại toa: {value.LoaiToa}</div>
                        <br></br>
                    </div>
                    <div className="align-self-center border-0px" onClick={() => this.oncClickDeleteGhe(value.maghe, value.soghe)}>
                        <img className="title-quydinh" src="images/del30.png" alt="Delete" />
                    </div>
                </div>
            );
        });
        return (
            
            <div>
                
                <Header />
                <div className="width100persent height-120px" >

                </div>
                <div className="container d-fix">
                    <div className="col-left-70">
                        <div className="dayrunto">Ngày {this.state.infosearch.dateFrom} từ {this.state.infosearch.gaFormName} đến {this.state.infosearch.gaToName} {this.state.Minstation}
                           </div>
                        <div className="margin10 backgroud-white">
                            
                            {elmstationstatrt}
                        </div>
                        <div className="col-md-12 et-no-margin text-center">
                            <div className="hover-tooltip" style={tooltipStyle}>{this.state.txtTooltip}</div>
                            {emlToa}
                            <div className="et-car-block ng-scope" tooltip="">
                                <div className="et-car-block">
                                    <div className="et-car-icon"><img src="images/train2.png" alt='Hinh' /></div>
                                    <div className="text-center text-info et-car-label ng-binding">{this.state.startSchedule.substring(0, 3)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="containerTenToa">
                         <div>Toa: {this.state.nameToa}</div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <div className="row et-car-floor row-left-right-3px">
                                        <div className="et-full-width">
                                            <div className="et-car-nm-64-half-block">
                                                {emlghe}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="et-legend mt-3">
                                <div className="width50persent1">

                                    <div className="d-fix">
                                        <div className="et-car-nm-64-sit">
                                            <div className="et-col-16 et-sit-side"></div>
                                            <div className="et-col-64 et-sit-sur-outer">
                                                <div className="et-sit-sur text-center et-sit-bought"></div>
                                            </div>
                                        </div>
                                        <div className="et-bed-left et-no-padding width11persent">
                                            <div className="et-bed-outer">
                                                <div className="et-bed text-center et-sit-bought"></div>
                                                <div className="et-bed-illu"></div>
                                            </div>
                                        </div>
                                        <div className="et-legend-label ng-binding">Chỗ đã bán, không bán</div>
                                    </div>
                                    <div className="d-fix">
                                        <div className="et-car-nm-64-sit">
                                            <div className="et-col-16 et-sit-side"></div>
                                            <div className="et-col-64 et-sit-sur-outer">
                                                <div className="et-sit-sur text-center et-car-icon-selected"></div>
                                            </div>
                                        </div>
                                        <div className="et-bed-left et-no-padding width11persent">
                                            <div className="et-bed-outer">
                                                <div className="et-bed text-center et-car-icon-selected"></div>
                                                <div className="et-bed-illu"></div>
                                            </div>
                                        </div>
                                        <div className="et-legend-label ng-binding">Chỗ đang chọn</div>
                                    </div>
                                    <div className="d-fix">
                                        <div className="et-car-nm-64-sit">
                                            <div className="et-col-16 et-sit-side"></div>
                                            <div className="et-col-64 et-sit-sur-outer">
                                                <div className="et-sit-sur text-center  "></div>
                                            </div>
                                        </div>
                                        <div className="et-bed-left et-no-padding width11persent">
                                            <div className="et-bed-outer">
                                                <div className="et-bed text-center"></div>
                                                <div className="et-bed-illu"></div>
                                            </div>
                                        </div>
                                        <div className="et-legend-label ng-binding">Chỗ trống</div>
                                    </div>

                                </div>
                                <div className="width50persent1">
                                    <div className="d-fix">
                                        <div className="et-car-block ng-scope fleft">
                                            <div className="et-car-block">
                                                <div className="et-car-icon et-car-icon-selected"><img src="images/trainCar2.png" alt='Hinh' /></div>
                                            </div>
                                        </div>
                                        <div className="et-legend-label ng-binding fleft">Toa đang chọn</div>
                                    </div>
                                    <div className="d-fix">
                                        <div className="et-car-block ng-scope fleft">
                                            <div className="et-car-block">
                                                <div className="et-car-icon et-car-icon-avaiable"><img src="images/trainCar2.png" alt='Hinh' /></div>
                                            </div>
                                        </div>
                                        <div className="et-legend-label ng-binding fleft">Toa còn trống</div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    <div className="col-right-30">
                        <div className="carditem border-card">
                            <div className="cover-txt-cart"><i className="fas fa-bars"></i> Giỏ vé</div>
                            <div>
                                {elmcard}
                                <hr />
                                <div>
                                    <div className="btn-buy-ticket" onClick={() => this.onClickAddToCard()} >MUA VÉ</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
export default Detail;
