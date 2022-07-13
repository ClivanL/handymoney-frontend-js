import useDetails from '../hooks/useDetails'
import Receipt from '../components/Receipt'
import {useNavigate} from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Accordion from 'react-bootstrap/Accordion';

const Receipts=()=>{
const {partyName, listPerson, listReceipt}=useDetails();
const navigate=useNavigate();

// console.log(partyName);
// console.log(listPerson);
// console.log(listReceipt);
return(
    <>
    {/* <p>party name: {partyName}</p>
    members: {listPerson.map((item)=><p>{item.personName}</p>)} */}
    {/* Receipts added: {listReceipt.map((item,index)=> <p>Receipt {index+1}: Details:{item.details} paid by {item.payer}</p>)} */}
    <h2>Receipts added:</h2>
    <Accordion >
    {listReceipt.map((item,index)=> <Accordion.Item eventKey={`${index}`}>
        <Accordion.Header>Receipt {index+1}: {item.details}</Accordion.Header>
        <Accordion.Body>
        <Receipt listPerson={listPerson} receiptdetails={item.details} index={index+1} payer={item.payer} receiptid={item.id}/>
        </Accordion.Body>
      </Accordion.Item>)}

    </Accordion>
     {/* {listReceipt.map((item,index)=> <Receipt listPerson={listPerson} receiptdetails={item.details} index={index+1} payer={item.payer} receiptid={item.id}/>)} */}
    <Button variant="primary" size="lg" onClick={()=>navigate("/toexcludefromsplit")}>Continue</Button>
    </>
)
}

export default Receipts;