import React from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {
    Container,
    Form,
    FormControl,
    Nav,
    Navbar,
    NavDropdown,
  } from "react-bootstrap";
  import {useDispatch,useSelector } from 'react-redux';
import {logout} from "../../actions/userActions";


const Header = ({setSearch}) => {
  const navigate=useNavigate();

  const dispatch = useDispatch();
  const  userLogin = useSelector((state) => state.userLogin);

  const {userInfo} = userLogin;

  
  const logoutHandler = (e)=> {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  };


  return (
    <Navbar bg="primary" expand="lg" variant="dark">
  <Container>
    <Navbar.Brand href="/">
    <Link to="/">Simple Note</Link>
    

    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="m-auto">
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2"
      onChange={(e)=>setSearch(e.target.value)}
       />
      </Form>
    </Nav>
     { userInfo ? <Nav >
        <Nav.Link >
        <Link to="/mynotes">
        My notes
        </Link>
        </Nav.Link>
        <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
          <NavDropdown.Item >
          <Link to="/profile">
          My profile
          </Link>
          </NavDropdown.Item>
          <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>: <Nav> <Nav.Link > 
        <Link to="/login">
        Login
        </Link>
        </Nav.Link></Nav>}
      
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default Header;
