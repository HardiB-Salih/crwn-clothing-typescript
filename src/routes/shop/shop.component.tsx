import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchCatogariesStart } from "../../store/catogaries/catogaries.action";
import CatogariesPrevew from "../catogaries-prevew/catogaries-prevew.component";
import Catogary from "../catogary/catogary.component";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatogariesStart());
  });

  return (
    <Routes>
      <Route index element={<CatogariesPrevew />} />
      <Route path=":catogary" element={<Catogary />} />
    </Routes>
  );
};

export default Shop;
