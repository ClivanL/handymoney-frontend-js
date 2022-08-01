import useItemDetails from "../hooks/useItemDetails"

const CalculateBreakdown= (exclusion, itemDetails, listPerson, listReceipt)=>{

//filter items that are only the items in the receipt.
const foodToTabulate= itemDetails?.filter((item)=>{return Object.keys(exclusion).indexOf(item.id.toString())!==-1})

//include key:value sharing inside the individual objects in the array
const processed=foodToTabulate?.map((item)=>{
    return {...item, sharing: exclusion?.[item?.id]}
})


//create obj of keys, but empty arrays
const obj = {};
processed?.map((item) => {
  return item?.sharing?.map((inneritem) => {
    return (obj[inneritem] =[] );
  });
})

//populate the arrays according to the keys
processed?.map((item)=>{
  return item?.sharing?.map((inneritem)=>{
    return obj?.[inneritem]?.push(item);
  })
})

//how much each item is based on the person sharing it
const moneyDistribution=listPerson?.map((item) => {
      return obj?.[item?.personName]?.reduce((a, b) => {
        return a + b?.price/(b?.sharing?.length);
      }, 0);
    })

//calculate how much each person is supposed to pay for the entire outing
const distributionToPerson=moneyDistribution?.map((item,index)=>{return {...listPerson?.[index],pay:item}})



// const groupByCategory = processed?.reduce((group, product) => {
//     const { receipt } = product;
//     group[receipt] = group[receipt] ?? [];
//     group[receipt]?.push(product);
//     return group;
//   }, {});


//to find out how much each person has to pay, include considerations of which person paid for the receipt.
let personCost={}
for(let i=0; i<listReceipt?.length;i++){
  personCost[listReceipt?.[i]?.payer]=0;
}

for(let i=0;i<foodToTabulate?.length;i++){
  for(let j=0;j<listReceipt?.length;j++){
    if(foodToTabulate?.[i]?.receipt===`https://handymoney.herokuapp.com/receipt/${listReceipt[j].id}/`){
      personCost[listReceipt?.[j]?.payer]+=foodToTabulate?.[i]?.price;
    }
  }
}

return {distributionToPerson:distributionToPerson, personCost:personCost}

}

export default CalculateBreakdown;