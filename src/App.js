import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLayout from "./admin/Layout/AdminLayout.jsx"
import AdminLogin from "./admin/Login/Login.jsx"
import Dashboard from "./admin/Dashboard/Index.jsx"
import PaymentList from "./admin/PaymentList/PaymentList.jsx"
import UserList from "./admin/UserList/userList.jsx"
import NotFoundPage from './admin/compontents/NotFoundPage.js';
import BookingList from './admin/Bookingmanagement/BookingList.jsx';
import PackageList from './admin/Packagemanagement/PackageList.jsx';


function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="*" element={<NotFoundPage />} /> 
          <Route path="/access-admin" element={<AdminLayout>   <Dashboard />          </AdminLayout>} />
          <Route path='/' element={<AdminLogin />} />
          <Route path="/access-admin/payment" element={<AdminLayout> <PaymentList /> </AdminLayout>} />
          <Route path="/access-admin/user" element={<AdminLayout> <UserList />  </AdminLayout>} />
          <Route path="/access-admin/booking" element={<AdminLayout> <BookingList />  </AdminLayout>} />
          <Route path="/access-admin/package" element={<AdminLayout>   <PackageList />          </AdminLayout>} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
