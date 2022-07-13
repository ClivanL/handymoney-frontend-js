import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const EditForm = ({ mod, item, price, setMod, setToggle, receiptid, id }) => {
  const [value, setValue] = useState({ itemName: item, price: price });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://handymoney.herokuapp.com/item/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        itemName: value.itemName,
        price: value.price,
        receipt: `https://handymoney.herokuapp.com/receipt/${receiptid}/`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    setToggle(false);
    setValue({ itemName: "", price: 0 });
    setMod(mod + 1);
  };

  return (
    <>
      <>
      <tr>
          <td>
            <Form.Control size="sm"
              type="text"
              id="itemName"
              name="itemName"
              value={value.itemName}
              onChange={(event) =>
                setValue({ itemName: event.target.value, price: value.price })
              }
            />
          </td>
          <td>
            {" "}
            <Form.Control size="sm"
              type="number"
              id="price"
              name="price"
              value={value.price}
              onChange={(event) =>
                setValue({
                  price: event.target.value,
                  itemName: value.itemName,
                })
              }
            />
          </td>

          <td>
            <Button size="sm" onClick={handleSubmit} variant="primary" type="submit">
              Change
            </Button>
          </td>
        </tr>

       
      </>
      {/* <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter new party name"
          id="partyName"
          name="partyName"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button>Change Name</button>
      </form> */}
    </>
  );
};

export default EditForm;
