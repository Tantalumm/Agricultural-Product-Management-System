import { useState, useMemo, useEffect } from "react";
import "./ItemCate.css";
import { useNavigate } from "react-router-dom";


const MOCK = Array.from({ length: 88 }).map((_, i) => ({
    id: i + 1,
    code: "03",
    product: "Macbook pro 16",
    serial: "#123-456ABC",
    stock: 123,
    category: "Apple",
}));

const ItemCate = () => {
    const [query, setQuery] = useState("");
    const [column, setColumn] = useState("");
    const [sortDir, setSortDir] = useState("asc");
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const Navigate = useNavigate();

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

    const filtered = useMemo(() => {
        let rows = [...items];
        if (query.trim()) {
            const q = query.toLowerCase();
            rows = rows.filter(
                (items) =>
                    items.name.toLowerCase().includes(q)
            );
        }
        if (column) {
            rows.sort((a, b) => {
                const av = String(a[column]).toLowerCase();
                const bv = String(b[column]).toLowerCase();
                if (av < bv) return sortDir === "asc" ? -1 : 1;
                if (av > bv) return sortDir === "asc" ? 1 : -1;
                return 0;
            });
        }
        return rows;
    }, [query, column, sortDir]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const pageSafe = Math.min(page, totalPages);
    const start = (pageSafe - 1) * pageSize;
    const rows = filtered.slice(start, start + pageSize);

    return (
        <div className="oc-container">
            <div className="oc-header">
                <div className="oc-title">
                    <span>Item</span>
                </div>

                <div className="oc-actions">
                    <button className="oc-add" onClick={() => Navigate("/CreateItem")}>Add new</button>
                </div>
            </div>

            <div className="oc-tablewrap">
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
                                    <button className="oc-ghost">View</button>
                                    <button className="oc-ghost">Edit</button>
                                    <button className="oc-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr>
                                <td colSpan={6} className="oc-empty">
                                    No results found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="oc-footer">
                <div className="oc-pagesize">Display {pageSize} items</div>

                <div className="oc-pagination" role="navigation" aria-label="Pagination">
                    <button
                        onClick={() => setPage(1)}
                        disabled={pageSafe === 1}
                        aria-label="First page"
                    >
                        «
                    </button>
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={pageSafe === 1}
                        aria-label="Previous page"
                    >
                        ‹
                    </button>

                    <div className="oc-dots">
                        <span className={pageSafe === 1 ? "active" : ""}></span>
                        <span className={pageSafe === 2 ? "active" : ""}></span>
                        <span className={pageSafe === 3 ? "active" : ""}></span>
                    </div>

                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={pageSafe === totalPages}
                        aria-label="Next page"
                    >
                        ›
                    </button>
                    <button
                        onClick={() => setPage(totalPages)}
                        disabled={pageSafe === totalPages}
                        aria-label="Last page"
                    >
                        »
                    </button>
                    <span className="oc-pageinfo">
                        {pageSafe} / {totalPages}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ItemCate;