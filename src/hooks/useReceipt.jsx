import {useEffect, useState} from 'react'

const useItemDetails=(link)=>{
const [receiptDetails,setReceiptDetails]=useState();

    useEffect(()=>{
        fetch(link, { method: "GET" })
          .then((response) => response.json())
          .then((data) => {
            setReceiptDetails(data)
          });
    },[])
    return receiptDetails;
}

export default useItemDetails;