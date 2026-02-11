import { Section, Callout, CodeBlock, SimpleTable, RiskCard } from "./_ui";

export default function BackupRestore() {
  return (
    <div className="ln-note">
      <header className="ln-header">
        <h1>備份與復原（Backup & Restore – 資安版）</h1>
        <p className="ln-subtitle">
          決定「系統壞掉後，你能不能乾淨、可信地回到安全狀態」——DR/IR 的最後防線。
        </p>
      </header>

      <Callout title="模組定位（一句話）" tone="info">
        備份 ≠ 安全；「可信備份」才是安全。
      </Callout>

      <Section title="類型 / 工具 / 管什麼（總覽）">
        <SimpleTable
          headers={["類型", "工具", "管什麼"]}
          rows={[
            ["檔案同步", "rsync", "快速、增量備份"],
            ["加密備份", "duplicity", "加密 + 版本"],
            ["GUI", "Deja Dup", "使用者友善"],
            ["快照", "LVM / Btrfs", "即時回滾"],
            ["排程", "cron / timer", "自動化"],
          ]}
        />
      </Section>

      <Section title="rsync 指令架構（核心）">
        <CodeBlock
          code={`# 基本備份
rsync -av /src/ /backup/

# 遠端（SSH）
rsync -avz -e ssh /src/ user@host:/backup/

# 刪除同步（高風險）
rsync -av --delete /src/ /backup/`}
        />
        <Callout title="資安提醒" tone="danger">
          --delete + compromised source = 直接把備份也一起毀掉。
        </Callout>
      </Section>

      <Section title="rsync 進階（Snapshot-like）">
        <CodeBlock code={`rsync -avz --link-dest=/backup/old /src/ /backup/new`} />
        <ul className="ln-ul">
          <li>節省空間</li>
          <li>快速回溯</li>
        </ul>
      </Section>

      <Section title="duplicity（加密備份）">
        <CodeBlock
          code={`# 備份
duplicity /src scp://user@host//backup

# 還原
duplicity restore scp://user@host//backup /restore`}
        />
        <Callout title="重點" tone="ok">
          外部備份一定要加密（不可信儲存環境必備）。
        </Callout>
      </Section>

      <Section title="Snapshot（系統級，但不是備份）">
        <ul className="ln-ul">
          <li>秒級建立、快速 rollback</li>
          <li>⚠️ snapshot 在同一台機器：被 root 攻陷可一起刪</li>
        </ul>
        <Callout title="一句話" tone="warn">
          snapshot ≠ backup。
        </Callout>
      </Section>

      <Section title="自動化備份（cron）">
        <CodeBlock code={`0 3 * * * /usr/local/bin/backup.sh`} />
        <Callout title="建議" tone="info">
          備份帳號盡量只讀、獨立帳號、不要可回寫原系統。
        </Callout>
      </Section>

      <Section title="攻擊者視角（你筆記的關鍵）">
        <ul className="ln-ul">
          <li>修改備份腳本</li>
          <li>汙染 rsync source</li>
          <li>插入 cron + 後門，等你「正常復原」</li>
        </ul>
        <Callout title="重要原則" tone="danger">
          被攻陷後的備份 = 不可信（要先鑑識、再重建）。
        </Callout>
      </Section>

      <Section title="正確 IR 流程（實戰）">
        <ol className="ln-ol">
          <li>隔離主機</li>
          <li>停止自動備份</li>
          <li>鑑識分析</li>
          <li>乾淨來源重建</li>
          <li>換 key / token</li>
          <li>恢復資料（非系統）</li>
        </ol>
        <Callout title="一句話" tone="info">
          資料可以救，系統要重裝。
        </Callout>
      </Section>

      <Section title="決策樹（rsync / duplicity / snapshot）">
        <ul className="ln-ul">
          <li>需要快 → rsync</li>
          <li>需要加密 → duplicity</li>
          <li>需要秒回 → snapshot</li>
          <li>怕被植入 → 離線 + 不可變備份</li>
        </ul>
      </Section>

      <hr className="ln-hr" />
      <footer className="ln-footer">
        <small>Last updated: Backup & Restore module</small>
      </footer>
    </div>
  );
}
