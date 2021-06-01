<Carousel>
                    <Carousel.Item interval={10000}>
                        <img
                            className="d-block w-100"
                            src="images/banner3.jpg"
                            alt="First slide"
                        />  
                    </Carousel.Item>
                    {/*<Carousel.Item interval={5000}>
                        <img
                            className="d-block w-100"
                            src="images/TauQua2020.png"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="images/DuLichBangTauHoa.png"
                            alt="Third slide"
                        />
                    </Carousel.Item>*/}
                </Carousel>
            <div className="backgroud-search-banner">
                <div className="cover-contain-search-banner">
                    <div className="cover-pannel-search">
                        <div className="txt-caption-search">VÉ TÀU</div>
                        <div className="color-white">Hotline: 0797867387</div>
                   
                    </div>
                    <div className="form-group align-self-center with15percent">
                        <select className="form-control select-style-sarch width95percent" onChange={ this.onChangeStart } value={this.state.stationstart}>
                            <option value="0">Chọn điểm đi</option>
                            {elmstationstatrt}
                        </select>
                    </div>
                    <div className="form-group align-self-center with15percent" onChange={ this.onChangeEnd } value={this.state.stationend}>
                        <select className="form-control select-style-sarch width95percent">
                        <option value="0">Chọn điểm đến</option>
                            {elmstationstatrt}
                        </select>
                    </div>
                    <div className ="form-group align-self-center with15percent">
                        <select className="form-control select-style-sarch width95percent" onChange= { this.onChangeAWay } >
                            {/* <option value='0'>Loại vé</option> */}
                            <option value='1'>Vé 1 chiều</option>
                            <option value='2'>Vé khứ hồi</option>
                        </select>
                    </div>
                    <div className ="form-group align-self-center with15percent">
                        <DatePicker className ="form-control select-style-sarch"
                            placeholderText="Ngày đi"
                            onChange={ this.handleChangedateF }
                            value= {this.state.sdateFrom}
                            minDate={new Date()}
                            />
                        </div>
                    <div className="form-group align-self-center with15percent" >
                       <div className={ this.state.oneway === 'true' ? '' : 'class-hide'}>
                            <DatePicker className ="form-control select-style-sarch" disabled
                                placeholderText="Ngày về"
                            />
                       </div>
                        <div className={ this.state.oneway === 'true' ? 'class-hide' : ''}>
                            <DatePicker className ="form-control select-style-sarch"
                            onChange={ this.handleChangedateT }
                            placeholderText="Ngày về"
                            value={this.state.sdateFrom}value={this.state.sdateTo}
                            minDate={new Date()}
                            />
                        </div>
                    </div>
                    <div className="form-group align-self-center with15percent">
                        <button id="search" className="form-control btn btn-submit btn-search-style" onClick = { ()=> this.onClickSearch() }>Tìm kiếm</button>
                    </div>
                </div>
            </div>