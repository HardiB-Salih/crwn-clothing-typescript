import { useSelector } from "react-redux";
import styled from "styled-components";
import CheckoutItem from "../../components/cards/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.select";

const CheckOut = () => {
  const cartItems = useSelector(selectCartItems);
  const totalCount = useSelector(selectCartTotal);

  return (
    <Wrapper>
      <Header>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </Header>

      {cartItems.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}

      <Total>Total: ${totalCount}</Total>
      <PaymentForm />
    </Wrapper>
  );
};

export default CheckOut;

const Wrapper = styled.div`
  width: 55%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;
`;
const Header = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
`;
const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%;
  &:last-child {
    width: 8%;
  }
`;

const Total = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;
