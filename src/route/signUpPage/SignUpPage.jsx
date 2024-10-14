import React from "react";
import "./SignUpPage.css";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="signUpPage">
      <SignUp path="/sign-up" />
    </div>
  );
};

export default SignUpPage;
