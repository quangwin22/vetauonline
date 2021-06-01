import React, { Component } from 'react';
// import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import Menuview from './menu'
import UserView from './User'
import axios from 'axios';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { ComponentToPrint } from './ToPDF';

//totaamount lấy của tất cả vé nên sẽ là tổng tền toàn bộ vé 

class TicketView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stageUrrl: 'Thông tin vé đặt',
            lstData: []
            , mave: ''
            , username: ''
            , email: ''
            , sdt: ''
            , valuedetail: []
            , maDatv: ''
            , statusdetail: ''
            , infove: ''
            , ga: ''
            , tongTienVe: ''
            , infoghe: ''
        }
    }

    //  ketnoi = () => {
    //    this.setState({
    //        valuedetail: this.state.valuedetail     
    //        , ga: this.state.ga
    //    });
    // }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }
    componentDidMount = (event) => {
        axios.post('http://localhost:9999/tim-thong-tim-ve',
            { mave: this.state.mave, nameuser: this.state.username, email: this.state.email, sdt: this.state.sdt })
            .then(res => {
                this.setState({
                    lstData: res.data.res.filter(x => x.trangThai !== "Hủy").sort((a,b) => new Date(a) < new Date(b) ? 1 : -1)
                });
            });
        axios.post('http://localhost:9999/get-all-ghe')
            .then(res => {
                this.setState({
                    infoghe: res.data.res
                    
                });
                console.log(this.state.infoghe)
            });
        axios.post('http://localhost:9999/get-all-ve',
            { mave: this.state.mave, nameuser: this.state.username, email: this.state.email, sdt: this.state.sdt })
            .then(res => {
                this.setState({
                    infove: res.data.res
                    , totaamount: res.data.res.reduce((a, b) => a + b.giaVe, 0)
                });
            })
        axios({
            method: 'GET',
            url: 'http://localhost:9999/ListTheStation',
            data: null
        }).then(res => {
            this.setState({
                ga: res.data
            })
        }).catch(err => {
            console.log(err);
        });
    }
    
    onClickSearch = (event) => {
        axios.post('http://localhost:9999/tim-thong-tim-ve',
            { mave: this.state.mave, nameuser: this.state.username, email: this.state.email, sdt: this.state.sdt })
            .then(res => {
                this.setState({
                    lstData: res.data.res.filter(x => x.trangThai !== "Hủy").sort((a,b) => new Date(a) < new Date(b) ? 1 : -1)
                });
            });
        axios.post('http://localhost:9999/get-all-ghe')
            .then(res => {
                this.setState({
                    infoghe: res.data.res
                    
                });
                console.log(this.state.infoghe)
            });
        axios.post('http://localhost:9999/get-all-ve',
            { mave: this.state.mave, nameuser: this.state.username, email: this.state.email, sdt: this.state.sdt })
            .then(res => {
                this.setState({
                    infove: res.data.res
                    , totaamount: res.data.res.reduce((a, b) => a + b.giaVe, 0)
                });
            })
        axios({
            method: 'GET',
            url: 'http://localhost:9999/ListTheStation',
            data: null
        }).then(res => {
            this.setState({
                ga: res.data
            })
        }).catch(err => {
            console.log(err);
        });
    }


    onClickUpdateVe = (envet) => {
        if (window.confirm("Bạn có chắc muốn hủy vé ? Lệ phí sẽ là 10% giá vé!")) {
            axios.post('http://localhost:9999/upd-status-ve',
                { maDat: this.state.maDatv, trangThai: envet})
                .then(res => {
                    alert("Hủy vé thành công");
                    this.setState({
                        valuedetail: []
                    });
                    this.onClickSearch();
                })
        }
        else {
            // Do nothing!
        }
    }

    onclickDetail(detail) {

        axios.post('http://localhost:9999/ds-kh',
            { maDat: detail.maDat })
            .then(res => {
                this.setState({
                    valuedetail: res.data.res
                    , maDatv: detail.maDat
                    , statusdetail: detail.trangThai
                    , tongTienVe: this.state.lstData.filter(item => item.maDat === detail.maDat)[0].tongTien,
                    
                });
                console.log(this.state.valuedetail)
            })

    }

    onClickBackView = (event) => {
        this.setState({
            valuedetail: []
        });
    }
    render() {
        var emldetail = this.state.valuedetail.map((value, index) => {
            return (
                <tr key={index}>
                    <td className="et-table-cell dic-12 rad">
                        <div className="input-group input-group-sm smsd">
                            <span className="input-group-addon text-left ng-binding ">Mã khách hàng</span>
                            <span className="input-group-addon text-left ng-binding ">{value.maKh}</span>
                        </div>
                        <div className="input-group input-group-sm smsd">
                            <span className="input-group-addon text-left ng-binding ">Họ tên</span>
                            <span className="input-group-addon text-left ng-binding ">{value.hoTen}</span>
                        </div>
                        <div className="input-group input-group-sm">
                            <span className="input-group-addon text-left ng-binding ">Số giấy tờ</span>
                            <span className="input-group-addon text-left ng-binding ">{value.CMND}</span>
                        </div>
                    </td>
                    <td className="divs rad">
                        <div>
                            <div className="ng-binding">
                                {this.state.ga.filter(y => y.maGa === this.state.infove.filter(x => x.makh === value.maKh)[0].gaDi)[0].tenGa} - {this.state.ga.filter(y => y.maGa === this.state.infove.filter(x => x.makh === value.maKh)[0].gaDen)[0].tenGa}
                            </div>
                            <div className="ng-binding">
                                {this.state.infove.filter(x => x.makh === value.maKh)[0].gioDi}
                            </div>
                            <div className="ng-binding">
                                Mã ghế:  {this.state.infove.filter(x => x.makh === value.maKh)[0].maGhe}
                            </div>
                        </div>
                    </td>
                    <td className="et-table-cell text-right ng-binding mmda rad" >
                        {this.state.infove.filter(x => x.makh === value.maKh)[0].giaVe}
                    </td>

                    {/*<td className=" rad ">
                        <div className="align-self-center border-0px" onClick={() => this.onClickUpdateVe("Hủy")}>
                            <img className="title-quydinh" src="images/del30.png" alt="Delete" />
                        </div>
            </td>*/}

                </tr>
            );
        });
        var emlView = this.state.lstData.map((value, index) => {
            return (
                <tr key={index}>
                    <td className="et-table-cell tabl-cell rad">
                        <span className="input-group-addon text-left ng-binding width84px" >{value.maDat}</span>
                    </td>
                    <td className="et-table-cell tabl-cell rad">
                        <span className="input-group-addon text-left ng-binding width84px"> {value.hoTen} </span>
                    </td>
                    <td className="et-table-cell text-right ng-binding tag-mone rad">
                        <span className="input-group-addon text-left ng-binding width84px" > {value.email}</span>
                    </td>
                    <td className="et-table-cell text-right ng-binding tag-mone rad">
                        <span className="input-group-addon text-left ng-binding width84px" > {value.sdt}</span>
                    </td>
                    <td className="et-table-cell text-right ng-binding tag-mone rad">
                        <span className="input-group-addon text-left ng-binding width84px" > {value.ngayDat.substring(0, 10)}</span>
                    </td>
                    <td className="et-table-cell text-right ng-binding tag-mone rad">
                        <span className="input-group-addon text-left ng-binding width84px" > {value.tongve}</span>
                    </td>
                    <td className="et-table-cell text-right ng-binding tag-mone rad">
                        <span className="input-group-addon text-left ng-binding width84px" > {value.tongTien}đ </span>
                    </td>
                    <td className="et-table-cell text-right ng-binding tag-mone rad">
                        <span className="input-group-addon text-left ng-binding width84px" ><a href="#" onClick={() => this.onclickDetail(value)}>Chi tiết</a></span>
                    </td>

                </tr>
            );
        });

        return (


            <div className="d-fix">
                <Menuview />
                <div className="menu-bodername">
                    <UserView stagUrl={this.state.stageUrrl} nameUser={this.state.nameUser} />

                    <div className={this.state.valuedetail.length > 0 ? 'class-hide' : ''}>
                        <div className="schedule-width" >
                            <div className="schedule-backgr">
                                <div className="d-fix">
                                    <div className="width25percent">
                                        <div className="padding-5px">
                                            <input className="form-control form-group" type="text" name="mave" value={this.state.mave} placeholder="Mã đặt vé" onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="width25percent">
                                        <div className="padding-5px">
                                            <input className="form-control form-group" type="text" placeholder="Người đặt" value={this.state.username} name="username" onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="width25percent">
                                        <div className="padding-5px">
                                            <input className="form-control form-group" type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="width25percent">
                                        <div className="padding-5px">
                                            <input className="form-control form-group" type="text" placeholder="Số điện thoại" value={this.state.sdt} name="sdt" onChange={this.onChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="cover-btn-schedule">
                                    <button className="btn btn-check-price" onClick={this.onClickSearch} >Tìm kiếm</button>
                                    {/* <div className="btn-add-f">Thêm tàu đi</div> */}
                                </div>
                            </div>

                        </div>
                        <div className="margin-10px">
                            <div className="row form-group table-responsive list-ticket-deskhop margin-auto" >
                                <table className="table table-bordered">
                                    <thead className="et-table-header">
                                        <tr>
                                            <th className="mac-train ng-binding rad">Mã đặt vé
                                </th>
                                            <th className="ng-binding mun-train rad">Họ tên
                                </th>
                                            <th className="ng-binding train-in-header rad">Email
                                </th>
                                            <th className="ng-binding train-money-header rad">Số điện thoại
                                </th>
                                            <th className="ng-binding train-money-header rad">Ngày đặt
                                </th>
                                            <th className="ng-binding train-money-header rad">Số vé đặt
                                </th>
                                            <th className="ng-binding train-money-header rad">Tổng tiền
                                </th>
                                            <th className="ng-binding train-money-header rad">
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {emlView}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.valuedetail.length > 0 ? '' : 'class-hide'}>
                        <div className="conttdv">
                            <button className="btn btn-check-price btnttdv" onClick={this.onClickBackView} >Quay lại</button>
                            <div>
                                <ComponentToPrint ref={el => (this.componentRef = el)} valuedetail={this.state.valuedetail} ga={this.state.ga} infove={this.state.infove} infoghe={this.state.infoghe} />
                            </div>
                            <div className="row form-group table-responsive list-ticket-deskhop margin-auto">
                                <table className="table table-bordered">
                                    {/*<thead className="et-table-header">
                                        <tr>
                                            <th className="ng-binding mac-train rad">Họ tên
                                        </th>
                                            <th className="ng-binding train-money-header rad">Thông tin chỗ
                                        </th>
                                            <th className="ng-binding train-money-header rad">Thành tiền (VNĐ)
                                        </th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {emldetail}
        </tbody>}*/}
                                    <tfoot>
                                        <tr className="info">
                                            <td colSpan="2 ">
                                                <span className="pull-right"><strong className="ng-binding"></strong></span>
                                            </td>
                                            <td className="text-right">
                                                <strong className="ng-binding">Tổng tiền: {this.state.tongTienVe}</strong>
                                            </td>
                                            <td>&nbsp;</td>
                                        </tr>

                                        <tr className="info">
                                            <td colSpan="2">
                                                <span className="pull-right"><strong className="ng-binding"></strong></span>
                                            </td>
                                            <td >
                                                <ReactToPrint
                                                    trigger={() => {
                                                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                                                        // to the root node of the returned component as it will be overwritten.
                                                        return <button className="btn btn btn-primary btnIn" onClick={() => this.onClickUpdateVe("Đã In")}>In Vé</button>;
                                                    }}
                                                    content={() => this.componentRef}
                                                />
                                                <button className="btn btn btn btn-danger btnHuy" onClick={() => this.onClickUpdateVe("Hủy")} disabled={this.state.statusdetail === "Đã In" ? 'disabled' : ''}>Hủy Vé</button>
                                            </td>
                                            <td>&nbsp;</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <table className="table table-bordered">
                            <div className="center"><img src="images/icon-accmod.png" alt="img"/></div>
                                <div className="regulations-title">
                                    Quy định trả vé tàu
                                </div>

                                <div className="regulations">
                                    <p>Thời gian trả vé trước khi tàu chạy là 1 ngày.<br /> Lệ phí trả vé là 10% giá vé. </p>
                                </div>
                                <div className="arrlet">
                                    Lưu ý:
                                </div>
                                <div className="regulations">
                                    Khách hàng đến trả vé sau thời gian quy định trên sẽ không được giải quyết trả vé tàu.
                                </div>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default TicketView;
