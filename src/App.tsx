// src/App.tsx
import { useCallback } from "react";
import "./App.css";

/**
 * CONFIG - replace values here if you want to change details in future
 */
const CONFIG = {
  fullName: "Harshit Chandegara",
  title: "Manager Proposal",
  organization: "Larsen & Toubro (Water & Effluent Treatment Business)",
  phone: "+966549638438",
  email: "harshit.chandegara@lntecc.com",
  linkedin: "https://www.linkedin.com/in/harshit-chandegara/",
  // whatsapp will be generated from phone (remove + and non-digits)
  addressLines: [
    "1st floor, Water & Effluent Treatment IC",
    "Building No: 6842",
    "Block 2413, Additional No: 3481",
    "Al Thumamah Road",
    "Al Sahafah Dist",
    "Riyadh 13315",
    "Kingdom of Saudi Arabia",
  ],
};

/**
 * PROFILE PLACEHOLDER (Professional silhouette). Replace this string
 * with your own data:image/...;base64,... string if you want to embed a photo.
 */
const profilePlaceholder = "/harshit.jpg";

/**
 * Helper to build vCard text (vCard 3.0)
 */
function buildVCard(cfg: typeof CONFIG) {
  const phone = cfg.phone;
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${cfg.fullName}`,
    cfg.organization ? `ORG:${cfg.organization}` : "",
    phone ? `TEL;TYPE=CELL:${phone}` : "",
    cfg.email ? `EMAIL;TYPE=INTERNET:${cfg.email}` : "",
    cfg.linkedin ? `URL:${cfg.linkedin}` : "",
    cfg.addressLines && cfg.addressLines.length
      ? `ADR;TYPE=WORK:;;${cfg.addressLines.join(", ")}`
      : "",
    "END:VCARD",
  ];
  return lines.filter(Boolean).join("\r\n");
}

export default function App() {
  const whatsappNumber = CONFIG.phone.replace(/\D/g, "");
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const telLink = `tel:${CONFIG.phone}`;
  const mailLink = `mailto:${CONFIG.email}`;

  // IMPORTANT: place your logo file at /public/logo.png in the repo
  // (See instructions below)
  const logoSrc = "/logo.png";

  // vCard open: create blob and navigate to it to let phone handle it
  const addToContacts = useCallback(() => {
    const vcardText = buildVCard(CONFIG);
    const blob = new Blob([vcardText], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    // On mobile, navigating to the blob URL will typically open the contact import workflow.
    // Use window.location.href so the browser navigates to the blob URL.
    window.location.href = url;

    // Optionally revoke after a short delay
    setTimeout(() => {
      try {
        URL.revokeObjectURL(url);
      } catch {}
    }, 2000);
  }, []);

  return (
    <div className="page">
      <div className="card">
        <img className="logo" src={logoSrc} alt="Larsen & Toubro logo" />

        <div className="profile-row">
          <div className="profile-photo-wrap">
            <img src={profilePlaceholder} alt="Profile" className="profile-photo" />
            {/* NOTE: removed Change button by request. To replace profile, edit profilePlaceholder constant in src/App.tsx */}
          </div>

          <div className="info">
            <h1 className="name">{CONFIG.fullName}</h1>
            <div className="title">{CONFIG.title}</div>
            <div className="org">{CONFIG.organization}</div>
            <div className="placeholder">Digital Business Card – Under Development</div>

            <div className="address">
              {CONFIG.addressLines.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="actions">
          <a className="action" href={telLink}>
            <svg viewBox="0 0 24 24" className="icon"><path d="M6.6 10.2c1.2 2.4 3 4.3 5.4 5.5l1.1-1.1c.2-.2.5-.3.8-.2 1 .3 2.1.5 3.2.5.4 0 .7.3.8.6l.9 2.7c.1.3 0 .7-.2.9l-1.9 1.9c-.3.3-.8.4-1.2.3C8.1 20.8 3.2 16 2 9.5c-.1-.5 0-1 .3-1.3L4.2 6.3c.3-.3.6-.3.9-.2l2.7.9c.3.1.6.4.6.8 0 1.1.2 2.2.5 3.2.1.3 0 .6-.2.8l-1.1 1.1z" fill="currentColor"/></svg>
            Call
          </a>

          <a className="action" href={whatsappLink} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" className="icon"><path d="M20.5 3.5C18 1 14.7 0 11.1.7 6.3 1.6 2.8 5.7 2.3 10.5c-.5 4.9 2.1 9.4 6.6 11.4l-1.6 4.6 4.8-1.6c1.8.5 3.6.2 5.2-.7 4.9-2.8 7-8.9 4.9-14C22 5.9 21.4 4.7 20.5 3.5zM12 19.2c-2.9 0-5.6-1.1-7.7-3.2-1.9-1.9-3-4.6-3-7.4C1.3 4.2 6 0.7 11.1 1.4c4 .6 7.4 3.9 8 7.9.8 5.4-3.1 10-7.1 10z" fill="currentColor"/></svg>
            WhatsApp
          </a>

          <a className="action" href={mailLink}>
            <svg viewBox="0 0 24 24" className="icon"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4l-8 5L4 8V6l8 5 8-5v2z" fill="currentColor"/></svg>
            Email
          </a>

          <a className="action" href={CONFIG.linkedin} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" className="icon"><path d="M4.98 3.5C4.98 5 3.9 6.1 2.4 6.1S-.2 5 .78 3.5C1.8 2 3.9 1 5.38 1s-.4 0-.4 2.5zM2 8h6v12H2zM10 8h5.5v1.6h.1c.8-1.4 2.7-2.9 5.4-2.9 5.8 0 6.9 3.8 6.9 8.8V20H22v-7.8c0-1.9-.03-4.3-2.6-4.3-2.6 0-3 2-3 4.1V20h-6V8z" fill="currentColor"/></svg>
            LinkedIn
          </a>

          {/* Add to contacts icon */}
          <button className="action" onClick={addToContacts} title="Add to phone contacts">
            <svg viewBox="0 0 24 24" className="icon"><path d="M12 3v9h4l-6 6-6-6h4V3z" fill="currentColor"/></svg>
            Add
          </button>
        </div>

  );
}
