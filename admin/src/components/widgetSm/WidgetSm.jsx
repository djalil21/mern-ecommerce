import { Visibility } from "@mui/icons-material";
import "./widgetsm.css";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import avatar from "../../avatar.png";

const WidgetSm = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("user", {
          params: { new: true },
        });
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);
  return (
    <div className="widgetsm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img src={user.img || avatar} alt="" className="widgetSmAvatar" />
            <div className="widgetSmUser">
              <span className="widgetSmUserName">{user.username}</span>
              <span className="widgetSmUserRole">Software Engineer</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Show
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetSm;
