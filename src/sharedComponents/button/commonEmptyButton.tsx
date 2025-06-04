import { EuiButtonEmpty, IconType } from "@elastic/eui";
import React from "react";

interface CommonEmptyButtonProps {
  iconType?: IconType;
  type ? : "button" | "reset" | "submit";
  flush ? : "left" | "right" | "both";
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
  title?: string;
}

export const CommonEmptyButton: React.FC<CommonEmptyButtonProps> = ({
  iconType,
  type,
  flush,
  color,
  onClick,
  title,
}) => {
  return (
    <div className="empty-btn">
      <EuiButtonEmpty iconType={iconType} type={type} flush={flush} color={color} onClick={onClick}>
        {title}
      </EuiButtonEmpty>
    </div>
  );
};
