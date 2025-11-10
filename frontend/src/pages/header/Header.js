import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import "./Header.css";


const Header = () => {

    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("user");
        alert("Logged out successfully");
        navigate('/login');
    }

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand as ={Link} to ="/"><strong> APMS SYSTEM </strong></Navbar.Brand>
                    <Nav className='ml-auto'>
                        <Nav.Link as={Link} to="/CreateItem" className='nav-link'>Create Item</Nav.Link>
                        <Nav.Link as={Link} to="/ItemManagement" className='nav-link'>Item Management</Nav.Link>
                        <button className='nav-link' onClick={logoutHandler}>Logout</button>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;