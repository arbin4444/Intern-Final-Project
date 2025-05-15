import { EuiButton } from "@elastic/eui";
import React from "react";

interface CommonButtonProps {
    color ?: "primary" | "text" | "accent" | "accentSecondary" | "success" | "warning" | "danger" | "neutral" | "risk"
    onClick ? : any;
    title ?: string;
}

export const CommonButton:React.FC<CommonButtonProps>=({
    color,
    onClick,
    title,
})=>{
    return(
        <>
            <EuiButton color={color} onClick={onClick}>
                {title}
            </EuiButton>
        </>
    )
}