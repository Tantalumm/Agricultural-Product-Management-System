import "./ConfirmModal.css";

const ConfirmModal = ({ open, title, detail, onClose, onConfirm, loading = false}) => {
    if (!open) return null;
    return (
        <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal-box">
                <h3 className="modal-title">{title}</h3>
                {detail && <p className="modal-detail">{detail}</p>}
                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onClose} disabled={loading}>
                        No
                    </button>
                    <button className="btn-confirm" onClick={onConfirm} disabled={loading}>
                        {loading ? "Deleting..." : "Yes, delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;

