import React, { useState } from "react";
import { RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../Redux/slices/cart/cartSlices";
import {
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiPageHeader,
  EuiPopover,
  EuiText,
} from "@elastic/eui";
import { CommonButton } from "../../sharedComponents/button/commonButton";
import { useNavigate } from "react-router-dom";
import { CommonEmptyButton } from "../../sharedComponents/button/commonEmptyButton";

export const CartDetails: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  return (
    <div className="cart-parentDiv">
      <EuiFlexGroup className="cartDetail-grp" direction="column">
        <EuiFlexGroup>
          <EuiPageHeader
            pageTitle="Cart Details"
            tabs={[
              {
                label: "Book Details",
                onClick: (e: { preventDefault: () => void }) => {
                  e.preventDefault();
                  navigate("/booksdetail");
                },
              },
              {
                label: "View Cart",
                onClick: (e: { preventDefault: () => void }) => {
                  e.preventDefault();
                  navigate("/cart");
                },
                isSelected: true,
              },
            ]}
            bottomBorder="extended"
            rightSideItems={[
              <EuiPopover
            button={
              <EuiButtonIcon
                color="text"
                iconType="menu"
                onClick={onButtonClick}
              ></EuiButtonIcon>
            }
            isOpen={isPopoverOpen}
            closePopover={closePopover}
          >
            <CommonEmptyButton
              title="log out"
              onClick={(e: { preventDefault: () => void; })=> {e.preventDefault(); navigate("/");}}
            />
          </EuiPopover>
            ]}
          ></EuiPageHeader>
          
        </EuiFlexGroup>

        <EuiFlexGroup direction="column">
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
              <EuiText>
                No. of books in your cart : <strong>{totalItems}</strong>
              </EuiText>
            </>
          )}
        </EuiFlexGroup>
      </EuiFlexGroup>
    </div>
  );
};
