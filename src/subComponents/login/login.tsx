import { EuiFlexGroup, EuiFlexItem, EuiText } from "@elastic/eui";
import React from "react";
import { CommonFieldText } from "../../sharedComponents/fieldText/commonFieldText";
import { CommonFieldPassword } from "../../sharedComponents/fieldPassword/commonFieldPassword";
import { CommonButton } from "../../sharedComponents/button/commonButton";

export const Login: React.FC = () => {
  return (
    <div className="login-div">
      <EuiFlexGroup
        className="login-flex"
        direction="column"
        alignItems="center"
      >
        <EuiFlexGroup className="login-subFlex" direction="column">
          <EuiFlexGroup alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiText>UserName</EuiText>
            </EuiFlexItem>
            <EuiFlexItem className="username-fieldText">
              <CommonFieldText placeholder="Enter Username" />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup gutterSize="xl" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiText>Password</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <CommonFieldPassword type="dual" placeholder="Password" />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem grow={false}>
              <div>
                <CommonButton title="Login" />
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexGroup>
      </EuiFlexGroup>
    </div>
  );
};
