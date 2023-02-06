import { createSelector } from "reselect";
import { RootState } from "../store";
import { CatogariesState } from "./catogaries.reducer";
import { CatogaryMap } from "./catogaries.type";

//We Use this to not rerunder the same thing over and over again is the state is the same.
const selectCatogaryReduce = (state: RootState): CatogariesState =>
  state.catogaries;

export const selectCatogaries = createSelector(
  [selectCatogaryReduce],
  (catogariesSlice) => catogariesSlice.catogariesArray
);

export const selectCatogariesMap = createSelector(
  [selectCatogaries],
  (catogariesArray): CatogaryMap =>
    catogariesArray.reduce((acc, catogary) => {
      const { title, items } = catogary;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CatogaryMap)
);

export const selectCatogariesIsLoading = createSelector(
  [selectCatogaryReduce],
  (catogariesSlice) => catogariesSlice.isLoading
);
