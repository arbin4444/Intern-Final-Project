import { EuiFieldSearch } from "@elastic/eui";
import React from "react";

interface CommonSearchFieldProps {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  isClearable?: boolean;
  fullWidth?: boolean;
}

export const CommonSearchField: React.FC<CommonSearchFieldProps> = ({
  placeholder,
  value,
  onChange,
  isClearable,
  fullWidth,
}) => {
  return (
    <>
      <EuiFieldSearch
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        isClearable={isClearable}
        fullWidth={fullWidth}
      />
    </>
  );
};
