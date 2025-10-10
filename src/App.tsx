// src/App.tsx
// No explicit `import React from 'react'` required if your project uses the new JSX transform.

import { useState } from "react";
import "./App.css";

/**
 * Helper: returns a data URL for a simple horizontal L&T-like SVG logo.
 * It's an inline SVG encoded at runtime to avoid huge base64 strings in the repo.
 * You can replace the returned data URL with a real Base64 PNG if you get one later.
 */
function getLtLogoDataUrl() {
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='600' height='140' viewBox='0 0 600 140'>
    <rect width='600' height='140' fill='white'/>
    <!-- circle mark -->
    <g transform="translate(20,10)">
      <circle cx='30' cy='30' r='30' fill='#0070C0' />
      <path d='M10 30 L30 10 L50 30 L30 50 Z' fill='white' transform="translate(0,0) scale(0.8) translate(5,5)"/>
    </g>
    <!-- text -->
    <g transform='translate(90,80)'>
      <text x='0' y='0' font-family='Arial, Helvetica, sans-serif' font-size='32' fill='#0070C0' font-weight='700'>
        LARSEN &amp; TOUBRO
      </text>
    </g>
  </svg>
  `.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/** vCard builder */
function buildVCard(data: {
  fullName: string;
  phone: string;
  email: string;
  linkedin?: string;
  organization?: string;
}) {
  // vCard 3.0 format (widely supported)
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${data.fullName}`,
    data.organization ? `ORG:${data.organization}` : "",
    data.phone ? `TEL;TYPE=CELL:${data.phone}` : "",
    data.email ? `EMAIL;TYPE=INTERNET:${data.email}` : "",
    data.linkedin ? `URL:${data.linkedin}` : "",
    "END:VCARD",
  ];
  return lines.filter(Boolean).join("\r\n");
}

export default function App() {
  // Your provided details
  const fullName = "Harshit Chandegara";
  const title = "Manager Proposal";
  const organization = "Larsen & Toubro (Water & Effluent Treatment Business)";
  const phone = "+966549638438";
  const email = "harshit.chandegara@lntecc.com";
  const linkedin = "https://www.linkedin.com/in/harshit-chandegara/";
  // WhatsApp quick link (wa.me requires number without + or spaces)
  const waNumber = phone.replace(/\D/g, ""); // +966549638438 -> 966549638438
  const whatsappLink = `https://wa.me/${waNumber}`;

  // Logo data URL and profile placeholder
  const defaultLogo = getLtLogoDataUrl();

  // Simple placeholder profile picture as inline SVG data URL
  const defaultProfile =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'>
         <rect width='100%' height='100%' fill='#f3f6fb'/>
         <circle cx='200' cy='140' r='80' fill='#e6eef9' stroke='#cfe7fb' stroke-width='4'/>
         <rect x='80' y='240' width='240' height='90' rx='10' fill='#e6eef9' stroke='#cfe7fb' stroke-width='4'/>
       </svg>`
    );

  const [logoUrl] = useState<string>(defaultLogo);
  const [profileUrl, setProfileUrl] = useState<string>(defaultProfile);

  // Handle profile image upload (client-side preview)
  function onProfileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfileUrl(reader.result as string);
    };
    reader.readAsDataURL(f);
  }

  // Download vCard
  function downloadVCard() {
    const vcard = buildVCard({
      fullName,
      phone,
      email,
      linkedin,
      organization,
    });
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fullName.replace(/\s+/g, "_")}.vcf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="page">
      <div className="card">
        <img className="logo" src={logoUrl} alt="Larsen & Toubro logo" />

        <div className="profile-row">
          <div className="profile-photo-wrap">
            <img src={profileUrl} alt="Profile" className="profile-photo" />
            <label className="upload-btn">
              Change
              <input
                type="file"
                accept="image/*"
                onChange={onProfileChange}
                title="Upload profile picture"
              />
            </label>
          </div>

          <div className="info">
            <h1 className="name">{fullName}</h1>
            <div className="title">{title}</div>
            <div className="org">{organization}</div>

            <div className="placeholder">Digital Business Card – Under Development</div>
          </div>
        </div>

        <div className="actions">
          <a className="action" href={`tel:${phone}`}>
            <svg viewBox="0 0 24 24" className="icon"><path d="M6.6 10.2c1.2 2.4 3 4.3 5.4 5.5l1.1-1.1c.2-.2.5-.3.8-.2 1 .3 2.1.5 3.2.5.4 0 .7.3.8.6l.9 2.7c.1.3 0 .7-.2.9l-1.9 1.9c-.3.3-.8.4-1.2.3C8.1 20.8 3.2 16 2 9.5c-.1-.5 0-1 .3-1.3L4.2 6.3c.3-.3.6-.3.9-.2l2.7.9c.3.1.6.4.6.8 0 1.1.2 2.2.5 3.2.1.3 0 .6-.2.8l-1.1 1.1z" fill="currentColor"/></svg>
            Call
          </a>

          <a className="action" href={whatsappLink} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" className="icon"><path d="M20.5 3.5C18 1 14.7 0 11.1.7 6.3 1.6 2.8 5.7 2.3 10.5c-.5 4.9 2.1 9.4 6.6 11.4l-1.6 4.6 4.8-1.6c1.8.5 3.6.2 5.2-.7 4.9-2.8 7-8.9 4.9-14C22 5.9 21.4 4.7 20.5 3.5zM12 19.2c-2.9 0-5.6-1.1-7.7-3.2-1.9-1.9-3-4.6-3-7.4C1.3 4.2 6 0.7 11.1 1.4c4 .6 7.4 3.9 8 7.9.8 5.4-3.1 10-7.1 10z" fill="currentColor"/></svg>
            WhatsApp
          </a>

          <a className="action" href={`mailto:${email}`}>
            <svg viewBox="0 0 24 24" className="icon"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4l-8 5L4 8V6l8 5 8-5v2z" fill="currentColor"/></svg>
            Email
          </a>

          <a className="action" href={linkedin} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" className="icon"><path d="M4.98 3.5C4.98 5 3.9 6.1 2.4 6.1S-.2 5 .78 3.5C1.8 2 3.9 1 5.38 1s-.4 0-.4 2.5zM2 8h6v12H2zM10 8h5.5v1.6h.1c.8-1.4 2.7-2.9 5.4-2.9 5.8 0 6.9 3.8 6.9 8.8V20H22v-7.8c0-1.9-.03-4.3-2.6-4.3-2.6 0-3 2-3 4.1V20h-6V8z" fill="currentColor"/></svg>
            LinkedIn
          </a>
        </div>

        <div className="bottom-row">
          <button className="save-btn" onClick={downloadVCard}>
            <svg viewBox="0 0 24 24" className="icon"><path d="M12 3v9h4l-6 6-6-6h4V3z" fill="currentColor"/></svg>
            Save Contact (.vcf)
          </button>

          <a className="visit-site" href="https://harshit-business-card.vercel.app" target="_blank" rel="noreferrer">
            Open Live Site
          </a>
        </div>
      </div>

      <footer className="note">
        Tip: To change profile picture, click <strong>Change</strong> and upload an image. To replace the logo, swap the `getLtLogoDataUrl()` result in <code>src/App.tsx</code>.
      </footer>
    </div>
  );
}
