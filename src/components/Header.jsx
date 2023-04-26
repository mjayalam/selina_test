import { Container, Nav, Navbar } from 'react-bootstrap';
import { headerItems } from '../utils'
import "../css/header.css";

export const Header = (() => {
  return (<Navbar className="header" >
    <Container>
      <Navbar.Brand href="#home">
        <img
          className="header-img"
          src={headerItems?.img}
          alt="Header" />
      </Navbar.Brand>

      <Nav className="d-flex">
        {headerItems.navitation.map((tab) => {
          return (
            <Nav.Link href={tab.url}>{tab.name} </Nav.Link>
          )
        })}

      </Nav>

    </Container>
  </Navbar>);
});
