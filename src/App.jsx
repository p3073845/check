import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import SiteManagement from "./pages/SiteManagement";

// Lazy load pages
const Login = lazy(() => import("./pages/Login"));
const PanelManagement = lazy(() => import("./pages/PanelManagement"));
const RollAssign = lazy(() => import("./pages/RollAssign"));
const ClientManagement = lazy(() => import("./pages/ClientManagement"));
const SiteUser = lazy(() => import("./pages/SiteUser"));
const AddClient = lazy(() => import("./pages/AddClient"));
const AddUser = lazy(() => import("./pages/Adduser"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const NotFound = lazy(() => import("./components/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Layout = lazy(() => import("./components/Layout"));
import AddSite from './pages/AddSite';
import AdminManagement from "./pages/AdminManagement";
import AddAdmin from "./pages/AddAdmin";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

// Loader fallback
const LoadingSpinner = () => (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App() {
  return (
    <>
      <ToastContainer  
        position="top-right"
        margin={10}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
        pauseOnHover
        style={{
          zIndex: 99999,
          top: '60px'
        }}
       
      />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={ <ProtectedRoute> <Layout /> </ProtectedRoute> } >
            <Route index element={<Dashboard />} />
            <Route path="admin-management" element={<AdminManagement />} />
            <Route path="add-admin" element={<AddAdmin />} />
            <Route path="panel-management" element={<PanelManagement />} />
            <Route path="roll-assign" element={<RollAssign />} />
            <Route path="client-management" element={<ClientManagement />} />
            <Route path="site-management" element={<SiteManagement />} />
            <Route path="site-user" element={<SiteUser />} />
            <Route path="add-client" element={<AddClient />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="add-site" element={<AddSite />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
