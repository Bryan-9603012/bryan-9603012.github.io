import { useMemo, useState } from "react";

import Permissions from "../linux-notes/Permissions.jsx";
import Users from "../linux-notes/Users.jsx";
import Packages from "../linux-notes/Packages.jsx";
import Services from "../linux-notes/Services.jsx";
import Scheduling from "../linux-notes/Scheduling.jsx";
import NetworkServices from "../linux-notes/NetworkServices.jsx";
import WebOps from "../linux-notes/WebOps.jsx";
import BackupRestore from "../linux-notes/BackupRestore.jsx";
import Filesystem from "../linux-notes/Filesystem.jsx";
import Containerization from "../linux-notes/Containerization.jsx";
import RemoteDesktop from "../linux-notes/RemoteDesktop.jsx";
import LinuxSecurity from "../linux-notes/LinuxSecurity.jsx";

import "./LinuxNotesModal.css";

export default function LinuxNotesModal({ isOpen, onClose }) {
  const sections = useMemo(
    () => [
      { key: "permissions", title: "權限管理", Comp: Permissions },
      { key: "users", title: "使用者管理", Comp: Users },
      { key: "packages", title: "套件管理", Comp: Packages },
      { key: "services", title: "服務與流程", Comp: Services },
      { key: "scheduling", title: "任務調度", Comp: Scheduling },
      { key: "network", title: "網路服務", Comp: NetworkServices },
      { key: "webops", title: "Web 工具", Comp: WebOps },
      { key: "backup", title: "備份與復原", Comp: BackupRestore },
      { key: "filesystem", title: "檔案系統", Comp: Filesystem },
      { key: "container", title: "容器化", Comp: Containerization },
      { key: "remote", title: "遠端桌面", Comp: RemoteDesktop },
      { key: "security", title: "Linux Security（A4）", Comp: LinuxSecurity },
    ],
    []
  );

  const [currentKey, setCurrentKey] = useState(sections[0].key);

  const current = sections.find((s) => s.key === currentKey) ?? sections[0];
  const CurrentComp = current.Comp;

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
                key={s.key}
                className={`lnm-item ${currentKey === s.key ? "active" : ""}`}
                onClick={() => setCurrentKey(s.key)}
              >
                {s.title}
              </button>
            ))}
          </aside>

          <main className="lnm-content">
            <CurrentComp />
          </main>
        </div>
      </div>
    </div>
  );
}
