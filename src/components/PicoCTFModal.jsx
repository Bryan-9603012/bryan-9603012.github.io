import PicoPage from "./picoPage.jsx";
import "./LinuxNotesModal.css"; // 直接沿用同一套 Modal 外觀（lnm-*）

export default function PicoCTFModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="lnm-overlay" onMouseDown={onClose}>
      <div className="lnm-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="lnm-topbar">
          <div>
            <div className="lnm-title">picoCTF Writeups</div>
            <div className="lnm-sub">以「可重現、可驗證」為目標整理解題流程</div>
          </div>
          <button className="lnm-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="lnm-body">
          {/* PicoPage 內部會自己做 sidebar + content */}
          <PicoPage />
        </div>
      </div>
    </div>
  );
}
