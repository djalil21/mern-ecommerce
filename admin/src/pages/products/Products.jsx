import "./products.css";
import { useEffect, useState } from "react";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalles";

const Products = () => {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(true);
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch, deleted]);

  const handleDelete = async (id) => {
    await deleteProduct(dispatch, id);
    setDeleted(!deleted);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "title",
      headerName: "Name",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="listProduct">
            <img src={params.row.img} alt="" className="listProductImg" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 100 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,
    // },
    {
      field: "price",
      headerName: "price",
      width: 120,
    },
    {
      field: "action",
      headerName: "action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="products">
      <div className="productTopContainer">
        <h1 className="productTopTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        getRowId={(row) => row._id}
        rows={products}
        rowHeight={60}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        className="dataGrid"
      />
    </div>
  );
};

export default Products;
