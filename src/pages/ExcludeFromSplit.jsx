import useDetails from "../hooks/useDetails";
import { useEffect, useState, useContext } from "react";
import { Formik, Field, Form} from "formik";
import {useNavigate} from 'react-router-dom'
import {Party} from '../App'
import DollarRep from "../components/DollarRep";
import Button from "react-bootstrap/Button";


const ExcludeFromSplit = () => {
  const context=useContext(Party);
  const navigate=useNavigate();
  const { partyName, listPerson, listReceipt } = useDetails();
  const [listItem, setListItem] = useState([]);
  console.log(partyName);
  console.log(listPerson);
  console.log(listReceipt);

  useEffect(() => {
    fetch("https://handymoney.herokuapp.com/item/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const receipts = listReceipt?.map((item) => {
          console.log(item);
          return `https://handymoney.herokuapp.com/receipt/${item.id}/`;
        });
        console.log(receipts);
        setListItem(
          receipts.map((item) => {
            return data.filter((iteminner) => iteminner.receipt === item);
          })
        );
      });
  }, [listReceipt]);

  console.log(listItem);
  // console.log(context.exclusion);

  return <>
    <Formik
      initialValues={{
        
      }}
      onSubmit={async (values) => {
        context.setExclusion(values);
        navigate("/breakdown")
      }}
    >
      {({ values}) => (
        <Form>
            {listReceipt.map((item,index)=>{
                return <>
                <div>Receipt{index+1}, paid by {item.payer}, {item.details}</div>

                {listItem?.[index]?.map((it)=>{
                                 return <>
                                  <div>{it.itemName}| <DollarRep value={it.price}/></div>
                                  <div id="checkbox-group">Shared by:</div>
                                  <div role="group" aria-labelledby="checkbox-group">
                                  {listPerson.map((item) => 
                                                <label>
                                                  <Field
                                                    type="checkbox"
                                                    name={it.id}
                                                    value={item.personName}
                                                  />
                                                  {item.personName}
                                                </label>
                                              )}
                                  </div>
                                  </>
                })}
  

                </>
            })}
            <Button type="submit">Submit</Button>
         
        </Form>

 
      )}
    </Formik>
  </>;
};

export default ExcludeFromSplit;


// import useDetails from "../hooks/useDetails";
// import { useEffect, useState, useContext } from "react";
// import { Formik, Field} from "formik";
// import {useNavigate} from 'react-router-dom'
// import {Party} from '../App'
// import Form from 'react-bootstrap/Form';
// import Button from "react-bootstrap/Button";


// const ExcludeFromSplit = () => {
//   const context=useContext(Party);
//   const navigate=useNavigate();
//   const { partyName, listPerson, listReceipt } = useDetails();
//   const [listItem, setListItem] = useState([]);
//   console.log(partyName);
//   console.log(listPerson);
//   console.log(listReceipt);

//   useEffect(() => {
//     fetch("https://handymoney.herokuapp.com/item/", {
//       method: "GET",
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         const receipts = listReceipt?.map((item) => {
//           console.log(item);
//           return `https://handymoney.herokuapp.com/receipt/${item.id}/`;
//         });
//         console.log(receipts);
//         setListItem(
//           receipts.map((item) => {
//             return data.filter((iteminner) => iteminner.receipt === item);
//           })
//         );
//       });
//   }, [listReceipt]);

//   console.log(listItem);
//   // console.log(context.exclusion);

//   return <>
//     <Formik
//       initialValues={{
        
//       }}
//       onSubmit={async (values) => {
//         context.setExclusion(values);
//         navigate("/breakdown")
//       }}
//     >
//       {({ values}) => (
//         <Form>
//             {listReceipt.map((item,index)=>{
//                 return <>
//                 <div>Receipt{index+1}, paid by {item.payer}, {item.details}</div>

//                 {listItem?.[index]?.map((it)=>{
//                                  return <>
//                                  <div>
//                           {it.itemName} ${it.price}
//                         </div>
//                         <div id="checkbox-group"></div>
//                         <div role="group" aria-labelledby="checkbox-group" key={`inline-checkbox`} className="mb-3">
//                           {listPerson.map((item,index) => 
//                               <Form.Check
//                               inline
//                               label={item.personName}
//                               value={item.personName}
//                               name={it.id}
//                               type="checkbox"
//                               id={`inline-checkbox-${index}`}
//                             />
//                                               )}
//                                   </div>
//                                   </>
//                 })}
  

//                 </>
//             })}
//             <button type="submit">Submit</button>
         
//         </Form>

 
//       )}
//     </Formik>
//   </>;
// };

// export default ExcludeFromSplit;
