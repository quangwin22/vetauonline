import React, { Component } from 'react';
import Footer from './Shared/Footer';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import PayPal from './PayPal';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Header from './Shared/Header';

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
            , currency: 0
            , Home: 'false'
            , customername: '',
            customerphone: '',
            customeremail: '',
            MessBox: 'true'
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
    
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
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
                        totaamount: this.state.totaamount + Number(value.gia),
                        currency: parseInt((this.state.totaamount + Number(value.gia))/23300)
                        //parseInt((this.state.totaamount)/23300)
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
    }
    onSuccess() {
        if (this.state.customername !== '' && this.state.customerphone !== '' && this.state.customeremail !== '') 
            {         
                    var bookingInfo = {};
                    bookingInfo.Customername = this.state.customername;
                    bookingInfo.Customerphone = this.state.customerphone;
                    bookingInfo.Customeremail = this.state.customeremail;
                    bookingInfo.Totalamount = this.state.totaamount;
                    bookingInfo.Sumticket = this.state.sumticket;
                    bookingInfo.date = this.state.Infor[0].day;
                    var infor = [];
                    var mumb = 0;
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
                        user.ngayKhoiHanh = value.day;
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
                        axios.post('http://localhost:9999/Paymenth',
                        { thongtindatve: bookingInfo, khachhang: infor })
                        .then(res => {
                            this.setState({
                                 payments: 'succes'
                            })
                            alert("??a?? ????ng ky?? ve?? tha??nh c??ng");     
                        })                       
            }  
            else {
                alert("Th??ng tin ng?????i ?????t ch??a nh???p ?????y ????? vui l??ng ki???m tra l???i.");
                return;   
            } 
        }
                
    render() {
        if (this.state.payments === 'succes') {
            return (<Redirect to="/" />)
        }
        if (this.state.Home === 'true') {
            return (<Redirect to='/' />)
        }
        var elmInfor = this.state.Infor.map((value, index) => {
            return (
                <tr key={index}>
                    <td className="et-table-cell dic-12 rad">
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
                    <td className="divs rad">
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
                    <td className="et-table-cell text-right ng-binding mmda rad">
                        {value.gia}
                    </td>
                    <td className="et-table-cell text-right ng-binding mmda rad" >
                        {value.gia}
                    </td>
                    
                </tr>
            );
        });
        
        
        return (
            
            <div>
                <Header />
                <div className="hh"></div>
                <div id="bg">
                    <div className="container" >
                        <div className="dayrunto text-center div1">Thanh to??n</div>
                        <div className="row form-group table-responsive list-ticket-deskhop margin-auto">
                            <table className="table table-bordered">
                                <thead className="et-table-header">
                                    <tr>
                                        <th className="ng-binding mac-train rad">H??? t??n
                                    </th>
                                        <th className="ng-binding train-money-header rad">Th??ng tin ch???
                                    </th>
                                        <th className="ng-binding train-in-header rad">Gi?? v??
                                    </th>
                                        <th className="ng-binding train-money-header rad">Th??nh ti???n (VN??)
                                    </th>
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
                                            <strong className="ng-binding">{this.state.totaamount}??</strong>
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
                                                {/*<input type="radio" name="phuongThucThanhToan" value="1" cla ssName="ng-pristine ng-valid" defaultChecked />*/}
                                                <span className="et-align-top ng-binding">Thanh to??n online b???ng PayPal</span>
                                                <PayPal
                                        total={this.state.currency}
                                        onError={this.onError}
                                        onSuccess={() => this.onSuccess()}
                                        onCancel={this.onCancel}
                                    />
                                            </div>
                                            <div className="width100persent"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="sau-tin ">
                               {/* <button id="submit_btn" className="et-btn ng-binding"  className = "btn btn-primary width100persent" onClick = { ()=> this.onClickPayment() } >????ng k?? v??</button>*/} 
                                    {/* <a id="submit_btn" className="et-btn ng-binding"  className = "btn btn-primary width100persent" href="http://localhost:8888/order/create_payment_url" >????ng k?? v??</a> */}
                                    {/*<button id="submit_btn" className="et-btn ng-binding" className="btn btn-primary width100persent" onClick={() => this.onClickPayment()} >????ng k?? v??</button>*/}
                                    <span>.</span>
                               
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
                <div className={this.state.MessBox === "false" ? "BoxTT" : 'class-hide'}>
                    <div className="BoxTT">
                        Thanh toa??n tha??nh c??ng
                
                    <div id="success-box">
                        <div class="dot"></div>
                        <div class="dot two"></div>
                        <div class="face">
                            <div class="eye"></div>
                            <div class="eye right"></div>
                            <div class="mouth happy"></div>
                        </div>
                        <div class="shadow scale"></div>
                        <div class="message"><h1 class="alert">Success!</h1><p>yay, everything is working.</p></div>
                        <Link to="/"><button type="submit" class="btn btn-primary btn-block btn-large btnback" id="login">QUAY LA??I TRANG CHU??</button></Link>
                        <button class="button-box"><h1 class="green">continue</h1></button>
                        


                    </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Paymenth;

