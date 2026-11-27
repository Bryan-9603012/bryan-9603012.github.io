import React, { memo, useState } from "react";
import { activeNav } from "./routes.js";
const links = [["overview","首頁"],["about","關於我"],["philosophy","理念"],["works","作品與經歷"],["knowledge","知識庫"],["journey","歷程"]];
export function Header({route}) {
  const [open,setOpen] = useState(false);
  return <header className={open ? "masthead open" : "masthead"} id="sidebar"><div className="mast-inner"><a className="identity" href="#overview" onClick={()=>setOpen(false)}><strong>個人網站</strong></a><button aria-expanded={open} aria-label="開啟導覽" className="menu" id="menu" onClick={()=>setOpen(v=>!v)}>選單 <span>☰</span></button><nav aria-label="網站導覽" className="nav">{links.map(([page,title])=>{const active=activeNav(page,route);return <a key={page} data-page={page} href={"#"+page} className={active?"active":undefined} aria-current={active?"page":undefined} onClick={()=>setOpen(false)}>{title}</a>})}</nav><a className="github-link" href="https://github.com/Bryan-9603012" rel="noopener" target="_blank">GitHub <span>↗</span></a></div></header>;
}
export function Footer(){return <footer className="footer"><div className="footer-credits"><span>© 2026 個人網站</span><span className="font-credit">Typography: <a href="https://01460421.github.io/niyu/" rel="noopener noreferrer" target="_blank">NiYu</a> · <a href="https://openfontlicense.org/" rel="noopener noreferrer" target="_blank">SIL OFL 1.1</a></span></div><span><a href="https://github.com/Bryan-9603012" rel="noopener" target="_blank">GitHub ↗</a> / v0.8.11</span></footer>}
export function CertificateDialog(){return <dialog id="certdialog"><button className="dialog-close close" id="closecert">關閉 ×</button><div className="small" id="certcaption"></div><img id="certimg" alt="完整證明文件" /></dialog>}
// Approved, static article markup is deliberately kept out of JSX. Do not pass user input here.
export const Page = memo(function Page({id,active,html}){return <section className={active?"view active":"view"} id={id} dangerouslySetInnerHTML={html}/>});
