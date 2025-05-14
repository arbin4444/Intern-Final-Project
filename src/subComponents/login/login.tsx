import {
  EuiButton,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from "@elastic/eui";
import React from "react";

export const Login: React.FC = () => {
  return (
    <div className="login-div">
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiFlexGroup direction="column">
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <EuiText>UserName</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFieldText></EuiFieldText>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <EuiText>Password</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFieldText></EuiFieldText>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup>
            <EuiFlexItem>
              <div>
                <EuiButton>Login</EuiButton>
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexGroup>
      </EuiFlexGroup>
    </div>
  );
};
