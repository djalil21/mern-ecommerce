import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import "../app.css";
import ScrollToTop from "./ScrollToTop";
const DashboardLayout = () => {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="content">
          <ScrollToTop />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
