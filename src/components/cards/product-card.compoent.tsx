import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.select";
import { CatogaryItem } from "../../store/catogaries/catogaries.type";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

type ProductCardProps = {
  product: CatogaryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, price, imageUrl } = product;

  const addProductToCard = () => dispatch(addItemToCart(cartItems, product));
  return (
    <Wrapper>
      <Image src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={addProductToCard}>
        Add To Card
      </Button>
    </Wrapper>
  );
};

export default ProductCard;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;
  * {
    transition: 0.5s ease-in-out;
  }

  :hover {
    img {
      opacity: 0.8;
    }
    button {
      opacity: 0.85;
      display: flex;
    }
  }

  button {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
    display: none;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 95%;
  object-fit: cover;
  margin-bottom: 5px;
`;
const Footer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;
const Name = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;
const Price = styled.span`
  width: 10%;
`;
