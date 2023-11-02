import { Badge } from "@mui/material";
import "./topbar.css";
import {
  Language,
  Logout,
  NotificationsNone,
  Settings,
} from "@mui/icons-material";
import { logout } from "../../redux/userRedux";
import { useDispatch } from "react-redux";
const Topbar = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout());
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Djalil.</span>
        </div>
        <div className="topRight">
          <Badge badgeContent={4} color="primary" className="topIconBadge">
            <NotificationsNone />
          </Badge>

          <Badge className="topIconBadge">
            <Language />
          </Badge>

          <Badge className="topIconBadge">
            <Settings />
          </Badge>

          <button
            onClick={handleClick}
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              margin: 0,
            }}
          >
            <Logout />
          </button>

          <img
            src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
