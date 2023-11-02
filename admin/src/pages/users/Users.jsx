import "./users.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DeleteOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/apiCalles";
import avatar from "../../avatar.png";

const Users = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(true);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch, deleted]);

  const handleDelete = (id) => {
    deleteUser(dispatch, id);
    setDeleted(!deleted);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "username",
      headerName: "User",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="listUser">
            <img src={avatar} alt="" className="listImg" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "action",
      headerName: "action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="users">
      <div className="usersTitleContainer">
        <h1 className="usersTitle">Edit User</h1>
        <Link to="/newuser">
          <button className="newUsersButton">New User</button>
        </Link>
      </div>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        getRowId={(row) => row._id}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        checkboxSelection
        className="dataGrid"
      />
    </div>
  );
};

export default Users;
