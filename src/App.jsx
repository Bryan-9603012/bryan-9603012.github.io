import React, { useLayoutEffect, useRef, useState } from "react";
import { Header, Footer, CertificateDialog, Page } from "./portfolio/Layout.jsx";
import { resolveRoute } from "./portfolio/routes.js";
import { initPortfolio } from "./portfolio/runtime.js";
import pageData from "./portfolio/pages.json";
import "./portfolio/portfolio.css";

const pageContent = Object.entries(pageData).map(([id,markup])=>({id,html:{__html:markup}}));
export default function App(){
  const [hash,setHash]=useState(()=>window.location.hash);
  const runtime=useRef(null);
  const route=resolveRoute(hash);
  useLayoutEffect(()=>{
    runtime.current=initPortfolio();
    const onHash=()=>setHash(window.location.hash);
    window.addEventListener("hashchange",onHash);
    return ()=>{window.removeEventListener("hashchange",onHash);runtime.current?.dispose();runtime.current=null;};
  },[]);
  useLayoutEffect(()=>{
    window.scrollTo(0,0);
    if(route.entry) runtime.current?.openReport(route.entry); else runtime.current?.cancelReport();
  },[hash]);
  return <><Header key={route.key} route={route}/><main><span hidden id="crumb">{route.title}</span><div className="content">{pageContent.map(p=><Page key={p.id} id={p.id} active={p.id===route.view} html={p.html}/>)}<Footer/></div></main><CertificateDialog/></>;
}
