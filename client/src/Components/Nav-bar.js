import { Link, useHistory } from "react-router-dom";
import logo from "../logo.png";
import { Navbar, Nav } from "react-bootstrap";
import Backarrow from "../svgComponent/BackArrow";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/mySass.scss";

const Navbr = (props) => {
  const history = useHistory();
  return (
    <div id="fullBar">
      <Navbar id="mainBar" bg="myLight" expand="md" collapseOnSelect>
        <Navbar.Brand>
          {/* check whether to show back logo or main logo based on props */}
          {(props.back && (
            <div
              onClick={() => {
                history.goBack();
              }}
              className="logoBack"
            >
              <Backarrow />
            </div>
          )) || <img id="mainLogo" src={logo} width="60px" alt='logo main'></img>}
        </Navbar.Brand>

        <div id="logo-text">
          <h2>NETFLIX & CHILL</h2>
        </div>

        <Navbar.Toggle />
        <Navbar.Collapse id="coll">
          <Nav id="barItems">
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navbr;
