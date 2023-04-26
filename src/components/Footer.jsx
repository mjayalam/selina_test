import { Container, Navbar } from 'react-bootstrap';
import { headerItems } from '../utils'

const styles = {
    maxHeight: "20px",
}

export const Footer = (() => {
    return (<Navbar style={styles} bg="dark" fixed="bottom">
        <Container>
            <Navbar.Brand href="#home">
                <img
                    src={headerItems?.img}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
            </Navbar.Brand>
        </Container>
    </Navbar>)
});
