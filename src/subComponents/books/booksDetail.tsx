import React, { useState } from "react";
import { useGetDataQuery } from "../../service/bookService/bookService";
import { useUpdateDataMutation } from "../../service/bookService/bookService";
import { BookTypes } from "../../types/books/bookTypes";
import {
  Criteria,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiIcon,
  EuiPopover,
  EuiText,
  EuiTitle,
  useGeneratedHtmlId,
} from "@elastic/eui";
import { CommonSearchField } from "../../sharedComponents/searchField/commonSearchField";
import { CommonButton } from "../../sharedComponents/button/commonButton";
import { CommonEmptyButton } from "../../sharedComponents/button/commonEmptyButton";
import { CommonFieldText } from "../../sharedComponents/fieldText/commonFieldText";

export const BooksDetails: React.FC = () => {
  const { data, isError, isLoading } = useGetDataQuery();
  const [updateData] = useUpdateDataMutation();

  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookTypes | null>(null);
  const [editFlyoutState, setEditFlyoutState] = useState<BookTypes | null>(
    null
  );

  const simpleFlyoutTitleId = useGeneratedHtmlId({
    prefix: "simpleFlyoutTitle",
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
  const findUsers = (
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

  const { pageOfItems, totalItemCount } = findUsers(
    data ?? [],
    pageIndex,
    pageSize
  );

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [10, 5, 0],
  };

  if (isError) return <p>Error has occurred</p>;
  if (isLoading) return <p>Still Loading, please wait for results...</p>;

  let flyout;
  if (isFlyoutVisible) {
    flyout = (
      <EuiFlyout
        ownFocus
        size="s"
        onClose={() => {
          setIsFlyoutVisible(false);
          setSelectedBook(null);
        }}
        aria-labelledby={simpleFlyoutTitleId}
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id={simpleFlyoutTitleId}>Books Details</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
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
        </EuiFlyoutBody>
        <EuiFlyoutFooter>
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
        </EuiFlyoutFooter>
      </EuiFlyout>
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
                    // Add your delete logic here
                    console.log("Delete clicked", item.id);
                    closePopover();
                  }}
                  title="Delete"
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPopover>
        );
      },
    },
  ];

  return (
    <>
      <EuiFlexGroup direction="column">
        <EuiFlexGroup>
          <EuiFlexItem>
            <CommonSearchField
              placeholder="Search your books"
              fullWidth={true}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFlexGroup justifyContent="flexEnd">
          <EuiFlexItem grow={false}>
            <CommonButton title="search" fill={true} />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFlexGroup>
          <EuiBasicTable
            items={pageOfItems}
            columns={columns}
            pagination={pagination}
            onChange={onTableChange}
          />
        </EuiFlexGroup>
      </EuiFlexGroup>
      {flyout}
    </>
  );
};
