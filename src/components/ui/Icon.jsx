import React from "react";

const icons = {
  home: <><path d="M3 10.8 12 3l9 7.8"/><path d="M5.5 9.5V21h13V9.5"/><path d="M9.5 21v-6h5v6"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/><path d="M10 12v2h4v-2"/></>,
  trophy: <><path d="M8 4h8v4a4 4 0 0 1-8 0V4Z"/><path d="M8 6H4v1a4 4 0 0 0 4 4"/><path d="M16 6h4v1a4 4 0 0 1-4 4"/><path d="M12 12v5"/><path d="M8 21h8"/><path d="M9 17h6"/></>,
  notes: <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v4"/><path d="M15 3v4"/><path d="M8 11h8"/><path d="M8 15h8"/></>,
  blocks: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
  shield: <><path d="M12 3 4.5 6v5.5c0 4.7 3.2 7.8 7.5 9.5 4.3-1.7 7.5-4.8 7.5-9.5V6L12 3Z"/><path d="m9 12 2 2 4-4"/></>,
  cpu: <><rect x="7" y="7" width="10" height="10" rx="2"/><rect x="10" y="10" width="4" height="4" rx=".5"/><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4"/></>,
  code: <><path d="m8 9-4 3 4 3"/><path d="m16 9 4 3-4 3"/><path d="m14 5-4 14"/></>,
  book: <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5Z"/><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z"/></>,
  python: <><path d="M8 4.5c0-1.4 1.2-2.5 2.6-2.5h2.8C15 2 16 3 16 4.5V8H9.5A3.5 3.5 0 0 0 6 11.5V14H4.5A2.5 2.5 0 0 1 2 11.5V8A3.5 3.5 0 0 1 5.5 4.5H8Z"/><circle cx="11" cy="4.5" r=".8" fill="currentColor" stroke="none"/><path d="M16 19.5c0 1.4-1.2 2.5-2.6 2.5h-2.8C9 22 8 21 8 19.5V16h6.5a3.5 3.5 0 0 0 3.5-3.5V10h1.5a2.5 2.5 0 0 1 2.5 2.5V16a3.5 3.5 0 0 1-3.5 3.5H16Z"/><circle cx="13" cy="19.5" r=".8" fill="currentColor" stroke="none"/></>,
  javascript: <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 8v7c0 1.5-.8 2-2 2"/><path d="M17 9.5c-.7-1-3-1.1-3 1 0 2 4 1 4 4 0 2.8-3.5 3-5 1.2"/></>,
  terminal: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3"/><path d="M13 15h4"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18"/><path d="M12 3a15 15 0 0 0 0 18"/></>,
  git: <><circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><circle cx="6" cy="18" r="2"/><path d="M6 8v8"/><path d="M8 6h4a6 6 0 0 1 6 6v4"/></>,
  atom: <><circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none"/><ellipse cx="12" cy="12" rx="9" ry="3.7"/><ellipse cx="12" cy="12" rx="9" ry="3.7" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.7" transform="rotate(120 12 12)"/></>,
  workflow: <><rect x="3" y="4" width="6" height="5" rx="1"/><rect x="15" y="15" width="6" height="5" rx="1"/><path d="M9 6.5h3a4 4 0 0 1 4 4V15"/><path d="m13.5 12.5 2.5 2.5 2.5-2.5"/></>,
  network: <><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v4"/><path d="M5 17v-2h14v2"/><path d="M12 11v4"/></>,
  flag: <><path d="M5 21V4"/><path d="M5 5h10l-1.5 3L15 11H5"/></>,
  bot: <><rect x="5" y="7" width="14" height="11" rx="3"/><path d="M12 3v4"/><circle cx="9" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1" fill="currentColor" stroke="none"/><path d="M9 15h6"/><path d="M3 10v5M21 10v5"/></>,
  github: <><path d="M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.6 4.9.4.3.7.9.7 1.7v2.6c0 .3.2.6.7.5A9.2 9.2 0 0 0 12 2.8Z"/></>,
  arrow: <><path d="M5 19 19 5"/><path d="M10 5h9v9"/></>,
  sparkles: <><path d="m12 3 1.2 3.3L16.5 7.5l-3.3 1.2L12 12l-1.2-3.3-3.3-1.2 3.3-1.2L12 3Z"/><path d="m18 13 .8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8L18 13Z"/><path d="m6 14 .7 1.8 1.8.7-1.8.7L6 19l-.7-1.8-1.8-.7 1.8-.7L6 14Z"/></>,
  waves: <><path d="M3 8c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M3 13c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M3 18c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/></>,
};

export default function Icon({ name, size = 18, strokeWidth = 1.8, className = "", title }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {icons[name] || icons.code}
    </svg>
  );
}
