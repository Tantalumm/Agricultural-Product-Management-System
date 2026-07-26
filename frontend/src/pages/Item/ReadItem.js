import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import "./ReadItem.css";
import "../../index.css";
import { throwApiError } from "../../utils/apiError";

const ReadItem = () => {
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItem = async () => {
            setLoading(true);
            setErrorMessage("");
            try {
                const response = await fetch(`http://localhost:8080/item/read/${id}`, {
                    method: "GET",
                });
                await throwApiError(response, "Cannot load item detail");
                const data = await response.json();
                setItem(data);
            } catch (error) {
                setErrorMessage(error.message || "Cannot load item detail");
                console.log("Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    if (loading) return <div className="loading-page"><Spinner /></div>;

    if (!item) {
        return (
            <div className="pd-wrap">
                <div className={errorMessage ? "page-error" : "pd-empty"} role={errorMessage ? "alert" : undefined}>
                    {errorMessage || "No item data found"}
                </div>
            </div>
        );
    }

    return (
        <main className="pd-wrap">
            <div className="pd-topbar">
                <button className="pd-back" onClick={() => navigate(-1)}>Back</button>
                <Link to="/ItemManagement" className="pd-manage-link">Item Management</Link>
            </div>

            <section className="pd-card">
                <div className="pd-image">
                    <img src={`${item.imageUrl}`} alt={item.name} />
                </div>

                <div className="pd-info">
                    <div>
                        <span className="pd-eyebrow">Product Detail</span>
                        <h1 className="pd-name">{item.name}</h1>
                    </div>

                    <div className="pd-meta">
                        <div className="pd-metric pd-price">
                            <span>Price</span>
                            <strong>{item.price} THB</strong>
                        </div>
                        <div className="pd-metric">
                            <span>Quantity</span>
                            <strong>{item.quantity}</strong>
                        </div>
                    </div>

                    <div className="pd-section">
                        <div className="pd-section-title">รายละเอียดสินค้า</div>
                        <div className="pd-desc">{item.description || "-"}</div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ReadItem;
