import { Party } from "../App";
import { useEffect, useState, useContext } from "react";
import useDetails from "../hooks/useDetails";
import useItemDetails from "../hooks/useItemDetails";
import CalculateBreakdown from "../functions/CalculateBreakdown";
import useReceipt from "../hooks/useReceipt";

const Breakdown = () => {
  const context = useContext(Party);
  const { partyName, listPerson, listReceipt } = useDetails();
  const itemDetails = useItemDetails();
  console.log("item details", itemDetails);
  console.log("breakdown", context.exclusion);
  console.log("list receipts", listReceipt);
  const { groupByCategory, distributionToPerson } = CalculateBreakdown(
    context.exclusion,
    itemDetails,
    listPerson
  );

  console.log(groupByCategory);
  console.log(distributionToPerson);

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
      {distributionToPerson.map((item) => (
        <p>
          {item.personName}:${item.pay}
        </p>
      ))}
    </>
  );
};

export default Breakdown;
