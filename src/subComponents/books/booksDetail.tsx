import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetDataQuery } from "../../service/bookService/bookService";
import { useUpdateDataMutation } from "../../service/bookService/bookService";
import { useDeleteDataMutation } from "../../service/bookService/bookService";
import { useAddDataMutation } from "../../service/bookService/bookService";
import { useSearchDataQuery } from "../../service/bookService/bookService";
import { useBuyBooksMutation } from "../../service/bookService/bookService";
import { BookTypes } from "../../types/books/bookTypes";
import {
  Criteria,
  EuiBasicTableColumn,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPopover,
  EuiText,
  EuiTitle,
} from "@elastic/eui";
import { CommonSearchField } from "../../sharedComponents/searchField/commonSearchField";
import { CommonButton } from "../../sharedComponents/button/commonButton";
import { CommonEmptyButton } from "../../sharedComponents/button/commonEmptyButton";
import { CommonFieldText } from "../../sharedComponents/fieldText/commonFieldText";
import { CommonFlyout } from "../../sharedComponents/flyout/commonFlyout";
import { CommonModal } from "../../sharedComponents/modal/commonModal";
import { CommonTable } from "../../sharedComponents/table/commonTable";
import { CommonToast } from "../../sharedComponents/toast/commonToast";
import { addToCart } from "../../slices/cart/cartSlices";
import { RootState } from "../../store";

export const BooksDetails: React.FC = () => {
  const { data, isError, isLoading } = useGetDataQuery();
  const [updateData] = useUpdateDataMutation();
  const [deleteData] = useDeleteDataMutation();
  const [addData] = useAddDataMutation();
  const [buyBook] = useBuyBooksMutation();

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [errors, setErrors] = useState<{
    title?: string;
    author?: string;
    year?: string;
    quantity?: string;
    price?: string;
  }>({});

  const [editErrors, setEditErrors] = useState<{
  title?: string;
  author?: string;
  year?: string;
  quantity?: string;
  price?: string;
}>({});

  const [searchBook, setSearchBook] = useState("");
  const {
    data: filteredData,
    isFetching: isSearching,
    isError: isSearchError,
  } = useSearchDataQuery(searchBook, { skip: searchBook === "" });
  const booksToShow = searchBook ? filteredData : data;
  const [searchInput, setSearchInput] = useState("");

  //debouncing Method
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchBook(searchInput);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchInput]);

  const [toasts, setToasts] = useState<
    Array<{
      id: string;
      title: string;
      color?: "primary" | "success" | "warning" | "danger" | undefined;

      iconType?: string;
      text?: React.ReactNode;
      toastLifeTimeMs?: number;
    }>
  >([]);

  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  //MODAL
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<BookTypes | null>(null);

  const [bookToBuy, setBookToBuy] = useState<BookTypes | null>(null);
  const [isBuyModalVisible, setIsBuyModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  //fLYOUT
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookTypes | null>(null);
  const [editFlyoutState, setEditFlyoutState] = useState<BookTypes | null>(
    null
  );

  const [isAddFlyoutVisible, setIsAddFlyoutVisible] = useState(false);
  const [addBookState, setAddBookState] = useState<BookTypes>({
    title: "",
    author: "",
    year: "",
    quantity: "",
    price: "",
  });

  const addToast = (toast: Omit<(typeof toasts)[0], "id">) => {
    const id = `toast${Date.now()}`;
    setToasts((prevToasts) => [...prevToasts, { id, ...toast }]);
  };

  const removeToast = (removedToast: { id: string }) => {
    setToasts((prevToasts) =>
      prevToasts.filter((toast) => toast.id !== removedToast.id)
    );
  };

  //Pagination
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(4);

  const onTableChange = ({ page }: Criteria<BookTypes>) => {
    if (page) {
      const { index: pageIndex, size: pageSize } = page;
      setPageIndex(pageIndex);
      setPageSize(pageSize);
    }
  };
  // Manually handle pagination of data
  const findBooks = (
    data: BookTypes[],
    pageIndex: number,
    pageSize: number
  ) => {
    let pageOfItems;

    if (!pageIndex && !pageSize) {
      pageOfItems = data;
    } else {
      const startIndex = pageIndex * pageSize;
      pageOfItems = data.slice(
        startIndex,
        Math.min(startIndex + pageSize, data.length)
      );
    }
    return {
      pageOfItems,
      totalItemCount: data.length,
    };
  };

  const { pageOfItems, totalItemCount } = findBooks(
    booksToShow ?? [],
    pageIndex,
    pageSize
  );

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [10, 5, 0],
  };

  //Handling buy Books
  const handleBuyBook = async () => {
    if (!bookToBuy) return;
    try {
      await buyBook({
        items: [{ bookId: bookToBuy.id, quantity: 1 }],
      }).unwrap(); // Buy 1 copy

      addToast({
        title: "Success",
        color: "success",
        iconType: "check",
        text: (
          <p>
            You have successfully purchased <strong>{bookToBuy.title}</strong>{" "}
            for {bookToBuy.price}.
          </p>
        ),
      });

      setBookToBuy(null);
      setIsBuyModalVisible(false);
    } catch (error) {
      console.error("Failed to buy book:", error);
    }
  };

  if (isError) return <p>Error has occurred</p>;
  if (isLoading) return <p>Still Loading, please wait for results...</p>;


  const handleUpdateBook = async () => {
  if (!editFlyoutState) return;

  const { title, author, year, quantity, price } = editFlyoutState;
  const newErrors: typeof editErrors = {};

  if (!title?.trim()) newErrors.title = "Title is required.";
  if (!author?.trim()) newErrors.author = "Author is required.";

  const parsedYear = parseInt(year?.toString().trim(), 10);
  if (isNaN(parsedYear) || parsedYear <= 0)
    newErrors.year = "Year must be a positive number.";

  const parsedQuantity = parseInt(quantity?.toString().trim(), 10);
  if (isNaN(parsedQuantity) || parsedQuantity <= 0)
    newErrors.quantity = "Quantity must be a positive number.";

  const parsedPrice = parseFloat(price?.toString().trim());
  if (isNaN(parsedPrice) || parsedPrice <= 0)
    newErrors.price = "Price must be a positive number.";

  if (Object.keys(newErrors).length > 0) {
    setEditErrors(newErrors);
    return;
  }

  setEditErrors({}); // clear old errors

  try {
    const payload = {
      ...editFlyoutState,
      title: title.trim(),
      author: author.trim(),
      year: parsedYear,
      quantity: parsedQuantity,
      price: parsedPrice,
    };

    await updateData(payload).unwrap();

    addToast({
      title: "Success",
      color: "success",
      iconType: "check",
      text: (
        <p>
          You have updated the book <strong>{payload.title}</strong> successfully.
        </p>
      ),
    });

    setIsFlyoutVisible(false);
    setEditFlyoutState(null);
    setSelectedBook(null);
  } catch (error) {
    console.error("Update failed:", error);
  }
};
  let flyout;
