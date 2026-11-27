import archive from "./archive.json";
export const pageTitles = {overview:'首頁',project:'專案',writeups:'解題報告',publications:'學術發表',achievements:'AIWave Hackathon',showcase:'Claude Code Demo Showcases',knowledge:'知識庫','linux-index':'Linux 安全筆記','research-notes':'工具研究與實驗','linux-permissions':'權限管理',"linux-users":"使用者管理","linux-packages":"套件管理","linux-services":"服務與流程","linux-scheduling":"任務調度","linux-network":"網路服務","linux-webops":"網頁工具","linux-backup":"備份與復原","linux-filesystem":"檔案系統","linux-container":"容器化","linux-remote":"遠端桌面","linux-security":"Linux 安全",about:'關於我',philosophy:'理念',works:'作品與經歷',journey:'歷程'};
const entriesByRoute = new Map(archive.entries.filter(e => e.kind === "writeup").map(e => ["report-"+e.id,e]));
export function resolveRoute(hash) {
  const key = hash.replace(/^#/,"");
  const entry = entriesByRoute.get(key);
  if(entry) return {key,view:"report-reader",entry,title:entry.title};
  const valid = Object.hasOwn(pageTitles,key) ? key : "overview";
  return {key:valid,view:valid,entry:null,title:pageTitles[valid]};
}
export function activeNav(page, route) {
  const key = route.key;
  return page === key || (page === "knowledge" && (key.startsWith("linux-") || key === "writeups" || key === "research-notes" || Boolean(route.entry))) || (page === "works" && ["project","publications","achievements","showcase"].includes(key));
}
