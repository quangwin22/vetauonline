import React, { Component } from 'react';
import axios from 'axios';

export class ComponentToPrint extends React.PureComponent  {
    render() {
        {
        var emldetail = this.props.valuedetail.map((value, index) => {
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
                                {this.props.ga.filter(y => y.maGa === this.props.infove.filter(x => x.makh === value.maKh)[0].gaDi)[0].tenGa} 
                                - {this.props.ga.filter(y => y.maGa === this.props.infove.filter(x => x.makh === value.maKh)[0].gaDen)[0].tenGa}
                           
                            </div>
                            <div className="ng-binding">
                                {this.props.infove.filter(x => x.makh === value.maKh)[0].gioDi}
                            </div>
                            <div className="ng-binding">
                                Mã ghế:  {this.props.infoghe.filter(y => y.maGhe === this.props.infove.filter(x => x.makh === value.maKh)[0].maGhe)[0].soGhe},(
                                {this.props.infove.filter(x => x.makh === value.maKh)[0].maGhe})
                                {console.log(this.props.infoghe)}
                            </div>
                        </div>
                    </td>
                    <td className="et-table-cell text-right ng-binding mmda rad" >
                        {this.props.infove.filter(x => x.makh === value.maKh)[0].giaVe}
                    </td>
                     
                </tr>
                
            );
        });
    }
    //    console.log(this.props.ga);
        return (
            <div>
                <table className="table table-bordered">
                    <thead className="et-table-header">
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
                        
                        {emldetail
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

