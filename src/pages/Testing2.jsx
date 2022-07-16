import { Party } from "../App";
import useItemDetails from '../hooks/useItemDetails'
import useDetails from '../hooks/useDetails'
import { useEffect, useState, useContext } from "react";

const Testing2= ()=>{

    const context=useContext(Party);
    const itemDetails = useItemDetails();
    const { partyName, listPerson, listReceipt } = useDetails();
    // const promise2=useDetails();
    // console.log(itemDetails)
    // console.log(partyName, listPerson, listReceipt);
   const allpromise= Promise.all(listReceipt,listPerson,itemDetails)
   
   let list;
   const test=async()=>{
     list= await allpromise;
     console.log(list);
   }
  test();
   
   
    // const { groupByCategory, distributionToPerson, personCost } = CalculateBreakdown(
    //     context.exclusion,
    //     itemDetails,
    //     listPerson,
    //     listReceipt
    //   );

    //   console.log(distributionToPerson, personCost);

    return(<></>)
}

export default Testing2;