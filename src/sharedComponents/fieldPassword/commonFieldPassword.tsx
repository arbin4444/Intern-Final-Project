import { EuiFieldPassword } from "@elastic/eui";
import React from "react";

interface CommonFieldPassword {
    placeholder? : string;
    type ?: "text" | "password" | "dual";
    value ? : string | number;
    onChange ? :any;
}

export const CommonFieldPassword:React.FC<CommonFieldPassword>=({
    placeholder,
    type,
    value,
    onChange,
})=>{
    return (
        <>
        <EuiFieldPassword
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
        />
        </>
    )
}