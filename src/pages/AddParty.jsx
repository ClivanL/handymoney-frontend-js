import { useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Party } from "../App";
import ChangePartyNameForm from "../components/ChangePartyNameForm";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

const AddParty = () => {
  const [person, setPerson] = useState("");
  const [mod, setMod] = useState(0);
  const [list, setList] = useState([]);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const context = useContext(Party);
  // console.log(context.partyName);
  useEffect(() => {
    fetch("https://handymoney.herokuapp.com/person/", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setList(
          data.filter((item) => {
            return (
              item.party ===
              `https://handymoney.herokuapp.com/party/${context.partyName.id}/`
            );
          })
        );
      });
  }, [mod]);
  //   console.log(list);
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(party);
    fetch("https://handymoney.herokuapp.com/person/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personName: person,
        party: `https://handymoney.herokuapp.com/party/${context.partyName.id}/`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPerson("");
        setMod(mod+1);
      });
  };
  const handleUpdate = () => {
    setToggle(true);
  };
  // console.log(toggle);

  const handleDelete = (todelete) => {
    // console.log(todelete.id);

    fetch(`https://handymoney.herokuapp.com/person/${todelete.id}/`, {
      method: "delete",
      // headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(todelete),
    }).then(setMod(mod+1));
    // .then((response) => response.json())
    // .then((data) => {
    //     console.log(data);

    // });
  };
  console.log(context.partyName.partyName);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Row>
            <Form.Label>Add Party Members</Form.Label>
            <Col md={{ span: 4, offset: 4 }}>
              {" "}
              <Form.Control
                name="name"
                id="name"
                placeholder="input name"
                value={person}
                onChange={(event) => setPerson(event.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <br></br>
      <br></br>

      <div className="centercard">
      <Card bg="light" variant="light" margin="light" style={{ margin:"auto", width: "40rem" }}>
        <Card.Body>
          <Card.Title>Party Name:</Card.Title>
          <Card.Text>
            {toggle === false ? (
              <>
                <div>{context.partyName.partyName}</div>
                <Button variant="secondary" size="sm" onClick={handleUpdate}>
                  Change Party name
                </Button>
              </>
            ) : (
              <ChangePartyNameForm mod={mod} setMod={setMod} setToggle={setToggle} />
            )}
          </Card.Text>
          {/* <Button variant="primary" onClick={() => navigate("/tally")}>
            Confirm Party
          </Button> */}
            <Col md={{ span: 8, offset: 2 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {list?.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.personName}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleDelete(item);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
        </Card.Body>
      </Card>
      </div>
      {/* <form onSubmit={handleSubmit}>
        <input
          name="name"
          id="name"
          placeholder="input name"
          value={person}
          onChange={(event) => setPerson(event.target.value)}
        />
        <button>Add to party</button>
      </form> */}
    
<br></br>
      <Button variant="primary" onClick={() => navigate("/tally")}>
        Confirm Party
      </Button>
      {/* <ul>
        Current members added:
        {list?.map((item) => {
          return (
            <div>
              {item.personName}
              <button
                onClick={() => {
                  handleDelete(item);
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </ul> */}

      {/* <h1>Enter members for: {toggle===false?<div>{context.partyName.partyName}<button onClick={handleUpdate}>Change Party name</button></div>:<ChangePartyNameForm setMod={setMod} setToggle={setToggle}/>}</h1>
    // <form onSubmit={handleSubmit}>
    //     <input name="name" id="name" placeholder="input name" value={person} onChange={(event)=>setPerson(event.target.value)}/>
    //     <button>Add to party</button>
    // </form>
    // <ul>
    //     Current members added:
    //     {list?.map((item)=>{
    //         return <div>{item.personName}<button onClick={()=>{handleDelete(item)}}>Remove</button></div>
    //     })}
    // </ul>
    <button onClick={()=>navigate("/tally")}>Confirm Party</button> */}
    </div>
  );
};

export default AddParty;
