import { useEffect, useState, useContext } from "react";
import { Party } from "../App";
// import { Formik, Field, Form } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import DollarRep from "./DollarRep";
import EditForm from "./EditForm";

// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const Receipt = ({ listPerson, receiptdetails, index, payer, receiptid }) => {
  const context = useContext(Party);
  const [list, setList] = useState([]);
  const [mod, setMod] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [num,setNum]=useState(-1);
  const [item, setItem] = useState({
    itemName: "",
    price: 0,
    receipt: `https://handymoney.herokuapp.com/receipt/${receiptid}/`,
  });
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
    //   .then(
    //     context.setPayed({
    //       ...context.payed,
    //       [payer]:
    //         (context.payed.payer !== undefined)
    //           ? context.payed.payer + list.reduce((a, b) => a + parseFloat(b.price), 0)
    //           : list.reduce((a, b) => a + parseFloat(b.price), 0),
    //     })
    // );
  }, [mod]);

  // console.log(context.payed);
  // console.log(list);

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
        console.log(data);
        setMod(mod + 1);
      });
  };

  const handleEdit = (id) => {
    setToggle(true);
    setNum(id)
  };

  return (
    <>
      <p>Receipt {index}:</p>
      <p>Details: {receiptdetails}</p>
      <p>Paid by: {payer}</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Row>
            <Form.Label>Enter Items</Form.Label>
            <Col md={{ span: 2, offset: 5 }}>
              <Form.Control
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
              />
              <Form.Control
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
              />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add item to this receipt
        </Button>
      </Form>
      {/* <form onSubmit={handleSubmit}>
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
      </form> */}
      <br></br>
      <Col md={{ span: 4, offset: 4 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {/* {list.map((item) => {
              return toggle === true ? (
                <EditForm
                  mod={mod}
                  item={item.itemName}
                  price={item.price}
                  setMod={setMod}
                  setToggle={setToggle}
                  receiptid={receiptid}
                  id={item.id}
                />
              ) : (
                <tr>
                  <td>{item.itemName}</td>
                  <td>
                    <DollarRep value={item.price} />
                  </td>
                  <td>
                    <Button onClick={handleEdit} size="sm" variant="warning">
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })} */}
                        {list.map((item) => {
              return num === item.id ? (
                <EditForm
                  mod={mod}
                  item={item.itemName}
                  price={item.price}
                  setMod={setMod}
                  setToggle={setToggle}
                  receiptid={receiptid}
                  id={item.id}
                  setNum={setNum}
                />
              ) : (
                <tr>
                  <td>{item.itemName}</td>
                  <td>
                    <DollarRep value={item.price} />
                  </td>
                  <td>
                    <Button onClick={()=>handleEdit(item.id)} size="sm" variant="warning">
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
      {/* <ul>
        Items in receipt:
        {list.map((item) => {
          return (
            <li>
              name:{item.itemName} | price: ${item.price} <button>edit</button>
            </li>
          );
        })}
      </ul> */}
    </>
  );
};

export default Receipt;
