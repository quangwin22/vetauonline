import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import Menuview from './menu'
import UserView from './User'

class RevenueView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stageUrrl: 'Thống kê',
            lstData: []
            , infove: []
            , lstData1: []
            , lstData2: []
            , lstDataTicketMonth: []
            , infovecancel: []
            , infoveok: []
            , listDatamaDat: []
            , lstDatamap2: []
            , lstDatamap1: []
            , infovemap: []
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://localhost:9999/ListTheStation',
            data: null
        }).then(res => {
            this.setState({
                lstData: res.data
            })
        }).catch(err => {
            console.log(err);
        });

        axios.post('http://localhost:9999/get-all-thong-tin-dat-ve',
            { mave: this.state.mave, nameuser: this.state.username, email: this.state.email, sdt: this.state.sdt })
            .then(res => {
                this.setState({
                    lstData1: res.data.res.filter(x => x.trangThai !== "Hủy")
                    , lstData2: res.data.res.filter(x => x.trangThai == "Hủy")
                    , lstDatamap1: res.data.res.filter(x => x.trangThai !== "Hủy").map(x => x.maDat)
                    , lstDatamap2: res.data.res.filter(x => x.trangThai == "Hủy").map(x => x.maDat)
                    , totaaticket: res.data.res.filter(x => x.trangThai !== "Hủy").reduce((a, b) => a + b.tongve, 0)
                    , totaacancelticket: res.data.res.filter(x => x.trangThai == "Hủy").reduce((a, b) => a + b.tongve, 0)
                });
                console.log(this.state.lstDatamap2)
            });

        axios.post('http://localhost:9999/get-all-ve',
            { mave: this.state.mave, nameuser: this.state.username, email: this.state.email, sdt: this.state.sdt })
            .then(res => {
                this.setState({
                    infove: res.data.res
                    , infovemap: res.data.res.map(x => x.maDat)
                    , infoveok: res.data.res.filter(x => this.state.lstDatamap1.includes(x.maDat))
                    , infovecancel: res.data.res.filter(x => this.state.lstDatamap2.includes(x.maDat))
                    , totaamountcancel: res.data.res.filter(x => this.state.lstDatamap2.includes(x.maDat)).reduce((a, b) => a + b.giaVe, 0)
                    , totaamountok: res.data.res.filter(x => this.state.lstDatamap1.includes(x.maDat)).reduce((a, b) => a + b.giaVe, 0)
                    , totaamount: res.data.res.reduce((a, b) => a + b.giaVe, 0)
                    , infovecancel: res.data.res.filter(x => this.state.lstDatamap2.includes(x.maDat))
                });
                console.log("Tong gia ve huy", this.state.totaamountcancel * 0.1)
                console.log("Tong gia ve ok", this.state.totaamountok)
                console.log("Tong gia ve", this.state.totaamount)
                console.log("Tong ve", this.state.infovemap)
                console.log("Tong ve huy", this.state.infovecancel)

            })

        axios.post('http://localhost:9999/get-money-data-in-month')
            .then(res => {
                this.setState({
                    lstDataTicketMonth: res.data.res,
                })
            });
    }


    render() {


        var emlView = this.state.lstData.map((value, index) => {
            return (
                <tr key={index}>
                    <td className="et-table-cell tabl-cell rad">
                        <span className="input-group-addon text-left ng-binding width84px" >{value.tenGa}</span>
                    </td>
                    <td className="et-table-cell tabl-cell rad">
                        <span className="input-group-addon text-left ng-binding width84px"> {this.state.infoveok.filter(x => x.gaDi === value.maGa).reduce((a, b) => a + b.giaVe, 0) + (this.state.infovecancel.filter(x => x.gaDi === value.maGa).reduce((a, b) => a + b.giaVe, 0) * 0.1)} </span>
                    </td>
                    <td className="et-table-cell tabl-cell rad">
                        <span className="input-group-addon text-left ng-binding width84px"> {this.state.infoveok.filter(x => x.gaDi === value.maGa).reduce((a, b) => a + b.giaVe, 0)} </span>
                    </td>
                    <td className="et-table-cell tabl-cell rad">
                        <span className="input-group-addon text-left ng-binding width84px"> {(this.state.infovecancel.filter(x => x.gaDi === value.maGa).reduce((a, b) => a + b.giaVe, 0) * 0.1)} </span>
                    </td>
                    <td className="et-table-cell tabl-cell text-right rad">
                        <span className="input-group-addon text-left ng-binding width84px" > {this.state.infoveok.filter(x => x.gaDi === value.maGa).length}</span>
                    </td>
                    <td className="et-table-cell tabl-cell text-right rad">
                        <span className="input-group-addon text-left ng-binding width84px" > {this.state.infovecancel.filter(x => x.gaDi === value.maGa).length}</span>
                    </td>
                    {/* <td className="et-table-cell text-right ng-binding tag-mone">
                        <span className="input-group-addon text-left ng-binding width84px" > { value.sdt}</span>                                           
                    </td>
                    <td className="et-table-cell text-right ng-binding tag-mone">
                        <span className="input-group-addon text-left ng-binding width84px" > { value.ngayDat}</span>                                           
                    </td>
                    <td className="et-table-cell text-right ng-binding tag-mone">
                        <span className="input-group-addon text-left ng-binding width84px" > { value.tongTien} </span>                                           
                    </td>
                    <td className="et-table-cell text-right ng-binding tag-mone">
                        <span className="input-group-addon text-left ng-binding width84px" ><a href="#">Chi tiết</a></span>                                           
                    </td> */}
                </tr>
            );
        });
        return (
            <div className="d-fix">

                <Menuview />
                <div className="menu-bodername">
                    <UserView stagUrl={this.state.stageUrrl} />
                    <div className="cover-table-rev">
                        <div>
                            <div className="btn-home">

                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                        Tổng số vé bán được</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.totaaticket}</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-check fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                        Tổng số vé đã hủy</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.totaacancelticket}</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-ban fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                        Tổng doanh thu</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.totaamountok + (this.state.totaamountcancel * 0.1)}đ</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                        Tổng doanh thu vé đã bán</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.totaamountok}đ</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                        Tổng doanh thu từ vé hủy</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.totaamountcancel * 0.1}đ</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="margin-40px">
                                <div className="row form-group table-responsive list-ticket-deskhop margin-auto" >
                                    <table className="table table-bordered">
                                        <thead className="et-table-header">
                                            <tr>
                                                <th className="ng-binding train-money-header rad">Ga tàu
                                </th>
                                                <th className="ng-binding train-money-header rad">Tổng doanh thu
                                </th>
                                                <th className="ng-binding train-money-header rad">Tổng doanh thu vé bán
                                </th>
                                                <th className="ng-binding train-money-header rad">Tổng doanh thu vé hủy
                                </th>
                                                <th className="ng-binding train-money-header rad">Số lượng vé đã bán
                                </th>
                                                <th className="ng-binding train-money-header rad">Số lượng vé đã hủy
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
                    </div>
                </div>
            </div>

        );
    }
}
export default RevenueView;
