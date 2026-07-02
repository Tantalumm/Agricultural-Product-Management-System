import ItemList from "../Item/ItemList";
import { Link } from "react-router-dom";
import "./HomePage.css";

const Homepage = () => {
    return (
        <main className="home-page">
            <section className="home-hero">
                <div className="home-hero-copy">
                    <span className="home-eyebrow">Agricultural Product Management</span>
                    <h1>จัดการสินค้าเกษตรให้ดูเป็นระบบและพร้อมขาย</h1>
                    <p>
                        เพิ่มสินค้า ตรวจสอบจำนวน และเปิดดูรายละเอียดสินค้าได้จากพื้นที่เดียว
                        พร้อมหน้าตาที่เรียบเข้มและอ่านง่ายขึ้น
                    </p>
                    <div className="home-actions">
                        <Link to="/CreateItem" className="home-primary-action">Create Item</Link>
                        <Link to="/ItemManagement" className="home-secondary-action">Manage Item</Link>
                    </div>
                </div>

                {/* <div className="home-stat-panel" aria-label="Product overview">
                    <div>
                        <span>Catalog</span>
                        <strong>Live Items</strong>
                    </div>
                    <div>
                        <span>Status</span>
                        <strong>Ready</strong>
                    </div>
                    <div>
                        <span>Mode</span>
                        <strong>Inventory</strong>
                    </div>
                </div> */}
            </section>

            <section className="home-products">
                <div className="home-section-heading">
                    <span>Product List</span>
                    <h2>สินค้าล่าสุด</h2>
                </div>
                <ItemList/>
            </section>
        </main>
    )
};

export default Homepage;
