import "./ReadItem.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReadItem = () => {

    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchItem = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/item/read/${id}`,
                    {
                        method: 'GET',
                    }
                );
                const data = await response.json();
                setItem(data);
            }
            catch (err) {
                console.log("Error fetching data");
            }
            finally {
                setLoading(false);
            };
        };

        fetchItem();
        console.log(id);
    }, [id]);

    if (loading || !item) return <div>Loading...</div>;

    return (
        <div className="pd-wrap">
            <div className="pd-card">

                <div className="pd-image">
                    <img src={item.picture} alt={item.name} />
                </div>

                <div className="pd-info">
                    <h1 className="pd-name">{item.name}</h1>

                    <div className="pd-meta">
                        <div className="pd-price">
                            <span className="pd-price-value">฿</span>
                            <span className="pd-price-value">{item.price}</span>
                        </div>
                    </div>
                    <div className="pd-qty">จำนวนคงเหลือ: {item.quantity}</div>

                    <div className="pd-section">
                        <div className="pd-section-title">รายละเอียดสินค้า</div>
                        <div className="pd-desc">{item.description || "-"}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ReadItem;