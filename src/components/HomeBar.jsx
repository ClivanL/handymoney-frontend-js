import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import icon from '../../images/HanDyMoney.png'


function HomeBar() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            {" "}
            <img
              alt=""
              src={icon}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            HanDyMoney
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
              <NavDropdown title="Tally Expenses" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate("/createparty")}>
                  Create Party
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/addtoparty")}>
                  Party members
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/tally")}>
                  Tally Expenses
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate("/breakdown")}>
                  Breakdown
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default HomeBar;
