import React from "react";
export default function Projects(){
const projects = [
{title:'作品集網站',desc:'靜態網站 / 設計與部署',btn:'檢視',href:'#'},
{title:'CSS 實驗室',desc:'互動與微動畫',btn:'程式碼',href:'#'}
];
return (
<div className="space-y-3">
{projects.map((p,idx)=> (
<div key={idx} className="flex justify-between items-center p-3 rounded-md bg-[linear-gradient(180deg,rgba(255,255,255,0.01),rgba(255,255,255,0.005))] border border-[rgba(255,255,255,0.02)]">
<div>
<div className="font-semibold">{p.title}</div>
<div className="text-sm text-[#98a6b3]">{p.desc}</div>
</div>
<a className="px-3 py-1 rounded-md bg-gradient-to-r from-[#00f0ff] to-[#ff4dff] text-[#041018] font-bold" href={p.href}>{p.btn}</a>
</div>
))}
</div>
);
}