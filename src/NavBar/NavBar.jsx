import { Navbar, Nav, Collapse } from 'bootstrap-4-react';


const NavBar = () => {
    return (
        <Navbar fixed="top" expand="lg" dark bg="dark" mb="3">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggler target="#navbarColor1" />
        <Collapse navbar id="navbarColor1">
          <Navbar.Nav mr="auto">
          <Nav.ItemLink href="/users" active>Users list</Nav.ItemLink>
            <Nav.ItemLink href="/add-role" >Add role</Nav.ItemLink>
      
            <Nav.ItemLink href="/edit-users">Edit users</Nav.ItemLink>
            <Nav.ItemLink href="/create-trip">Create trip</Nav.ItemLink>
          </Navbar.Nav>
        </Collapse>
      </Navbar> 
    )
};

export default NavBar;