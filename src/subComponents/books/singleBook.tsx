import React from "react";
import {useBooksDetailByIdQuery} from '../../Redux/service/bookService/bookService'
import { useParams } from "react-router-dom";
import { EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiText } from "@elastic/eui";

export const SingleBook:React.FC=()=>{
    const {id}= useParams<{id:string}>();
    const {data:book,isLoading,isError}=useBooksDetailByIdQuery(id);

    if (isLoading) return <p>wait a moment..your data is still loading</p>
    if (isError || !book) return <p>something went wrong. Please try again</p>

    return(
        <div className="singlePage-mainDiv">
        
         <EuiFlexGroup className="singlePage-group" justifyContent="center">
       
            <EuiFlexItem grow={false}>
                <EuiText className="singleBook-title">
                    Single Book Detail
                </EuiText>
                <EuiSpacer/>
                <EuiText>
                    <p>Title : {book.title}</p>
                    <p>Author : {book.author}</p>
                    <p>Year : {book.year}</p>
                    <p>Quantity : {book.quantity}</p>
                    <p>Price : {book.price}</p>
                </EuiText>
            </EuiFlexItem>
           
         </EuiFlexGroup>
        
        </div>
    )
}