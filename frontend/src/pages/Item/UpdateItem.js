import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./UpdateItem.css";


const UpdateItem = () => {

    const USERNAME = process.env.REACT_APP_USERNAME;
    const PASSWORD = process.env.REACT_APP_PASSWORD;

    const encodedCredentials = btoa(`${USERNAME}:${PASSWORD}`);

    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: ""
    }
    );

    const [file, setFile] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const navigate = useNavigate();

    useEffect(() => {
        console.log(id);
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        console.log(encodedCredentials);
        console.log(USERNAME);
        console.log(PASSWORD);

        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("quantity", formData.quantity);

        if (file) {
            data.append("file", file);
        }

        try {
            const response = await fetch(`http://localhost:8080/item/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`
                },
                body: data
            });
            const result = await response.text();
            console.log('Item Update Success: ', result);
            navigate('/');
        }
        catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return <>
        <div className="center-form">
            <h1>Update Item Id : {id} </h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="FormBasicName" className="group-form">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Item Name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="FormBasicDescription" className="group-form">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        placeholder="Enter Item Description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="FormBasicPrice" className="group-form">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="text"
                        name="price"
                        placeholder="Enter Item Price"
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="FormBasicQuantity" className="group-form">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="text"
                        name="quantity"
                        placeholder="Enter Item Quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="FormBasicFile" className="group-form">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                    Submit
                </Button>
            </Form>
        </div>
    </>
};

export default UpdateItem;