import { useState, useEffect, useRef, useCallback } from 'react'

export default function Terminal() {
  const [output, setOutput] = useState(['歡迎使用互動面板！', '可用：whoami, role, status, help, clear, 問問題'])
  const [input, setInput] = useState('')
  const terminalRef = useRef(null)
  const inputRef = useRef(null)

  const processCommand = useCallback((cmd) => {
    setOutput(prev => [...prev, `你說：${cmd}`])
    
    if (cmd === "whoami") setOutput(p => [...p, '劉興源'])
    else if (cmd === "role") setOutput(p => [...p, 'Student'])
    else if (cmd === "status") setOutput(p => [...p, 'Learning & Creating'])
    else if (cmd === "help") setOutput(p => [...p, '可用指令：whoami, role, status, help, clear, 問問題'])
    else if (cmd === "clear" || cmd === "清除") setOutput(['畫面已清除'])
    else if (cmd.startsWith("問問題")) {
      const q = cmd.replace("問問題", "").trim()
      setOutput(p => [...p, q ? `已收到你的問題：「${q}」` : '請輸入：問問題 你的問題'])
    } else {
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
