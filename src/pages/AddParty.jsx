import {useState, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Party} from '../App'

const AddParty=()=>{
    const [person, setPerson]=useState("")
    const [mod,setMod]=useState("")
    const [list, setList]=useState([])
    const navigate=useNavigate();
    const context=useContext(Party);
    // console.log(context.partyName);
    useEffect(() => {
        fetch("https://handymoney.herokuapp.com/person/", { method: "GET" })
          .then((response) => response.json())
          .then((data) => {
            setList(data.filter((item)=>{return item.party===`https://handymoney.herokuapp.com/party/${context.partyName.id}/`}));
          });
      }, [mod]);
    //   console.log(list);
    const handleSubmit=(event)=>{
        event.preventDefault();
        // console.log(party);
        fetch("https://handymoney.herokuapp.com/person/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"personName":person, "party":`https://handymoney.herokuapp.com/party/${context.partyName.id}/`}),
      })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setPerson("");
            setMod(data);
        });
    }

    const handleDelete=(todelete)=>{
        // console.log(todelete.id);
        
        fetch(`https://handymoney.herokuapp.com/person/${todelete.id}/`, {
            method: "delete",
            // headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(todelete),
          }).then(setMod(todelete.id))
            // .then((response) => response.json())
            // .then((data) => {
            //     console.log(data);
                
            // });
    }

    return (
    <>
    <h1>Enter members for {context.partyName.partyName}</h1>
    <form onSubmit={handleSubmit}>
        <input name="name" id="name" placeholder="input name" value={person} onChange={(event)=>setPerson(event.target.value)}/>
        <button>Add to party</button>
    </form>
    <ul>
        Current members added:
        {list?.map((item)=>{
            return <div>{item.personName}<button onClick={()=>{handleDelete(item)}}>Remove</button></div>
        })}
    </ul>
    <button onClick={()=>navigate("/tally")}>Confirm Party</button>
    </>
    )
}

export default AddParty;