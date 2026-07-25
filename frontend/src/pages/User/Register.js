import "./Register.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import { Form } from "react-bootstrap"; 
import Spinner from "../../components/Spinner";

const Register = () => {

    const [formData, setFormData] = useState({
        username: "",
        email : "",
        name : "",
        password: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log(name + " : " + value);
    }

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/auth/register', {   
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setLoading(false);
            console.log("Register Success: ", data);
            navigate('/login');
        }   
        catch (error) {
            setLoading(false);
            console.log("Register error: ", error.message);
        }
        finally{
            setLoading(false);
        }
    }

    if (loading) return <div className="loading-page"><Spinner/></div>;
    return(
        <>
            <div className="auth-page register-page">
                {loading && <Spinner />}
                <div className="auth-copy">
                    <span>Start managing</span>
                    <h1>Register</h1>
                    <p>สร้างบัญชีสำหรับเพิ่มสินค้าและติดตามข้อมูลคลังสินค้า</p>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Register
                    </Button>
                    <div className="auth-link-row">
                        <Link to="/login">Already have an account?</Link>
                    </div>
                </Form>
            </div>
        </>
    )

};

export default Register;
