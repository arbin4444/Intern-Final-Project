import React, { useState } from "react";
import { useGetDataQuery } from "../../service/bookService/bookService";
import { BookTypes } from "../../types/books/bookTypes";
import {
  Criteria,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";
import { CommonSearchField } from "../../sharedComponents/searchField/commonSearchField";
import {CommonButton} from "../../sharedComponents/button/commonButton";

export const BooksDetails: React.FC = () => {
  const { data, isError, isLoading } = useGetDataQuery();

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
                <CommonButton
                    title="search"
                    fill={true}
                />
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
    </>
  );
};
