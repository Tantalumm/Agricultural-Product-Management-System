import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import "./ItemList.css";
import "../../index.css";

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:8080/item/search?page=0&size=10");
            const data = await response.json();
            setItems(data.content);
        } catch (error) {
            alert("Error: " + error.message);
            console.log("Error: ", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    if (loading) return <div className="loading-page"><Spinner /></div>;

    return (
        <div className="item-list-shell">
            <div className="grid-container">
                {items.map((item) => (
                    <div className="item-card" key={item.id}>
                        <img src={`${item.imageUrl}`} alt={item.name} className="item-image" />
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <p>ราคา : {item.price} THB</p>
                            <p>จำนวน : {item.quantity}</p>
                            <p>{item.description}</p>
                            <Link to={`/ReadItem/${item.id}`} className="item-card-link">
                                <button className="item-button">View</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemList;
