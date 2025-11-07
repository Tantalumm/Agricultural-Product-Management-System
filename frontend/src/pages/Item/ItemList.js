import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ItemList.css";

const ItemList = () => {

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [error, setError] = useState(null);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080/item/search?page=0&size=10");
            const data = await response.json();
            setItems(data.content);
        } catch (err) {
            setError("Error fetching data");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchItems();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <div className="grid-container">
                {items.map((item) => (
                    <div className="item-card" key={item.id}>
                        <img src={`${item.imageUrl}`} alt={item.name} className="item-image" />
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <p>ราคา : {item.price} THB</p>
                            <p>จำนวน : {item.quantity}</p>
                            <p>{item.description}</p>
                            <button className="item-button">Buy Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemList
