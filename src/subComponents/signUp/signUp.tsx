import { EuiFlexGroup, EuiFlexItem, EuiText } from "@elastic/eui";
import React, { useState } from "react";
import { CommonFieldText } from "../../sharedComponents/fieldText/commonFieldText";
import { CommonFieldPassword } from "../../sharedComponents/fieldPassword/commonFieldPassword";
import { CommonButton } from "../../sharedComponents/button/commonButton";
import { useAddDataMutation } from "../../service/signupService/signupService";
import { Link } from "react-router-dom";

export const SignUp: React.FC = () => {
  const [userSignupName, setUserSignupName] = useState("");
  const [userSignupEmail, setUserSignupEmail] = useState("");
  const [userSignupPassword, setUserSignupPassword] = useState("");
  const [postSignupData] = useAddDataMutation();

  const handlePostUserData = async () => {
    try {
      const userData = {
        username: userSignupName.trim(),
        email: userSignupEmail.trim(),
        password: userSignupPassword.trim(),
      };

      const response = await postSignupData(userData).unwrap();
      console.log("this is post data", response);

      setUserSignupName("");
      setUserSignupEmail("");
      setUserSignupPassword("");
    } catch (err) {
      console.error("Error during signup:", err);
    }
  };

  const handleUserNameChange = (e: {
    preventDefault: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
    e.preventDefault();
    setUserSignupName(e.target.value);
  };

  const handleUserEmailChange = (e: {
    preventDefault: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
    e.preventDefault();
    setUserSignupEmail(e.target.value);
  };

  const handleUserPasswordChange = (e: {
    preventDefault: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
    e.preventDefault();
    setUserSignupPassword(e.target.value);
  };

  return (
    <div className="signUp-div">
      <EuiFlexGroup
        className="signUp-flex"
        direction="column"
        alignItems="center"
      >
        <EuiFlexGroup className="signUp-subFlex" direction="column">
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem className="signup-text" grow={false}>
              <EuiText>SignUp!!</EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup alignItems="center">
            <EuiFlexItem className="username-text" grow={false}>
              <EuiText>UserName</EuiText>
            </EuiFlexItem>
            <EuiFlexItem className="username-fieldText">
              <CommonFieldText
                value={userSignupName}
                placeholder="Enter Username"
                onChange={handleUserNameChange}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup alignItems="center">
            <EuiFlexItem className="email-text" grow={false}>
              <EuiText>Email</EuiText>
            </EuiFlexItem>
            <EuiFlexItem className="email-fieldText">
              <CommonFieldText
                value={userSignupEmail}
                placeholder="Enter Your Email"
                onChange={handleUserEmailChange}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup
            className="signup-password"
            gutterSize="xl"
            alignItems="center"
          >
            <EuiFlexItem className="password-text" grow={false}>
              <EuiText>Password</EuiText>
            </EuiFlexItem>
            <EuiFlexItem className="password-field">
              <CommonFieldPassword
                value={userSignupPassword}
                type="dual"
                placeholder="Password"
                onChange={handleUserPasswordChange}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem grow={false}>
              <EuiText className="signup-link">
                <Link to="/login">I have my account</Link>
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem grow={false}>
              <div className="signup-btn">
                <CommonButton
                  fill={true}
                  title="SignUp"
                  onClick={handlePostUserData}
                />
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexGroup>
      </EuiFlexGroup>
    </div>
  );
};
