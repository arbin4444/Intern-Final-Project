import { EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import React from "react";
import { CommonSearchField } from "../../sharedComponents/searchField/commonSearchField";
import { CommonButton } from "../../sharedComponents/button/commonButton";
export const UsersDetail: React.FC = () => {
  return (
    <div className="userDetail-div">
      <EuiFlexGroup className="userDetail-flexGroup" direction="column">
        <EuiFlexGroup>
          <EuiFlexItem>
            <CommonSearchField
              placeholder="Search User Details"
              fullWidth={true}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFlexGroup justifyContent="flexEnd">
          <EuiFlexItem grow={false}>
            <CommonButton fill={true} title="Filter" />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexGroup>
    </div>
  );
};
