import { useState, useContext} from "react";
import {Party} from '../App'

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
        context.setPartyName(data);
      });
    setToggle(false);
    setName("");
    setMod(context.partyName.partyName);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter new party name"
          id="partyName"
          name="partyName"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button>Change Name</button>
      </form>
    </>
  );
};

export default ChangePartyNameForm;
