import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import Menuview from './menu'
import UserView from './User'
import DatePicker from "react-datepicker";

class ScheduleView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stageUrrl: 'Quản lý lịch trình'
            , malich: ''
            , ngaykhoihanh: ''
            , matau: ''
            , lstData: []
            , LichTrinh: []
            , addlichtrinh: "false"
            , editlichtrinh: "false"
            , thestation: []
            , createdate: ''
            , Ecreatedate: ''
            , createtime: ''
            , Ecreatetime: ''
            , createtau: ''
            , returndate: ''
            , returntime: ''
            , sltoanam6: ''
            , sltoanam4: ''
            , sltoamem: ''
            , sltoacung: ''
            , giatoanam4: ''
            , giatoanam6: ''
            , giatoacung: ''
            , giatoamem: ''
            , ngayve: ''
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://localhost:9999/Tau',
            data: null
        }).then(res => {
            this.setState({
                thestation: res.data.taus
            })
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
        
        axios.post('http://localhost:9999/tim-lich-trinh',
            { malich: this.state.malich, ngaykhoihanh: this.state.ngaykhoihanh, matau: this.state.matau, ngayve: this.state.ngayve })
            .then(res => {
                console.log(res.data.res);
                this.setState({
                    lstData: res.data.res.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1)
                });
            })
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        console.log(value);
        this.setState({
            [name]: value
        });
    }

    onClickSearch = (event) => {
        console.log(this.state.ngayve);
        axios.post('http://localhost:9999/tim-lich-trinh',
            { malich: this.state.malich, ngaykhoihanh: this.state.ngaykhoihanh, matau: this.state.matau, ngayve: this.state.ngayve })
            .then(res => {
                console.log(res.data.res);
                this.setState({
                    lstData: res.data.res.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1)
                });
            })
    }

    onClickAdd = (event) => {
        this.setState({
            addlichtrinh: "true",
            createdate: ''
            , createtime: ''
            , createtau: ''
            , returndate: ''
            , returntime: ''
            , giatoacung: '700000',
            giatoamem: '800000',
            giatoanam4: '1000000',
            giatoanam6: '900000',
            sltoacung: '1',
            sltoamem: '1',
            sltoanam4: '1',
            sltoanam6: '1'
        })
    }

    onClickEdit = (event) => {
        this.setState({
            editlichtrinh: "true",
            createdate: ''
            , createtime: ''
            , createtau: ''
            , returndate: ''
            , returntime: ''
            , giatoacung: '700000',
            giatoamem: '800000',
            giatoanam4: '1000000',
            giatoanam6: '900000',
            sltoacung: '',
            sltoamem: '',
            sltoanam4: '',
            sltoanam6: ''
        })
    }

    onClickBack = (event) => {
        this.setState({
            addlichtrinh: "false"
        })
    }

    onClickCancel = (event) =>{
        this.setState({
            editlichtrinh: "false"
        })
    }

    handleChangedateF = date => {
        const yourDate = new Date(date)
        var cdate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(yourDate);
        this.setState({
            ngaykhoihanh: cdate
        });
    }

    handleChangedateT = date => {
        const yourDate = new Date(date)
        var cdate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(yourDate);
        this.setState({
            ngayve: cdate
        });
    }

    handleChangedatecre = date => {
        const yourDate = new Date(date)
        var cdate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(yourDate);
        this.setState({
            createdate: cdate
        });
    }
    
    handleChangedatecrereturn = date => {
        const yourDate = new Date(date)
        var cdate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(yourDate);
        this.setState({
            returndate: cdate
        });
    }

    handleChangetime = date => {
        const yourDate = new Date(date)
        var cdate = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(yourDate);
        console.log(cdate);
        this.setState({
            createtime: cdate
        });
    }

    handleChangetimereturn = date => {
        const yourDate = new Date(date)
        var cdate = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(yourDate);
        console.log(cdate);
        this.setState({
            returntime: cdate
        });
    }

    onChangeAWay = (event) => {
        var target = event.target;
        var value = target.value;
        this.setState({
            createtau: value
        });
    }

    onCreateLT = (event) => {
        if (this.state.createdate === '') {
            alert("Vui lòng chọn ngày khởi hành");
            return;
        }
        if (this.state.createtime === '') {
            alert("Vui lòng chọn thời gian khởi hành");
            return;
        }
        if (this.state.returndate === '') {
            alert("Vui lòng chọn ngày trở về");
            return;
        }
        if (this.state.returntime === '') {
            alert("Vui lòng chọn thời gian trở về");
            return;
        }
        if (this.state.createtau === '') {
            alert("Vui lòng chọn tàu khởi hành");
            return;
        }
        if (this.state.createtau === '0') {
            alert("Vui lòng chọn tàu khởi hành");
            return;
        }


        axios.post('http://localhost:9999/tao-lich-trinh',
            {
                ngaykhoihanh: this.state.createdate,
                giokhoihanh: this.state.createtime,
                ngayve: this.state.returndate,
                giove: this.state.returntime,
                matau: this.state.createtau,
                sltoanam4: this.state.sltoanam4,
                sltoanam6: this.state.sltoanam6,
                sltoamem: this.state.sltoamem,
                sltoacung: this.state.sltoacung,
                giatoacung: this.state.giatoacung,
                giatoamem: this.state.giatoamem,
                giatoanam4: this.state.giatoanam4,
                giatoanam6: this.state.giatoanam6
            })
            .then(res => {
                if (res.data.status) {
                    alert("Tạo lịch trình thành công.");
                    this.setState({
                        addlichtrinh: "false"
                    })
                    this.onClickSearch();
                }
            })
    }

    onClickUpdateLichTrinh = (value) => {
        console.log(value)
        this.setState({
            LichTrinh: value,
            editlichtrinh: "true",
            
        })
        
      
    }

    render() {
        var elmstationstatrt = this.state.thestation.map((xvalue, index) => {
            return (<option key={index} value={xvalue.maTau} >{xvalue.tenTau}</option>)
        });
        var emlView = this.state.lstData.map((value, index) => {
            return (
                <tr key={index}>
                    <td className="et-table-cell tabl-cell rad">
                        <span className="input-group-addon text-left ng-binding width84px" > {value.maLich} </span>
                    </td>
                    <td className="et-table-cell tabl-cell rad  ">
                        <span className="input-group-addon text-left ng-binding width84px" > {value.maTau} </span>
                    </td>
                    <td className="et-table-cell text-right ng-binding tag-mone rad">
                        <span className="input-group-addon text-left ng-binding width84px" > {value.ngayKhoiHanh} </span>
                    </td>
                    <td className="et-table-cell text-right ng-binding tag-mone rad">
                        <span className="input-group-addon text-left ng-binding width84px" > {value.gioKhoiHanh} </span>
                    </td>
                    <td className="et-table-cell text-right ng-binding tag-mone rad">
                        <span className="input-group-addon text-left ng-binding width84px" > {value.ngayve} </span>
                    </td>
                    <td className="et-table-cell text-right ng-binding tag-mone rad">
                        <span className="input-group-addon text-left ng-binding width84px" > {value.giove} </span>
                    </td>
                    {/*<td className="et-table-cell text-right ng-binding tag-mone rad">
                     <button className="btn btn btn-primary btnIn" onClick= {()=> this.onClickUpdateLichTrinh(value) }>Chỉnh sửa</button> 
            </td>*/}
                </tr>
            );
        });
        return (
            <div className="d-fix">
                <Menuview />
                <div className="menu-bodername">
                    <UserView stagUrl={this.state.stageUrrl} />
                    <div className={this.state.editlichtrinh === "false" ? "class-hide" : ""}>
                        <button className="btn btn-check-price margin20" onClick={this.onClickCancel} >Hủy chỉnh sửa</button>
                        <div className="bgqllt color-black">
                            <div className="titlettlt">Sửa thông tin lịch trình</div>
                            <div className="border-qllt">
                            <div className="form-grouup d-fix input-add-lt with50">
                                <div className="margin-left1-20px with20percent">Ngày khởi hành</div>
                                <div className="width70percent">
                                    <DatePicker className="form-control select-style-sarch"
                                        placeholderText={this.state.LichTrinh.ngayKhoiHanh}
                                        onChange={this.handleChangedatecre}
                                        value={this.state.createdate}
                                        minDate={new Date()}
                                    />
                                </div>
                            </div>
                            <div className="form-grouup d-fix input-add-lt with50">
                                <div className=" margin-left1-20px with15percent">Giời khởi hành</div>
                                <div className="width25percent">
                                    <DatePicker
                                        className="form-control select-style-sarch"
                                        placeholderText={this.state.LichTrinh.gioKhoiHanh}
                                        // selected={startDate}
                                        onChange={this.handleChangetime}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        // timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="HH:mm"
                                        value={this.state.createtime}
                                    />
                                </div>
                            </div>
                            <div className="form-grouup d-fix input-add-lt with50">
                                <div className=" margin-left1-20px with20percent">Ngày trở về</div>
                                <div className="width70percent">
                                    <DatePicker className="form-control select-style-sarch"
                                        placeholderText={this.state.LichTrinh.ngayve}
                                        onChange={this.handleChangedatecrereturn}
                                        value={this.state.returndate}
                                        minDate={new Date()}
                                    />
                                </div>
                            </div>
                            <div className="form-grouup d-fix input-add-lt with50">
                                <div className=" margin-left1-20px with15percent">Giời trở về</div>
                                <div className="width25percent">
                                    <DatePicker
                                        className="form-control select-style-sarch"
                                        // selected={startDate}
                                        placeholderText={this.state.LichTrinh.giove}
                                        onChange={this.handleChangetimereturn}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        // timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="HH:mm"
                                        value={this.state.returntime}
                                    />
                                </div>
                            </div>
                            <div className="form-grouup d-fix input-add-lt with50" >
                                <div className=" margin-left1-20px with20percent">Tàu</div>
                                <div className="width50percent">
                                    <select className="form-control select-style-sarch width95percent" value={this.state.createtau} onChange={this.onChangeAWay}>
                                        <option value="0">Chọn tàu khởi hành</option>
                                        {elmstationstatrt}
                                    </select>
                                </div>
                            </div>
                            </div>
                            <div className="kt50"></div>
                            <div className="titlettlt">Nhập số lượng toa tàu</div>
                            <div className="border-qllt1">
                            <div className="form-grouup d-fix input-add-lt">
                                <div className=" margin-left2-20px with15percent">Số lượng toa giường nằm khoang 4 điều hòa</div>
                                <div className="with20percent">
                                    <input className="form-control form-group" type="text" placeholder="Nhập số lượng toa nằm 4" name="sltoanam4" value={this.state.sltoanam4} onChange={this.onChange} />
                                </div>                       
                            </div>
                            <div className="form-grouup d-fix input-add-lt">
                                <div className=" margin-left2-20px with15percent">Số lượng toa giường nằm khoang 6 điều hòa</div>
                                <div className="with20percent">
                                    <input className="form-control form-group" type="text" placeholder="Nhập số lượng toa nằm 6" name="sltoanam6" value={this.state.sltoanam6} onChange={this.onChange} />
                                </div>         
                            </div>
                            <div className="form-grouup d-fix input-add-lt">
                                <div className=" margin-left2-20px with15percent">Số lượng toa ngồi mền điều hòa</div>
                                <div className="with20percent">
                                    <input className="form-control form-group" type="text" placeholder="Nhập số lượng toa ngồi mềm" name="sltoamem" value={this.state.sltoamem} onChange={this.onChange} />
                                </div>                            
                            </div>
                            <div className="form-grouup d-fix input-add-lt">
                                <div className=" margin-left2-20px with15percent">Số lượng toa ngồi cứng điều hòa</div>
                                <div className="with20percent">
                                    <input className="form-control form-group" type="text" placeholder="Nhập số lượng toa ngồi cứng" name="sltoacung" value={this.state.sltoacung} onChange={this.onChange} />
                                </div>
                            
                            </div>               
                        </div>
                        </div>
                        <div className="row row-left-right-3px">
                            <div className="col-5"></div>
                            <div className="col-5">
                                <button className="btn btn-check-price margin20" onClick={this.onCreateLT} >Xác nhận</button>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.addlichtrinh === "false" ? "" : "class-hide"}>
                        <div className="schedule-width" >
                            <div className="schedule-backgr">
                                <div className="d-fix">
                                    <div className="width25percent">
                                        <div className="padding-5px">
                                            <input className="form-control form-group" type="text" placeholder="Mã lịch trình" name="malich" value={this.state.malich} placeholder="Mã đặt vé" onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="width25percent">
                                        <div className="padding-5px">
                                            <input className="form-control form-group" type="text" placeholder="Mã tàu" name="matau" value={this.state.matau} placeholder="Mã tàu" onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="width25percent">
                                        <DatePicker className="form-control select-style-sarch width95percent"
                                            placeholderText="Ngày đi"
                                            onChange={this.handleChangedateF}
                                            value={this.state.ngaykhoihanh}

                                        />
                                    </div>
                                    <div className="width25percent">
                                        <DatePicker className="form-control select-style-sarch width95percent"
                                            placeholderText="Ngày về"
                                            onChange={this.handleChangedateT}
                                            value={this.state.ngayve}

                                        />
                                    </div>
                                </div>
                                <div className="cover-btn-schedule">
                                    <button className="btn btn-check-price mar" onClick={this.onClickSearch}>Tìm kiếm</button>
                                    <button className="btn btn-check-price mar" onClick={this.onClickAdd} >Thêm tàu đi</button>
                                </div>
                            </div>

                        </div>
                        <div className="margin-10px">
                            <div className="row form-group table-responsive list-ticket-deskhop margin-auto" >
                                <table className="table table-bordered">
                                    <thead className="et-table-header">
                                        <tr>
                                            <th className="mac-train ng-binding rad">Mã lịch trình
                                </th>
                                            <th className="ng-binding mun-train rad">Mã tàu
                                </th>
                                            <th className="ng-binding train-in-header rad">Ngày đi
                                </th>
                                            <th className="ng-binding train-in-header rad">Giờ đi
                                </th>
                                            <th className="ng-binding train-in-header rad">Ngày về
                                </th>
                                            <th className="ng-binding train-in-header rad">Giờ về
                                </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            emlView
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.addlichtrinh === "false" ? "class-hide" : ""}>
                        <button className="btn btn-check-price margin20" onClick={this.onClickBack} >Trở về</button>
                        <div className="bgqllt color-black">
                            <div className="titlettlt">Nhập thông tin lịch trình</div>
                            <div className="border-qllt">
                            <div className="form-grouup d-fix input-add-lt with50">
                                <div className="margin-left1-20px with20percent">Ngày khởi hành</div>
                                <div className="width70percent">
                                    <DatePicker className="form-control select-style-sarch"
                                        placeholderText="Ngày khởi hành"
                                        onChange={this.handleChangedatecre}
                                        value={this.state.createdate}
                                        minDate={new Date()}
                                    />
                                </div>
                            </div>
                            <div className="form-grouup d-fix input-add-lt with50">
                                <div className=" margin-left1-20px with15percent">Giời khởi hành</div>
                                <div className="width25percent">
                                    <DatePicker
                                        className="form-control select-style-sarch"
                                        placeholderText="Giờ khởi hành"
                                        // selected={startDate}
                                        onChange={this.handleChangetime}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        // timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="HH:mm"
                                        value={this.state.createtime}
                                    />
                                </div>
                            </div>
                            <div className="form-grouup d-fix input-add-lt with50">
                                <div className=" margin-left1-20px with20percent">Ngày trở về</div>
                                <div className="width70percent">
                                    <DatePicker className="form-control select-style-sarch"
                                        placeholderText="Ngày trở về"
                                        onChange={this.handleChangedatecrereturn}
                                        value={this.state.returndate}
                                        minDate={new Date()}
                                    />
                                </div>
                            </div>
                            <div className="form-grouup d-fix input-add-lt with50">
                                <div className=" margin-left1-20px with15percent">Giời trở về</div>
                                <div className="width25percent">
                                    <DatePicker
                                        className="form-control select-style-sarch"
                                        // selected={startDate}
                                        placeholderText="Giờ trở về"
                                        onChange={this.handleChangetimereturn}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        // timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="HH:mm"
                                        value={this.state.returntime}
                                    />
                                </div>
                            </div>
                            <div className="form-grouup d-fix input-add-lt with50" >
                                <div className=" margin-left1-20px with20percent">Tàu</div>
                                <div className="width50percent">
                                    <select className="form-control select-style-sarch width95percent" value={this.state.createtau} onChange={this.onChangeAWay}>
                                        <option value="0">Chọn tàu khởi hành</option>
                                        {elmstationstatrt}
                                    </select>
                                </div>
                            </div>
                            </div>
                            <div className="kt50"></div>
                            <div className="titlettlt">Nhập số lượng toa tàu</div>
                            <div className="border-qllt1">
                            <div className="form-grouup d-fix input-add-lt">
                                <div className=" margin-left2-20px with15percent">Số lượng toa giường nằm khoang 4 điều hòa</div>
                                <div className="width5percent">
                                    <input className="form-control form-group" type="text" placeholder="Số lượng toa nằm 4" name="sltoanam4" value={this.state.sltoanam4} onChange={this.onChange} />
                                </div>
                            {/*     <div className="width25percent">
                                    <input className="form-control form-group" type="text" placeholder="Giá tiền" name="giatoanam4" value={this.state.giatoanam4} onChange={this.onChange} disabled />
                                </div>*/}
                            </div>
                            <div className="form-grouup d-fix input-add-lt">
                                <div className=" margin-left2-20px with15percent">Số lượng toa giường nằm khoang 6 điều hòa</div>
                                <div className="width5percent">
                                    <input className="form-control form-group" type="text" placeholder="Số lượng toa nằm 6" name="sltoanam6" value={this.state.sltoanam6} onChange={this.onChange} />
                                </div>
                              {/*   <div className="width25percent">
                                    <input className="form-control form-group" type="text" placeholder="Giá tiền" name="giatoanam6" value={this.state.giatoanam6} onChange={this.onChange} disabled />
                                </div>*/}
                            </div>
                            <div className="form-grouup d-fix input-add-lt">
                                <div className=" margin-left2-20px with15percent">Số lượng toa ngồi mền điều hòa</div>
                                <div className="width5percent">
                                    <input className="form-control form-group" type="text" placeholder="Số lượng toa ngồi mềm" name="sltoamem" value={this.state.sltoamem} onChange={this.onChange} />
                                </div>
                               {/*  <div className="width25percent">
                                    <input className="form-control form-group" type="text" placeholder="Giá tiền" name="giatoamem" value={this.state.giatoamem} onChange={this.onChange} disabled />
                                </div>*/}
                            </div>
                            <div className="form-grouup d-fix input-add-lt">
                                <div className=" margin-left2-20px with15percent">Số lượng toa ngồi cứng điều hòa</div>
                                <div className="width5percent">
                                    <input className="form-control form-group" type="text" placeholder="Số lượng toa ngồi cứng" name="sltoacung" value={this.state.sltoacung} onChange={this.onChange} />
                                </div>
                             {/*   <div className="width25percent">
                                    <input className="form-control form-group" type="text" placeholder="Giá tiền" name="giatoacung" value={this.state.giatoacung} onChange={this.onChange} disabled />
                                </div>*/} 
                            </div>               
                        </div>
                        </div>
                        <div className="row row-left-right-3px">
                            <div className="col-5"></div>
                            <div className="col-5">
                                <button className="btn btn-check-price margin20" onClick={this.onCreateLT} >Tạo lịch trình</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}
export default ScheduleView;
