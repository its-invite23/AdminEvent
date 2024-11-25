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
import AddPackage from './admin/Packagemanagement/AddPackage.jsx';
import ContactList from "./admin/ContactList/ContactList.js";
import Enquiry from "./admin/Enquiry/Enquiry.js";
import BookingView from './admin/Bookingmanagement/BookingView.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/access-admin" element={<AdminLayout> <Dashboard /> </AdminLayout>} />
          <Route path='/' element={<AdminLogin />} />
          <Route path="/access-admin/payment" element={<AdminLayout> <PaymentList /> </AdminLayout>} />
          <Route path="/access-admin/package-add" element={<AdminLayout> <AddPackage /> </AdminLayout>} />
          <Route path="/access-admin/access-package-edit/:Id" element={<AdminLayout> <AddPackage /> </AdminLayout>} />
          <Route path="/access-admin/user" element={<AdminLayout><UserList /> </AdminLayout>} />
          <Route path="/access-admin/booking" element={<AdminLayout> <BookingList />  </AdminLayout>} />
          <Route path="/access-admin/booking/:Id" element={<AdminLayout> <BookingView />  </AdminLayout>} />

          <Route path="/access-admin/package" element={<AdminLayout>  <PackageList /> </AdminLayout>} />
          <Route path="/access-admin/contact" element={<AdminLayout>  <ContactList /> </AdminLayout>} />
          <Route path="/access-admin/enquiry" element={<AdminLayout>  <Enquiry /> </AdminLayout>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
