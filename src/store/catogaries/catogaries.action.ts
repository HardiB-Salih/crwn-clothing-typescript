import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CATOGARIES_ACTION_TYPE, Catogary } from "./catogaries.type";

export type FetchCatogariesStart =
  Action<CATOGARIES_ACTION_TYPE.FETCH_CATOGARIES_START>;

export type FetchCatogariesSuccess = ActionWithPayload<
  CATOGARIES_ACTION_TYPE.FETCH_CATOGARIES_SUCCESS,
  Catogary[]
>;

export type FetchCatogariesFailed = ActionWithPayload<
  CATOGARIES_ACTION_TYPE.FETCH_CATOGARIES_FAILED,
  Error
>;

export const fetchCatogariesStart = withMatcher(
  (): FetchCatogariesStart =>
    createAction(CATOGARIES_ACTION_TYPE.FETCH_CATOGARIES_START)
);

export const fetchCatogariesSuccess = withMatcher(
  (catogariesArray: Catogary[]): FetchCatogariesSuccess =>
    createAction(
      CATOGARIES_ACTION_TYPE.FETCH_CATOGARIES_SUCCESS,
      catogariesArray
    )
);

export const fetchCatogariesFailed = withMatcher(
  (error: Error): FetchCatogariesFailed =>
    createAction(CATOGARIES_ACTION_TYPE.FETCH_CATOGARIES_FAILED, error)
);
