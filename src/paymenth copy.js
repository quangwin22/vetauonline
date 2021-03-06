import React, { Component } from 'react';
import Footer from './Shared/Footer';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import PaypalExpressBtn from 'react-paypal-express-checkout';

const PayPalButton = paypal.Buttons.driver("react",{React,ReactDOM});

class Paymenth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            username: '',
            password: '',
            money: "50000",
            isPay: "false"
            , Infor: []
            , totaamount: 0
            , Home: 'false'
            , customername: '',
            customerphone: '',
            customeremail: ''
            , sumticket: 0
            , subUser: []
            , name0: ''
            , name1: ''
            , name2: ''
            , name3: ''
            , name4: ''
            , cmnd0: ''
            , cmnd1: ''
            , cmnd2: ''
            , cmnd3: ''
            , cmnd4: ''
        }
    }
    
    createOrder(data,actions){

    }

    onApprove(data,actions){

    }
    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://localhost:9999/GetPaymenth',
            data: null
        }).then(res => {
            if (res.data.addToCard.length > 0) {
                this.setState({
                    Infor: res.data.addToCard
                    , sumticket: res.data.addToCard.length
                });
                res.data.addToCard.map((value, index) => {
                    this.setState({
                        totaamount: this.state.totaamount + Number(value.gia)
                    });
                });
            } else {
                this.setState({
                    Home: 'true'
                });
            }
        }).catch(err => {
        });

    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    onClickPayment() {
        if (this.state.customername === '') {
            alert("Vui l??ng nh???p h??? t??n ng?????i ?????t v??");
            return;
        }
        if (this.state.customerphone === '') {
            alert("Vui l??ng s??? ??i???n tho???i ng?????i ?????t v??");
            return;
        }
        if (this.state.customeremail === '') {
            alert("Vui l??ng email ng?????i ?????t v??");
            return;
        }
        var bookingInfo = {};
        bookingInfo.Customername = this.state.customername;
        bookingInfo.Customerphone = this.state.customerphone;
        bookingInfo.Customeremail = this.state.customeremail;
        bookingInfo.Totalamount = this.state.totaamount;
        bookingInfo.Sumticket = this.state.sumticket;
        bookingInfo.date = this.state.Infor[0].day;
        var infor = [];
        var mumb = 0;
        console.log(this.state.Infor);
        this.state.Infor.map((value, index) => {
            var vlName = '';
            var vlCmnd = '';
            if (mumb === 0) {
                vlName = this.state.name0;
                vlCmnd = this.state.cmnd0;
            }
            if (mumb === 1) {
                vlName = this.state.name1;
                vlCmnd = this.state.cmnd1;
            }
            if (mumb === 2) {
                vlName = this.state.name2;
                vlCmnd = this.state.cmnd2;
            }
            if (mumb === 3) {
                vlName = this.state.name3;
                vlCmnd = this.state.cmnd3;
            }
            if (mumb === 4) {
                vlName = this.state.name4;
                vlCmnd = this.state.cmnd4;
            }
            if (vlCmnd === '' || vlName === '') {
                alert("Th??ng tin h??nh kh??ch ch??a nh???p ?????y ????? vui l??ng ki???m tra l???i.");
                return;
            }
            var user = {};
            user.hoTen = vlName;
            user.cmnd = vlCmnd;
            user.maGhe = value.maghe;
            user.gaDi = value.gaForm;
            user.gaDen = value.gaTo;
            user.gioDi = value.gio;
            user.giaVe = value.gia;
            user.soghe = value.soghe;
            if (infor.length === 0) {
                infor = [user]
            } else if (infor.length === 1) {
                infor = [infor[0], user]
            } else if (infor.length === 2) {
                infor = [infor[0], infor[1], user]
            } else if (infor.length === 3) {
                infor = [infor[0], infor[1], infor[2], user]
            } else if (infor.length === 4) {
                infor = [infor[0], infor[1], infor[2], infor[3], user]
            }
            mumb++;
        });
        console.log(infor);
        axios.post('http://localhost:9999/Paymenth',
            { thongtindatve: bookingInfo, khachhang: infor })
            .then(res => {
                axios.post('http://localhost:8888/order/updateamount',
                    { id: this.state.totaamount })
                    .then(res => {
                        console.log(res.data);
                        window.location = "http://localhost:8888/order/create_payment_url";
                    });
            })
    }
    render() {
        if (this.state.Home === 'true') {
            return (<Redirect to='/' />)
        }
        var elmInfor = this.state.Infor.map((value, index) => {
            return (
                <tr key={index}>
                    <td className="et-table-cell dic-12">
                        <div className="input-group input-group-sm smsd">
                            <span className="input-group-addon text-left ng-binding ww84">H??? t??n</span>
                            <input type="text" name={"name" + index} placeholder="Th??ng tin h??nh kh??ch" onChange={this.onChange} className="form-control input-sm ng-pristine ng-invalid ng-invalid-required input-pay"
                                required="" />
                        </div>
                        <div className="input-group input-group-sm">
                            <span className="input-group-addon text-left ng-binding ww84">S??? gi???y t???</span>
                            <input type="text" name={"cmnd" + index} placeholder="S??? CMND/ H??? chi???u/ Ng??y th??ng n??m sinh tr??? em" onChange={this.onChange} maxLength="19" className="form-control input-sm ng-pristine ng-invalid ng-invalid-required input-pay" />
                        </div>
                    </td>
                    <td className="divs">
                        <div>
                            <div className="ng-binding">
                                {value.toaTau} {value.gaFormName}-{value.gaToName}
                            </div>
                            <div className="ng-binding">
                                {value.day} {value.gio}
                            </div>
                            <div className="ng-binding">
                                Toa {value.toa} ch??? {value.soghe}
                            </div>
                        </div>
                    </td>
                    <td className="et-table-cell text-right ng-binding mmda">
                        {value.gia}
                    </td>
                    <td className="et-table-cell text-right ng-binding mmda" >
                        {value.gia}
                    </td>
                    <td className="mmda vlt-ali">
                        {/* <a analytics-on="click" analytics-event="removeTicket" href="" className="et-btn-cancel" ng-click="removeTicket(ve)" ng-show="!ve.seat.waiting"></a> */}
                    </td>
                </tr>
            );
        });
        return (
            <div>
                <div className="container">
                    <div className="dayrunto text-center div1">Thanh to??n</div>
                    <div className="row form-group table-responsive list-ticket-deskhop margin-auto">
                        <table className="table table-bordered">
                            <thead className="et-table-header">
                                <tr>
                                    <th className="ng-binding mac-train">H??? t??n
                                    </th>
                                    <th className="ng-binding train-money-header">Th??ng tin ch???
                                    </th>
                                    <th className="ng-binding train-in-header">Gi?? v??
                                    </th>
                                    <th className="ng-binding train-money-header">Th??nh ti???n (VN??)
                                    </th>
                                    <th className="res-sdf"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {elmInfor}
                            </tbody>
                            <tfoot>
                                <tr className="info">
                                    <td colSpan="3">
                                        <span className="pull-right"><strong className="ng-binding">T???ng ti???n</strong></span>
                                    </td>
                                    <td className="text-right">
                                        <strong className="ng-binding">{this.state.totaamount}</strong>
                                    </td>
                                    <td>&nbsp;</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="et-register-block">
                        <h5 className="ng-binding">Th??ng tin ng?????i ?????t v??</h5>

                        <div className="row text-info ng-binding">

                            Qu?? kh??ch vui l??ng ??i???n ?????y ????? v?? ch??nh x??c c??c th??ng tin v??? ng?????i mua v?? d?????i ????y. C??c th??ng tin n??y s??? ???????c s??? d???ng ????? x??c minh ng?????i mua v?? v?? l???y v?? t???i ga tr?????c khi l??n t??u theo ????ng c??c quy ?????nh c???a T???ng c??ng ty ???????ng s???t Vi???t Nam.

                        </div>

                        <div className="form-horizontal et-col-md-12 form-group">
                            <div className="d-l2"></div>
                            <div className="row d-l1">
                                <div className="col-md-3">

                                </div>
                                <div className="col-md-4 mb-w-100">
                                    <input type="text" name="customername" value={this.state.customername} onChange={this.onChange} className="form-control input-sm ng-pristine ng-invalid ng-invalid-required" placeholder="H??? v?? t??n" required="" />
                                    <br />
                                    <input type="text" name="customerphone" value={this.state.customerphone} onChange={this.onChange} className="form-control input-sm ng-pristine ng-valid" placeholder="S??? di ?????ng" />
                                    <br />
                                    <input type="email" name="customeremail" value={this.state.customeremail} onChange={this.onChange} className="form-control input-sm ng-pristine ng-valid ng-valid-email" placeholder="Email" />
                                </div>
                                <div className="et-col-md-6 sdasda">
                                    <h5 className="ng-binding font-size20">CH???N H??NH TH???C THANH TO??N</h5>
                                    <div className="row">
                                    
                                        
                                                                                                   
                                        <div className="width100persent">
                                            <input type="radio" name="phuongThucThanhToan" value="1" cla    ssName="ng-pristine ng-valid" defaultChecked />
                                            <span className="et-align-top ng-binding">Thanh to??n online b???ng PayPal</span>
                                        </div>
                                        <div className="width100persent"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="sau-tin ">
                                {/* <button id="submit_btn" className="et-btn ng-binding"  className = "btn btn-primary width100persent" onClick = { ()=> this.onClickPayment() } >????ng k?? v??</button> */}
                                {/* <a id="submit_btn" className="et-btn ng-binding"  className = "btn btn-primary width100persent" href="http://localhost:8888/order/create_payment_url" >????ng k?? v??</a> */}
                                <button id="submit_btn" className="et-btn ng-binding" className="btn btn-primary width100persent" onClick={() => this.onClickPayment()} >????ng k?? v??</button>
                                <PayPalButton
                                    createOrder={(data,action)=>this.createOrder(data,action)}
                                    onApprove={(data,action)=> this.onApprove(data,action)}
                                ></PayPalButton>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
export default Paymenth;

