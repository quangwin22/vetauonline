import Header from './Shared/Header';
import Footer from './Shared/Footer';
import Banner from './Shared/Banner';
import React, { Component } from 'react';
import DatePicker from "react-datepicker"; 
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Booking extends Component {
  constructor(props){
      super(props);
      this.state = {
        stationstart: {
          maga: '',
          tenga: '' },
        stationend: {
          maga: '',
          tenga: '' },
        dateto: '',
        station: '',
        thestation: [],
        choosevalue: 'stationstart',
        stationrun: []
        ,searchnull: 'false'
        ,stationname:''
        ,stationtime:''
        ,stationdate:''
      }
  }

  componentDidMount(){
    axios({
      method: 'GET',
      url: 'http://localhost:9999/ListTheStation',
      data: null
    }).then(res=> 
      {
        this.setState({
          thestation: res.data
        }) 
      }).catch(err=>
      {
        console.log(err);
      });
      
  }

  onChange  = (event) => {
    var target = event.target;
     var name = target.name;
     var value = target.value;
     this.setState({
      [name]: value
    });    
  }

  handleChange = date => {
    var sdate = date[0];
    const yourDate = new Date(sdate)
    var cdate = new Intl.DateTimeFormat('en-US',{year: 'numeric', month: '2-digit',day: '2-digit'}).format(yourDate);
    this.setState({
      dateto: cdate,
      choosevalue: 'station'
    })
    this.setState({
      searchnull: 'false'
    });
    axios.post('http://localhost:9999/SetValueSearch',
        {   gaForm: this.state.stationstart.maGa ,
            gaTo:  this.state.stationend.maGa ,
            dateFrom: cdate,
            dateTo: '' ,
            away: "1" })
      .then(res => {
        this.onLoadStation();
      })
  }

  onLoadStation = () =>{
     axios.get('http://localhost:9999/SearchThesShedule')
      .then(res => {

        if(res.data.schedulealv.length > 0){
          this.setState({
            stationrun: res.data.schedulealv
          });
        }else{
          this.setState({
            searchnull: 'true'
          });
        }
        console.log(res.data);
      })
  }

  onClickStation = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    var ma = target.id;
    this.setState({
    [name]: {
      maGa: ma,
      tenga: value
    }});
    if(name === 'stationstart'){
      this.setState({
        choosevalue: 'stationend'
      });
    }else if(name === 'stationend'){
      this.setState({
        choosevalue: 'dateto'
      });
    }else if (name === 'dateto'){
      this.setState({
        choosevalue: 'station'
      });     
    }else if (name = 'station'){
      this.setState({
        choosevalue: 'lststation'
      });
    }
  }
  
  onClickInforStation(name, date, time){
    this.setState({
      choosevalue: 'lststation'
      ,stationname: name
      ,stationtime: time
      ,stationdate: date
    });
  }

  render() {

      var elmstationstatrt = this.state.thestation.map((xvalue,index)=>{
        return (
        <input key={index} className="img-station1 class-btn-station1" name="stationstart" id = { xvalue.maGa } value= { xvalue.tenGa } onClick = { this.onClickStation } readOnly/>)
      });
      var elmstationend = this.state.thestation.map((xvalue,index)=>{
        return (<input key={index} className="class-btn-station" name="stationend" id= { xvalue.maGa } value= { xvalue.tenGa } onClick = { this.onClickStation } readOnly/>)
      });

      var rstation = this.state.stationrun.map((value,index)=>{
        return(
          <div key={index} className="class-train-booking" onClick={()=> this.onClickInforStation(value.toaTau,value.ngayKhoiHanh,value.gioKhoiHanh ) }>  
            <div className="font-size20"><i className="fas fa-train"></i> {value.toaTau.substring(0, 3)}</div>
              <div className="class-time-train-booking">{value.ngayKhoiHanh} - { value.gioKhoiHanh}</div>
              <div> { this.state.stationstart.tenga} - { this.state.stationend.tenga} </div>
              <div>Ga đi: { this.state.stationstart.tenga }</div>
              <div>Ga đến: { this.state.stationend.tenga}</div>
              <div>{ value.timeend }</div>
          </div>
        )
      });
      return (
        <div>
        <Header />
        <Banner />
        <div className="color-b">
          <div className="container backgroud-white">
            <div className="title-h1">THÔNG TIN LỊCH TRÌNH</div>
              <div className="padding-20-50"> 
                <div className="d-fix form-group">
                    <div className="label-form">Ga đi</div>
                    <input className ="form-control" type="text" placeholder="Vui lòng chọn ga đi bên dưới" name= "stationstart" value={ this.state.stationstart.tenga} onChange ={ this.onChange} disabled />
                </div>
                <div className="d-fix form-group">
                    <div className="label-form">Ga đến</div>
                    <input className ="form-control" type="text" placeholder="Vui lòng chọn ga đến bên dưới" name="stationend" value={ this.state.stationend.tenga} onChange ={ this.onChange} disabled />
                </div>
                <div className="d-fix form-group">
                    <div className="label-form">Ngày đi</div>
                    <input className ="form-control" type="text" placeholder="Chọn ngày bên dưới" name="dateto" value={ this.state.dateto} onChange ={ this.onChange} disabled />
                </div>
              </div>
          </div>
          <div className="container padding-20-50 display-flow-root">
            <div className={ this.state.choosevalue === 'stationstart' ? '' : 'class-hide'}>
            { elmstationstatrt}
            </div>
            <div className={ this.state.choosevalue === 'stationend' ? '' : 'class-hide'}>
              { elmstationend}
            </div>
            <div className={ this.state.choosevalue === 'dateto' ? '' : 'class-hide'} >
              <div className="date-time-booking auto-w90">
                <DatePicker
                  onChange={ this.handleChange }
                  selectsRange
                  inline
                  name ="dateto"
                />
              </div>
            </div>
            <div className={ this.state.choosevalue === 'station' ? '' : 'class-hide'}>
                {rstation}
            </div>
            <div className={ this.state.searchnull === 'true' ? '' : 'class-hide'}>
              <div className='txt-null-return '>Không có ga từ { this.state.stationstart.tenga} đến ga { this.state.stationend.tenga} trong ngày {this.state.dateto}</div>
            </div>
            <div className={ this.state.choosevalue === 'lststation' ? '' : 'class-hide'}>
                <div className="class-train-booking">
                  <div className="title-es-booking">
                  <i className="fas fa-train"></i> { this.state.stationname}
                  </div>
                  <div className="d-fix">
                    <div className="w40percent-right">
                        <div>Ga đi: { this.state.stationstart.tenga}</div>
                      {/* <div>Ngày đi: {this.state.dateto}</div> */}
                    </div>
                    <div className="width20percent text-center">
                      <i className="fas fa-arrow-right font-size60"></i>
                    </div>
                    <div className="w40percent-left">
                        <div>Ga đến: {this.state.stationend.tenga}</div>
                      {/* <div>Ngày đi: {this.state.dateto}</div> */}
                    </div>
                  </div>
                  <div className="time-end-es-booking">{ this.state.stationtime }</div>
                </div>
            </div>
          </div>
        </div> 
        <Footer/>
      </div>
    );
  }
}

export default Booking;
