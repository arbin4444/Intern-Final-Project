import { EuiFlexGroup, EuiFlexItem, EuiText } from "@elastic/eui";
import React from "react";
import { CommonFieldText } from "../../sharedComponents/fieldText/commonFieldText";
import { CommonFieldPassword } from "../../sharedComponents/fieldPassword/commonFieldPassword";
import { CommonButton } from "../../sharedComponents/button/commonButton";

export const SignUp: React.FC = () => {
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
              <CommonFieldText placeholder="Enter Username" />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup alignItems="center">
            <EuiFlexItem className="email-text" grow={false}>
              <EuiText>Email</EuiText>
            </EuiFlexItem>
            <EuiFlexItem className="email-fieldText">
              <CommonFieldText placeholder="Enter Your Email" />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup gutterSize="xl" alignItems="center">
            <EuiFlexItem className="password-text" grow={false}>
              <EuiText>Password</EuiText>
            </EuiFlexItem>
            <EuiFlexItem className="password-field">
              <CommonFieldPassword type="dual" placeholder="Password" />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem grow={false}>
              <div>
                <CommonButton fill={true} title="SignUp" />
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexGroup>
      </EuiFlexGroup>
    </div>
  );
};
