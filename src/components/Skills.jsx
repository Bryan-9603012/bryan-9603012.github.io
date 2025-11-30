import React from "react";
export default function Skills(){
const items = ['HTML5','Modern CSS','Responsive','Accessibility','Design Systems','Performance'];
return (
<div className="flex flex-wrap gap-2">
{items.map((s) => (
<span key={s} className="px-3 py-1 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.02),transparent)] border border-[rgba(255,255,255,0.03)] text-sm">{s}</span>
))}
</div>
);
}