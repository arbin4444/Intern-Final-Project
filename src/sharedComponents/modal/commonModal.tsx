import { EuiConfirmModal } from "@elastic/eui";
import React, { ReactNode } from "react";

interface CommonModalProps {
    title : ReactNode;
    onCancel : (event?: any) => void;
    onConfirm : (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void ;
    cancelButtonText : ReactNode;
    confirmButtonText : ReactNode;
    defaultFocusedButton : "cancel" | "confirm";
    details :any;
}

export const CommonModal:React.FC<CommonModalProps>=({
    title,
    onCancel,
    onConfirm,
    cancelButtonText,
    confirmButtonText,
    defaultFocusedButton,
    details
})=>{
    return(
        <>
            <EuiConfirmModal
                title={title}
                onCancel={onCancel}
                onConfirm={onConfirm}
                cancelButtonText={cancelButtonText}
                confirmButtonText={confirmButtonText}
                defaultFocusedButton={defaultFocusedButton}
            >
                {details}
                </EuiConfirmModal>
            
        
        </>
    )
}