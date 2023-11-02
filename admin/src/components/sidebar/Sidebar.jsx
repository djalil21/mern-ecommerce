import {
  Article,
  BarChart,
  ChatBubble,
  DynamicFeed,
  Home,
  Mail,
  Paid,
  Person,
  Report,
  Storefront,
  Timeline,
  TrendingUp,
  Work,
} from "@mui/icons-material";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
const Sidebar = () => {
  const location = useLocation().pathname.split("/")[1];

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className={`sidebarListItem ${location === "" && "active"}`}>
                <Home className="sidebarIcon" /> Home
              </li>
            </Link>
            <Link to="/users" className="link">
              <li
                className={`sidebarListItem ${
                  (location === "users" || location === "user") && "active"
                }`}
              >
                <Person className="sidebarIcon" /> Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li
                className={`sidebarListItem ${
                  (location === "products" || location === "product") &&
                  "active"
                }`}
              >
                <Storefront className="sidebarIcon" /> Products
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" /> Analytics
            </li>

            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" /> Sales
            </li>
            <li className="sidebarListItem">
              <Paid className="sidebarIcon" /> Transactions
            </li>
            <li className="sidebarListItem">
              <Article className="sidebarIcon" /> Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <Mail className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubble className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <Work className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
