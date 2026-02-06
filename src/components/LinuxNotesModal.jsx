import { useState } from "react";

import Permissions from "./linux-notes/Permissions";
import Users from "./linux-notes/Users";

import "./LinuxNotesModal.css";

const sections = [
  "權限管理",
  "使用者管理",
  "套件管理",
  "服務與流程",
  "任務調度",
  "網路服務",
  "Web 工具",
  "備份與復原",
  "檔案系統",
  "容器化",
];

export default function LinuxNotesModal({ isOpen, onClose }) {
  const [current, setCurrent] = useState("權限管理");

  if (!isOpen) return null;

  return (
    <div className="lnm-overlay" onMouseDown={onClose}>
      <div className="lnm-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="lnm-topbar">
          <div>
            <div className="lnm-title">Linux Security Notes</div>
            <div className="lnm-sub">章節索引（資安視角）</div>
          </div>
          <button className="lnm-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="lnm-body">
          <aside className="lnm-sidebar">
            {sections.map((s) => (
              <button
                key={s}
                className={`lnm-item ${current === s ? "active" : ""}`}
                onClick={() => setCurrent(s)}
              >
                {s}
              </button>
            ))}
          </aside>

          <main className="lnm-content">
            {current === "權限管理" ? (
              <Permissions />
            ) : current === "使用者管理" ? (
              <Users />
            ) : (
              <div className="lnm-empty">
                <h2>{current}</h2>
                <p>內容建置中…（下一章我可以幫你做 Packages / Services …）</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
