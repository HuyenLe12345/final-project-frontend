import "./donationmodal.css";
const DonationModal = ({ children, isOpen, onClose, name }) => {
  if (!isOpen) {
    return null;
  }
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
export default DonationModal;
