import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import Spinner from "../../components/Spinner";
import "./ItemManagement.css";
import "../../index.css";
import { throwApiError } from "../../utils/apiError";

const ItemCate = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [target, setTarget] = useState(null);
    const Navigate = useNavigate();

    const fetchItems = async () => {
        setLoading(true);
        setErrorMessage("");
        try {
            const response = await fetch("http://localhost:8080/item/search?page=0&size=10", {
                method: "GET",
            });
            await throwApiError(response, "Cannot load item management data");
            const data = await response.json();
            setItems(data.content || []);
        } catch (error) {
            setErrorMessage(error.message || "Cannot load item management data");
            console.log("Error: ", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const askDelete = (item) => {
        setTarget(item);
        setOpen(true);
    };

    const doDelete = async () => {
        setErrorMessage("");
        try {
            const response = await fetch(`http://localhost:8080/item/delete/${target.id}`, {
                method: "DELETE",
            });

            await throwApiError(response, "Item delete failed");
            setItems((prev) => prev.filter((item) => item.id !== target.id));
        } catch (error) {
            setErrorMessage(error.message || "Item delete failed");
        } finally {
            setOpen(false);
            setTarget(null);
        }
    };

    if (loading) return <div className="loading-page"><Spinner /></div>;

    return (
        <div className="oc-container">
            <div className="oc-header">
                <div className="oc-title">
                    <span>Item Management</span>
                    <p>จัดการรายการสินค้า แก้ไขข้อมูล และลบรายการที่ไม่ใช้งานแล้ว</p>
                </div>

                <div className="oc-actions">
                    <button className="oc-add" onClick={() => Navigate("/CreateItem")}>Add New Item</button>
                </div>
            </div>

            <div className="oc-tablewrap">
                {errorMessage && <div className="page-error oc-error" role="alert">{errorMessage}</div>}
                <table className="oc-table" role="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th className="oc-right-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td className="oc-right">
                                    <button className="oc-ghost" onClick={() => Navigate(`/ReadItem/${item.id}`)}>View</button>
                                    <button className="oc-ghost" onClick={() => Navigate(`/UpdateItem/${item.id}`)}>Edit</button>
                                    <button className="oc-danger" onClick={() => askDelete(item)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan="6" className="oc-empty">No items found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ConfirmModal
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={doDelete}
                title="ต้องการลบรายการนี้หรือไม่?"
                detail={target ? `${target.name}` : ""}
            />
        </div>
    );
};

export default ItemCate;
