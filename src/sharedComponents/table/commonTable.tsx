import { EuiBasicTable } from "@elastic/eui";
import React from "react";

interface CommonTableProps {
    tableCaption : string;
    responsiveBreakpoint : boolean;
    items : any;
    rowHeader: string;
    columns : any;
}

export const CommonTable: React.FC<CommonTableProps> = ({
    tableCaption,
    responsiveBreakpoint,
    items,
    rowHeader,
    columns,
}) => {
  return (
    <>
      <EuiBasicTable
        tableCaption={tableCaption}
        responsiveBreakpoint={responsiveBreakpoint}
        items={items}
        rowHeader={rowHeader}
        columns={columns}

      />
    </>
  );
};
