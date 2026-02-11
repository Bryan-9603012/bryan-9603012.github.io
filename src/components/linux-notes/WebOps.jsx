import { Section, Callout, CodeBlock, SimpleTable, RiskCard } from "./_ui";

export default function WebOps() {
  return (
    <div className="ln-note">
      <header className="ln-header">
        <h1>Web 服務互動（curl / wget / Web Ops）</h1>
        <p className="ln-subtitle">
          決定「你如何從命令列觀察、下載、驗證、操控 Web 資源」——滲透測試、自動化、事故應變的工具層。
        </p>
      </header>

      <Callout title="模組定位（一句話）" tone="info">
        這一章是「觀察與互動」，不是伺服器管理。
      </Callout>

      <Section title="類型 / 工具 / 管什麼（總覽）">
        <SimpleTable
          headers={["類型", "工具", "管什麼"]}
          rows={[
            ["HTTP 客戶端", "curl", "請求 / 偵測 / API"],
            ["下載工具", "wget", "檔案下載"],
            ["Header 操作", "curl -H", "認證 / 偽裝"],
            ["狀態檢查", "curl -I", "Server / Status"],
            ["快速 Web", "python -m http.server", "臨時 HTTP"],
          ]}
        />
      </Section>

      <Section title="curl 指令架構（最重要）">
        <CodeBlock
          code={`curl http://host
curl https://host
curl -I http://host      # 只看 header
curl -v http://host      # 詳細除錯`}
        />
      </Section>

      <Section title="HTTP 方法（必懂）">
        <CodeBlock
          code={`curl -X GET http://host
curl -X POST http://host
curl -X PUT http://host
curl -X DELETE http://host`}
        />
        <Callout title="提醒" tone="info">
          方法不同不是「失敗」，是行為不同。
        </Callout>
      </Section>

      <Section title="Header / 認證操作（高頻）">
        <CodeBlock
          code={`curl -H "Authorization: Bearer TOKEN" http://api
curl -H "User-Agent: Mozilla" http://host`}
        />
        <ul className="ln-ul">
          <li>API 測試</li>
          <li>繞簡單檢測</li>
          <li>重現攻擊流量</li>
        </ul>
      </Section>

      <Section title="傳資料（POST）">
        <CodeBlock
          code={`curl -d "user=admin&pass=123" http://host/login
curl -d @data.json http://api`}
        />
      </Section>

      <Section title="wget（下載專用）">
        <CodeBlock
          code={`wget http://host/file
wget -O newname http://host/file
wget -r http://host/dir`}
        />
        <Callout title="一句話" tone="info">
          wget = 下載；curl = 互動（完整 HTTP client）。
        </Callout>
      </Section>

      <Section title="Python 快速 Web（實戰常用）">
        <CodeBlock
          code={`python3 -m http.server
python3 -m http.server 8000
python3 -m http.server --directory /path`}
        />
        <Callout title="風險" tone="warn">
          沒有認證、沒有加密；不要對外暴露。
        </Callout>
      </Section>

      <Section title="自動化小技巧（防呆）">
        <CodeBlock
          code={`# 下載前檢查狀態
if curl -sf http://host/file; then
  wget http://host/file
fi

# 印出回應碼
curl -o /dev/null -w "%{http_code}" http://host`}
        />
        <Callout title="提醒" tone="info">
          自動化 ≠ 不檢查。
        </Callout>
      </Section>

      <Section title="攻擊者視角（風險分級）">
        <RiskCard level="Low" items={["讀取公開頁面", "Banner 抓取"]} />
        <RiskCard level="Medium" items={["API token 濫用", "Header 偽裝", "Script 自動化"]} />
        <RiskCard level="High" items={["curl | bash", "惡意下載執行", "Web 作為 C2"]} />
      </Section>

      <Section title="常見迷思澄清">
        <ul className="ln-ul">
          <li>❌ HTTPS = 一定安全</li>
          <li>❌ curl 只是下載工具</li>
          <li>✅ curl 是完整 HTTP 客戶端，很多惡意行為「只有 curl」</li>
        </ul>
      </Section>

      <hr className="ln-hr" />
      <footer className="ln-footer">
        <small>Last updated: Web Ops module</small>
      </footer>
    </div>
  );
}
