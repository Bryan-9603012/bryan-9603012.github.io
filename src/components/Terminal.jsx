import { useState, useEffect, useRef, useCallback } from 'react'

export default function Terminal() {
  const [output, setOutput] = useState(['歡迎使用互動面板！', '可用：whoami, role, status, help, clear, ai <問題>'])
  const [input, setInput] = useState('')
  const terminalRef = useRef(null)
  const inputRef = useRef(null)

  // 呼叫後端 API
  async function askAI(question) {
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question })
      })

      const data = await res.json()
      return data.reply
    } catch (err) {
      return "AI 系統連線失敗，請稍後再試。"
    }
  }

  const processCommand = useCallback(async (cmd) => {
    setOutput(prev => [...prev, `$ ${cmd}`])   // 顯示你輸入的指令

    if (cmd === "whoami") setOutput(p => [...p, '劉興源'])
    else if (cmd === "role") setOutput(p => [...p, 'Student'])
    else if (cmd === "status") setOutput(p => [...p, 'Learning & Creating'])
    else if (cmd === "help") setOutput(p => [...p, '可用指令：whoami, role, status, help, clear, ai <問題>'])
    else if (cmd === "clear" || cmd === "清除") setOutput(['畫面已清除'])

    // AI
    else if (cmd.startsWith("ai ")) {
      const q = cmd.slice(3).trim()
      if (!q) {
        setOutput(p => [...p, '請輸入：ai 你的問題'])
        return
      }

      setOutput(p => [...p, "AI 正在思考中..."])
      const reply = await askAI(q)

      setOutput(p => [...p, reply])
    }

    else {
      setOutput(p => [...p, '未知指令，輸入 help 查看可用指令。'])
    }
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" && input.trim()) {
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
      {output.map((line, i) => <div key={i} className="cmd">{line}</div>)}
      <div className="input-line" style={{ display: 'flex', alignItems: 'center' }}>
        <span className="prompt" style={{ color: 'var(--neon-cyan)', marginRight: '6px' }}>$</span>
        <input 
          ref={inputRef}
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="輸入指令..." 
          spellCheck="false"
          style={{
            background: 'transparent', border: 'none', color: '#eaf6ff', flex: 1, 
            outline: 'none', fontFamily: 'inherit', fontSize: 'inherit'
          }}
        />
      </div>
    </div>
  )
}
