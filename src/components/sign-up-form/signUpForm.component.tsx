import { AuthError, AuthErrorCodes } from "firebase/auth";
import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { signUpStart } from "../../store/user/user.action";
import { selectCurrentUser } from "../../store/user/user.select";
import Button from "../button/button.component";
import FormInput from "../form-input/formInput.component";

const defaltFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setformFields] = useState(defaltFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  if (currentUser !== null) {
    return <Navigate to="/" />;
  }

  // console.log(formFields);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setformFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email);
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    } else {
      try {
        dispatch(signUpStart(email, password, displayName));
        setformFields(defaltFormFields);
      } catch (err) {
        if ((err as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
          alert("can not create user, your email exists");
        }
        console.log("something went wrong", err);
      }
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  h2 {
    margin: 10px 0;
  }
`;
