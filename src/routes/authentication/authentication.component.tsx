import styled from "styled-components";
import SignInForm from "../../components/sign-in-form/signin-form.component";
import SignUpForm from "../../components/sign-up-form/signUpForm.component";

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;

const AuthenticationContainer = styled.div`
  display: flex;
  width: 1000px;
  justify-content: space-between;
  margin: 30px auto;
`;
