import Header from './Shared/Header';
import Footer from './Shared/Footer';
import Banner from './Shared/Banner';

function Home() {
    return (
        <div>
            <Header />
            <Banner />
            <div>
                <div className="book-step-wrap sx-hide">
                    <ul className="train clearfix">
                        <li className="step1"><div className="arrow"><span>Tìm Kiếm</span> <br /> Tìm kiếm &amp; chọn chuyến</div></li>
                        <li className="step2"><div className="arrow"><span>Đặt</span> <br /> Điền thông tin &amp; Thanh toán</div></li>
                        <li className="step3"><span>Đi</span> <br /> Xuất trình thông tin Vé điện tử hoặc Vé giấy trước thời điểm lên xe</li>
                    </ul>
                </div>

                <div className="container-full">
                    <div className="backgroud-white1">

                        <div className="container padding-buttom-top-10">
                            <div className="txt-lido">TẠI SAO BẠN NÊN LỰA CHỌN MUA VÉ TÀU TRỰC TUYẾN ?
                                <hr />
                                {//   <img src="images/icon-accmod.png" alt="img" className="center-home" />
                                }
                            </div>
                            <div className="container-fluid">
                                <div className="container no-pad">
                                    <div className="row no-pad marg-bot-40" style={{ marginTop: '10px' }}>
                                        <div className="col-md-4 text-center">
                                            <div className="feature-block show-on-scroll is-visible">
                                                <img alt="Confirm Surity" className="confirm-surity" style={{ pointerEvents: 'none' }} src="https://images.railyatri.in/assets/train_ticketing/validating-ticket-244940ca05238bc0ac8216156c94cda069993ab4ce67fab57b5543e778101170.svg" />
                                                <h3 className="font-md">Thanh toán nhanh &amp; linh hoạt </h3>
                                                <p className="font-xxs">Đặt vé nhanh chóng &amp; đơn giản</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 text-center">
                                            <div className="feature-block show-on-scroll is-visible">
                                                <img alt="Confirm Surity" className="confirm-surity" style={{ pointerEvents: 'none' }} src="https://images.railyatri.in/assets/train_ticketing/booking-confirm-ff420b5fc59f3d8ca5a8e45cbd2ffdce786f1f9d93ffa4fb40bcbd3ae0985bd0.svg" />
                                                <h3 className="font-md">Dễ dàng &amp; thanh toán an toàn qua trung gian</h3>
                                                <p className="font-xxs">Chỉ với với họ tên, số điện thoại, email bạn đã có thể đặt vé thành công</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 text-center">
                                            <div className="feature-block show-on-scroll is-visible">
                                                <img alt="Confirm Surity" className="confirm-surity" style={{ pointerEvents: 'none' }} src="https://images.railyatri.in/assets/train_ticketing/login-98464673633bebb2a80be97d020b4bab0b9b397de18600ca373f3a012430a5e3.svg" />
                                                <h3 className="font-md">Có thể xem thông tin lịch tàu &amp; tra thông tin vé tàu </h3>
                                                <p className="font-xxs">Hãy xem những tính năng tiện ít mới để việc đặt vé có thể dễ dàng hơn</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container text-center padding-buttom-top-20" >
                        {/*  <div className="txt-muave">MUA VÉ TẠI CÔNG TY VÉ TÀU TRỰC TUYẾN</div>
                        <img src="images/icon-accmod.png" alt="img" className="text-center" />
                        <p className="content-muave">Công ty vé tàu trực tuyến là nơi cung cấp các loại phương tiện di chuyển hàng đầu trong đó có đường sắt Việt Nam. Tàu lửa hiện nay vẫn là phương tiện giá rẻ nhất và an toàn nhất được sự tin dùng của nhiều hành khách. Với sự cải tiến ngày càng
                tiện dụng, đường sắt Việt nam luôn tồn tại và vững mạnh trong suốt nhiều năm qua.</p>
                       {// <img src="https://i1.wp.com/vietnamrailway.com.vn/wp-content/uploads/2020/01/homepage02.jpg?resize=960%2C564&ssl=1" style={{ width: '50%', height: '50%', }} alt="img" />
                       }*/}
                        <div className="margin20">
                            <div className="cover-baodam">
                                <div className="with-baodam">
                                    <i className='fas fa-check icon-baodam' ></i>
                                    <div>
                                        Chúng tôi đảm bảo với khách hàng sẽ đặt được dịch vụ giá tốt nhất , những chương trình khuyến mại hấp dẫn nhất
                        </div>
                                </div>
                                <div className="with-baodam">
                                    <i className='fas fa-check icon-baodam'></i>
                                    <div>
                                        Đặt lợi ích khách hàng lên trên hết, chúng tôi hỗ trợ khách hàng nhanh và chính xác nhất với dịch vụ tin cậy, giá trị đích thực
                        </div>
                                </div>
                                <div className="with-baodam">
                                    <i className='fas fa-check icon-baodam' ></i>
                                    <div>
                                        Chúng tôi liên kết chặt chẽ với các đối tác, khảo sát định kỳ để đảm bảo chất lượng tốt nhất của dịch vụ
                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*}
                <div className="tin-tuc" style={{ textAlign: 'center', fontSize: '28px' }}>
                    TIN TỨC ĐƯỜNG SẮT VIỆT NAM
                    <br />
                    <img src="images/icon-accmod.png" alt="img" className="text-center" /></div>
                <div className="container cover-dich-vu">
                    <div className="width50percent">
                        <img src="images/tin-tuc1.jpg" className="width100persent" alt="img" />
                    </div>
                    <div className="width50percent">
                        <div className="padding-left-right-30">
                            <div className="title-dich-vu">Sau tết, đường sắt giảm giá vé tàu đến 50%</div>
                            <p>Cụ thể từ ngày 1-3, đối với tuyến TP.HCM - Hà Nội, Tổng công ty Đường sắt Việt Nam tổ chức chạy các đoàn tàu SE3/SE4, SE7/SE8. Trong đó, đôi tàu SE3/SE4 xuất phát tại ga Sài Gòn và Hà Nội lúc 19h25, còn đôi tàu SE7/SE8 xuất phát tại Sài Gòn, Hà Nội lúc 6h.</p>
                            <p>Tuyến Sài Gòn - Đà Nẵng chạy tàu SE21/SE22 từ ngày 1 đến ngày 7-3. Trong đó tàu SE22 xuất phát tại ga Sài Gòn lúc 11h40, tàu SE21 xuất phát tại Đà Nẵng lúc 9h12. Tuyến Sài Gòn - Nha Trang chạy tàu SNT2 xuất phát từ ga Sài Gòn lúc 20h thứ sáu hằng tuần, còn tàu SNT1 xuất phát tại ga Nha Trang lúc 20h chủ nhật hằng tuần.</p>
                            <p>Từ ngày 1-3 đến hết ngày 28-4, khách đi các đoàn tàu SE3/SE4, SE7/SE8 với cự ly vận chuyển trên 900km và tàu SE21/SE22 với cự ly trên 600km sẽ được giảm giá từ 5-50%. Mức giảm giá tùy vào thời gian mua vé trước ngày tàu chạy từ 5 ngày trở lên. Chẳng hạn, mua trước 5 đến 9 ngày giảm 5%, còn mua trước 50 ngày trở lên giảm 50%...</p>
                            <a href="#">Xem thêm...</a>
                        </div>
                    </div>
                </div>
                <div className="backgroud-white">
                    <div className="container cover-dich-vu">
                        <div className="width50percent">
                            <img src="images/tin-tuc2.jpg" className="width100persent" alt="img" />
                        </div>
                        <div className="width50percent">
                            <div className="padding-left-right-30">
                                <div className="title-dich-vu">Khách đi máy bay, tàu hỏa dịp Tết Nguyên đán Tân Sửu giảm 2/3 </div>
                                <p>Ủy ban An toàn giao thông quốc gia cho biết như vậy trong báo cáo tổng hợp vừa gửi Văn phòng Chính phủ chiều 16-2 về tình hình trật tự, an toàn giao thông 7 ngày nghỉ Tết Nguyên đán Tân Sửu 2021.</p>
                                <p>Cụ thể, trong 7 ngày nghỉ Tết, các sân bay Việt Nam đạt 9.500 lượt hạ, cất cánh với gần 815.600 hành khách, giảm 43,4% số lượng chuyến bay, giảm 66,6% số lượng hành khách so với cùng kỳ Tết Nguyên đán năm 2020. Điểm sáng duy nhất là vận tải hàng hóa bằng máy bay đạt 14.000 tấn hàng hóa, tăng 3,3% so với cùng thời điểm Tết Nguyên đán năm 2020. </p>
                                <a href="#">Xem thêm...</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="backgroud-white">
                    <div className="container cover-dich-vu">
                        <div className="width50percent">
                            <img src="images/tin-tuc3.jpg" className="width100persent" alt="img" />
                        </div>
                        <div className="width50percent">
                            <div className="padding-left-right-30">
                                <div className="title-dich-vu">Dừng chạy tàu từ Hà Nội vào miền Trung vì đường ngập</div>
                                <p>Theo thông tin từ Tổng công ty Đường sắt Việt Nam, từ lúc 1h18 phút ngày 18-10 nước lũ đã làm ngập 200m đường sắt từ km 617+600 đến 617+800 giữa ga Hà Thanh và ga Đông Hà (Quảng Trị). Đoạn đường sắt này bị nước ngập trên đỉnh đường ray 7cm, nước lên nhanh và chảy xiết.</p>
                                <p>Đến 1h45 phút ngày 18-10, nước lũ ngập 17cm trên đỉnh ray và chảy xiết qua 1km đường sắt ở khu vực trên nên phải dừng chạy tàu.
Tổng cộng có 4 đoàn tàu khách, SE1, SE3, SE7, SE8 phải dừng tại các ga Đông Hà, Tiên An, Đồng Hới để tránh lũ. Có 12 đoàn tàu chở hàng phải dừng dọc đường với tổng thời gian chậm 9.747 phút.</p>
                               <a href="#">Xem thêm...</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="container">
            <div className="txt-toa-tau">TOA TÀU</div>
            <div className="text-align-center"><img src="images/icon-accmod.png" alt="img" /></div>
            <div className="owl-carousel">
                <div className="item">
                    <div className="backgroud-white">
                        <img src="images/Giuong.jpg" alt="image" className="img-toa-tau" />
                        <div>
                            <div className="title-toa-tau">Hệ thống giường nằm</div>
                            <div className="cover-infor-toa-tau">
                                <div className="margin-auto">
                                    <img src="images/decimal.png" className="icon-toa-tau" alt="img" />
                                    <div>3m2</div>
                                </div>
                                <div className="margin-auto">
                                    <img src="images/giuong.png" className="icon-toa-tau" alt="img"/>
                                    <div>4 giường ngủ</div>
                                </div>
                                <div className="margin-auto">
                                    <img src="images/dooe.png" className="icon-toa-tau" alt="img"/>
                                    <div>View cửa sổ</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>         
            </div>
        </div> */}
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Home;
