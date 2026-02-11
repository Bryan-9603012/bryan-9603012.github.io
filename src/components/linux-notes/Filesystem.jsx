import { Section, Callout, CodeBlock, SimpleTable, RiskCard } from "./_ui";

export default function FileSystem() {
  return (
    <div className="ln-note">
      <header className="ln-header">
        <h1>檔案系統管理（File System Management）</h1>
        <p className="ln-subtitle">
          決定「資料放在哪、怎麼被存取、能不能被偷偷動手腳」——權限與身分真正落地的最後一道安全邊界。
        </p>
      </header>

      <Callout title="模組定位（一句話）" tone="info">
        Linux 判斷權限看 inode，不看檔名。
      </Callout>

      <Section title="類型 / 工具 / 管什麼（總覽）">
        <SimpleTable
          headers={["類型", "工具 / 機制", "管什麼"]}
          rows={[
            ["檔案系統", "ext4 / XFS / Btrfs", "資料存放與一致性"],
            ["檔案識別", "inode", "檔案真實身分"],
            ["連結", "hard link / symlink", "指向關係"],
            ["掛載", "mount / umount", "信任邊界"],
            ["啟動設定", "/etc/fstab", "開機自動掛載（高風險）"],
            ["交換空間", "swap", "記憶體殘留資料"],
          ]}
        />
      </Section>

      <Section title="檔案系統模型（必懂）">
        <SimpleTable
          headers={["元件", "說明"]}
          rows={[
            ["inode", "檔案的「真正身分」"],
            ["data block", "真正的資料內容"],
            ["directory", "檔名 → inode 對照表"],
          ]}
        />
        <Callout title="重點" tone="warn">
          inode 不等於檔名；檔名只是指向 inode 的入口。
        </Callout>
      </Section>

      <Section title="關鍵目錄（必背）">
        <SimpleTable
          headers={["路徑", "用途", "誰能改"]}
          rows={[
            ["/", "根目錄", "root"],
            ["/etc", "系統設定", "root"],
            ["/var", "變動資料", "root"],
            ["/home", "使用者資料", "user"],
            ["/boot", "開機核心", "root"],
            ["/etc/fstab", "掛載設定", "root"],
          ]}
        />
        <CodeBlock code={`ls -li`} />
        <Callout title="小技巧" tone="info">
          -i（inode）是鑑識與稽核常用參數。
        </Callout>
      </Section>

      <Section title="inode 與 link">
        <CodeBlock
          code={`ls -li file
ln file file2        # hard link
ln -s /path/to/file link   # symlink`}
        />
        <Callout title="重點" tone="info">
          hard link 共用 inode；symlink 只是路徑指標。
        </Callout>
      </Section>

      <Section title="掛載（Mount）與風險選項">
        <CodeBlock
          code={`mount
mount /dev/sdb1 /mnt/usb
umount /mnt/usb`}
        />
        <SimpleTable
          headers={["選項", "風險"]}
          rows={[
            ["exec", "可執行惡意程式"],
            ["suid", "可能導致 SUID 提權"],
            ["dev", "偽裝裝置節點風險"],
          ]}
        />
        <Callout title="不信任來源建議" tone="ok">
          nodev,nosuid,noexec
        </Callout>
      </Section>

      <Section title="/etc/fstab（高風險設定檔）">
        <CodeBlock code={`cat /etc/fstab`} />
        <Callout title="資安提醒" tone="danger">
          fstab 被改 = 長期信任邊界被改（永久性風險）。
        </Callout>
      </Section>

      <Section title="Unmount 失敗的意義">
        <CodeBlock code={`lsof | grep /mnt`} />
        <Callout title="線索" tone="warn">
          代表有程序仍在使用該檔案系統；有時不是 bug，而是後門/服務的線索。
        </Callout>
      </Section>

      <Section title="Swap（常被忽略）">
        <ul className="ln-ul">
          <li>記憶體不足時交換空間</li>
          <li>hibernation 使用</li>
          <li>風險：明文殘留（password/token/key）</li>
        </ul>
        <Callout title="高安全環境" tone="warn">
          加密 swap 或停用 hibernation。
        </Callout>
      </Section>

      <Section title="攻擊者視角（風險分級）">
        <RiskCard level="Low" items={["操作自己 home", "建立一般檔案"]} />
        <RiskCard level="Medium" items={["symlink 誘導程式", "利用可寫目錄做置換"]} />
        <RiskCard
          level="High"
          items={["建立/濫用 SUID", "修改 fstab", "掛載惡意檔案系統（option 錯誤）"]}
        />
      </Section>

      <Section title="迷思澄清">
        <ul className="ln-ul">
          <li>❌ hard link 不能直接讀 /etc/shadow</li>
          <li>❌ 正常 user 不能改 mount / fstab</li>
          <li>✅ 真正風險：權限設計錯誤、可寫 system path、mount option 錯誤</li>
        </ul>
      </Section>

      <hr className="ln-hr" />
      <footer className="ln-footer">
        <small>Last updated: File System module</small>
      </footer>
    </div>
  );
}
