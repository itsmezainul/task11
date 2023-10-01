import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AppBar() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <i className="bi bi-file-person fs-1">Phone Directory</i>
          </Link>
        </Navbar.Brand>
        <Nav className="d-md-flex d-none">
          <Link></Link>
        </Nav>
        <Button className="d-md-none d-block" variant="">
          <i className="bi bi-list fs-1"></i>
        </Button>
      </Container>
    </Navbar>
  );
}
