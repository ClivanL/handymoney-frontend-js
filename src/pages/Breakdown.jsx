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


  const {itemDetails, partyName, listPerson, listReceipt } = useAllDetails();
 
  const {distributionToPerson, personCost } = CalculateBreakdown(
    context.exclusion,
    itemDetails,
    listPerson,
    listReceipt
  );

  return (
    <>
      <h1>{partyName}</h1>
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
    </>
  );
};

export default Breakdown;
