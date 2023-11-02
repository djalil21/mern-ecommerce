import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "@mui/icons-material";
import { logout } from "../redux/userRedux";

const Container = styled.div`
  height: 60px;
  opacity: 0.9;
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: white;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "10px" })}
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
  color: black;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-right: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const currentUSer = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <Logo>Djalil.</Logo>
          </Link>
        </Center>
        <Right>
          {!currentUSer ? (
            <>
              <Link
                to="/auth/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>Register</MenuItem>
              </Link>
              <Link
                to="/auth/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>Login</MenuItem>
              </Link>
            </>
          ) : (
            <>
              <MenuItem>Welcome {currentUSer.username}</MenuItem>
              <MenuItem onClick={() => dispatch(logout())}>
                <Logout />
              </MenuItem>
            </>
          )}
          <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
            <Badge
              badgeContent={quantity}
              color="primary"
              style={{ right: "10px" }}
            >
              <ShoppingCartOutlinedIcon />
            </Badge>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
