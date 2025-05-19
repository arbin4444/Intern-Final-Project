import { EuiFlexGroup, EuiFlexItem, EuiText } from "@elastic/eui";
import React, { useState } from "react";
import { CommonFieldText } from "../../sharedComponents/fieldText/commonFieldText";
import { CommonFieldPassword } from "../../sharedComponents/fieldPassword/commonFieldPassword";
import { CommonButton } from "../../sharedComponents/button/commonButton";
import {useAddDataMutation} from "../../service/loginService/loginService"
export const Login: React.FC = () => {

  const [userLoginName,setUserLoginName]= useState("");
  const [userLoginPassword,setUserLoginPassword]=useState("");
  const [postLoginData]= useAddDataMutation();

  const handlePostUserLoginData = async () => {
  try {
    const userData = {
      username: userLoginName.trim(),
      password: userLoginPassword.trim(),
    };

    const response = await postLoginData(userData).unwrap();
    console.log("this is post data", response);

    setUserLoginName("");
    setUserLoginPassword("");
  } catch (err) {
    console.error("Error during signup:", err);
  }
};
  const handleUserLoginNameChange=(e: { preventDefault: () => void; target: { value: React.SetStateAction<string>; }; })=>{
    e.preventDefault();
    setUserLoginName(e.target.value);
  }

  const handleUserLoginPasswordChange=(e: { preventDefault: () => void; target: { value: React.SetStateAction<string>; }; })=>{
    e.preventDefault();
    setUserLoginPassword(e.target.value)
  }
  return (
    <div className="login-div">
      <EuiFlexGroup
        className="login-flex"
        direction="column"
        alignItems="center"
      >
        <EuiFlexGroup className="login-subFlex" direction="column">
          <EuiFlexGroup justifyContent="center" alignItems="center">
            <EuiFlexItem className="login-text" grow={false}>
              <EuiText>LogIn</EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup alignItems="center">
            <EuiFlexItem className="username-text" grow={false}>
              <EuiText>UserName</EuiText>
            </EuiFlexItem>
            <EuiFlexItem className="username-fieldText">
              <CommonFieldText value={userLoginName} placeholder="Enter Username" onChange={handleUserLoginNameChange} />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup gutterSize="xl" alignItems="center">
            <EuiFlexItem className="password-text" grow={false}>
              <EuiText>Password</EuiText>
            </EuiFlexItem>
            <EuiFlexItem className="password-field">
              <CommonFieldPassword value={userLoginPassword} type="dual" placeholder="Password" onChange={handleUserLoginPasswordChange} />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem grow={false}>
              <div>
                <CommonButton fill={true} title="Login" onClick={handlePostUserLoginData}/>
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexGroup>
      </EuiFlexGroup>
    </div>
  );
};
