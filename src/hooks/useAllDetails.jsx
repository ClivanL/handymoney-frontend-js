import {useEffect, useContext, useState} from 'react'
import {Party} from '../App'

const useAllDetails=()=>{
    const [itemDetails, setItemDetails]=useState([]);
    const [partyName, setPartyName] = useState("");
    const [listPerson, setListPerson]=useState([]);
    const [listReceipt, setListReceipt]=useState([]);
    const context=useContext(Party);
    useEffect(() => {
        fetch(`https://handymoney.herokuapp.com/item/`, { method: "GET" })
          .then((response) => response.json())
          .then((data) => {
            setItemDetails(data)
          });
        fetch(`https://handymoney.herokuapp.com/party/${context.partyName.id}/`, {
        //   fetch(`https://handymoney.herokuapp.com/party/388/`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            setPartyName(data.partyName);
          });
        fetch(`https://handymoney.herokuapp.com/person/`, { method: "GET" })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            setListPerson(data.filter((item) => {
            //   return item.party ===`https://handymoney.herokuapp.com/party/388/`
                return item.party ===`https://handymoney.herokuapp.com/party/${context.partyName.id}/`
              }),
            );
          });
    
        fetch("https://handymoney.herokuapp.com/receipt/", { method: "GET" })
          .then((response) => response.json())
          .then((data) => {
            // setListReceipt(data.filter((item)=>item.party===`https://handymoney.herokuapp.com/party/388/`));
            setListReceipt(data.filter((item)=>item.party===`https://handymoney.herokuapp.com/party/${context.partyName.id}/`));
          });
      }, [])
      return {itemDetails:itemDetails,partyName:partyName, listPerson:listPerson, listReceipt:listReceipt}
}

export default useAllDetails;