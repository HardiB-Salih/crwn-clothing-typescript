import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectCartTotal } from "../../store/cart/cart.select";
import { selectCurrentUser } from "../../store/user/user.select";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { StripeCardElement } from "@stripe/stripe-js";

const ifValidCardElement = (
  card: StripeCardElement | null
): card is StripeCardElement => card !== null;

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessingPayment(true);
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    console.log(response);

    const {
      paymentIntent: { client_secret },
    } = response;

    const cardDetails = elements.getElement(CardElement);
    if (!ifValidCardElement(cardDetails)) return;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful!");
        // We could remove The thing
      }
    }
  };

  return (
    <Wrapper>
      <FormWrapper onSubmit={paymentHandler}>
        <h2>Cridit Card Payment:</h2>
        <CardElement />
        <Button
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay Now
        </Button>
      </FormWrapper>
    </Wrapper>
  );
};

export default PaymentForm;

const Wrapper = styled.div`
  height: 300px;
  background: rgba(255, 255, 255, 0.6);
  border: 0.5px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0px 2px 10px rgba(34, 79, 169, 0.3);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  margin-bottom: 150px;
  margin-top: 50px;
  padding: 30px;
`;

const FormWrapper = styled.form`
  display: grid;
  gap: 20px;
  height: 100px;
  min-width: 400px;
  padding: 30px;
`;