if (isFlyoutVisible) {
  flyout = (
    <CommonFlyout
      ownFocus={true}
      hasBorder={true}
      size="s"
      onClose={() => {
        setIsFlyoutVisible(false);
        setSelectedBook(null);
      }}
      header={
        <EuiTitle>
          <h2>Update Book Details</h2>
        </EuiTitle>
      }
      body={
        <table>
          <tbody>
            <tr>
              <td className="table-title">
                <EuiText>Title</EuiText>
              </td>
              <td className="table-field">
                <CommonFieldText
                  value={editFlyoutState?.title || ""}
                  onChange={(e: { target: { value: any; }; }) =>
                    setEditFlyoutState((prev) =>
                      prev ? { ...prev, title: e.target.value } : null
                    )
                  }
                />
                {editErrors.title && (
                  <EuiText color="danger" size="s">
                    {editErrors.title}
                  </EuiText>
                )}
              </td>
            </tr>

            <tr>
              <td className="table-title">
                <EuiText>Author</EuiText>
              </td>
              <td className="table-field">
                <CommonFieldText
                  value={editFlyoutState?.author || ""}
                  onChange={(e: { target: { value: any; }; }) =>
                    setEditFlyoutState((prev) =>
                      prev ? { ...prev, author: e.target.value } : null
                    )
                  }
                />
                {editErrors.author && (
                  <EuiText color="danger" size="s">
                    {editErrors.author}
                  </EuiText>
                )}
              </td>
            </tr>

            <tr>
              <td className="table-title">
                <EuiText>Year</EuiText>
              </td>
              <td className="table-field">
                <CommonFieldText
                  value={editFlyoutState?.year?.toString() || ""}
                  onChange={(e: { target: { value: any; }; }) =>
                    setEditFlyoutState((prev) =>
                      prev ? { ...prev, year: e.target.value } : null
                    )
                  }
                />
                {editErrors.year && (
                  <EuiText color="danger" size="s">
                    {editErrors.year}
                  </EuiText>
                )}
              </td>
            </tr>

            <tr>
              <td className="table-title">
                <EuiText>Quantity</EuiText>
              </td>
              <td className="table-field">
                <CommonFieldText
                  value={editFlyoutState?.quantity?.toString() || ""}
                  onChange={(e: { target: { value: any; }; }) =>
                    setEditFlyoutState((prev) =>
                      prev ? { ...prev, quantity: e.target.value } : null
                    )
                  }
                />
                {editErrors.quantity && (
                  <EuiText color="danger" size="s">
                    {editErrors.quantity}
                  </EuiText>
                )}
              </td>
            </tr>

            <tr>
              <td className="table-title">
                <EuiText>Price</EuiText>
              </td>
              <td className="table-field">
                <CommonFieldText
                  value={editFlyoutState?.price?.toString() || ""}
                  onChange={(e: { target: { value: any; }; }) =>
                    setEditFlyoutState((prev) =>
                      prev ? { ...prev, price: e.target.value } : null
                    )
                  }
                />
                {editErrors.price && (
                  <EuiText color="danger" size="s">
                    {editErrors.price}
                  </EuiText>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      }
      footer={
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>
            <CommonEmptyButton
              iconType="cross"
              onClick={() => setIsFlyoutVisible(false)}
              title="close"
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <CommonButton title="Update" fill onClick={handleUpdateBook} />
          </EuiFlexItem>
        </EuiFlexGroup>
      }
    />
  );
}
  const handleAddBookDetail = async () => {
  const newErrors: typeof errors = {};
  const { title, author, year, quantity, price } = addBookState || {};

  if (!title?.trim()) newErrors.title = "Title is required.";
  if (!author?.trim()) newErrors.author = "Author is required.";

  const parsedYear = parseInt(year?.toString().trim(), 10);
  if (isNaN(parsedYear) || parsedYear <= 0)
    newErrors.year = "Year must be a positive number.";

  const parsedQuantity = parseInt(quantity?.toString().trim(), 10);
  if (isNaN(parsedQuantity) || parsedQuantity <= 0)
    newErrors.quantity = "Quantity must be a positive number.";

  const parsedPrice = parseFloat(price?.toString().trim());
  if (isNaN(parsedPrice) || parsedPrice <= 0)
    newErrors.price = "Price must be a positive number.";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({}); // clear previous errors

  try {
    const payload = {
      title: title.trim(),
      author: author.trim(),
      year: parsedYear,
      quantity: parsedQuantity,
      price: parsedPrice,
    };

    await addData(payload).unwrap();

    // ✅ Success Toast
    addToast({
      title: "Success",
      color: "success",
      iconType: "check",
      text: (
        <p>
          You have added the book <strong>{payload.title}</strong> successfully.
        </p>
      ),
    });

    // Reset form and close flyout
    setAddBookState({
      title: "",
      author: "",
      year: "",
      quantity: "",
      price: "",
    });

    setIsAddFlyoutVisible(false);
  } catch (error) {
    console.error("Failed to add book:", error);

    // Optional: error toast
    addToast({
      title: "Error",
      color: "danger",
      iconType: "alert",
      text: <p>Something went wrong while adding the book. Please try again.</p>,
    });
  }
};


  let addFlyout;
  if (isAddFlyoutVisible) {
    addFlyout = (
      <CommonFlyout
        ownFocus={true}
        onClose={() => setIsAddFlyoutVisible(false)}
        size="s"
        hasBorder={true}
        header={
          <EuiTitle>
            <h2>Add Book Details</h2>
          </EuiTitle>
        }
        body={
          <table>
            <tbody>
              <tr>
                <td className="table-title">
                  <EuiText>Title</EuiText>
                </td>
                <td className="table-field">
                  <CommonFieldText
                    value={addBookState?.title || ""}
                    onChange={(e: { target: { value: string } }) =>
                      setAddBookState((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                  {errors.title && (
                    <EuiText color="danger" size="s">
                      {errors.title}
                    </EuiText>
                  )}
                </td>
              </tr>

              <tr>
                <td className="table-title">
                  <EuiText>Author</EuiText>
                </td>
                <td className="table-field">
                  <CommonFieldText
                    value={addBookState?.author || ""}
                    onChange={(e: { target: { value: string } }) =>
                      setAddBookState((prev) => ({
                        ...prev,
                        author: e.target.value,
                      }))
                    }
                  />
                  {errors.author && (
                    <EuiText color="danger" size="s">
                      {errors.author}
                    </EuiText>
                  )}
                </td>
              </tr>

              <tr>
                <td className="table-title">
                  <EuiText>Year</EuiText>
                </td>
                <td className="table-field">
                  <CommonFieldText
                    value={addBookState?.year?.toString() || ""}
                    onChange={(e: { target: { value: string } }) =>
                      setAddBookState((prev) => ({
                        ...prev,
                        year: e.target.value,
                      }))
                    }
                  />
                  {errors.year && (
                    <EuiText color="danger" size="s">
                      {errors.year}
                    </EuiText>
                  )}
                </td>
              </tr>

              <tr>
                <td className="table-title">
                  <EuiText>Quantity</EuiText>
                </td>
                <td className="table-field">
                  <CommonFieldText
                    value={addBookState?.quantity?.toString() || ""}
                    onChange={(e: { target: { value: string } }) =>
                      setAddBookState((prev) => ({
                        ...prev,
                        quantity: e.target.value,
                      }))
                    }
                  />
                  {errors.quantity && (
                    <EuiText color="danger" size="s">
                      {errors.quantity}
                    </EuiText>
                  )}
                </td>
              </tr>

              <tr>
                <td className="table-title">
                  <EuiText>Price</EuiText>
                </td>
                <td className="table-field">
                  <CommonFieldText
                    value={addBookState?.price?.toString() || ""}
                    onChange={(e: { target: { value: string } }) =>
                      setAddBookState((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                  />
                  {errors.price && (
                    <EuiText color="danger" size="s">
                      {errors.price}
                    </EuiText>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        }
        footer={
          <EuiFlexGroup justifyContent="spaceBetween">
            <EuiFlexItem grow={false}>
              <CommonEmptyButton
                iconType="cross"
                onClick={() => setIsAddFlyoutVisible(false)}
                title="close"
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <CommonButton
                title="Confirm"
                fill
                onClick={handleAddBookDetail}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        }
      />
    );
  }

  const columns: Array<EuiBasicTableColumn<BookTypes>> = [
    {
      field: "id",
      name: "ID",
    },
    {
      field: "title",
      name: "Title",
    },
    {
      field: "author",
      name: "Author",
    },
    {
      field: "year",
      name: "Year",
    },
    {
      field: "quantity",
      name: "Quantity",
    },
    {
      field: "price",
      name: "Price",
    },
    {
      name: "Action",
      render: (item: BookTypes) => {
        const isOpen = openPopoverId === item.id;
        const onButtonClick = () => {
          setOpenPopoverId(isOpen ? null : item.id);
        };
        const closePopover = () => setOpenPopoverId(null);

        const button = (
          <EuiIcon type="boxesHorizontal" onClick={onButtonClick} />
        );

        return (
          <EuiPopover
            button={button}
            isOpen={isOpen}
            closePopover={closePopover}
          >
            <EuiFlexGroup direction="column" gutterSize="s">
              <EuiFlexItem>
                <CommonEmptyButton
                  iconType="pencil"
                  onClick={() => {
                    setSelectedBook(item);
                    setEditFlyoutState(item);
                    setIsFlyoutVisible(true);
                    closePopover();
                  }}
                  title="Edit"
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <CommonEmptyButton
                  iconType="trash"
                  color="danger"
                  onClick={() => {
                    setBookToDelete(item);
                    showModal();
                    closePopover();
                  }}
                  title="Delete"
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <CommonEmptyButton
                  iconType="check"
                  onClick={() => {
                    setBookToBuy(item); // new state
                    setIsBuyModalVisible(true); // new modal
                    closePopover();
                  }}
                  title="Buy"
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <CommonEmptyButton
                  iconType="plusInCircle"
                  onClick={() => {
                    const isBookInCart = cartItems.some(
                      (cartItem) => cartItem.id === item.id
                    );

                    if (isBookInCart) {
                      addToast({
                        title: "Already in Cart",
                        color: "danger",
                        iconType: "alert",
                        text: (
                          <p>
                            <strong>{item.title}</strong> is already added to
                            your cart.
                          </p>
                        ),
                      });
                    } else {
                      dispatch(addToCart(item));
                      addToast({
                        title: "Success",
                        color: "success",
                        iconType: "check",
                        text: (
                          <p>
                            Your favourite book <strong>{item.title}</strong> is
                            added to cart.
                          </p>
                        ),
                      });
                    }
                    closePopover();
                  }}
                  title="Add to Cart"
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPopover>
        );
      },
    },
  ];

  return (
    <div className="booksDetail-main">
      <EuiFlexGroup direction="column">
        <EuiText>Books Details Application</EuiText>
        <EuiFlexGroup className="searchField-group">
          <EuiFlexItem>
            <CommonSearchField
              placeholder="Search your books"
              fullWidth={true}
              value={searchInput}
              onChange={(value: string) => setSearchInput(value)}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        {isSearching && (
          <EuiText color="subdued" size="s">
            Searching for books...
          </EuiText>
        )}

        {isSearchError && (
          <EuiText color="danger" size="s">
            Failed to search books. Please try again.
          </EuiText>
        )}
        <EuiFlexGroup justifyContent="flexEnd">
          <EuiFlexItem grow={false}>
            <div className="addBook-btn">
              <CommonButton
                title="Add"
                fill={true}
                onClick={() => setIsAddFlyoutVisible(true)}
              />
            </div>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFlexGroup className="table-group">
          <CommonTable
            items={pageOfItems}
            columns={columns}
            pagination={pagination}
            onChange={onTableChange}
          />
        </EuiFlexGroup>

        <EuiFlexGroup className="cart-bookNumber">
          <EuiFlexItem grow={false}>
            <EuiText>
              No. of Books added to your Cart: <strong>{totalQuantity}</strong>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
        {cartItems.length > 0 && (
          <EuiFlexGroup direction="column" gutterSize="s">
            <EuiFlexItem className="cart-bookDetail">
              <EuiText>Books in Your Cart:</EuiText>
            </EuiFlexItem>
            {cartItems.map((item) => (
              <EuiFlexItem key={item.id}>
                <EuiText size="s">
                  <strong>{item.title}</strong> by {item.author} — Quantity:{" "}
                  {item.quantity}, Price: {item.price}
                </EuiText>
              </EuiFlexItem>
            ))}
          </EuiFlexGroup>
        )}
      </EuiFlexGroup>

      {flyout}
      {addFlyout}
      {isModalVisible && bookToDelete && (
        <CommonModal
          title="Delete Book Details"
          onCancel={() => {
            setIsModalVisible(false);
            setBookToDelete(null);
          }}
          onConfirm={async () => {
            if (!bookToDelete) return;

            try {
              await deleteData(bookToDelete.id).unwrap();
              addToast({
                title: "Success",
                color: "success",
                iconType: "check",
                text: (
                  <p>
                    You have deleted the book{" "}
                    <strong>{bookToDelete.title}</strong> successfully.
                  </p>
                ),
              });
              setIsModalVisible(false);
              setBookToDelete(null);
            } catch (error) {
              console.error("Failed to delete book:", error);
            }
          }}
          cancelButtonText="Cancel"
          confirmButtonText="Delete"
          defaultFocusedButton="confirm"
          details={
            <p>
              Are you sure you want to delete Book Details. It will delete
              permanently.
            </p>
          }
          buttonColor="danger"
        />
      )}
      {isBuyModalVisible && bookToBuy && (
        <CommonModal
          title="Buy Book"
          onCancel={() => {
            setBookToBuy(null);
            setIsBuyModalVisible(false);
          }}
          onConfirm={handleBuyBook}
          cancelButtonText="Cancel"
          confirmButtonText="Confirm"
          defaultFocusedButton="confirm"
          details={
            <p>
              Are you sure you want to buy "<strong>{bookToBuy.title}</strong>"
              for {bookToBuy.price}?
            </p>
          }
        />
      )}

      <CommonToast
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={6000}
      />
    </div>
  );
};
