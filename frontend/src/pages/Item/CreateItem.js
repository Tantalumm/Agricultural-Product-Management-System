import "./CreateItem.css"
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";


const CreateItem = () => {
    const [fromData, setFormData] = useState({
        itemName: "",
        itemDescription: "",
        itemPrice: "",
        itemQuantity: ""
    }
    );

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...fromData,
            [name]: value,
        });
    }

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(fromData);

        try{
            const response = await fetch('http://localhost:8080/api/item',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fromData),
            });
            const data = await response.json();
            console.log("Item Created Success: ", data);
            navigate('/');
        }
        catch(error){
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
                            name="Item Name"
                            placeholder="Enter Item Name"
                            value={FormData.itemName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="FormBasicName">
                        <Form.Control
                            type="text"
                            name="Item Description"
                            placeholder="Enter Item Description"
                            value={FormData.itemDescription}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="FormBasicName">
                        <Form.Control
                            type="text"
                            name="Item Price"
                            placeholder="Enter Item Price"
                            value={FormData.itemPrice}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="FormBasicName">
                        <Form.Control
                            type="text"
                            name="Item Quantity"
                            placeholder="Enter Item Quantity"
                            value={FormData.itemQuantity}
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