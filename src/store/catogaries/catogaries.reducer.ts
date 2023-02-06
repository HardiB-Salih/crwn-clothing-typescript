import { AnyAction } from "redux";
import {
  fetchCatogariesFailed,
  fetchCatogariesStart,
  fetchCatogariesSuccess,
} from "./catogaries.action";
import { Catogary } from "./catogaries.type";

export type CatogariesState = {
  readonly catogariesArray: Catogary[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const CATOGARIES_INITIAL_STATE: CatogariesState = {
  catogariesArray: [],
  isLoading: false,
  error: null,
};

export const catogariesReducer = (
  state = CATOGARIES_INITIAL_STATE,
  action: AnyAction
): CatogariesState => {
  if (fetchCatogariesStart.match(action)) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (fetchCatogariesSuccess.match(action)) {
    return {
      ...state,
      catogariesArray: action.payload,
      isLoading: false,
    };
  }

  if (fetchCatogariesFailed.match(action)) {
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };
  }

  return state;
};
