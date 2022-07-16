import { Party } from "../App";
import { useEffect, useState, useContext } from "react";
import {useNavigate} from 'react-router-dom'
// import useDetails from "../hooks/useDetails";
import useAllDetails from "../hooks/useAllDetails";
// import useItemDetails from "../hooks/useItemDetails";
import CalculateBreakdown from "../functions/CalculateBreakdown";
import useReceipt from "../hooks/useReceipt";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import DollarRep from "../components/DollarRep";

const Breakdown = () => {
  const context = useContext(Party);

  // const navigate=useNavigate();
  // console.log(context);
  // if(context.exclusion===undefined){
  //   navigate("/");
  // }

  
  // const itemDetails = useItemDetails();
  // const { partyName, listPerson, listReceipt } = useDetails();

  const {itemDetails, partyName, listPerson, listReceipt } = useAllDetails();
  
  // console.log("item details", itemDetails);
  // console.log("breakdown", context.exclusion);
  // console.log("list receipts", listReceipt);
  // console.log("listperson", listPerson);
 
  const { groupByCategory, distributionToPerson, personCost } = CalculateBreakdown(
    context.exclusion,
    itemDetails,
    listPerson,
    listReceipt
  );
  

  // console.log(groupByCategory);
  // console.log(distributionToPerson);

  return (
    <>
      <h1>{partyName}</h1>
      {/* {listPerson.map((item) => {
        return <p>{item.personName}</p>;
      })} */}
      {/* {Object.keys(groupByCategory).map((item) => {
        console.log(item);
        return (
          <div>
            <p>
              {useReceipt(item).details}: {useReceipt(item).payer}
            </p>
            {groupByCategory[item].map((inneritem) => {
              return (
                <p>
                  {inneritem.itemName} price:{inneritem.price} shared by:
                  {inneritem.sharing.map((insideitem) => {
                    return <p>{insideitem}</p>;
                  })}
                </p>
              );
            })}
          </div>
        );
      })} */}

      <h2>Breakdown of payment:</h2>
      <Col md={{ span: 4, offset: 4 }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>To Pay, $</th>
                <th>Amount Paid, $</th>
                <th>Amount to receive, $</th>
              </tr>
            </thead>
            <tbody>
              {distributionToPerson.map((item) => {
                // console.log(item)
                // console.log(personCost[item.personName])
                // console.log(0-item.pay)
                // console.log(personCost[item.personName]-item.pay)
                return (
                  <tr>
                    <td>{item.personName}</td>
                    <td><DollarRep value={item.pay}/></td>
                    <td>{personCost[item.personName]===undefined?<DollarRep value={0}/>:<DollarRep value={personCost[item.personName]}/>}</td>
                    <td>{personCost[item.personName]===undefined?<DollarRep value={0-item.pay}/>:<DollarRep value={personCost[item.personName]-item.pay}/>}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      {/* {distributionToPerson.map((item) => (
        <p>
          {item.personName}:${item.pay}
        </p>
      ))} */}
    </>
  );
};

export default Breakdown;
