import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${mobile({ height: "40vh" })}
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobile({ fontSize: "50px" })}
`;
const Description = styled.div`
  font-size: 24px;
  font-weight: 200;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;
const Input = styled.input`
  flex-grow: 9;
  padding-left: 20px;
  border-radius: 5px;
  border: 0.5px solid gray;
`;
const Button = styled.button`
  flex-grow: 1;
  background-color: coral;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

export const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favorite products.</Description>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};
