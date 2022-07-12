import {useEffect, useState} from 'react'

const useItemDetails=()=>{
const [itemDetails,setItemDetails]=useState();

    useEffect(()=>{
        fetch(`https://handymoney.herokuapp.com/item/`, { method: "GET" })
          .then((response) => response.json())
          .then((data) => {
            setItemDetails(data)
          });
    },[])
    return itemDetails;
}

export default useItemDetails;