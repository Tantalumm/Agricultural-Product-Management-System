import "./Login.css";
import { Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "../../components/Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Cannot connect to server or server error");
      }

      const data = await response.json();

      if (data.status === false || data.success === false) {
        throw new Error(data.message || "Username or password is wrong");
      }

      console.log("Login Success: ", data);

      const userInfo =
        typeof data.user === "object"
          ? { ...data.user, password: "" }
          : { username: formData.username };

      localStorage.setItem(
        "user",
        JSON.stringify({ userInfo }));

      navigate("/");
    } catch (error) {
      setErrorMessage(error.message || "Username or password is wrong");
      console.log("Login error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="loading-page">
        <Spinner />
      </div>
    );
  return (
    <>
      <div className="auth-page">
        {loading && <Spinner />}
        <div className="auth-copy">
          <span>Welcome back</span>
          <h1>Login</h1>
          <p>เข้าสู่ระบบเพื่อจัดการสินค้าเกษตรและตรวจสอบรายการล่าสุด</p>
        </div>
        <Form onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="form-error" role="alert">
              {errorMessage}
            </div>
          )}
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
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
          <div className="auth-link-row">
            <Link to="/register">Create a new account</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
