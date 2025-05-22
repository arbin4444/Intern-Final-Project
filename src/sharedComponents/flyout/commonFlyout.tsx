import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiTitle,
} from "@elastic/eui";
import React from "react";

interface CommonFlyoutProps {
  ownFocus?: boolean;
  onClose: (event: MouseEvent | KeyboardEvent | TouchEvent) => void;
  hasBorder?: boolean;
  size?: "s" | "m" | "l";
  header?: any;
  body?: any;
  footer?: any;
}

export const CommonFlyout: React.FC<CommonFlyoutProps> = ({
  ownFocus,
  onClose,
  size,
  hasBorder,
  header,
  body,
  footer,
}) => {
  return (
    <>
      <EuiFlyout ownFocus={ownFocus} size={size} onClose={onClose}>
        <EuiFlyoutHeader hasBorder={hasBorder}>{header}</EuiFlyoutHeader>
        <EuiFlyoutBody>{body}</EuiFlyoutBody>
        <EuiFlyoutFooter>{footer}</EuiFlyoutFooter>
      </EuiFlyout>
    </>
  );
};
