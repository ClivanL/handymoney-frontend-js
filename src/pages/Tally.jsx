import { useState, useEffect, useContext } from "react";
import {useNavigate} from 'react-router-dom'
import { Party } from "../App";


const Tally= () => {
  const context = useContext(Party);
  const [partyName, setPartyName] = useState("");
  const [listPerson, setListPerson]=useState([]);
  const [listReceipt, setListReceipt]=useState([])
  const [mod, setMod]=useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    fetch(`https://handymoney.herokuapp.com/party/${context.partyName.id}`, {
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
            return item.party ===`https://handymoney.herokuapp.com/party/${context.partyName.id}/`
          }),
        );
      });

    fetch("https://handymoney.herokuapp.com/receipt/", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setListReceipt(data.filter((item)=>item.party===`https://handymoney.herokuapp.com/party/${context.partyName.id}/`));
      });
  }, [mod]);

  const [receipt, setReceipt] = useState({
    details: "",
    party:`https://handymoney.herokuapp.com/party/${context.partyName.id}/`,
    payer: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://handymoney.herokuapp.com/receipt/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(receipt),
      })
        .then((response) => response.json())
        .then((data) => {
            setReceipt({details:"",payer:"",party:receipt.party})
            setMod(data)
        });
  };

  return (
    <>
      <h1>Start tallying</h1>
      <h2>
        Party you have selected:{partyName}
        <button>Change party</button>
      </h2>
      <h2>
        Members:
        {listPerson.map((item) => {
          return <p>{item.personName}</p>;
        })}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          id="details"
          name="details"
          placeholder="enter receipt description"
          value={receipt.details}
          onChange={(event) => {
            setReceipt({
              details: event.target.value,
              //   totalamount: receipt.totalamount,
              payer: receipt.payer,
              party:receipt.party
            });
          }}
        />
        <label>Who's the payer?</label>
  <select name="payer" id="payer" value={receipt.payer}  onChange={(event) => {
            setReceipt({
              payer: event.target.value,
              //   totalamount: receipt.totalamount,
              details: receipt.details,
              party:receipt.party
            });
          }}>
    {listPerson.map((item)=>{return <option value={item.personName}>{item.personName}</option>})}
    
  </select>
        {/* <input
          id="payer"
          name="payer"
          placeholder="person paying"
          value={receipt.payer}
          onChange={(event) => {
            setReceipt({
              payer: event.target.value,
              //   totalamount: receipt.totalamount,
              details: receipt.details,
              party:receipt.party
            });
          }}
        /> */}
        {/* <input
          id="totalamount"
          name="totalamount"
          placeholder="total amount ($)"
          value={receipt.totalamount}
          onChange={(event) => {
            setReceipt({
              payingperson: receipt.payingperson,
              totalamount: parseFloat(event.target.value),
              receiptdescription: receipt.receiptdescription,
            });
          }}
        /> */}
        <button>submit</button>
      </form>
      {listReceipt.map((item,index)=><div>Receipt{index+1}:{item.details}, {item.payer}</div>)}
      <button onClick={()=>navigate("/receipts")}>Confirm receipts</button>
    </>
  );
};

export default Tally;