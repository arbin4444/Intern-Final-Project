import { EuiButton } from "@elastic/eui";
import React from "react";

interface CommonButtonProps {
  color?:
    | "primary"
    | "text"
    | "accent"
    | "accentSecondary"
    | "success"
    | "warning"
    | "danger"
    | "neutral"
    | "risk";
  onClick?: any;
  title: string;
  fill?: boolean;
}

export const CommonButton: React.FC<CommonButtonProps> = ({
  color,
  onClick,
  title,
  fill,
}) => {
  return (
    <div className="common-btn">
      <EuiButton color={color} onClick={onClick} fill={fill}>
        {title}
      </EuiButton>
    </div>
  );
};
