import { EuiGlobalToastList } from "@elastic/eui";
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list";
import React from "react";

interface CommonToastProps {
    toasts :Toast[];
    dismissToast : (toast: Toast) => void;
    toastLifeTimeMs : number;
    
}

export const CommonToast:React.FC<CommonToastProps>=({
    toasts,
    dismissToast,
    toastLifeTimeMs
})=>{
    return(
        <>
        <EuiGlobalToastList
            toasts={toasts}
            dismissToast={dismissToast}
            toastLifeTimeMs={toastLifeTimeMs}
        />

        </>
    )
}