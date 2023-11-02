import { Publish } from "@mui/icons-material";
import Chart from "../../components/chart/Chart";
import "./product.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { updateProduct } from "../../redux/apiCalles";
import app from "../../firebase";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Product = () => {
  const path = useLocation();
  const pathId = path.pathname.split("/")[2];
  const product = useSelector((state) =>
    state.product.products.find((item) => item._id === pathId)
  );
  const [input, setInput] = useState(product);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [stats, setStats] = useState([]);
  useEffect(() => {
    const getStats = async () => {
      const res = await userRequest.get("order/income", {
        params: { productId: product._id },
      });
      res.data.map((item) =>
        setStats((prev) => [
          ...prev,
          { name: MONTHS[item._id - 1], Sales: item.total },
        ])
      );
    };
    getStats();
  }, [product._id]);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filename = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
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
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...input, img: downloadURL };
          updateProduct(dispatch, pathId, product);
          navigate("/products");
        });
      }
    );
  };

  return (
    <div className="product">
      <div className="productTopContainer">
        <h1 className="productTopTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productDetailsContainer">
        <div className="productDetailsSales">
          <Chart
            title="Sales Performance (last 3 months)"
            data={stats}
            dataKey="Sales"
          />
        </div>
        <div className="productDetailsInfo">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id: </span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">12</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">price:</span>
              <span className="productInfoValue">{product.price}$</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">categories</span>
              <span className="productInfoValue">
                {product.categories.join(`, `)}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">colors</span>
              <span className="productInfoValue">
                {product.color.join(`, `)}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{`${product.inStock}`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productEditContainer">
        <form className="productForm" onSubmit={handleSubmit}>
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              value={input.title}
              name="title"
              onChange={handleChange}
            />
            <label>Product Description</label>
            <input
              type="text"
              value={input.desc}
              name="desc"
              onChange={handleChange}
            />
            <label>Price</label>
            <input
              type="text"
              value={input.price}
              name="price"
              onChange={handleChange}
            />
            <label>In Stock</label>
            <select name="inStock" id="idStock" onChange={handleChange}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
