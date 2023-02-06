import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProductCard from "../../components/cards/product-card.compoent";
import Spinner from "../../components/spinner/spinner.component";
import {
  selectCatogariesIsLoading,
  selectCatogariesMap,
} from "../../store/catogaries/catogaries.select";

// we need to make sure have this for param for PAGING
type CatogaryRouteParams = {
  catogary: string;
};

const Catogary = () => {
  const { catogary } = useParams<
    keyof CatogaryRouteParams
  >() as CatogaryRouteParams;
  const catogariesMap = useSelector(selectCatogariesMap);
  const isLoading = useSelector(selectCatogariesIsLoading);
  const [products, setProducts] = useState(catogariesMap[catogary]);

  useEffect(() => {
    setProducts(catogariesMap[catogary]);
  }, [catogary, catogariesMap]);

  return (
    <Fragment>
      <H2>{catogary}</H2>
      {isLoading ? (
        <Spinner />
      ) : (
        <Wrapper>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </Wrapper>
      )}
    </Fragment>
  );
};

export default Catogary;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
  padding: 0px 30px 50px;
`;

const H2 = styled.h2`
  text-transform: capitalize;
  font-size: 28px;
  margin-bottom: 25px;
  text-align: center;
  cursor: pointer;
`;
