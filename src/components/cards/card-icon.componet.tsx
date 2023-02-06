import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ReactComponent as ShoppingCard } from "../../assets/shopping-bag.svg";
import { setIsCartOpen } from "../../store/cart/cart.action";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.select";

const CardIcon = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const toggle = useSelector(selectIsCartOpen);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!toggle));

  return (
    <Wrapper onClick={toggleIsCartOpen}>
      <Icon />
      <Span>{cartCount}</Span>
    </Wrapper>
  );
};

export default CardIcon;

const Wrapper = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Icon = styled(ShoppingCard)`
  width: 24px;
  height: 24px;
`;
const Span = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`;
