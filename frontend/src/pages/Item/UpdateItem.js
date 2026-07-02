import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import "./UpdateItem.css";
import "../../index.css";

const UpdateItem = () => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: ""
    });

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

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
            const response = await fetch(`http://localhost:8080/item/update/${id}`, {
                method: "PUT",
                body: data
            });
            const result = await response.text();
            console.log("Item Update Success: ", result);
            navigate("/ItemManagement");
        } catch (error) {
            alert("Error: " + error.message);
            console.error("Error updating item:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading-page"><Spinner /></div>;

    return (
        <main className="update-item-page">
            <div className="update-item-copy">
                <span>Edit Product</span>
                <h1>Update Item</h1>
                <p>แก้ไขข้อมูลสินค้า #{id} แล้วบันทึกกลับเข้าระบบจัดการสินค้า</p>
                <Link to="/ItemManagement" className="update-back-link">Back to Management</Link>
            </div>

            <Form onSubmit={handleSubmit} className="update-item-form">
                <div className="update-form-heading">
                    <span>Item ID</span>
                    <strong>#{id}</strong>
                </div>

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
                        as="textarea"
                        rows={3}
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
                    Update Item
                </Button>
            </Form>
        </main>
    );
};

export default UpdateItem;
