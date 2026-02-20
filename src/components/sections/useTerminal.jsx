import { useCallback, useEffect, useRef, useState } from "react";

export function useTerminal() {
  const [terminalOutput, setTerminalOutput] = useState([
    "歡迎來到 Bryan 的 Linux 學習終端！",
    "輸入 ls 查看教學內容，help 查看所有指令",
  ]);
  const [terminalInput, setTerminalInput] = useState("");

  const terminalRef = useRef(null);
  const currentPathRef = useRef("root");
  const inputRef = useRef(null);

  const processTerminalCommand = useCallback((cmd) => {
    const fullCmd = `bryan@portfolio:${currentPathRef.current}$ ${cmd}`;
    setTerminalOutput((prev) => [...prev, fullCmd]);

    const parts = cmd.trim().toLowerCase().split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1);

    switch (command) {
      case "ls": {
        const items =
          currentPathRef.current === "root"
            ? "📁 linux"
            : currentPathRef.current === "linux"
            ? "📓 notebook"
            : "ch1 ch2 ch3 ch4 ch5 ch6 ch7 ch8 ch9 ch10 ch11 ch15 ch16 ch17 ch18 ch19 ch22 ch23 ch24 ch25 ch26 ch29 ch30";
        setTerminalOutput((prev) => [...prev, items]);
        break;
      }

      case "help":
        setTerminalOutput((prev) => [
          ...prev,
          "📁 檔案系統: ls cd pwd",
          "💻 系統資訊: whoami role status",
          "🧹 其他: clear help",
          "✅ 流程: cd linux → cd notebook → ls",
          "",
        ]);
        break;

      case "whoami":
        setTerminalOutput((prev) => [...prev, "劉興源 (Bryan)"]);
        break;

      case "role":
        setTerminalOutput((prev) => [...prev, "資安學生 / React 開發者"]);
        break;

      case "status":
        setTerminalOutput((prev) => [
          ...prev,
          "Learning: Linux Roadmap + picoCTF Writeups + React UI",
        ]);
        break;

      case "clear":
      case "清除":
        setTerminalOutput(["畫面已清除！"]);
        break;

      case "cd":
        if (!args[0]) {
          currentPathRef.current = "root";
          setTerminalOutput((prev) => [...prev, "回到根目錄"]);
          break;
        }

        if (args[0] === "linux" && currentPathRef.current === "root") {
          currentPathRef.current = "linux";
          setTerminalOutput((prev) => [...prev, "進入 linux 目錄"]);
          break;
        }

        if (args[0] === "notebook" && currentPathRef.current === "linux") {
          currentPathRef.current = "notebook";
          setTerminalOutput((prev) => [...prev, "進入 notebook"]);
          break;
        }

        if (args[0] === ".." && currentPathRef.current !== "root") {
          currentPathRef.current =
            currentPathRef.current === "notebook" ? "linux" : "root";
          setTerminalOutput((prev) => [...prev, "回到上一層目錄"]);
          break;
        }

        setTerminalOutput((prev) => [...prev, `cd: ${args[0]}: No such directory`]);
        break;

      case "pwd":
        setTerminalOutput((prev) => [...prev, `/${currentPathRef.current}`]);
        break;

      default:
        setTerminalOutput((prev) => [...prev, `bash: ${command}: command not found`]);
    }

    setTerminalInput("");
  }, []);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    inputRef.current?.focus();
  }, [terminalOutput]);

  return {
    terminalOutput,
    terminalInput,
    setTerminalInput,
    terminalRef,
    inputRef,
    currentPathRef,
    processTerminalCommand,
  };
}