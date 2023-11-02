/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Product } from "./Product";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
`;
export const Products = ({ home, category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("product/", {
          params: {
            category,
            order: "newest",
          },
        });
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    if (!home) {
      if (filters.color === "all") {
        delete filters["color"];
      }
      if (filters.size === "all") {
        delete filters["size"];
      }
      setFilteredProducts(
        products.filter((item) => {
          return Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          );
        })
      );
    }
  }, [products, filters, home]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  // method if has a lot of products filtering should be on backend
  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:3000/api/product/", {
  //         params: {
  //           category,
  //           order: sort,
  //           color: filters.color,
  //           size: filters.size,
  //         },
  //       });

  //       setProducts(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getProducts();
  // }, [category, filters, sort]);

  return (
    <Container>
      {!home
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};
