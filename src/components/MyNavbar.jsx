import { Navbar, Container, Nav } from "react-bootstrap";

const MyNavbar = function () {
  return (
    <Navbar expand="md" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#home">EpiMovie</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
