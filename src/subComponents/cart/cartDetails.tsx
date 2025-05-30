import React from "react";
import { RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import {addToCart} from "../../Redux/slices/cart/cartSlices"
import {removeFromCart} from "../../Redux/slices/cart/cartSlices"
import { EuiText } from "@elastic/eui";
import { CommonButton } from "../../sharedComponents/button/commonButton";

export const CartDetails:React.FC=()=>{
    const dispatch = useDispatch();

    const cartItems = useSelector((state:RootState)=>state.cart.items)
    const totalItems = cartItems.reduce((sum,item)=> sum + item.quantity, 0 );

    
    return(
        <>
        {cartItems.length > 0 && (
                  <>
                    <EuiText>
                      <h3>Books in Your Cart:</h3>
                    </EuiText>
                    <table className="cart-table">
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item.id}>
                            <td className="tableBook-detail">
                              <EuiText size="s">
                                <p>
                                  <strong>{item.title}</strong> by {item.author}
                                  Quantity: {item.quantity}, Price: {item.price}
                                </p>
                              </EuiText>
                            </td>
                            <td>
                              <CommonButton
                                title="remove"
                                fill={true}
                                color="danger"
                                onClick={() => dispatch(removeFromCart(item.id))}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
        </>
    )
}