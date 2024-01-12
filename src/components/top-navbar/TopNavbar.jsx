import "./TopNavbar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import {handleLogout, isLoggedIn} from "../../service/authService";

function TopNavbar(){
    let isUserLoggedIn = isLoggedIn();

    return (
        <Navbar sticky="top" fixed="top" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">BlogIt</Navbar.Brand>

                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        {!isLoggedIn() && (
                            <>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/signup">Signup</Nav.Link>
                            </>
                        )}

                        {isLoggedIn() && (
                            <>
                                <Nav.Link href="/write">Write</Nav.Link>
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopNavbar;
