import useDetails from '../hooks/useDetails'
import Receipt from '../components/Receipt'
import {useNavigate} from 'react-router-dom'

const Receipts=()=>{
const {partyName, listPerson, listReceipt}=useDetails();
const navigate=useNavigate();
// console.log(partyName);
// console.log(listPerson);
// console.log(listReceipt);
return(
    <>
    <p>party name: {partyName}</p>
    members: {listPerson.map((item)=><p>{item.personName}</p>)}
    {/* Receipts added: {listReceipt.map((item,index)=> <p>Receipt {index+1}: Details:{item.details} paid by {item.payer}</p>)} */}
    Receipts added: {listReceipt.map((item,index)=> <Receipt listPerson={listPerson} receiptdetails={item.details} index={index+1} payer={item.payer} receiptid={item.id}/>)}
    <button onClick={()=>navigate("/toexcludefromsplit")}>Continue</button>
    </>
)
}

export default Receipts;