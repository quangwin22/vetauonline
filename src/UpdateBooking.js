import Header from './Shared/Header';
import Footer from './Shared/Footer';
import Banner from './Shared/Banner';
import './index.css';
import React, { Component } from 'react';
import InfoUser from './InfoUser';
import axios from 'axios';


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
      , infoghe: ''
      , ga: ''
      , tongTienVe: ''
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
  onClickSearch = (event) => {
    if (this.state.mave !== '' || this.state.username !== '' || this.state.email !== '' || this.state.sdt !== '') {
      axios.post('http://localhost:9999/tim-thong-tim-ve',
        { mave: this.state.mave, nameuser: this.state.username, email: this.state.email, sdt: this.state.sdt })
        .then(res => {
          this.setState({
            lstData: res.data.res.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1)
          });
        });
      axios.post('http://localhost:9999/get-all-ghe',
        { mave: this.state.mave, nameuser: this.state.username, email: this.state.email, sdt: this.state.sdt })
        .then(res => {
          this.setState({
            infoghe: res.data.res
          });
        });

      axios.post('http://localhost:9999/get-all-ve',
        { mave: this.state.mave, nameuser: this.state.username, email: this.state.email, sdt: this.state.sdt })
        .then(res => {
          this.setState({
            infove: res.data.res
          });
        });
        
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
    } else {
      alert('vui lòng nhập đầy đủ thông tin tìm kiếm');
    }
  }

  onClickUpdateVe = (envet) => {
    console.log(envet);
    axios.post('http://localhost:9999/upd-status-ve',
      { maDat: this.state.maDatv, trangThai: envet })
      .then(res => {
        alert("Cập nhật thành công");
        this.setState({
          valuedetail: []
        });
        this.onClickSearch();
      })
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

      })
  }

  onClickBackView = (event) => {
    this.setState({
      valuedetail: []
    });
  }

  render() {
    var emldetail = this.state.valuedetail.map((value, index) => {
      console.log(this.state.tongTienVe)
      return (
        <tr key={index}>
          <td className="et-table-cell dic-12">
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
          <td className="divs">
            <div>
              <div className="ng-binding">
                {this.state.ga.filter(y => y.maGa === this.state.infove.filter(x => x.makh === value.maKh)[0].gaDi)[0].tenGa} - {this.state.ga.filter(y => y.maGa === this.state.infove.filter(x => x.makh === value.maKh)[0].gaDen)[0].tenGa}
              </div>
              <div className="ng-binding">
                {this.state.infove.filter(x => x.makh === value.maKh)[0].gioDi}
              </div>
              <div className="ng-binding">
                Mã ghế: {this.state.infoghe.filter(y => y.maGhe === this.state.infove.filter(x => x.makh === value.maKh)[0].maGhe)[0].soGhe}
              </div>
              <div className="ng-binding">
                Mã toa: {this.state.infoghe.filter(y => y.maGhe === this.state.infove.filter(x => x.makh === value.maKh)[0].maGhe)[0].maToa}
              </div>
            </div>
          </td>
          <td className="et-table-cell text-right ng-binding mmda" >
            {this.state.infove.filter(x => x.makh === value.maKh)[0].giaVe}
          </td>
        </tr>
      );
    });
    var emlView = this.state.lstData.map((value, index) => {
      return (
        <tr key={index}>
          <td className="et-table-cell tabl-cell">
            <span className="input-group-addon text-left ng-binding width84px" >{value.maDat}</span>
          </td>
          <td className="et-table-cell tabl-cell">
            <span className="input-group-addon text-left ng-binding width84px"> {value.hoTen} </span>
          </td>
          <td className="et-table-cell text-right ng-binding tag-mone">
            <span className="input-group-addon text-left ng-binding width84px" > {value.email}</span>
          </td>
          <td className="et-table-cell text-right ng-binding tag-mone">
            <span className="input-group-addon text-left ng-binding width84px" > {value.sdt}</span>
          </td>
          <td className="et-table-cell text-right ng-binding tag-mone">
            <span className="input-group-addon text-left ng-binding width84px" > {value.ngayDat.substring(0, 10)}</span>
          </td>
          <td className="et-table-cell text-right ng-binding tag-mone">
            <span className="input-group-addon text-left ng-binding width84px" > {value.tongTien} </span>
          </td>
          <td className="et-table-cell text-right ng-binding tag-mone">
            <span className="input-group-addon text-left ng-binding width84px" ><a href="#" onClick={() => this.onclickDetail(value)}>Chi tiết</a></span>
          </td>
        </tr>
      );
    });

    return (
      <div className="backgroud-body">
        <Header />
        <Banner />
        <div className="container backgroud-white">

          <div className="title-h1">XEM THÔNG TIN VÉ ĐÃ ĐẶT</div>
          <div class="quick-call-button">
            <div class="call-now-button">       
              <a id="calltrap-btn" class="b-calltrap-btn calltrap_offline hidden-phone visible-tablet" href="tel:0797867387">      
                <div id="calltrap-ico">
                </div>
              </a>
              <div className="iconcall fa fa-phone" ></div>  
              <div className="callLK"><p className="LK-text"><a>Liên hệ để hủy vé</a></p></div>
              <div className="call"><p className="call-text"><a href="https://zalo.me/0797867387" target="_blank" title="0797 867 387"> 0797 867 387 </a></p>
              </div>
            </div>
          </div>
          <div className="d-fix">
            <div className="menu-bodername ">
              <div className={this.state.valuedetail.length > 0 ? 'class-hide' : ''}>
                <div className="padding-20-50">
                  <div className="d-fix form-group">
                    <div className="label-form clo">Mã đặt vé</div>
                    <input className="form-control" type="text" placeholder="Nhập mã đặt vé" name="mave" value={this.state.mave} onChange={this.onChange} />
                  </div>
                  <div className="d-fix form-group">
                    <div className="label-form clo">Email</div>
                    <input className="form-control" type="text" placeholder="Nhập email của bạn" name="email" value={this.state.email} onChange={this.onChange} />
                  </div>
                  <div className="d-fix form-group">
                    <div className="label-form clo">Điện thoại</div>
                    <input className="form-control" type="text" placeholder="Nhập số điện thoại" name="sdt" value={this.state.sdt} onChange={this.onChange} />
                  </div>
                  <div className="ff">
                    <div className="btn btn-check-price" onClick={() => { this.onClickSearch() }}>Kiểm tra vé</div>
                  </div>
                </div>
                <div className="schedule-width" >
                </div>
                <div className="margin-10px">
                  <div className="row form-group table-responsive list-ticket-deskhop margin-auto" >
                    <table className="table table-bordered">
                      <thead className="et-table-header">
                        <tr>
                          <th className="mac-train ng-binding">Mã đặt vé
                                </th>
                          <th className="ng-binding mun-train">Họ tên
                                </th>
                          <th className="ng-binding train-in-header">Email
                                </th>
                          <th className="ng-binding train-money-header">Số điện thoại
                                </th>
                          <th className="ng-binding train-money-header">Ngày đặt
                                </th>
                          <th className="ng-binding train-money-header">Tổng tiền
                                </th>
                          <th className="ng-binding train-money-header">
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
                <button className="btn btn-check-price" onClick={this.onClickBackView} >Quay lại</button>
                <div className="row form-group table-responsive list-ticket-deskhop margin-auto">
                  <table className="table table-bordered">
                    <thead className="et-table-header">
                      <tr>
                        <th className="ng-binding mac-train">Họ tên
                                        </th>
                        <th className="ng-binding train-money-header">Thông tin chỗ
                                        </th>
                        <th className="ng-binding train-money-header">Thành tiền (VNĐ)
                                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {emldetail}
                    </tbody>
                    <tfoot>
                      <tr className="info">
                        <td colSpan="2">
                          <span className="pull-right"><strong className="ng-binding">Tổng tiền</strong></span>
                        </td>
                        <td className="text-right">
                          <strong className="ng-binding">{this.state.tongTienVe}</strong>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
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
export default TicketView;
