import { useState, useRef, useCallback, useEffect } from "react";
import PicoCTFModal from "./components/PicoCTFModal";
import Skills from "./components/Skills";  // 🔥 新增這行
import "./App.css";

function App() {
  const [showPicoPage, setShowPicoPage] = useState(false);
  
  // 🔥 終端狀態
  const [terminalOutput, setTerminalOutput] = useState([
    '歡迎來到 Bryan 的 Linux 學習終端！',
    '輸入 ls 查看教學內容，help 查看所有指令',
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalRef = useRef(null);
  const currentPathRef = useRef('root');
  const inputRef = useRef(null);

  const processTerminalCommand = useCallback((cmd) => {
    const fullCmd = `bryan@portfolio:${currentPathRef.current}$ ${cmd}`;
    setTerminalOutput(prev => [...prev, fullCmd]);

    const parts = cmd.trim().toLowerCase().split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1);

    switch (command) {
      case 'ls':
        const items = currentPathRef.current === 'root' ? '📁 linux' :
                     currentPathRef.current === 'linux' ? '📓 notebook' :
                     'ch1 ch2 ch3 ch4 ch5 ch6 ch7 ch8 ch9 ch10 ch11 ch15 ch16 ch17 ch18 ch19 ch22 ch23 ch24 ch25 ch26 ch29 ch30';
        setTerminalOutput(prev => [...prev, items]);
        break;

      case 'whoami':
        setTerminalOutput(prev => [...prev, '劉興源 (Bryan)']);
        break;

      case 'role':
        setTerminalOutput(prev => [...prev, '資安學生 / React 開發者']);
        break;

      case 'status':
        setTerminalOutput(prev => [...prev, 'Online: 127 visits | CTF Rank: 1337 | Learning Linux']);
        break;

      case 'clear':
      case '清除':
        setTerminalOutput(['畫面已清除！']);
        break;

      case 'help':
        setTerminalOutput(prev => [...prev, 
          '📁 檔案系統: ls cd cat pwd',
          '💻 系統資訊: uname whoami role status',
          '🧹 其他: clear help',
          '✅ 流程: cd linux → cd notebook → ls → cat ch1',
          '📚 30章內容: ch1~ch30 每章獨立內容！',
          ''
        ]);
        break;

      case 'cd':
        if (!args[0]) {
          currentPathRef.current = 'root';
          setTerminalOutput(prev => [...prev, '回到根目錄']);
          break;
        }
        if (args[0] === 'linux' && currentPathRef.current === 'root') {
          currentPathRef.current = 'linux';
          setTerminalOutput(prev => [...prev, '進入 linux 目錄']);
        } else if (args[0] === 'notebook' && currentPathRef.current === 'linux') {
          currentPathRef.current = 'notebook';
          setTerminalOutput(prev => [...prev, '進入 notebook (30章 Linux 教學)']);
        } else if (args[0] === '..' && currentPathRef.current !== 'root') {
          currentPathRef.current = currentPathRef.current === 'notebook' ? 'linux' : 'root';
          setTerminalOutput(prev => [...prev, '回到上一層目錄']);
        } else {
          setTerminalOutput(prev => [...prev, `cd: ${args[0]}: No such directory`]);
        }
        break;

      case 'cat':
        if (currentPathRef.current === 'notebook' && args[0]) {
          const chapterContent = {
            'ch1': '=== Linux 歷史 ===\n1970 Unix (Ken Thompson)\n1991 Linux Kernel (Linus Torvalds)\n📊 600+ 發行版：Ubuntu Kali Debian',
            'ch2': '=== Linux 發行版 ===\n🔥 Kali：資安滲透測試\n🐧 Ubuntu：桌面首選\n📦 Debian：穩定企業版\n🎮 Parrot OS：隱私保護',
            'ch3': '=== Shell 介紹 ===\n📋 Bash (預設99%系統)\n🌈 Zsh + Oh My Zsh\n🐟 Fish (語法高亮)\n🔄 Tmux：終端多工器',
            'ch4': '=== Bash 自訂 ===\nPS1變數控制提示符\n🌈 顏色：\\[\\e[32m\\]綠色\\e[0m\nnano ~/.bashrc 永久生效',
            'ch5': '=== 幫助指令 ===\nman ls 查看手冊\n指令 --help 快速說明\napropos 關鍵字搜尋\ntldr.sh 簡化版 man頁',
            'ch6': '=== 系統資訊 ===\n👤 whoami id hostname\n💻 uname -a lsb_release\n🌐 ip addr ss -tlnp\n💾 df -h lsblk',
            'ch7': '=== 檔案導航 ===\npwd 當前路徑\nls -la 詳細列表\ncd ~ 家目錄\ncd - 上次目錄',
            'ch8': '=== 檔案操作 ===\ntouch file.txt 新檔案\nmkdir -p a/b/c 多層\nmv src dest 移動/重命名\nrm -rf dir 強制刪除',
            'ch9': '=== 文字編輯器 ===\n🅽 Nano：Ctrl+O儲存\n🅅 Vim：i插入 :q!離開\n📄 cat less head -10',
            'ch10': '=== Vim 實戰 ===\nNormal：h j k l 移動\ndd刪行 yy複製 p貼上\nv視覺選取模式',
            'ch11': '=== 檔案描述符 ===\n0 STDIN 1 STDOUT 2 STDERR\n> 覆寫 >> 附加 2>錯誤\n管道：cat | grep root',
            'ch15': '=== 使用者管理 ===\n/etc/passwd /etc/shadow\nsudo useradd user\nsudo usermod -aG sudo user',
            'ch16': '=== 套件管理 ===\n🍎 apt update && apt install\n🍠 dnf/yum (RedHat)\n📦 git clone https://...',
            'ch17': '=== Systemd 服務 ===\nsystemctl start ssh\nsystemctl enable ssh\njournalctl -u ssh 日誌',
            'ch18': '=== 排程任務 ===\ncrontab -e 編輯\n* * * * * 每分鐘\n0 6 * * * 每天6點',
            'ch19': '=== 網路服務 ===\n🔒 SSH：port 22\n🌐 Apache：port 80\n📡 NFS：/etc/exports',
            'ch22': '=== 容器技術 ===\n🐳 Docker：docker run -it\n🦘 LXC：lxc-create -t ubuntu\n輕量虛擬化',
            'ch23': '=== 容器實戰 ===\ndocker pull ubuntu\ndocker run -it ubuntu bash\nlxc-start -n web -d',
            'ch24': '=== 網路設定 ===\n🌐 ip addr show\n📄 /etc/network/interfaces\n靜態IP設定',
            'ch25': '=== 遠端桌面 ===\n🖥️ VNC：vncserver :1\n🖥️ SSH -X xclock\n📡 XDMCP：UDP 177',
            'ch26': '=== Linux 安全 ===\n🔒 SELinux AppArmor\n🛡️ Fail2ban ufw enable\n📋 /var/log/auth.log',
            'ch29': '=== Solaris 簡介 ===\n🏢 Sun → Oracle\n💾 ZFS檔案系統\n📦 IPS套件管理',
            'ch30': '=== Shell 快捷鍵 ===\n🚀 Ctrl+A行首 Ctrl+E行尾\n📜 Ctrl+R搜尋歷史\n🧹 Ctrl+L清屏'
          }[args[0]] || `cat: ${args[0]}: No such file`;
          setTerminalOutput(prev => [...prev, chapterContent]);
        } else {
          setTerminalOutput(prev => [...prev, `cat: ${args[0]}: No such file or directory`]);
        }
        break;

      case 'pwd':
        setTerminalOutput(prev => [...prev, `/${currentPathRef.current}`]);
        break;

      default:
        setTerminalOutput(prev => [...prev, `bash: ${command}: command not found`]);
    }
    setTerminalInput('');
  }, []);

  // 自動滾動 + 聚焦
  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    inputRef.current?.focus();
  }, [terminalOutput]);

  return (
    <>
      {/* 背景光暈 */}
      <div className="glow-bg" />
      <div className="hero-gradient" aria-hidden="true" />

      {/* ===== 頂部導覽列 ===== */}
      <header className="site-header">
        <div className="site-header-inner">
          <div className="brand">
            <div className="brand-logo">劉</div>
            <div className="brand-text">
              <div className="brand-name">Bryan Liu</div>
              <div className="brand-tagline">Student • Cyber & Web Dev</div>
            </div>
          </div>
          <nav className="nav-links">
            <a href="#services">服務內容</a>
            <a href="#projects">專案</a>
            <a href="#learning">學習記錄</a>
            <a href="#contact">聯絡我</a>
          </nav>
        </div>
      </header>

      {/* ===== 主內容區 ===== */}
      <main className="page-main">
        {/* Hero 區：左文右互動終端 */}
        <section className="hero-section">
          <div className="hero-text">
            <p className="hero-eyebrow">PORTFOLIO • 2025</p>
            <h1 className="hero-title">資安 CTF + React 前端，實戰技能全展示</h1>
            <p className="hero-subtitle">
              我是 <strong>劉興源</strong>，目前專注在前端開發、資安 CTF 與
              Linux 環境練習。這裡是我集中作品、練習與學習筆記的地方。
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn">查看專案</a>
              <button type="button" className="ghost btn" onClick={() => setShowPicoPage(true)}>
                查看 picoCTF 解析
              </button>
            </div>
            <p className="hero-note">目前持續更新 React、CSS 動效與 picoCTF 題解。</p>
          </div>

          {/* 🔥 完整互動終端 */}
          <div className="hero-card card">
            <h3 className="hero-card-title">即時面板 · Terminal</h3>
            <div 
              ref={terminalRef}
              style={{
                height: '340px',
                background: '#000',
                color: '#00ff41',
                padding: '20px',
                borderRadius: '12px',
                fontFamily: '"Courier New", monospace, Consolas',
                fontSize: '14px',
                overflowY: 'auto',
                lineHeight: '1.4',
                whiteSpace: 'pre-wrap',
                boxShadow: 'inset 0 0 20px rgba(0,255,65,0.1)'
              }}
            >
              {terminalOutput.map((line, index) => (
                <div key={index} style={{ marginBottom: '4px' }}>
                  {line}
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                <span 
                  style={{ 
                    color: '#00ffff', 
                    marginRight: '8px',
                    fontWeight: '600',
                    minWidth: '140px'
                  }}
                >
                  bryan@portfolio:{currentPathRef.current}$
                </span>
                <input 
                  ref={inputRef}
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && terminalInput.trim()) {
                      processTerminalCommand(terminalInput.trim());
                    }
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#00ff41',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    outline: 'none',
                    flex: 1
                  }}
                  placeholder="試試 ls 或 help..."
                />
              </div>
            </div>
            <div className="hint" style={{ fontSize: '13px', marginTop: '8px' }}>
              ← 試試：ls / whoami / cd linux / notebook / cat ch8 / help / clear
            </div>
          </div>
        </section>

        {/* ===== 服務區 ===== */}
        <section id="services" className="section-card">
          <h2>我現在在做什麼？</h2>
          <p className="section-desc">
            以前端為主，搭配一點資安與系統操作，慢慢把自己變成「能切版、會寫邏輯、懂一點安全」的工程師。
          </p>
          <div className="services-grid">
            <div className="service-item">
              <h3>前端切版與互動</h3>
              <p>HTML、Modern CSS、RWD、基本無障礙與動畫效果。</p>
            </div>
            <div className="service-item">
              <h3>React 練習</h3>
              <p>用 React 做個人面板、作品展示與簡單狀態管理。</p>
            </div>
            <div className="service-item">
              <h3>CTF / 資安入門</h3>
              <p>picoCTF 題目解題與筆記，從 Web / Crypto 慢慢拓展。</p>
            </div>
          </div>
          <div className="skills-row">
            <h3>目前技能</h3>
            <div className="skills">
              <span className="chip">HTML5</span>
              <span className="chip">Modern CSS</span>
              <span className="chip">Responsive</span>
              <span className="chip">React</span>
              <span className="chip">Linux / CLI</span>
              <span className="chip">picoCTF</span>
            </div>
          </div>
        </section>

        {/* ===== 專案區 ===== */}
        <section id="projects" className="section-card">
          <h2>專案 / 練習</h2>
          <p className="section-desc">這些是目前公開的練習作品，會持續增加新的網站與工具。</p>
          <div className="proj-list">
            <div className="proj">
              <div>
                <div className="proj-title">個人作品集網站</div>
                <div className="proj-meta">React • CSS • GitHub Pages</div>
              </div>
              <a className="btn" href="https://bryan-9603012.github.io/" target="_blank" rel="noreferrer">
                檢視
              </a>
            </div>
            <div className="proj">
              <div>
                <div className="proj-title">CSS 實驗室</div>
                <div className="proj-meta">微動畫、Hover 效果與卡片設計</div>
              </div>
              <a className="ghost btn" href="#">程式碼</a>
            </div>
            <div className="proj">
              <div>
                <div className="proj-title">picoCTF Writeups</div>
                <div className="proj-meta">Web / Crypto 解題整理與心得</div>
              </div>
              <button type="button" className="ghost btn" onClick={() => setShowPicoPage(true)}>
                查看解析
              </button>
            </div>
          </div>
        </section>

        {/* ===== 學習記錄 ===== */}
        <section id="learning" className="section-card">
          <h2>學習記錄</h2>
          <p className="section-desc">
            把平常在課堂、線上資源與 CTF 中學到的東西整理成簡短筆記。
          </p>
          <div className="learning-grid">
            <div className="learning-item">
              <h3>React 基礎筆記</h3>
              <p>JSX、Component、State 與 props 的重點整理。</p>
            </div>
            <div className="learning-item">
              <h3>Linux / CLI</h3>
              <p>常用指令與在 CTF / 開發中會用到的工具。</p>
            </div>
            <div className="learning-item">
              <h3>picoCTF 題目分類</h3>
              <p>照類型把題目與常見解法做索引，方便回顧。</p>
              <ul style={{ marginTop: "8px", fontSize: "13px", color: "var(--text-muted)", paddingLeft: "18px" }}>
                <li style={{ marginTop: "4px" }}>
                  更詳細解析 →
                  <button
                    type="button"
                    className="ghost btn"
                    style={{ marginLeft: "6px", padding: "2px 8px", fontSize: "12px" }}
                    onClick={() => setShowPicoPage(true)}
                  >
                    開啟 picoCTF 解題區
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ===== 聯絡我 ===== */}
        <section id="contact" className="section-card contact-section">
          <div className="contact-text">
            <h2>一起做點有趣的東西？</h2>
            <p className="section-desc">
              如果你對picoCTF / 學習交流有興趣，歡迎寄信給我，一起討論看看可以做什麼。
            </p>
          </div>
          <div className="contact-actions">
            <a className="btn" href="mailto:bryanhuang710910@gmail.com">寄信給我</a>
            <a className="ghost btn" href="#projects">先看看專案</a>
          </div>
        </section>
      </main>
      
      <PicoCTFModal isOpen={showPicoPage} onClose={() => setShowPicoPage(false)} />
    </>
  );
}

export default App;
