import { all, call, put, takeLatest } from "typed-redux-saga";
import { getCatogeriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCatogariesFailed,
  fetchCatogariesSuccess,
} from "./catogaries.action";
import { CATOGARIES_ACTION_TYPE } from "./catogaries.type";

// We use this to load catogaryies using redux saga
export function* fetchCatogariesAsync() {
  try {
    const catogariesArray = yield* call(getCatogeriesAndDocuments);
    yield* put(fetchCatogariesSuccess(catogariesArray));
  } catch (error) {
    yield* put(fetchCatogariesFailed(error as Error));
  }
}

export function* onFetchCatogaries() {
  yield* takeLatest(
    CATOGARIES_ACTION_TYPE.FETCH_CATOGARIES_START,
    fetchCatogariesAsync
  );
}

export function* catogariesSaga() {
  yield* all([call(onFetchCatogaries)]);
}
