import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const Receipt = ({
  listPerson,
  receiptdetails,
  index,
  payer,
  receiptid,
}) => {
  const [list, setList] = useState([]);
  const [mod, setMod] = useState({});
  useEffect(() => {
    fetch("https://handymoney.herokuapp.com/item/", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setList(
          data.filter((item) => {
            return (
              item.receipt ===
              `https://handymoney.herokuapp.com/receipt/${receiptid}/`
            );
          })
        );
      });
  }, [mod]);
  // console.log(list);

  const [item, setItem] = useState({
    itemName: "",
    price: 0,
    receipt: `https://handymoney.herokuapp.com/receipt/${receiptid}/`,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(item);
    fetch("https://handymoney.herokuapp.com/item/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        setMod(data);
      });
  };
  return (
    <>
      <p>
        Receipt {index}: {receiptdetails} paid by {payer}
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="input"
          name="itemName"
          id="itemName"
          value={item.itemName}
          placeholder="item name"
          onChange={(event) =>
            setItem({
              itemName: event.target.value,
              price: item.price,
              receipt: item.receipt,
            })
          }
        ></input>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="price"
          value={item.price}
          onChange={(event) =>
            setItem({
              itemName: item.itemName,
              price: event.target.value,
              receipt: item.receipt,
            })
          }
        ></input>
        <button>Press to add items to receipt</button>
      </form>
      <ul>
        Items in receipt:
        {list.map((item) => {
          return (
            <li>
              name:{item.itemName} | price: ${item.price} <button>edit</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Receipt;
