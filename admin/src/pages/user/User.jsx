import { Link, useLocation, useNavigate } from "react-router-dom";
import "./User.css";
import avatar from "../../avatar.png";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../redux/apiCalles";
const User = () => {
  const path = useLocation();
  const pathId = path.pathname.split("/")[2];
  const user = useSelector((state) =>
    state.users.users.find((item) => item._id === pathId)
  );

  const [input, setInput] = useState(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, ...others } = input;
    updateUser(dispatch, pathId, others);
    navigate("/users");
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newuser">
          <button className="newUserButton">New User</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userDetails">
          <div className="userDetailsTop">
            <img src={avatar} className="userDetailsTopImage" alt="" />
            <div className="userDetailsTopTitle">
              <span className="userDetailsTopName">{user.username}</span>
              <span className="userDetailsTopRole">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="userEdit">
          <span className="updateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateFormLeft">
              <div className="userUpdateItem">
                <label htmlFor="username" className="userUpdateLabel">
                  username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={input.username}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label htmlFor="fullname" className="userUpdateLabel">
                  fullname
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  placeholder="full name"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label htmlFor="email" className="userUpdateLabel">
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={input.email}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label htmlFor="phone" className="userUpdateLabel">
                  phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label htmlFor="address" className="userUpdateLabel">
                  address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateFormRight">
              <div className="userUpdateUpload">
                <img className="userUpdateImg" src={avatar} alt="" />
                <label htmlFor="file" className="userUpdateLabel">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
