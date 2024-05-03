import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";

// Public Routes Paths
import Login from "./auth/Login";
// Admin Routes Paths
import AdminCreate from "./components/AdminCreate";
import UserCreate from "./components/UserCreate";

// SuperAdmin Routes Paths
// import SuperAdmin from "./auth/SuperAdmin";
import SuperadminDashboard from "./components/SuperadminDashboard";

import UserDashboard from "./components/UserDashboard";
// Other Paths
import Home from "./Pages/Home";
import Category from "./Pages/Category";
import Address from "./Pages/Address";
import NewContact from "./Pages/NewContact";
import Birthday from "./Pages/Birthday";
import Printlabel from "./Pages/Printlabel";
import Reports from "./Pages/Reports";
import ErrorPage from "./Pages/ErrorPage";

// Update  paths
import UpdateCategory from "./components/UpdateCategory";
import UpdateContacts from "./components/UpdateContacts";
import AdminHome from "./Pages/AdminHome";
// import UpdateCountry from "./components/UpdateCountry";
// import UpdateState from "./components/UpdateState";
// import UpdateDistrict from "./components/UpdateDistrict";

// import MyForm from "./Myform";

function App() {
  return (
    <div className="grid-container">
      <ToastContainer />

      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/admincreate" element={<AdminCreate />} />
          <Route path="/usercreate" element={<UserCreate />} />

          {/* Superadmin Routes */}
          {/* <Route path="/superadmin" element={<SuperAdmin />} /> */}
          <Route path="/superadminDashb" element={<SuperadminDashboard />} />

          {/* User Routes */}
          <Route path="/useradshboard" element={<UserDashboard />} />

          {/* Testing contact form */}
          {/* <Route path="/myform" element={<MyForm />} /> */}

          {/* Category Routes */}
          <Route path="/category" element={<Category />} />
          <Route path="/updatecategory/:id" element={<UpdateCategory />} />

          {/* Address Routes */}
          <Route path="/address" element={<Address />} />
          {/* <Route path="/updatecountry/:id" element={<UpdateCountry />} />
          <Route path="/updatestate/:id" element={<UpdateState />} />
          <Route path="/updatedistrict/:id" element={<UpdateDistrict />} /> */}
          <Route path="/updatecontacts/:id" element={<UpdateContacts />} />

          {/* Other Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/newcontact" element={<NewContact />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/birthday" element={<Birthday />} />
          <Route path="/printlabel" element={<Printlabel />} />

          {/* 404 Error Page for unmatched routes */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
