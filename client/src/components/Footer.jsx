import styled from "styled-components";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { MailOutline, Phone, Room } from "@mui/icons-material";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ flexDirection: "column", backgroundColor: "#fff8f8" })}
`;
const Left = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
  ${mobile({ alignItems: "center" })}
`;
const Logo = styled.h1``;
const Desc = styled.div`
  margin: 2px 0px;
  max-width: 80%;
`;
const SocialContainer = styled.div`
  display: flex;
  /* gap: 10px; */
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  ${mobile({ display: "none" })}
`;
const Title = styled.h3`
  margin-bottom: 20px;
`;
const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 10px;
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  width: 200px;
`;

export const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Djalil.</Logo>
        <Desc>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which dont look even slightly believable.
        </Desc>
        <SocialContainer>
          <SocialIcon color="#3B5999">
            <FacebookOutlinedIcon />
          </SocialIcon>
          <SocialIcon color="#E4405F">
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color="#55ACEE">
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon color="#E60023">
            <PinterestIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} />
          622 Dixie Path , South Tobinchester 98336
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} />
          +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} />
          <a
            style={{ color: "black", textDecoration: "none" }}
            href="mailto:abdeldjalil.bouzenzana@univ-constantine2.dz"
          >
            abdeldjalil.bouzenzana@univ-constantine2.dz
          </a>
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};
