import {useState, useEffect} from 'react'
import { Formik, Field, Form } from "formik";

const Testing=()=>{
const [listItem, setListItem]=useState([])
const [listPerson,setListPerson]=useState([])
const [listReceipt, setListReceipt]=useState([])
const [test,setTest]=useState()


useEffect(()=>{
    setListItem([[{id: 84, itemName: 'tomato', price: 4, receipt: 'https://handymoney.herokuapp.com/receipt/83/'},
    {id: 85, itemName: 'chick', price: 4, receipt: 'https://handymoney.herokuapp.com/receipt/83/'},
    {id: 86, itemName: 'chickclams', price: 4, receipt: 'https://handymoney.herokuapp.com/receipt/83/'}
    ],
    [
    {id: 87, itemName: 'rice', price: 1, receipt: 'https://handymoney.herokuapp.com/receipt/84/'},
    {id: 88, itemName: 'pork', price: 1, receipt: 'https://handymoney.herokuapp.com/receipt/84/'},
    {id: 89, itemName: 'curry', price: 1, receipt: 'https://handymoney.herokuapp.com/receipt/84/'}
    ]])
    
    setListPerson([{id: 253, personName: 'iiui', party: 'https://handymoney.herokuapp.com/party/100/'}
    ,{id: 254, personName: 'das', party: 'https://handymoney.herokuapp.com/party/100/'}
    ,{id: 255, personName: 'hey', party: 'https://handymoney.herokuapp.com/party/100/'}])
    
    setListReceipt([{id: 83, payer: 'Clivan', details: 'hihihihi', party: 'https://handymoney.herokuapp.com/party/100/'}
    ,{id: 84, payer: 'clivna', details: 'lololol', party: 'https://handymoney.herokuapp.com/party/100/'}]);

},[])
console.log(listItem);
console.log(listPerson);
console.log(listReceipt);
console.log(test);

// setListParty("WARRIORS");
    return(<>
  <Formik
      initialValues={{
        
      }}
      onSubmit={async (values) => {
        setTest(values);
      }}
    >
      {({ values}) => (
        <Form>
            {listReceipt.map((item,index)=>{
                return <>
                <div>Receipt{index+1}, paid by {item.payer}, {item.details}</div>

                {listItem[index].map((it)=>{
                                 return <>
                                  <div>{it.itemName}| ${it.price}</div>
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
            <button type="submit">Submit</button>
         
        </Form>

 
      )}
    </Formik>
    </>)
}

export default Testing;