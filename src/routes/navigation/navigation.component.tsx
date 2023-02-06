import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import CardDropDown from "../../components/cards/card-dropdown.component";
import CardIcon from "../../components/cards/card-icon.componet";
import { selectIsCartOpen } from "../../store/cart/cart.select";
import { signOutStart } from "../../store/user/user.action";

import { selectCurrentUser } from "../../store/user/user.select";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const toggle = useSelector(selectIsCartOpen);

  const signOutHandler = () => dispatch(signOutStart());
  return (
    <Fragment>
      <Wrapper>
        <NavLogo to="/">
          <CrownLogo className="logo" />
        </NavLogo>
        <NavLinkWrapper>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CardIcon />
        </NavLinkWrapper>
        {toggle && <CardDropDown />}
      </Wrapper>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

const Wrapper = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  padding: 0px 20px;
`;
const NavLogo = styled(Link)`
  .logo {
    height: 100%;
    width: 70px;
    padding: 10px;
  }
`;

const NavLinkWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;
