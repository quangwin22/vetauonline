import logo from './logo.svg';
import SS from './SS.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function Header() {
    return (
        <div className="style-header">
            <div className="banner-cover">
                <div className="wieght1">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div className="Title-Header">VÉ TÀU TRỰC TUYẾN ONLINE 2021</div>
                </div>
                <div className="wieght2">
                    <img src="/images/Logo_iuh.png" className="App2-logo" alt="logo" />
                    <div className="Title-Header1">INDUSTRIAL UNIVERSITY HOCHIMING CTY</div>
                </div>
            </div>
            <nav className="navbar navbar-expand-sm navbar-dark navbarv2">
                <div className="width100persent">
                    <ul className="navbar-nav ul-cover-nav" >
                        <li className="nav-item">
                            <a className="nav-link"><Link to="/" className="nav-link">TRANG CHỦ</Link></a>
                        </li>
                        <li className="nav-item">
                            {//thong-tin-lich-trinh
                            }
                            <a className="nav-link"><Link to="/thong-tin-lich-trinh" className="nav-link">THÔNG TIN LỊCH TRÌNH</Link></a>
                        </li>
                        <li className="nav-item">
                            {//quan-ly-dat-cho
                            }
                            <a className="nav-link"><Link to="/quan-ly-dat-cho" className="nav-link">XEM THÔNG TIN VÉ ĐÃ ĐẶT</Link></a>
                        </li>
                        <li className="nav-item">
                            {//cam-nang
                            }
                            <a className="nav-link"><Link to="/cam-nang" className="nav-link">HƯỚNG DẪN ĐẶT VÉ ONLINE</Link></a>
                        </li>
                        <li className="nav-item">
                            {///quy-dinh
                            }
                            <a className="nav-link"><Link to="/quy-dinh" className="nav-link">CÁC QUY ĐỊNH</Link></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>


    );
}

export default Header;
