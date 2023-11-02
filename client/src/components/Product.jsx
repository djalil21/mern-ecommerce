/* eslint-disable react/prop-types */
import styled from "styled-components";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCart";
import LaunchOutlinedIcon from "@mui/icons-material/Launch";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
`;

const Price = styled.p`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 15px;
  z-index: 4;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  justify-content: center;
`;

const Container = styled.div`
  flex: 1 calc(25% - 10px);
  margin: 5px;
  max-width: calc(25% - 10px);
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;
const Image = styled.img`
  height: 75%;
  width: 75%;
  object-fit: contain;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border-color: white;
  background-color: rgba(233, 245, 245, 0.2);
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgb(233, 245, 245);
    transform: scale(1.1);
  }
`;

export const Product = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Icon>
          <AddShoppingCartOutlinedIcon />
        </Icon>
        <Link to={`/product/${item._id}`}>
          <Icon>
            <LaunchOutlinedIcon />
          </Icon>
        </Link>

        <Icon>
          <FavoriteBorderOutlinedIcon />
        </Icon>
      </Info>
      <Price>{item.price}$</Price>
    </Container>
  );
};
