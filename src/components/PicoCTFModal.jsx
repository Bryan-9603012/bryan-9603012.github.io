import { useState } from "react";
import PicoPage from "./PicoPage";

const PicoCTFModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(8px)"
    }}>
      <div className="card" style={{ 
        maxWidth: "1000px", maxHeight: "90vh", width: "95%", 
        height: "90vh", padding: "24px" 
      }}>
        <div style={{ 
          display: "flex", justifyContent: "space-between", 
          alignItems: "center", marginBottom: "24px" 
        }}>
          <h2 style={{ color: "var(--neon-magenta)", margin: 0 }}>
            picoCTF 解題區
          </h2>
          <button 
            className="ghost btn" 
            onClick={onClose}
            style={{ fontSize: "18px" }}
          >
            ✕
          </button>
        </div>
        <div style={{ height: "100%", overflowY: "auto" }}>
          <PicoPage />
        </div>
      </div>
    </div>
  );
};

export default PicoCTFModal;
