import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLayout from "./admin/Layout/AdminLayout.jsx"
import AdminLogin from "./admin/Login/Login.jsx"
import Dashboard from "./admin/Dashboard/Index.jsx"
import PaymentList from "./admin/PaymentList/PaymentList.jsx"
import UserList from "./admin/UserList/userList.jsx"
import BookingList from "./admin/Bookingmanagement/BookingList.jsx"


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/access-admin" element={<AdminLayout>   <Dashboard />          </AdminLayout>} />
          <Route path='/access-admin/login' element={<AdminLogin />} />
          <Route path="/access-admin/payment-list" element={<AdminLayout> <PaymentList /> </AdminLayout>} />
          <Route path="/access-admin/user-list" element={<AdminLayout> <UserList />  </AdminLayout>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
