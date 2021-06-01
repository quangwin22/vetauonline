import './App.css';
import { 
	BrowserRouter as Router, 
	Route
} from 'react-router-dom'; 
import Homes from './Home';
import Bookings from './Bookinng';
import Handbooks from './Handbook';
import Introduces from './Introduce';
import UpdateBookings from './UpdateBooking';
import Details from './Detail';
import Login from './Admin/Login';
import Revenue from './Admin/RevenueStatistics';
import Schedule from './Admin/ScheduleManagement';
import Ticket from './Admin/Tickets';
import Paymenth from './paymenth';
import DataVe from './Admin/DataVe';
import DeleteTicketView from './Admin/DeleteTickets';


function Layout() {
  return (
    <div className="App">
        <Router>
        <div>
          <Route exact path='/' component={Homes} />
          <Route path='/thong-tin-lich-trinh' component={Bookings} />
          <Route path='/cam-nang' component={Handbooks} />
          <Route path='/quy-dinh' component={Introduces} />
          <Route path='/quan-ly-dat-cho' component={UpdateBookings} />
          <Route path='/chi-tiet' component={Details} />
          <Route path='/dang-nhap' component={Login} />
          <Route path='/thong-ke-theo-tuan-thang' component={DataVe} />
          <Route path='/quan-ly-lich-trinh' component={Schedule} />
          <Route path='/thong-ke-doanh-thu' component={Revenue} />
          <Route path='/thong-tin-dat-ve' component={Ticket} />
          <Route path='/thong-tin-dat-ve-da-huy' component={DeleteTicketView} />
          <Route path='/thanh-toan' component={Paymenth} />
        </div>
      </Router>
    </div>
  );
}

export default Layout;
