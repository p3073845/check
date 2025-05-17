import React from "react";

const DeleteModal = ({ show, onCancel, onConfirm }) => {
  if (!show) return null;

  return (
    <>
      <div className="modal show" style={{ display: "block" }}>
        <div
          className="modal-dialog modal-dialog-centered"
          style={{
            maxWidth: "400px",
            width: "95%",
            margin: "0 auto",
          }}
        >
          <div className="modal-content text-center p-4">
            <div className="mb-3">
              <i
                className="fas fa-trash text-danger"
                style={{ fontSize: "2rem" }}
              ></i>
            </div>
            <h5 className="mb-3">Confirm Delete</h5>
            <p className="text-muted mb-2">
              Are you sure you want to delete your user ?
            </p>
            <p className="text-muted">This action cannot be undone.</p>
            <div className="d-flex justify-content-center ">
              <button
                type="button"
                className="btn btn-secondary px-4 mr-2"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger px-4"
                onClick={onConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default DeleteModal;
