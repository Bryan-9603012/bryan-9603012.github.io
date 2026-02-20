import { useState, useEffect, useRef, useCallback } from 'react'

export default function Terminal() {
  const [output, setOutput] = useState([
    `歡迎來到 Bryan 的 Linux 學習終端！`,
    `輸入 ls 查看教學內容，help 查看所有指令`,
    ''
  ])
  const [input, setInput] = useState('')
  const [currentPath, setCurrentPath] = useState('root')
  const terminalRef = useRef(null)
  const inputRef = useRef(null)

  // 🔥 目錄結構
  const dirs = {
    root: ['linux'],
    linux: ['notebook'],
    notebook: ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7', 'ch8', 'ch9', 'ch10', 
              'ch11', 'ch15', 'ch16', 'ch17', 'ch18', 'ch19', 'ch22', 'ch23', 'ch24', 
              'ch25', 'ch26', 'ch29', 'ch30']
  }

  // 🔥 完整 30 章詳細內容
  const files = {
    notebook: {
      ch1: `=== Linux 歷史 ===
1970 Ken Thompson & Dennis Ritchie 開發 Unix (AT&T Bell Labs)
1977 Berkeley Software Distribution (BSD) - 加州大學柏克萊
1983 Richard Stallman 發起 GNU 計畫 (GPL 開源許可)
1991 Linus Torvalds 發布 Linux Kernel 0.01 (C語言, GPL v2)
📊 目前 600+ 發行版：Ubuntu Debian Fedora OpenSUSE Manjaro Arch`,
      
      ch2: `=== Linux 發行版總覽 ===
Parrot OS      | 資安測試 + 隱私保護
Ubuntu         | 最受歡迎桌面發行版 (APT)
Debian         | 穩定性第一 (APT) LTS 支援 2-7 年
Raspberry Pi OS| 樹莓派專用 (基於 Debian)
CentOS         | 企業伺服器 (RPM) → CentOS Stream
BackBox        | 資安滲透測試

🔥 Kali Linux 特色：
• 基於 Debian 資安測試專用
• 預裝 600+ 資安工具 (Metasploit Nmap Burp)
• Rolling Release 持續更新
• sudo 預設無密碼 (root/toor)`,
      
      ch3: `=== Shell 介紹 ===
Linux Shell = 命令列介面 (CLI)
📋 最常用 Shell：
• Bash (Bourne-Again SHell) 預設 99% 系統
• Zsh (進階補全 + 主題 Oh My Zsh)
• Fish (使用者友好 語法高亮)
• Tcsh Csh Ksh (歷史 Shell)

🔧 終端複用器：
• Tmux：多視窗分割 Ctrl+b %
• Screen：會話管理 screen -S session

測試：echo $SHELL`,
      
      ch4: `=== Bash Prompt 自訂 ===
PS1 變數控制提示符：
PS1='user@host:dir$ '

🌈 顏色編碼：
PS1='\\[\\e[32m\\]bryan@portfolio:\\w$\\[\\e[0m\\] '
綠色用戶名 + 藍色路徑 + 重置

實戰範例：
root@htb:/htb$ → PS1='\\u@\\h:\\w$ '
nano ~/.bashrc 永久生效`,
      
      ch5: `=== 幫助指令 ===
📖 手冊查詢：
• man <指令>       # 詳細手冊 ex: man ls
• <指令> --help    # 快速說明 ex: ls --help
• apropos <關鍵字> # 搜尋指令 ex: apropos network
• whatis <指令>    # 指令簡介

🌐 在線資源：
• explainshell.com
• tldr.sh (簡化版 man)`,
      
      ch6: `=== 系統資訊指令 ===
👤 使用者資訊：
whoami id hostname who groups

💻 系統資訊：
uname -a uname -r lsb_release -a

🌐 網路：
ifconfig ip addr netstat ss

💾 磁碟：
lsblk df -h du -sh

硬體：lsusb lspci dmidecode`,
      
      ch7: `=== 檔案導航 ===
📍 位置：
pwd     # 顯示當前路徑
ls      # 列出檔案
ls -l   # 詳細列表 (權限 大小 時間)
ls -la  # 包含隱藏檔 (.開頭)

🔄 移動：
cd dir  # 進入資料夾
cd ..   # 返回上级
cd ~    # 家目錄
cd -    # 上次目錄`,
      
      ch8: `=== 檔案操作 ===
✨ 建立：
touch file.txt      # 新建檔案
mkdir dir           # 新建資料夾
mkdir -p a/b/c      # 多層資料夾

🔄 移動：
mv src dest         # 移動/重命名
cp src dest         # 複製
cp -r dir1 dir2     # 遞迴複製資料夾

🗑️ 刪除：
rm file             # 刪除檔案
rm -r dir           # 刪除資料夾
rm -rf dir          # 強制遞迴刪除`,
      
      ch9: `=== 文字編輯器 ===
🅽 Nano (新手友好)：
nano file.txt
CTRL+O 儲存 CTRL+X 離開 CTRL+W 搜尋

🅅 Vim (專業級)：
vim file.txt
i 插入模式 | Esc 一般模式
:q 離開 :w 儲存 :q! 強制離開
/vimtutor 學習

📄 快速查看：
cat file.txt less file.txt head -10 file.txt`,
      
      ch10: `=== Nano & Vim 實戰 ===
Nano 快捷鍵：
CTRL+G 幫助 CTRL+W 搜尋 CTRL+K 剪下
CTRL+U 貼上 CTRL+_ 跳到行號

Vim 模式：
• Normal (預設) h j k l 移動
• Insert i a o 插入
• Visual v V 選取
• Command : 指令列

常用：dd 刪行 yy 複製 p 貼上`,
      
      ch11: `=== 檔案描述符 FD ===
🔌 標準輸入輸出：
0 STDIN  (鍵盤)
1 STDOUT (螢幕)
2 STDERR (錯誤訊息)

🔀 重導向：
cmd > file.txt          # 覆寫 STDOUT
cmd >> file.txt         # 附加 STDOUT
cmd 2> error.txt        # STDERR 到檔案
cmd &> all.txt          # 全部到檔案

管道：cat file | grep root`,
      
      ch15: `=== 使用者管理 ===
👥 系統檔案：
/etc/passwd     使用者清單
/etc/shadow     密碼雜湊
/etc/group      群組資訊

🔐 管理指令：
sudo useradd user    # 新增使用者
sudo userdel user    # 刪除使用者
sudo passwd user     # 修改密碼
sudo usermod -aG sudo user  # 加 sudo 權限

sudoers：sudo visudo`,
      
      ch16: `=== 套件管理 ===
🍎 Debian/Ubuntu (APT)：
apt update
apt upgrade
apt install package
apt search impacket
apt-cache search nmap
dpkg -i package.deb

🍠 RedHat/CentOS (RPM/DNF)：
dnf install package
yum install package

📦 Git：
git clone https://github.com/samratashok/nishang.git`,
      
      ch17: `=== 服務管理 Systemd ===
🔄 服務控制：
systemctl start ssh        # 啟動
systemctl stop ssh         # 停止
systemctl status ssh       # 狀態
systemctl enable ssh       # 開機啟動
systemctl disable ssh      # 取消開機啟動

📊 監控：
ps aux | grep ssh
journalctl -u ssh.service  # 日誌
kill -9 <PID>              # 強制終止`,
      
      ch18: `=== 排程任務 ===
⏰ Cron 語法：crontab -e
* * * * * command     # 每分鐘
0 * * * * command     # 每小時
0 6 * * * script.sh   # 每天早上6點
0 0 1 * * backup.sh   # 每月1號

📁 Cron 位置：
/etc/crontab
/var/spool/cron/crontabs/

🔧 Systemd Timer：
/etc/systemd/system/backup.timer
/etc/systemd/system/backup.service`,
      
      ch19: `=== 網路服務 ===
🔒 SSH：
sudo apt install openssh-server
systemctl enable ssh
ss -tlnp | grep :22

🌐 NFS：
/etc/exports: /home/user *(rw,sync,no_root_squash)
exportfs -a

🌍 Apache：
sudo apt install apache2
systemctl enable apache2
/var/www/html/index.html`,
      
      ch22: `=== 容器技術 ===
🐳 Docker：
• 應用級容器
• Dockerfile 容器映像
• docker run hello-world
• docker ps docker images

🦘 LXC/LXD：
• 系統級容器 (輕量虛擬化)
• lxc-create -n container -t ubuntu
• lxc-start -n container
• 比 Docker 更輕量`,
      
      ch23: `=== 容器化實戰 ===
🐳 Docker 快速入門：
docker pull ubuntu
docker run -it ubuntu bash
docker ps -a
docker stop container_id

🦘 LXC 實戰：
lxc-create -n web -t ubuntu
lxc-start -n web -d
lxc-attach -n web
lxc-stop -n web
lxc-destroy -n web`,
      
      ch24: `=== 網路設定 ===
🌐 介面管理：
ifconfig eth0 up
ip addr show
ip link set eth0 up

📄 靜態 IP (Debian)：
/etc/network/interfaces
auto eth0
iface eth0 inet static
    address 192.168.1.100
    netmask 255.255.255.0
    gateway 192.168.1.1`,
      
      ch25: `=== 遠端桌面 ===
🖥️ VNC：
TCP 5900+ (vncserver :1)
vncserver -list -geometry 1920x1080
vncviewer host:1

🖥️ X11 Forwarding：
ssh -X user@host xclock
TCP 6000-6010

📡 XDMCP：
UDP 177 X Window 廣播
gdm3 啟用 XDMCP`,
      
      ch26: `=== Linux 安全 ===
🔒 安全模組：
SELinux (RedHat) 強制存取控制
AppArmor (Ubuntu) 應用程式監獄
Fail2ban 自動封鎖暴力破解

📋 日誌監控：
 /var/log/syslog      系統日誌
 /var/log/auth.log    認證日誌
 /var/log/secure      SSH 登入

🛡️ Hardening：
apt update && apt dist-upgrade
ufw enable
fail2ban-client status sshd`,
      
      ch29: `=== Solaris 簡介 ===
🏢 歷史：
Sun Microsystems → Oracle 2010
SPARC → x86 架構

💾 特色技術：
ZFS 檔案系統 (快照 壓縮 RAID-Z)
SMF 服務管理系統
IPS 套件管理 (pkg install)
RBAC 角色權限控制

📦 指令差異：
pfexec → sudo
svcadm → systemctl`,
      
      ch30: `=== Shell 快捷鍵 ===
🚀 光標移動：
TAB      自動補全
CTRL+A   行首
CTRL+E   行尾
CTRL+←→ 單詞跳躍

📜 歷史命令：
CTRL+R   反向搜尋
!!       上次命令
!$       上次參數
history  命令歷史

🧹 畫面管理：
CTRL+L   清屏
CTRL+U   刪除行首
CTRL+K   刪除行尾
CTRL+W   刪除單詞`
    }
  }

  // 🔥 智能拼寫修正
  const findSimilar = (target, list) => {
    return list.find(item => 
      item.includes(target) || 
      target.includes(item.slice(0, -1)) || 
      item.startsWith(target)
    )
  }

  const processCommand = useCallback((cmd) => {
    setOutput(prev => [...prev, `bryan@portfolio:${currentPath}$ ${cmd}`])

    const parts = cmd.trim().split(/\s+/)
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    switch (command) {
      case 'ls':
        const currentItems = dirs[currentPath] || []
        setOutput(p => [...p, currentItems.length ? currentItems.join('  ') : '空的資料夾'])
        break

      case 'cd':
        if (!args[0]) {
          setCurrentPath('root')
          setOutput(p => [...p, '回到根目錄: /'])
          break
        }
        
        if (args[0] === '..') {
          const pathOrder = ['notebook', 'linux', 'root']
          const currentIndex = pathOrder.indexOf(currentPath)
          if (currentIndex > 0) {
            setCurrentPath(pathOrder[currentIndex - 1])
            setOutput(p => [...p, `返回上级目錄`])
          }
          break
        }

        let targetDir = args[0]
        // 🔥 智能拼寫修正
        if (currentPath === 'linux' && (args[0] === 'notbook' || args[0] === 'notebook')) {
          targetDir = 'notebook'
          if (args[0] === 'notbook') {
            setOutput(p => [...p, `✨ 自動修正：notbook → notebook`])
          }
        }

        if (currentPath === 'root' && targetDir === 'linux') {
          setCurrentPath('linux')
          setOutput(p => [...p, '進入 linux'])
        } else if (currentPath === 'linux' && targetDir === 'notebook') {
          setCurrentPath('notebook')
          setOutput(p => [...p, '進入 notebook (完整30章 Linux 學習筆記)'])
        } else {
          const similar = findSimilar(args[0], dirs[currentPath] || [])
          if (similar) {
            setOutput(p => [...p, `❌ 找不到 "${args[0]}"，試試 "${similar}"？`])
          } else {
            setOutput(p => [...p, `cd: ${args[0]}: No such file or directory`])
          }
        }
        break

      case 'cat':
        if (currentPath === 'notebook' && files.notebook[args[0]]) {
          setOutput(p => [...p, files.notebook[args[0]]])
        } else {
          setOutput(p => [...p, `cat: ${args[0]}: No such file or directory`])
        }
        break

      case 'pwd':
        setOutput(p => [...p, currentPath])
        break

      case 'uname':
        if (args.includes('-a') || args.includes('--all')) {
          setOutput(p => [...p, 'Linux portfolio 6.5.0-architecture=x86_64 GNU/Linux'])
        } else {
          setOutput(p => [...p, 'Linux'])
        }
        break

      case 'whoami':
        setOutput(p => [...p, '劉興源 (Bryan)'])
        break

      case 'role':
        setOutput(p => [...p, '資安學生 / React 開發者'])
        break

      case 'status':
        setOutput(p => [...p, 'Online: 127 visits | CTF Rank: 1337 | Learning Linux'])
        break

      case 'help':
        setOutput(p => [...p, 
          '📁 檔案系統: ls cd cat pwd',
          '💻 系統資訊: uname [-a] whoami',
          '👤 個人資訊: role status',
          '🧹 其他: clear help',
          '✅ 目前路徑: ' + currentPath,
          '',
          '流程: cd linux → cd notebook → ls → cat ch1'
        ])
        break

      case 'clear':
      case '清除':
        setOutput([`畫面已清除 | 當前位置: ${currentPath}`])
        break

      default:
        setOutput(p => [...p, `未知指令: ${command}`])
        setOutput(p => [...p, '輸入 help 查看可用指令'])
    }
  }, [currentPath])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && input.trim()) {
      processCommand(input.trim())
      setInput('')
    }
  }, [input, processCommand])

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight)
  }, [output])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="terminal" ref={terminalRef}>
      {output.map((line, i) => (
        <div key={i} className="cmd">{line}</div>
      ))}
      <div className="input-line" style={{ display: 'flex', alignItems: 'center' }}>
        <span className="prompt" style={{ 
          color: 'var(--neon-cyan)', 
          marginRight: '6px',
          fontWeight: 'bold'
        }}>
          bryan@portfolio:{currentPath}$
        </span>
        <input 
          ref={inputRef}
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="試試 uname -a 或 cd linux/notebook..." 
          spellCheck="false"
          style={{
            background: 'transparent', 
            border: 'none', 
            color: '#eaf6ff', 
            flex: 1, 
            outline: 'none', 
            fontFamily: 'inherit', 
            fontSize: 'inherit'
          }}
        />
      </div>
    </div>
  )
}
