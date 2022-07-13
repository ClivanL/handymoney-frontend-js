import { useState, useContext} from "react";
import {Party} from '../App'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ChangePartyNameForm = ({ setMod,setToggle }) => {
    const context=useContext(Party);
  const [name, setName] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(context)
    fetch(
      `https://handymoney.herokuapp.com/party/${context.partyName.id}/`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partyName: name }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        context.setPartyName(data);
      });
    setToggle(false);
    setName("");
    setMod(mod+1);
  };

  return (
    <>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control type="text"  id="partyName"
          name="partyName"
          value={name}
          onChange={(event) => setName(event.target.value)}placeholder="Enter new party name" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Change
      </Button>
    </Form>
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

export default ChangePartyNameForm;
