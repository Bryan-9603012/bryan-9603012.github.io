// src/components/pages/pico/pico.data.js

export const difficultyLabels = {
  easy: "簡單",
  normal: "一般",
  hard: "困難",
};

export const toolRows = [
  ["nc", "連線到服務取得互動/輸出", "nc <host> <port>"],
  ["ssh", "遠端登入", "ssh user@host -p <port>"],
  ["grep", "搜尋關鍵字", "grep FLAG <file>"],
  ["base64", "編碼/解碼", "base64 -d <file>"],
  ["objdump", "反組譯檢視符號/offset", "objdump -d <bin> | grep '<win>'"],
];

export const problems = [
  {
    id: "register-game",
    title: "FANTASY CTF",
    difficulty: "easy",
    steps: [
      "使用 nc 連線到指定伺服器與埠號：nc <伺服器IP> <埠號>",
      "連上後一直按 Enter，直到看到：Nyx brings up the registration page.",
      "看到 registration page 後輸入：c",
      "繼續按 Enter，直到看到互動劇情提示（old school interactive fiction game）",
      "再次輸入：c",
      "繼續按 Enter 即可看到 flag",
    ],
    note: "若 nc 出現 Connection refused，代表伺服器關閉或暫停；稍後再試即可。",
  },
  {
    id: "log-hunt",
    title: "Log Hunt",
    difficulty: "easy",
    steps: [
      "下載檔案後切到存放目錄，使用 ls -a 確認是否有隱藏檔",
      "使用 cat <檔名> 查看內容（通常是一堆 log）",
      "用 grep 搜尋關鍵字",
      "輸入：grep FLAG <檔名>",
      "拼出 flag（格式 picoCTF{...}）",
    ],
    note: "用 picoCTF 當關鍵字可能只會出現字樣，不會出現完整 flag；建議用 FLAG。",
  },
  {
    id: "super-ssh",
    title: "Super SSH",
    difficulty: "easy",
    steps: [
      "使用 ssh 連線到指定伺服器：ssh <user>@<host> -p <port>",
      "例：ssh ctf-player@titan.picoctf.net -p 53499",
      "提示 Are you sure... 輸入 yes",
      "輸入密碼：84b12bae",
      "取得 flag",
    ],
  },
  {
    id: "repetitions",
    title: "Repetitions",
    difficulty: "easy",
    steps: [
      "挑戰概述：解讀提供的 enc_flag（通常是多層 Base64）",
      "先用 cat enc_flag 查看內容",
      "建立程式一（nano test.py），貼上程式一後存檔離開",
      "執行：python3 test.py，得到解碼後的字串",
      "建立程式二（nano test1.py），貼上程式二後存檔離開",
      "執行：python3 test1.py，取得 flag",
    ],
  },
  {
    id: "what-s-a-net-cat",
    title: "What's a Net Cat?",
    difficulty: "easy",
    steps: [
      "使用 netcat (nc) 連線到指定 host/port",
      "在終端機輸入：nc <host> <port>",
      "看到一串數字（ASCII），轉換為文字後取得 flag",
    ],
  },
  {
    id: "nice-netcat",
    title: "Nice Netcat...",
    difficulty: "easy",
    steps: [
      "使用 netcat (nc) 連線到指定 host/port",
      "在終端機輸入：nc <host> <port>",
      "例：nc 2019shell1.picoctf.com 54321",
      "接收輸出取得 flag",
    ],
  },
  {
    id: "rotation",
    title: "Rotation",
    difficulty: "normal",
    steps: [
      "挑戰概述：ROT 類旋轉加密字串解碼",
      "下載檔案後切到存放目錄",
      "使用 cat 查看檔案內容",
      "用 ROT13 / ROTn 工具解碼取得 flag（格式 picoCTF{...}）",
    ],
    note: "picoCTF flag 格式固定 picoCTF{.....}",
  },
  {
    id: "interencdec",
    title: "InterEncDec",
    difficulty: "easy",
    steps: [
      "挑戰概述：多層編碼解碼取得 flag",
      "下載檔案後切到存放目錄",
      "cat 看到 base64 字串 → base64 解碼",
      "再次得到 base64 → 再解碼",
      "最後用 rot7 解碼取得 flag",
    ],
    note: "順序：base64 → base64 → rot7",
  },
  {
    id: "sansalpha",
    title: "SansAlpha",
    difficulty: "normal",
    steps: [
      "挑戰概述：利用 bash globbing 繞過字母禁令取得 flag",
      "輸入 * 展開當前目錄",
      "輸入 */* 展開子目錄，發現 flag.txt",
      "輸入 /* 匹配根目錄所有項目",
      "輸入 /*/??? 匹配 /bin 下 3 字元命令",
      "輸入 /*/?????? 匹配 6 字元，找到 base64",
      "輸入 /*/????64 */* 精準匹配 base64",
      "輸入 /*/???[!_]64 */* 匹配到 /bin/base64",
      "輸入 /*/???[!_]64 */????.* 取得 base64 編碼，解碼得到 flag",
    ],
  },

  // ✅ head-dump：維持你要的格式（無數字前綴，純條列）
  {
    id: "head-dump",
    title: "head-dump",
    difficulty: "easy",
    steps: [
      "類型：Web Exploitation",
      "🧠 解題核心：找到會暴露 heap snapshot 的 endpoint，下載後從記憶體字串搜尋 flag。",
      "Step 1：找 API 文件（/api-docs）→ 用 Swagger/OpenAPI 列舉端點。",
      "Step 2：鎖定可疑端點（通常是 /heapdump 或類似名稱）。",
      "Step 3：用 curl 驗證是否能下載（看 HTTP 200、內容類型）。",
      "Step 4：下載 heapdump 檔案。",
      "Step 5：用 strings / grep 從記憶體快照中抽出 picoCTF{...}。",
    ],
    note: "重點：不是亂猜路徑，而是透過 API 文件列舉端點（enumeration）。",
  },
];