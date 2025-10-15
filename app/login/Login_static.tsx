import React, { useEffect, useState } from "react";

const vwPx = (w: number, vw: number) => (w * vw) / 100;
const clampPx = (min: number, pref: number, max: number) =>
  Math.max(min, Math.min(max, pref));

const Login: React.FC = () => {
  // --- Responsive flags (SSR-safe) ---
  const [w, setW] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );

  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const is1200 = w <= 1200;
  const is992 = w <= 992;
  const is768 = w <= 768;
  const is480 = w <= 480;

  // --- Font sizes using proper vw math (min, preferred via vw, max) ---
  const fsH2 = clampPx(18, vwPx(w, 2.8), 28);
  const fsH1 = clampPx(24, vwPx(w, 3), 36);
  const fsComingTitle = clampPx(26, vwPx(w, 6), 40);
  const fsComingSub = clampPx(14, vwPx(w, 2.8), 18);

  // --- Tokens ---
  const TEXT = "#0b1220";
  const WHITE = "#ffffff";
  const GLASS_BG = "rgba(255,255,255,0.52)";
  const GLASS_BORDER = "rgba(255,255,255,0.25)";
  const SHADOW = "0 10px 30px rgba(0,0,0,0.25)";

  // --- Styles ---
  const bodyStyle: React.CSSProperties = {
    margin: 0,
    minHeight: "100vh",
    color: TEXT,
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Helvetica Neue",Arial,sans-serif',
    backgroundImage: 'url("/assets/imgs/bg_login.png")',
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
  };

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    background: "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.35))",
    opacity: is992 ? 1 : 0,
    transition: "opacity .2s ease",
  };

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    alignItems: is768 ? "flex-start" : "center",
    justifyContent: is768 ? "flex-start" : "space-between",
    gap: is992 ? 20 : 24,
    padding: is480 ? 14 : is768 ? "18px 16px 28px" : is992 ? 20 : 24,
    flexDirection: is768 ? "column" : "row",
  };

  const colBase: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    flex: "1 1 480px",
    width: is768 ? "100%" : undefined,
  };

  const colLeft: React.CSSProperties = {
    ...colBase,
    order: is768 ? 1 : 0,
    padding: is768 ? "8px 0 0" : `15px 15px 15px ${is992 ? 24 : 60}px`,
  };

  const colRight: React.CSSProperties = {
    ...colBase,
    order: is768 ? 2 : 0,
    flex: "1 1 480px",
    maxWidth: is768 ? "none" : 680,
    width: is768 ? "100%" : is1200 ? "48%" : "38%",
    margin: is768 ? 0 : is1200 ? 24 : 40,
    padding: 0,
  };

  const brandBlock: React.CSSProperties = {
    padding: is768 ? 10 : 20,
  };

  const heroBlock: React.CSSProperties = {
    padding: is768 ? "6px 10px 0" : 20,
  };

  const brandImgStyle: React.CSSProperties = {
    maxWidth: is480 ? "72%" : "100%",
    height: "auto",
    display: "block",
    margin: is480 ? "0 auto" : undefined,
  };

  const heroImgStyle: React.CSSProperties = {
    maxWidth: is480 ? "88%" : "100%",
    height: "auto",
    display: "block",
    margin: is480 ? "0 auto" : undefined,
  };

  const headline: React.CSSProperties = {
    padding: is768 ? "8px 12px 0" : "20px",
    textAlign: "center",
    color: WHITE,
    textShadow: "0 2px 10px rgba(0,0,0,0.35)",
  };

  const headlineH2: React.CSSProperties = {
    margin: 0,
    marginBottom: 6,
    fontWeight: 800,
    fontSize: fsH2,
    lineHeight: is480 ? 1.15 : 1.2,
  };

  const glass: React.CSSProperties = {
    width: "100%",
    maxWidth: is768 ? undefined : 760,
    padding: is480 ? "24px 14px" : is768 ? "28px 18px" : is992 ? "42px 24px" : "60px 32px",
    borderRadius: is768 ? 16 : 18,
    background: GLASS_BG,
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: `1px solid ${GLASS_BORDER}`,
    boxShadow: `${SHADOW}, inset 0 1px 0 rgba(255,255,255,0.2)`,
    textAlign: "center",
  };

  const glassH1: React.CSSProperties = {
    margin: "8px 0 20px",
    fontWeight: 800,
    letterSpacing: 0.3,
    color: WHITE,
    textShadow: "0 2px 12px rgba(0,0,0,0.35)",
    fontSize: fsH1,
  };

  const comingWrap: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: is768 ? 140 : 180,
  };

  const comingTitle: React.CSSProperties = {
    margin: 0,
    fontWeight: 800,
    letterSpacing: is480 ? 1.2 : 2,
    textShadow: "0 3px 10px rgba(0,0,0,0.4)",
    color: "#fff",
    fontSize: fsComingTitle,
  };

  const comingSub: React.CSSProperties = {
    margin: "12px 0 0",
    color: "#ffffffcc",
    letterSpacing: 1,
    fontSize: fsComingSub,
  };

  return (
    <div style={bodyStyle}>
      {/* Overlay (on tablet & below) */}
      <div aria-hidden="true" style={overlayStyle} />

      <div style={pageStyle}>
        {/* Left Column */}
        <div style={colLeft}>
          <div style={brandBlock}>
            <img src="/assets/imgs/logo_login.png" alt="Brand Logo" width={594} style={brandImgStyle} />
          </div>

          <div style={heroBlock}>
            <img src="/assets/imgs/login_bg.png" alt="Travel Illustration" width={694} style={heroImgStyle} />
          </div>

          <div style={headline}>
            <h2 style={headlineH2}>Login &amp; Let Your</h2>
            <h2 style={{ ...headlineH2, marginTop: 0 }}>Dreams Take Your Flight</h2>
          </div>
        </div>

        {/* Right Column */}
        <div style={colRight}>
          <div role="region" aria-label="Coming Soon" style={glass}>
            <h1 style={glassH1}>Welcome</h1>

            <div style={comingWrap}>
              <h2 style={comingTitle}>COMING SOON</h2>
              <p style={comingSub}>Our website is getting ready for takeoff 🚀</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
