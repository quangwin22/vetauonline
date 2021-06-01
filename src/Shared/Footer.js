import logo from './logo.svg';
import { BrowserRouter as Router, Link } from 'react-router-dom';
function Footer() {
    return (
        <div>
            <div className="footer-line">

            </div>
            <div className="footer-cover">
                <div className="container footer-container" >
                    <div className="width25percent text-center">
                    <Link to="/dang-nhap">  
                        <div className="font-size20">VÉ TÀU TRỰC TUYẾN</div>
                        </Link>
                        
                        <div className="text-center1">   
                                           
                            <img src={logo} className="App-logo center-logo" alt="logo" />
                            
                        </div>
                        
                        <div className="text-center2">
                            © 2021 VeTauOnline2021 All rights reserved.
                        </div>  
                    </div>

                    <div className="width25percent">
                        <div className="font-size20">VỀ CHÚNG TÔI</div>
                        <div className="footer-info">
                            <p><i className=""></i>Tổng công ty Đường sắt Việt Nam.</p>
                            <p><i className=""></i>Giấy chứng nhận ĐKKD số 15098921 theo QĐ thành lập số 13/QĐ-TTg ngày 01/03/2021 của Thủ tướng Chính phủ.</p>
                            <p><i className=""></i>Mã số doanh nghiệp: 15098921, đăng ký lần đầu ngày 01/03/2021,</p>
                        </div>
                    </div>
                    <div className="width25percent">
                        <div className="font-size20">THÔNG TIN LIÊN HỆ</div>
                        <div className="footer-info">
                            <p><i className="fa fa-map-marker mr-3"></i> 12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, TP.HCM</p>
                            <p><i className="fas fa-phone mr-3"></i>HOT LINE: 0797867387</p>
                            <p><i className="fas fa-envelope mr-3"></i> vetauonline2021@gmail.com</p>
                        </div>
                    </div>
                    <div className="width25percent text-center">
                        <div className="font-size20">CÁC KÊNH THÔNG TIN CHÍNH THỨC</div>
                        <div className="color-icon">
                            <a href="https://www.facebook.com/"><i className="fab fa-facebook footer-icon"></i></a>
                            <a href="https://www.youtube.com/"><i className="fab fa-youtube footer-icon"></i></a>
                            <a href="https://www.instagram.com/"><i className="fab fa-instagram footer-icon" ></i></a>
                            <a href="https://twitter.com/"><i className="fab fa-twitter footer-icon"></i></a>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
export default Footer;
