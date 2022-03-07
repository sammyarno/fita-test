import React from 'react'

const Modal = ({ data, onClose }) => (
  <div className="modal">
    <div className="modal-overlay" />
    <div className="modal-content">
      <span className="modal-content_close" onClick={onClose}>X</span>
      <h2 className="modal-content_title">THANK YOU FOR SUBMITTING</h2>
      <div className="modal-content_detail">
        {
          data.map(nominee => (
            <p>{nominee.categoryId}: {nominee.nomineeId}</p>
          ))
        }
      </div>
    </div>
  </div>
);

export default Modal;
