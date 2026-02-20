// src/components/modals/ModalShell.jsx
import "../LinuxNotesModal.css";

/**
 * ModalShell
 * - 統一 overlay / modal / topbar / body 的樣式
 * - 內部 children 直接塞你要的 UI（例如 PicoPage 的 sidebar + content）
 */
export default function ModalShell({ isOpen, onClose, title, subtitle, children }) {
  if (!isOpen) return null;

  return (
    <div className="lnm-overlay" onMouseDown={onClose}>
      <div className="lnm-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="lnm-topbar">
          <div>
            <div className="lnm-title">{title}</div>
            <div className="lnm-sub">{subtitle}</div>
          </div>
          <button className="lnm-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="lnm-body">{children}</div>
      </div>
    </div>
  );
}