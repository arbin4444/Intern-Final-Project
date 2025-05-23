import React, { useEffect, useState } from "react";
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

export const BooksDetails: React.FC = () => {
  const { data, isError, isLoading } = useGetDataQuery();
  const [updateData] = useUpdateDataMutation();
  const [deleteData] = useDeleteDataMutation();
  const [addData] = useAddDataMutation();
  const [buyBook] = useBuyBooksMutation();

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
      setBookToBuy(null);
      setIsBuyModalVisible(false);
    } catch (error) {
      console.error("Failed to buy book:", error);
    }
  };

  if (isError) return <p>Error has occurred</p>;
  if (isLoading) return <p>Still Loading, please wait for results...</p>;

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
            <h2>Books Details</h2>
          </EuiTitle>
        }
        body={
          <table>
            <tr>
              <td>
                <EuiText>Title</EuiText>
              </td>
              <td>
                <CommonFieldText
                  value={editFlyoutState?.title || ""}
                  onChange={(e: { target: { value: any } }) =>
                    setEditFlyoutState((prev) =>
                      prev ? { ...prev, title: e.target.value } : null
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <EuiText>Author</EuiText>
              </td>
              <td>
                <CommonFieldText
                  value={editFlyoutState?.author || ""}
                  onChange={(e: { target: { value: any } }) =>
                    setEditFlyoutState((prev) =>
                      prev ? { ...prev, author: e.target.value } : null
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <EuiText>Year</EuiText>
              </td>
              <td>
                <CommonFieldText
                  value={editFlyoutState?.year?.toString() || ""}
                  onChange={(e: { target: { value: any } }) =>
                    setEditFlyoutState((prev) =>
                      prev ? { ...prev, year: e.target.value } : null
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <EuiText>Quantity</EuiText>
              </td>
              <td>
                <CommonFieldText
                  value={editFlyoutState?.quantity?.toString() || ""}
                  onChange={(e: { target: { value: any } }) =>
                    setEditFlyoutState((prev) =>
                      prev ? { ...prev, quantity: e.target.value } : null
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <EuiText>Price</EuiText>
              </td>
              <td>
                <CommonFieldText
                  value={editFlyoutState?.price?.toString() || ""}
                  onChange={(e: { target: { value: any } }) =>
                    setEditFlyoutState((prev) =>
                      prev ? { ...prev, price: e.target.value } : null
                    )
                  }
                />
              </td>
            </tr>
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
              <CommonButton
                title="Update"
                fill
                onClick={async () => {
                  if (!editFlyoutState) return;

                  try {
                    await updateData(editFlyoutState).unwrap();
                    setIsFlyoutVisible(false);
                    setEditFlyoutState(null);
                    setSelectedBook(null);
                  } catch (error) {
                    console.error("Update failed:", error);
                  }
                }}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        }
      />
    );
  }
  const handleAddBookDetail = async () => {
    if (!addBookState) return;

    try {
      const payload = {
        ...addBookState,
        year: parseInt(addBookState.year),
        quantity: parseInt(addBookState.quantity),
        price: parseFloat(addBookState.price),
      };

      await addData(payload).unwrap(); // send to backend

      // Reset the form and close flyout
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
            <h2>Books Details</h2>
          </EuiTitle>
        }
        body={
          <table>
            <tr>
              <td>
                <EuiText>Title</EuiText>
              </td>
              <td>
                <CommonFieldText
                  value={addBookState?.title || ""}
                  onChange={(e: { target: { value: string } }) =>
                    setAddBookState((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <EuiText>Author</EuiText>
              </td>
              <td>
                <CommonFieldText
                  value={addBookState?.author || ""}
                  onChange={(e: { target: { value: string } }) =>
                    setAddBookState((prev) => ({
                      ...prev,
                      author: e.target.value,
                    }))
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <EuiText>Year</EuiText>
              </td>
              <td>
                <CommonFieldText
                  value={addBookState?.year?.toString() || ""}
                  onChange={(e: { target: { value: string } }) =>
                    setAddBookState((prev) => ({
                      ...prev,
                      year: parseInt(e.target.value),
                    }))
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <EuiText>Quantity</EuiText>
              </td>
              <td>
                <CommonFieldText
                  value={addBookState?.quantity?.toString() || ""}
                  onChange={(e: { target: { value: string } }) =>
                    setAddBookState((prev) => ({
                      ...prev,
                      quantity: parseInt(e.target.value),
                    }))
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <EuiText>Price</EuiText>
              </td>
              <td>
                <CommonFieldText
                  value={addBookState?.price?.toString() || ""}
                  onChange={(e: { target: { value: string } }) =>
                    setAddBookState((prev) => ({
                      ...prev,
                      price: parseFloat(e.target.value),
                    }))
                  }
                />
              </td>
            </tr>
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
                  iconType="shoppingCart"
                  onClick={() => {
                    setBookToBuy(item); // new state
                    setIsBuyModalVisible(true); // new modal
                    closePopover();
                  }}
                  title="Buy"
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
        <EuiFlexGroup justifyContent="flexEnd">
          <EuiFlexItem grow={false}>
            <CommonButton
              title="Add"
              fill={true}
              onClick={() => setIsAddFlyoutVisible(true)}
            />
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
              for ${bookToBuy.price}?
            </p>
          }
        />
      )}
    </div>
  );
};
