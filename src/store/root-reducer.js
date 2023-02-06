import { combineReducers } from "redux";
import { cartReducer } from "./cart/cart.reducer";
import { catogariesReducer } from "./catogaries/catogaries.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  catogaries: catogariesReducer,
  cart: cartReducer,
});
