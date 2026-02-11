import { Section, Callout, CodeBlock, SimpleTable, RiskCard } from "./_ui";

export default function Services() {
  return (
    <div className="ln-note">
      <header className="ln-header">
        <h1>服務與流程管理（Service & Process）</h1>
        <p className="ln-subtitle">
          決定「系統現在在跑什麼、誰啟動的、能不能控制或終止」——即時控制面（Runtime Control Plane）。
        </p>
      </header>

      <Callout title="模組定位（一句話）" tone="info">
        Service/Process 管理 = 你能不能把「正在發生的事」停下來、查清楚。
      </Callout>

      <Section title="類型 / 工具 / 管什麼（總覽）">
        <SimpleTable
          headers={["類型", "工具", "管什麼"]}
          rows={[
            ["初始化系統", "systemd", "開機流程與服務（PID 1）"],
            ["服務管理", "systemctl", "start/stop/enable/disable"],
            ["程序檢視", "ps/top/htop", "目前流程與資源"],
            ["程序控制", "kill/pkill", "發送 signal"],
            ["背景控制", "jobs/bg/fg", "shell 工作控制"],
            ["紀錄", "journalctl", "服務與系統 log"],
          ]}
        />
      </Section>

      <Section title="systemd 核心觀念（必懂）">
        <ul className="ln-ul">
          <li>systemd = PID 1（第一個啟動）</li>
          <li>所有服務都是 unit</li>
          <li>服務檔位置：/lib/systemd/system/、/etc/systemd/system/</li>
        </ul>
        <Callout title="一句話" tone="info">
          systemd = 現代 Linux 的心臟（也是持久化常見落點）。
        </Callout>
      </Section>

      <Section title="systemctl 指令架構（必背）">
        <CodeBlock
          code={`# 服務控制
systemctl start <service>
systemctl stop <service>
systemctl restart <service>
systemctl reload <service>

# 狀態 / 開機
systemctl status <service>
systemctl enable <service>
systemctl disable <service>

# 列表
systemctl list-units --type=service
systemctl list-unit-files`}
        />
      </Section>

      <Section title="流程檢視（Process Inspection）">
        <CodeBlock
          code={`ps aux
ps -ef
ps aux | grep ssh

top
htop`}
        />
        <Callout title="看什麼？" tone="info">
          PID / USER / %CPU / %MEM / CMD —— 先定位「誰在跑」。
        </Callout>
      </Section>

      <Section title="PID / PPID（鑑識線索）">
        <CodeBlock code={`pstree -p`} />
        <Callout title="重點" tone="warn">
          追蹤惡意程式「是誰生的」（PPID）常比只看 PID 更有價值。
        </Callout>
      </Section>

      <Section title="Signal（殺程序的正確方式）">
        <SimpleTable
          headers={["Signal", "編號", "用途"]}
          rows={[
            ["SIGTERM", "15", "正常結束（建議）"],
            ["SIGKILL", "9", "強制終止"],
            ["SIGSTOP", "19", "不可處理的暫停"],
            ["SIGTSTP", "20", "Ctrl+Z（shell 暫停）"],
          ]}
        />
        <CodeBlock
          code={`kill <PID>
kill -9 <PID>
pkill ssh
killall apache2`}
        />
        <Callout title="資安提醒" tone="warn">
          能不用 -9 就不要用；-9 會跳過清理流程，讓排錯更難。
        </Callout>
      </Section>

      <Section title="Background / Foreground（Shell 控制）">
        <CodeBlock
          code={`command &
Ctrl + Z
jobs
bg %1
fg %1`}
        />
        <Callout title="重點" tone="info">
          jobs 編號 ≠ PID。
        </Callout>
      </Section>

      <Section title="journalctl（關鍵鑑識工具）">
        <CodeBlock
          code={`journalctl -u ssh
journalctl -xe
journalctl --since "1 hour ago"`}
        />
        <Callout title="實務" tone="info">
          排錯、追蹤惡意服務、還原事件時間線（Timeline）都會用到。
        </Callout>
      </Section>

      <Section title="攻擊者視角（風險分級）">
        <RiskCard level="Low" items={["開 background process", "執行 user script"]} />
        <RiskCard level="Medium" items={["user-level service", "cron + service 配合"]} />
        <RiskCard
          level="High"
          items={[
            "建立 / 修改 systemd service（持久化）",
            "ExecStart 執行惡意程式",
            "服務以 root 啟動、偽裝合法 daemon",
          ]}
        />
      </Section>

      <Section title="常見迷思澄清">
        <ul className="ln-ul">
          <li>❌ kill 掉程序 ≠ 根除後門</li>
          <li>❌ stop service ≠ disable</li>
          <li>✅ 正確清理：stop → disable → 刪 unit → daemon-reload</li>
        </ul>
        <CodeBlock
          code={`systemctl stop <svc>
systemctl disable <svc>
rm /etc/systemd/system/<svc>.service
systemctl daemon-reload`}
        />
      </Section>

      <Section title="對應 MITRE ATT&CK（索引）">
        <ul className="ln-ul">
          <li>T1543.002 – Create or Modify Systemd Service</li>
          <li>T1569.002 – System Services</li>
          <li>T1059 – Command & Scripting Interpreter</li>
          <li>T1070.004 – File Deletion（清除痕跡）</li>
        </ul>
      </Section>

      <Section title="防禦與稽核重點">
        <ul className="ln-ul">
          <li>服務盡量使用 User= 非 root</li>
          <li>ExecStart 路徑不可被一般 user 寫入</li>
          <li>定期列舉服務與開機項</li>
          <li>日誌監控：journalctl -xe</li>
        </ul>
      </Section>

      <hr className="ln-hr" />
      <footer className="ln-footer">
        <small>Last updated: Services module</small>
      </footer>
    </div>
  );
}
