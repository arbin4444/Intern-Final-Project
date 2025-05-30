import React from "react";
import { addToCart } from "../../Redux/slices/cart/cartSlices";
import { useDispatch, useSelector } from "react-redux";
import {RootState} from "../../Redux/store";

export const CartDetail:React.FC=()=>{
    const cartItem = useSelector((state:RootState)=>state.cart.items);

    const dispatch = useDispatch();
    return(
        <>
        </>
    )
}