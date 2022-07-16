import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import Button from "react-bootstrap/Button";
import DollarRep from "../components/DollarRep";

const Testing = () => {
  const [listItem, setListItem] = useState([]);
  const [listPerson, setListPerson] = useState([]);
  const [listReceipt, setListReceipt] = useState([]);
  const [test, setTest] = useState();

  
  useEffect(() => {
    setListItem([
      [
        {
          id: 84,
          itemName: "tomato",
          price: 4,
          receipt: "https://handymoney.herokuapp.com/receipt/83/",
        },
        {
          id: 85,
          itemName: "chick",
          price: 4,
          receipt: "https://handymoney.herokuapp.com/receipt/83/",
        },
        {
          id: 86,
          itemName: "chickclams",
          price: 4,
          receipt: "https://handymoney.herokuapp.com/receipt/83/",
        },
      ],
      [
        {
          id: 87,
          itemName: "rice",
          price: 1,
          receipt: "https://handymoney.herokuapp.com/receipt/84/",
        },
        {
          id: 88,
          itemName: "pork",
          price: 1,
          receipt: "https://handymoney.herokuapp.com/receipt/84/",
        },
        {
          id: 89,
          itemName: "curry",
          price: 1,
          receipt: "https://handymoney.herokuapp.com/receipt/84/",
        },
      ],
    ]);

    setListPerson([
      {
        id: 253,
        personName: "iiui",
        party: "https://handymoney.herokuapp.com/party/100/",
      },
      {
        id: 254,
        personName: "das",
        party: "https://handymoney.herokuapp.com/party/100/",
      },
      {
        id: 255,
        personName: "hey",
        party: "https://handymoney.herokuapp.com/party/100/",
      },
    ]);

    setListReceipt([
      {
        id: 83,
        payer: "Clivan",
        details: "hihihihi",
        party: "https://handymoney.herokuapp.com/party/100/",
      },
      {
        id: 84,
        payer: "clivna",
        details: "lololol",
        party: "https://handymoney.herokuapp.com/party/100/",
      },
    ]);
  }, []);
  // console.log(listItem);
  // console.log(listPerson);
  // console.log(listReceipt);
  // console.log(test);
  // const arr={}
  // console.log(listItem.map((item)=>{arr[item.id]=listPerson?.map((item)=>item.personName)}))

    // console.log(listItem.map((item)=>item.map((inneritem)=>{arr[inneritem.id]=listPerson?.map((item)=>item.personName)})))
  // setListParty("WARRIORS");
  // console.log(arr)

  return (<>
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
  </>)
  
};

export default Testing;


// import { useState, useEffect } from "react";
// import { Formik, Field, Form } from "formik";
// import Button from "react-bootstrap/Button";
// import { object, array } from 'yup'
// import { Autocomplete } from '@material-ui/lab/Autocomplete'
// import { TextField } from '@material-ui/core'
// import { fieldToTextField } from 'formik-material-ui'

// const Testing = () => {
//   const [listItem, setListItem] = useState([]);
//   const [listPerson, setListPerson] = useState([]);
//   const [listReceipt, setListReceipt] = useState([]);
//   const [test, setTest] = useState();

//   useEffect(() => {
//     setListItem([
//       [
//         {
//           id: 84,
//           itemName: "tomato",
//           price: 4,
//           receipt: "https://handymoney.herokuapp.com/receipt/83/",
//         },
//         {
//           id: 85,
//           itemName: "chick",
//           price: 4,
//           receipt: "https://handymoney.herokuapp.com/receipt/83/",
//         },
//         {
//           id: 86,
//           itemName: "chickclams",
//           price: 4,
//           receipt: "https://handymoney.herokuapp.com/receipt/83/",
//         },
//       ],
//       [
//         {
//           id: 87,
//           itemName: "rice",
//           price: 1,
//           receipt: "https://handymoney.herokuapp.com/receipt/84/",
//         },
//         {
//           id: 88,
//           itemName: "pork",
//           price: 1,
//           receipt: "https://handymoney.herokuapp.com/receipt/84/",
//         },
//         {
//           id: 89,
//           itemName: "curry",
//           price: 1,
//           receipt: "https://handymoney.herokuapp.com/receipt/84/",
//         },
//       ],
//     ]);

//     setListPerson([
//       {
//         id: 253,
//         personName: "iiui",
//         party: "https://handymoney.herokuapp.com/party/100/",
//       },
//       {
//         id: 254,
//         personName: "das",
//         party: "https://handymoney.herokuapp.com/party/100/",
//       },
//       {
//         id: 255,
//         personName: "hey",
//         party: "https://handymoney.herokuapp.com/party/100/",
//       },
//     ]);

//     setListReceipt([
//       {
//         id: 83,
//         payer: "Clivan",
//         details: "hihihihi",
//         party: "https://handymoney.herokuapp.com/party/100/",
//       },
//       {
//         id: 84,
//         payer: "clivna",
//         details: "lololol",
//         party: "https://handymoney.herokuapp.com/party/100/",
//       },
//     ]);
//   }, []);
//   console.log(listItem);
//   console.log(listPerson);
//   console.log(listReceipt);
//   console.log(test);

//   // setListParty("WARRIORS");

//   return (
//   <h1>text</h1>
//   )
// };

// export default Testing;
