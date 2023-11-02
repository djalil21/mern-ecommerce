import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/PaymentForm";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Key = import.meta.env.VITE_STRIPE_PUBLIC;

const stripeTestPromise = loadStripe(Key);

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #f5fbfd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin: 30px;
  font-weight: 400;
`;
const Stripe = () => {
  const location = useLocation();
  const total = location.state.total;

  return (
    <Container>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
        alt=""
        style={{ width: "200px" }}
      />
      <Title>you will pay: {total}$</Title>
      <Elements stripe={stripeTestPromise}>
        <PaymentForm total={total} />
      </Elements>
    </Container>
  );
};

export default Stripe;
