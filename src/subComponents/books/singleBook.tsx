import React from "react";
import { useBooksDetailByIdQuery } from "../../Redux/service/bookService/bookService";
import { useParams } from "react-router-dom";
import { EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiText } from "@elastic/eui";
import { CommonEmptyButton } from "../../sharedComponents/button/commonEmptyButton";
import { useNavigate } from "react-router-dom";

export const SingleBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, isError } = useBooksDetailByIdQuery(id);

  const navigate = useNavigate();

  if (isLoading) return <p>wait a moment..your data is still loading</p>;
  if (isError || !book) return <p>something went wrong. Please try again</p>;

  return (
    <div className="singlePage-mainDiv">
      <EuiFlexGroup className="singlePage-mainGroup">
        <EuiFlexGroup className="singlePage-detailGroup" direction="column">
        <EuiFlexGroup className="singlePage-btn" justifyContent="flexEnd">
          <EuiFlexItem grow={false}>
            <CommonEmptyButton
              iconType="sortLeft"
              type="button"
              flush="both"
              title="Back"
              onClick={()=> navigate('/booksdetail')}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFlexGroup className="content-group">
        <EuiFlexGroup direction="column" alignItems="center">
          <EuiText className="singleBook-title">Single Book Detail</EuiText>
          <EuiText className="singleBook-detail">
            <p>Title : {book.title}</p>
            <p>Author : {book.author}</p>
            <p>Year : {book.year}</p>
            <p>Quantity : {book.quantity}</p>
            <p>Price : Rs{book.price}</p>
          </EuiText>
        </EuiFlexGroup>
        </EuiFlexGroup>
        </EuiFlexGroup>
      </EuiFlexGroup>
    </div>
  );
};
