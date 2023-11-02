import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
import "./newProdcut.css";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const categories = ["men", "women", "shoes", "shirt", "pants", "hat", "jacke"];
const colors = ["white", "black", "blue", "green", "red", "pink", "orange"];

const NewProduct = () => {
  const [input, setInput] = useState({});
  const [file, setFile] = useState(null);
  const [category, setCategories] = useState([]);
  const [color, setColor] = useState([]);
  const isFetching = useSelector((state) => state.product.isFetching);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCatgory = (e, value) => {
    setCategories(value);
  };
  const handleColor = (e, value) => {
    setColor(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filename = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...input,
            img: downloadURL,
            categories: category,
            color,
          };
          addProduct(dispatch, product);
          navigate("/products");
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Apple Airpods"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" id="stock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description ..."
            onChange={handleChange}
            name="desc"
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={categories}
            disableCloseOnSelect
            onChange={handleCatgory}
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            )}
            style={{ width: 250 }}
            renderInput={(params) => (
              <TextField {...params} placeholder="categories" />
            )}
          />
        </div>
        <div className="addProductItem">
          <label>Colors</label>
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={colors}
            disableCloseOnSelect
            onChange={handleColor}
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                <span
                  className="colorSpan"
                  style={{ backgroundColor: option }}
                ></span>
                {option}
              </li>
            )}
            style={{ width: 250 }}
            renderInput={(params) => (
              <TextField {...params} placeholder="colors" />
            )}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            type="text"
            placeholder="100"
            onChange={handleChange}
            name="price"
          />
        </div>
        <button className="addProductButton">Create</button>
        {isFetching && <CircularProgress color="inherit" />}
      </form>
    </div>
  );
};

export default NewProduct;
