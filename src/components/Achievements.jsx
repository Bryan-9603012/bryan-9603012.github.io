import React from "react";
export default function Achievements(){
const badges = [
{icon:'🎓',title:'程式設計基礎',desc:'完成基礎課程認證',onClick:()=>alert('取得時間：2023，類型：程式設計基礎')},
{icon:'💻',title:'網頁開發',desc:'前端技術能力認證',onClick:()=>alert('取得時間：2023，類型：網頁開發')},
{icon:'🏆',title:'專案完成',desc:'首個作品集發布'},
{icon:'🌟',title:'創新設計',desc:'UI/UX 設計認證'}
];


return (
<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
{badges.map((b,idx)=> (
<div key={idx} className="p-4 rounded-lg bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] border border-[rgba(255,255,255,0.04)] text-center cursor-pointer hover:translate-y-[-6px] transition-transform" onClick={b.onClick} title="點此查看細節">
<div className="w-14 h-14 rounded-full mx-auto mb-2 bg-gradient-to-br from-[#00f0ff] to-[#ff4dff] flex items-center justify-center text-xl">{b.icon}</div>
<div className="font-semibold text-white">{b.title}</div>
<div className="text-sm text-[#98a6b3]">{b.desc}</div>
</div>
))}
</div>
);
}