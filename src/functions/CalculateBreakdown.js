const CalculateBreakdown= (exclusion, itemDetails, listPerson)=>{

// console.log("exclusion",await exclusion);
// console.log("itemdetails",await itemDetails);
// console.log("itemdetails",await listPerson);
console.log(Object.keys(exclusion))


const foodToTabulate= itemDetails?.filter((item)=>{return Object.keys(exclusion).indexOf(item.id.toString())!==-1})
console.log(foodToTabulate);
// console.log(exclusion);
// console.log(foodToTabulate);
// console.log(exclusion[foodToTabulate[0][0].id])
const processed=foodToTabulate?.map((item)=>{
    return {...item, sharing: exclusion?.[item?.id]}
})
console.log(processed);

const obj = {};
// console.log(obj);
processed?.map((item) => {
  return item?.sharing?.map((inneritem) => {
    return (obj[inneritem] =[] );
  });
})
processed?.map((item)=>{
  return item?.sharing?.map((inneritem)=>{
    return obj?.[inneritem]?.push(item);
  })
})
console.log(obj);

const moneyDistribution=listPerson?.map((item) => {
      return obj?.[item?.personName]?.reduce((a, b) => {
        return a + b?.price/(b?.sharing?.length);
      }, 0);
    })
const distributionToPerson=moneyDistribution?.map((item,index)=>{return {...listPerson?.[index],pay:item}})

//https://dmitripavlutin.com/javascript-array-group/
console.log(processed);

const groupByCategory = processed?.reduce((group, product) => {
    const { receipt } = product;
    group[receipt] = group[receipt] ?? [];
    group[receipt]?.push(product);
    return group;
  }, {});
  console.log(groupByCategory);
  console.log(distributionToPerson);

return {groupByCategory:groupByCategory, distributionToPerson:distributionToPerson}

}

export default CalculateBreakdown;