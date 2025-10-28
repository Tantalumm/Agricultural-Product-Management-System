import "./Login.css"
import { Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "../../components/Spinner";


const Login = () => {

    const USERNAME = process.env.REACT_APP_USERNAME;
    const PASSWORD = process.env.REACT_APP_PASSWORD;

    const encodedCredentials = btoa(`${USERNAME}:${PASSWORD}`);

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        console.log(encodedCredentials);
        console.log(USERNAME);
        console.log(PASSWORD);

        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${encodedCredentials}`
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setLoading(false);
            console.log("Login Success: ", data);
            localStorage.setItem(
                "user",
                JSON.stringify({ ...data.username, password: "" })
            );
            navigate('/');
        }
        catch (error) {
            setLoading(false);
            console.log("Login error: ", error.message);
        }
    }

    return (
        <>
            <div className="center-form">
                {loading && <Spinner />}
                <h1>Login Form</h1>
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
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            type="text"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Login
                    </Button>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Link style={{ color: "black" }} to="/register">Click Here to Register</Link>
                    </div>
                </Form>
            </div>
        </>
    )
};

export default Login;