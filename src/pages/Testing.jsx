import { useState, useEffect } from "react";
import { Formik, Field } from "formik";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

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
  console.log(listItem);
  console.log(listPerson);
  console.log(listReceipt);
  console.log(test);

  // setListParty("WARRIORS");
  return (
    <>
      <Formik
        initialValues={{}}
        onSubmit={async (values) => {
          setTest(values);
        }}
      >
        {({ values }) => (
          <>
              {/* <Form>
        <div key={`inline-checkbox`} className="mb-3">
          <Form.Check
            inline
            label="1"
            name="group1"
            type="checkbox"
            id={`inline-checkbox-1`}
          />
          <Form.Check
            inline
            label="2"
            name="group1"
            type="checkbox"
            id={`inline-checkbox-2`}
          />
          <Form.Check
            inline
            label="3"
            type="checkbox"
            id={`inline-checkbox-3`}
          />
        </div>
    
    </Form> */}
          <Form>
            {listReceipt.map((item, index) => {
              return (
                <>
                  <div>
                    Receipt{index + 1} {"  "} Paid by:{item.payer} Details:{item.details}
                  </div>

                  {listItem[index].map((it) => {
                    return (
                      <>
                        <div>
                          {it.itemName} ${it.price}
                        </div>
                        <div id="checkbox-group"></div>
                        <div role="group" aria-labelledby="checkbox-group" key={`inline-checkbox`} className="mb-3">
                          {listPerson.map((item,index) => (
                              <Form.Check
                              inline
                              label={item.personName}
                              value={item.personName}
                              name={it.id}
                              type="checkbox"
                              id={`inline-checkbox-${index}`}
                            />
                            // <label>
                            //   <Field
                            //     type="checkbox"
                            //     name={it.id}
                            //     value={item.personName}
                            //   />
                            //   {item.personName}
                            // </label>
                          ))}
                        </div>
                      </>
                    );
                  })}
                </>
              );
            })}
            <Button type="submit">Submit</Button>
          </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default Testing;
