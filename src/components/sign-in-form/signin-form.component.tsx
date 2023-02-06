import { ChangeEvent, FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import FormInput from "../form-input/formInput.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useDispatch, useSelector } from "react-redux";
import { googleSignInStart, signInStart } from "../../store/user/user.action";
import { selectCurrentUser } from "../../store/user/user.select";

const defaltFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setformFields] = useState(defaltFormFields);
  const { email, password } = formFields;
  const currentUser = useSelector(selectCurrentUser);

  if (currentUser !== null) {
    return <Navigate to="/" />;
  }

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setformFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email);
    try {
      dispatch(signInStart(email, password));
      setformFields(defaltFormFields);
    } catch (err) {
      console.log("something went wrong", err);
    }
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  h2 {
    margin: 10px 0;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
