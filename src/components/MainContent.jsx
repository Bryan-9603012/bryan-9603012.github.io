import Terminal from './Terminal'
import Skills from './Skills'
import Achievements from './Achievements'

export default function MainContent() {
  return (
    <main className="card">
      <h2>關於我</h2>
      <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
        我是 <strong>劉興源</strong>，一位熱愛科技的學生。這是我用 React 打造的個人網頁，展現了我對科技與程式設計的熱情。
      </p>

      <hr style={{ margin: '12px 0', border: 'none', borderTop: '1px solid rgba(255,255,255,0.03)' }} />
      <h3 style={{ color: 'var(--neon-emerald)' }}>即時面板</h3>
      <Terminal />

      <div className="hint" style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '8px', textAlign: 'center' }}>
        ← 可用指令：whoami、role、status、help、clear、問問題
      </div>

      <hr style={{ margin: '12px 0', border: 'none', borderTop: '1px solid rgba(255,255,255,0.03)' }} />
      <Skills />
      
      <hr style={{ margin: '12px 0', border: 'none', borderTop: '1px solid rgba(255,255,255,0.03)' }} />
      <Achievements />
    </main>
  )
}
