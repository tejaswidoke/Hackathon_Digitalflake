import { useState } from 'react';
import { Navbar, Container, Nav, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../style/navbar.css";
import logo from "../assets/1jpg.jpg";



const NavBar = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = () => {
        // Remove user data from sessionStorage on logout
        sessionStorage.removeItem('userData');
        // Close the modal
        handleClose();
        // Redirect to login page
        navigate('/login');
    };

    return (
        <>
            <Navbar className='navcolor' expand="lg">
                <Container>
                    <Navbar.Brand className="d-flex justify-content-center w-100"><img src={logo} alt="" className='logo' /></Navbar.Brand> {/* Replace 'Your Logo' with your actual logo */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* Add additional navigation links here */}
                        </Nav>
                        <Nav>
                            {/* Conditionally render login/logout button based on sessionStorage */}
                            {sessionStorage.getItem('userData') ? (
                                <Button className="navbuttonn" onClick={handleShow}>Logout</Button>
                            ) : (
                                <Button className="navbutton" onClick={() => navigate('/login')}>Login</Button>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button className='logoutbtn' onClick={handleLogout}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NavBar;
