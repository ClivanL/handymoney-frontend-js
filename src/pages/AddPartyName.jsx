import {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {Party} from '../App'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import showmethemoney from '../../images/showmethemoney.jpeg'


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
            // console.log(data);
            context.setPartyName(data);
        })
        .then(navigate("/addtoparty"));
    }
    return (
    <>
    
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Row>
        <Form.Label>Enter Party Name</Form.Label>
        <Col  md={{ span: 4, offset: 4 }}> <Form.Control  name="partyname" id="partyname" placeholder="party name" value={context.partyName.partyName} onChange={(event)=>context.setPartyName({partyName:event.target.value, partyId:context.partyName.id})} /></Col>
      </Row>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <br></br>
    <br></br>
    <Image src={showmethemoney}></Image>
    {/* <form onSubmit={handleSubmit}>
        <input name="partyname" id="partyname" placeholder="input party name" value={context.partyName.partyName} onChange={(event)=>context.setPartyName({partyName:event.target.value, partyId:context.partyName.id})}/>
        <button>Create Party</button>
    </form> */}
    </>
    )
}

export default AddPartyName;