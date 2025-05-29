import { EuiFieldText } from "@elastic/eui";
import React from "react";

interface CommonFieldTextProps {
  value?: any;
  placeholder?: string;
  onChange: any;
}

export const CommonFieldText: React.FC<CommonFieldTextProps> = ({
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className="common-fieldText">
      <EuiFieldText
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
