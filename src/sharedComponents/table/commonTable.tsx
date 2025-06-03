import { EuiBasicTable, Pagination } from "@elastic/eui";
import React from "react";

interface CommonTableProps {
  tableCaption?: string;
  responsiveBreakpoint?: boolean;
  items: any;
  rowHeader?: string;
  columns: any;
  pagination?: Pagination;
  onChange: any;
  rowProps : any;
}

export const CommonTable: React.FC<CommonTableProps> = ({
  tableCaption,
  responsiveBreakpoint,
  items,
  rowHeader,
  columns,
  pagination,
  onChange,
  rowProps,
}) => {
  return (
    <>
      <EuiBasicTable
        tableCaption={tableCaption}
        responsiveBreakpoint={responsiveBreakpoint}
        items={items}
        rowHeader={rowHeader}
        columns={columns}
        pagination={pagination}
        onChange={onChange}
        rowProps={rowProps}
      />
    </>
  );
};
