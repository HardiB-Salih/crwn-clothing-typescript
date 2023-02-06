import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CatogaryItem } from "../../store/catogaries/catogaries.type";
import ProductCard from "../cards/product-card.compoent";

type CatogaryPriviewProps = {
  title: string;
  products: CatogaryItem[];
};

const CatogaryPriview: FC<CatogaryPriviewProps> = ({ title, products }) => {
  return (
    <Wrapper>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Privew>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Privew>
    </Wrapper>
  );
};

export default CatogaryPriview;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Title = styled(Link)`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
`;

const Privew = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
`;
