export enum CATOGARIES_ACTION_TYPE {
  FETCH_CATOGARIES_START = "catogary/FETCH_CATOGARIES_START",
  FETCH_CATOGARIES_SUCCESS = "catogary/FETCH_CATOGARIES_SUCCESS",
  FETCH_CATOGARIES_FAILED = "catogary/FETCH_CATOGARIES_FAILED",
}

export type CatogaryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type Catogary = {
  title: string;
  imageUrl: string;
  items: CatogaryItem[];
};

export type CatogaryMap = {
  [key: string]: CatogaryItem[];
};
