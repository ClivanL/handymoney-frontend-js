import {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {Party} from '../App'


const AddPartyName=()=>{
    const navigate=useNavigate();
    const context=useContext(Party);
    const handleSubmit=(event)=>{
        event.preventDefault();
        // console.log(party);
        fetch("https://handymoney.herokuapp.com/party/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"partyName":context.partyName.partyName}),
      })
        .then((response) => response.json())
        .then((data) => {
            context.setPartyName(data);
        })
        .then(navigate("/addtoparty"));
    }
    return (
    <>
    <form onSubmit={handleSubmit}>
        <input name="partyname" id="partyname" placeholder="input party name" value={context.partyName.partyName} onChange={(event)=>context.setPartyName({partyName:event.target.value, partyId:context.partyName.id})}/>
        <button>Create Party</button>
    </form>
    </>
    )
}

export default AddPartyName;