import React from "react";
import Projects from "./Projects";


export default function Sidebar(){
return (
<div className="space-y-4">
<div className="p-4 rounded-xl bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] border border-[rgba(255,255,255,0.04)]">
<h3 className="text-[#ff4dff]">專案</h3>
<Projects />


<div className="mt-3 flex flex-col gap-2">
<a className="px-3 py-2 rounded-md bg-gradient-to-r from-[#00f0ff] to-[#ff4dff] text-[#041018] text-center font-bold" href="mailto:bryanhuang710910@gmail.com">聯絡我</a>
<a className="px-3 py-2 rounded-md border border-[rgba(255,255,255,0.04)] text-[#00f0ff] text-center" href="#">我的作品集</a>
</div>
</div>


<div className="p-4 rounded-xl bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] border border-[rgba(255,255,255,0.04)]">
<h4 className="text-[#00ffb3]">快速資料</h4>
<div className="mt-2 text-sm text-[#98a6b3]">
<div>所在：台灣</div>
<div>開始可用：2025-12</div>
<div>語言：中文（繁體）、英文</div>
</div>
</div>
</div>
);
}