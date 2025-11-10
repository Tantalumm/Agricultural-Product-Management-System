import Spinner from "../../components/Spinner";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./CreateItem.css"
import "../../index.css"

const CreateItem = () => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: ""
    }
    );

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("quantity", formData.quantity);

        if (file) {
            data.append("file", file);
        }

        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/item/create', {
                method: 'POST',
                body: data
            });
            const result = await response.text();
            console.log("Item Created Success: ", result);
            navigate('/');
        }
        catch (error) {
            alert("Error: " + error.message);
            console.log("error: ", error.message);
        }
        finally{
            setLoading(false);
        }
    }

    if (loading) return <div className="loading-page"><Spinner/></div>;
    return (
        <>
            <div className="center-form">
                <h1>Create New Item</h1>
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
    )
}

export default CreateItem;