import { EuiFlexGroup, EuiFlexItem, EuiText } from "@elastic/eui";
import React, { useState } from "react";
import { CommonFieldText } from "../../sharedComponents/fieldText/commonFieldText";
import { CommonFieldPassword } from "../../sharedComponents/fieldPassword/commonFieldPassword";
import { CommonButton } from "../../sharedComponents/button/commonButton";
import { useAddDataMutation } from "../../service/loginService/loginService";
import { useNavigate, Link } from "react-router-dom";

export const Login: React.FC = () => {
  const [userLoginName, setUserLoginName] = useState("");
  const [userLoginPassword, setUserLoginPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [postLoginData] = useAddDataMutation();

  const navigate = useNavigate();

  const handlePostUserLoginData = async () => {
    const newErrors: typeof errors = {};

    if (!userLoginName.trim()) newErrors.username = "Username is required.";
    if (!userLoginPassword.trim()) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const userData = {
        username: userLoginName.trim(),
        password: userLoginPassword.trim(),
      };

      const response = await postLoginData(userData).unwrap();

      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate("/booksdetail");
        setUserLoginName("");
        setUserLoginPassword("");
        setErrors({});
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setErrors({
        username: "Invalid username or password",
        password: "Invalid username or password",
      });
    }
  };

  return (
    <div className="login-div">
      <EuiFlexGroup className="login-flex" direction="column" alignItems="center">
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
              <CommonFieldText
                value={userLoginName}
                placeholder="Enter Username"
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUserLoginName(e.target.value)}
              />
              {errors.username && (
                <EuiText color="danger" size="s">
                  {errors.username}
                </EuiText>
              )}
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup gutterSize="xl" alignItems="center" className="login-password">
            <EuiFlexItem className="password-text" grow={false}>
              <EuiText>Password</EuiText>
            </EuiFlexItem>
            <EuiFlexItem className="password-field">
              <CommonFieldPassword
                value={userLoginPassword}
                type="dual"
                placeholder="Password"
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUserLoginPassword(e.target.value)}
              />
              {errors.password && (
                <EuiText color="danger" size="s">
                  {errors.password}
                </EuiText>
              )}
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem grow={false}>
              <EuiText className="login-link">
                <Link to="/signup">Register here to login</Link>
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem grow={false}>
              <div className="login-btn">
                <CommonButton fill={true} title="Login" onClick={handlePostUserLoginData} />
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexGroup>
      </EuiFlexGroup>
    </div>
  );
};
