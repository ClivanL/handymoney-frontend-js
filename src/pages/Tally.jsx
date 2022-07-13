import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Party } from "../App";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Tally = () => {
  const context = useContext(Party);
  const [partyName, setPartyName] = useState("");
  const [listPerson, setListPerson] = useState([]);
  const [listReceipt, setListReceipt] = useState([]);
  const [mod, setMod] = useState([]);
  const navigate = useNavigate();


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
        setListPerson(
          data.filter((item) => {
            return (
              item.party ===
              `https://handymoney.herokuapp.com/party/${context.partyName.id}/`
            );
          })
        );
      });

    fetch("https://handymoney.herokuapp.com/receipt/", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setListReceipt(
          data.filter(
            (item) =>
              item.party ===
              `https://handymoney.herokuapp.com/party/${context.partyName.id}/`
          )
        );
      });
  }, [mod]);

  const [receipt, setReceipt] = useState({
    details: "",
    party: `https://handymoney.herokuapp.com/party/${context.partyName.id}/`,
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
        setReceipt({ details: "", payer: "", party: receipt.party });
        setMod(data);
      });
  };
  

  return(
    <>
      <h1>Start Tallying</h1>
      <div>
        Party you have selected:
        <h3>{partyName}</h3>
      </div>
      <div>
        Members:
        <Col md={{ span: 4, offset: 4 }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {listPerson.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.personName}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </div>
      {/* <div>
        Members:
        {listPerson.map((item) => {
          return <p>{item.personName}</p>;
        })}
      </div> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Row>
            <Form.Label>Enter Receipts</Form.Label>
            <Col md={{ span: 4, offset: 4 }}>
              {" "}
              <Form.Control
                id="details"
                name="details"
                placeholder="enter receipt description"
                value={receipt.details}
                onChange={(event) => {
                  setReceipt({
                    details: event.target.value,
                    //   totalamount: receipt.totalamount,
                    payer: receipt.payer,
                    party: receipt.party,
                  });
                }}
              />
                  <Form.Select name="payer"
          id="payer"
          value={receipt.payer}
          onChange={(event) => {
            setReceipt({
              payer: event.target.value,
              //   totalamount: receipt.totalamount,
              details: receipt.details,
              party: receipt.party,
            });
          }} aria-label="Default select example">
      <option>Choose payer</option>
      {listPerson.map((item) => {
            return <option value={item.personName}>{item.personName}</option>;
          })}
    </Form.Select>
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {/* <form onSubmit={handleSubmit}>
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
              party: receipt.party,
            });
          }}
        />
        <label>Who's the payer?</label>
        <select
          name="payer"
          id="payer"
          value={receipt.payer}
          onChange={(event) => {
            setReceipt({
              payer: event.target.value,
              //   totalamount: receipt.totalamount,
              details: receipt.details,
              party: receipt.party,
            });
          }}
        >
          <option>Choice</option>
          {listPerson.map((item) => {
            return <option value={item.personName}>{item.personName}</option>;
          })}
        </select>
     
        <button>submit</button>
      </form> */}
      {/* {listReceipt.map((item, index) => (
        <div>
          Receipt{index + 1}:{item.details}, {item.payer}
        </div>
      ))} */}

<br></br>
<br></br>

       <Col md={{ span: 8, offset: 2 }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Receipt No.</th>
                <th>Details</th>
                <th>Payer</th>
              </tr>
            </thead>
            <tbody>
              {listReceipt.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.details}</td>
                    <td>{item.payer}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>

<br></br>
<br></br>
<br></br>
      <Button variant="success" size="lg" onClick={() => navigate("/receipts")}>Confirm receipts</Button>
    </>
  );
};

export default Tally;
