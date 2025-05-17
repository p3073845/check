import React, { useState } from "react";

const JsonModal = ({ show, onClose, data }) => {
  const [copied, setCopied] = useState(false);

  if (!show) return null;

  const handleCopy = () => {
    try {
      // Create temporary textarea
      const textArea = document.createElement("textarea");
      textArea.value = JSON.stringify(data, null, 2);
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      <div
        className="modal fade bs-example-modal-center show"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myCenterModalLabel"
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="myCenterModalLabel">
                Details
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <pre
                className="hljs mb-0"
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  maxHeight: "400px",
                  overflowY: "auto",
                  overflowX: "hidden",
                  padding: "15px",
                  margin: 0,
                  backgroundColor: "#f8f9fa",
                  borderRadius: "4px",
                }}
              >
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default JsonModal;
