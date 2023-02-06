import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CatogaryItem } from "../catogaries/catogaries.type";
import { CartItem, CART_ACTION_TYPE } from "./cart.type";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CatogaryItem
): CartItem[] => {
  //find if cartitem is contain productToAdd
  const existingCartItem = cartItems.find(
    (cardItem) => cardItem.id === productToAdd.id
  );

  //if found incrice quantity
  if (existingCartItem) {
    return cartItems.map((cardItem) =>
      cardItem.id === productToAdd.id
        ? { ...cardItem, quantity: cardItem.quantity + 1 }
        : cardItem
    );
  }

  //return new array with contain cartitems.
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): CartItem[] => {
  // find the cart item to remove.
  const existingCartItem = cartItems.find(
    (cardItem) => cardItem.id === cartItemToRemove.id
  );
  //check if quantity is equal to 1, if it is remove that item from the carts
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  //return back cartitems wit matching cart item with reduse the quantity.
  return cartItems.map((cardItem) =>
    cardItem.id === cartItemToRemove.id
      ? { ...cardItem, quantity: cardItem.quantity - 1 }
      : cardItem
  );
};

const clearCartItem = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

// =======================================

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPE.SET_IS_CART_OPEN,
  boolean
>;

export type SetIsCartItem = ActionWithPayload<
  CART_ACTION_TYPE.SET_CART_ITEMS,
  CartItem[]
>;

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetIsCartItem =>
    createAction(CART_ACTION_TYPE.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CatogaryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};
export const removeItemToCart = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};
export const clearItemToCart = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return setCartItems(newCartItems);
};

// For The Toggole
export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => {
  return createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool);
});
