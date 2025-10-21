import "./CreateItem.css"
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";


const CreateItem = () => {

    const USERNAME = process.env.REACT_APP_USERNAME;
    const PASSWORD = process.env.REACT_APP_PASSWORD;

    const encodedCredentials = btoa(`${USERNAME}:${PASSWORD}`);


    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: ""
    }
    );

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        console.log(encodedCredentials);
        console.log(USERNAME);
        console.log(PASSWORD);

        try {
            const response = await fetch('http://localhost:8080/api/item', {
                method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${encodedCredentials}`
                },
                body: JSON.stringify(formData)

            });
            const data = await response.json();
            console.log("Item Created Success: ", data);
            navigate('/');
        }
        catch (error) {
            console.log("error: ", error.message);
        }
    }

    return (
        <>
            <div className="center-form">
                <h1>Create New Item</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="FormBasicName">
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter Item Name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="FormBasicName">
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Enter Item Description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="FormBasicName">
                        <Form.Control
                            type="text"
                            name="price"
                            placeholder="Enter Item Price"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="FormBasicName">
                        <Form.Control
                            type="text"
                            name="quantity"
                            placeholder="Enter Item Quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default CreateItem;