import { all, call } from "typed-redux-saga/macro";
import { catogariesSaga } from "./catogaries/catogaries.saga";
import { userSagas } from "./user/user.saga";

export function* rootSaga() {
  yield* all([call(catogariesSaga), call(userSagas)]);
}
