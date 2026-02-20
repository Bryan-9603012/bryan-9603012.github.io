import React, { useState, useEffect } from "react";

export default function Skills() {
  const frontendSkills = ['HTML5', 'Modern CSS', 'Responsive', 'React', 'Vite', 'Tailwind'];
  const securitySkills = ['CTF', 'XSS', 'SQLi', 'Burp Suite', 'Nmap', 'Linux'];

  const [activeAnim, setActiveAnim] = useState(0);
  const animations = ['scan', 'burp', 'shell'];

  // 自動輪播
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAnim((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 max-w-md">
      {/* 🔥 資安動畫輪播 */}
      <div className="security-animations h-48 p-4 bg-black/50 border-2 border-[#00ff41] rounded-xl shadow-2xl shadow-green-500/25">
        <div className={`anim-container transition-all duration-500 ${animations[activeAnim]}`}>
          {/* Nmap掃描 */}
          {activeAnim === 0 && (
            <div className="anim-scan">
              <div className="text-lg font-bold mb-3 text-[#00ff41] glow">🔍 Nmap Scan</div>
              <div className="scan-progress">
                <div className="scan-bar">
                  <div className="scan-fill animate-pulse" />
                </div>
                <div className="scan-ports mt-2 flex gap-2">
                  <span className="port open bg-green-500/20 px-2 py-1 rounded text-xs">80</span>
                  <span className="port open bg-green-500/20 px-2 py-1 rounded text-xs">443</span>
                  <span className="port closed bg-red-500/20 px-2 py-1 rounded text-xs animate-pulse">22</span>
                </div>
              </div>
            </div>
          )}

          {/* Burp攔截 */}
          {activeAnim === 1 && (
            <div className="anim-burp">
              <div className="text-lg font-bold mb-3 text-[#ffaa00]">🕷️ Burp Interceptor</div>
              <div className="packet">
                <div className="text-red-400 font-mono text-sm mb-2">POST /login</div>
                <div className="bg-black/60 p-3 rounded border-l-4 border-yellow-500">
                  <div className="payload text-gray-300 text-xs mb-1">username=admin</div>
                  <div className="payload-modified text-green-400 font-bold text-xs animate-pulse">
                    ' OR 1=1 --
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shell獲取 */}
          {activeAnim === 2 && (
            <div className="anim-shell">
              <div className="text-lg font-bold mb-3 text-[#00ffff]">💻 Reverse Shell</div>
              <div className="shell-output bg-black/70 p-3 rounded font-mono text-sm border border-cyan-500">
                <div>$ nc -lvnp 4444</div>
                <div className="text-green-400 mt-1 font-bold animate-pulse">Connection received!</div>
                <div className="text-yellow-400 mt-1 text-lg">whoami → <span className="text-red-400 glow">root</span></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 技能標籤 - 合併顯示 */}
      <div>
        <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
          🛠️ 實戰技能
        </h3>
        <div className="flex flex-wrap gap-2">
          {frontendSkills.map((s) => (
            <span key={s} className="skill-tag blue px-3 py-1.5 rounded-full text-xs font-medium border border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-all">
              {s}
            </span>
          ))}
          {securitySkills.map((s) => (
            <span key={s} className="skill-tag red px-3 py-1.5 rounded-full text-xs font-medium border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20 transition-all">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* 查看更多按鈕 */}
      <div className="pt-4">
        <a href="#projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-sm border border-purple-500/30 text-white text-sm font-medium hover:from-purple-500 hover:to-pink-500 hover:scale-105 transition-all shadow-lg hover:shadow-purple-500/25">
          <span>🚀 查看完整專案</span>
        </a>
      </div>
    </div>
  );
}
