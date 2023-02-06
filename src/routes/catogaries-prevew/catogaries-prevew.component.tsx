import { Fragment } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CatogaryPriview from "../../components/category-item/catogary-priview.component";
import Spinner from "../../components/spinner/spinner.component";
import {
  selectCatogariesIsLoading,
  selectCatogariesMap,
} from "../../store/catogaries/catogaries.select";

const CatogariesPrevew = () => {
  const catogariesMap = useSelector(selectCatogariesMap);
  const isLoading = useSelector(selectCatogariesIsLoading);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <Wrapper>
          {Object.keys(catogariesMap).map((title) => {
            const products = catogariesMap[title];
            return (
              <CatogaryPriview key={title} title={title} products={products} />
            );
          })}
        </Wrapper>
      )}
    </Fragment>
  );
};

export default CatogariesPrevew;

const Wrapper = styled.div`
  padding: 0px 30px 40px;
`;
