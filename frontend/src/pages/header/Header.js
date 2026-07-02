import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./Header.css";


const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname.toLowerCase();
    const isAuthPage = currentPath === "/login" || currentPath === "/register";
    const isLoggedIn = Boolean(localStorage.getItem("user"));

    const logoutHandler = () => {
        localStorage.removeItem("user");
        alert("Logged out successfully");
        navigate('/login');
    }

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container className="apms-nav-container">
                    <Navbar.Brand as={Link} to="/" className="apms-brand"><strong>APMS</strong><span>System</span></Navbar.Brand>
                    <Nav className='ml-auto apms-nav-links'>
                        {!isAuthPage && (
                            <>
                                <Nav.Link as={Link} to="/CreateItem" className={`nav-link ${currentPath === "/createitem" ? "active" : ""}`}>Create Item</Nav.Link>
                                <Nav.Link as={Link} to="/ItemManagement" className={`nav-link ${currentPath === "/itemmanagement" ? "active" : ""}`}>Item Management</Nav.Link>
                            </>
                        )}
                        {isLoggedIn && !isAuthPage ? (
                            <button className='nav-link apms-logout' onClick={logoutHandler}>Logout</button>
                        ) : (
                            <Nav.Link as={Link} to={currentPath === "/login" ? "/Register" : "/Login"} className='nav-link apms-auth-link'>
                                {currentPath === "/login" ? "Register" : "Login"}
                            </Nav.Link>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;
