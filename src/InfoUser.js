
import './index.css';
import React, { Component } from 'react';

class InfoUsser extends Component {
  constructor(props){
      super(props);
      this.state = {
        history: []
      }
  }
  render() {
    var elmtable = this.props.historyval.map((value, index)=>{
      return (
        <tr key={index}>
              <td className="text-center">{ value.id}</td>
              <td>
                  <div>{ value.customername }</div>
                  <div>{ value.Loaghe }</div>
                  <div>Số giấy tời: { value.cmnd }</div>
              </td>
              <td>
                  <div>{ value.toa } { this.props.timestart}</div>
                  <div>{ value.seats }</div>
                  <div>{ value.typeseast }</div>
                  <div>Mã vé: { value.mave}</div>
              </td>
              <td className="text-center">
                  { value.giave }
              </td>
              <td className="text-center">
                  { value.loaive }
              </td>
              <td className="text-center">
                  { value.giatra }
              </td>
              <td className="text-center">
                  { value.giave - value.giatra }
              </td>
              <td className="text-center">
                  { value.inforreturn }
              </td>
              <td className="text-center">
                  <input type="checkbox" ></input>
              </td>
          </tr>
      )
      }); 
      return (
        <div className="backgroud-body">
        <div className="container backgroud-white padding-buttom-top-20">
        <div className="alert-info">
          <div className="txt-alert-info">
            Vui lòng chọn các vé cần trả. Tiền hoàn lại khi trả vé của quý khách sẽ được trả về tài khoản đã được đăng ký thanh toán mua vé thành công.
          </div>
        </div>
        <div className="info-transaction-text">Thông tin giao dịch</div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Họ tên Khách hàng</th>
              <th>Thông tin vé</th>
              <th>Thành tiền (VND)</th>
              <th>Loại vé</th>
              <th>Phí trả vé</th>
              <th>Tiền trả lại</th>
              <th>Thông tin vé trả</th>
              <th>Chọn vé trả</th>
            </tr>
          </thead>
          <tbody>
              { elmtable }
          </tbody>
        </table>
        {/* <div className="padding-buttom-top-10">
          <div className="info-transaction-text">Thông tin người đặt vé</div>
          <div className="d-fix">
            <div className="width50percent">
              <div className ="margin20">
                <div className="d-fix form-group">
                    <div className="label-form">Họ và tên</div>
                    <input className ="form-control" type="text" value="Nguyễn Văn A" readOnly/>
                </div>
                <div className="d-fix form-group">
                    <div className="label-form">Sỗ CMND/Hộ chiếu</div>
                    <input className ="form-control" type="text" value="632154789" readOnly/>
                </div>
                
              </div>
            </div>
            <div className="width50percent">
              <div className ="margin20">
                <div className="d-fix form-group">
                    <div className="label-form">Email</div>
                    <input className ="form-control" type="text" value="nguyenvana@gmail.com" readOnly/>
                </div>
                <div className="d-fix form-group">
                    <div className="label-form">Số điện thoại</div>
                    <input className ="form-control" type="text" value="0966644476" readOnly/>
                </div>
                <div className="btn btn-check-price float-right" >
                  Xác nhận trả vé
                </div>
              </div>
            </div>
          </div>
        </div> */}
        </div>
      </div>
  );
  }
}

export default InfoUsser;