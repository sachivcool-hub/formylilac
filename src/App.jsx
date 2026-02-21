import { useState, useEffect, useRef } from "react";

const EMOJIS = ["🩷", "💗", "💓", "💕", "💞", "🌸", "✨", "🌷", "💝", "🫶"];

function FloatingHeart({ left, dur, delay, size }) {
  const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  return (
    <div style={{
      position: "fixed", left, top: "110%", fontSize: size,
      animation: `floatUp ${dur} ${delay} infinite linear`,
      pointerEvents: "none", zIndex: 0,
      filter: "drop-shadow(0 0 8px #ff2d9988)"
    }}>{emoji}</div>
  );
}

function LoveCounter() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const t = Date.now();
    const iv = setInterval(() => setS(Math.floor((Date.now() - t) / 1000)), 1000);
    return () => clearInterval(iv);
  }, []);
  const units = [["days", Math.floor(s/86400)], ["hrs", Math.floor((s%86400)/3600)], ["mins", Math.floor((s%3600)/60)], ["secs", s%60]];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.6rem" }}>
      {units.map(([l, v]) => (
        <div key={l} style={{
          background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)",
          borderRadius: 16, padding: "0.8rem 0.2rem", textAlign: "center",
          border: "1px solid rgba(255,100,180,0.3)",
          boxShadow: "0 0 20px rgba(255,45,153,0.2)"
        }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.7rem", fontWeight: 700, color: "#ff9ee0", lineHeight: 1, textShadow: "0 0 10px #ff2d99" }}>{String(v).padStart(2,"0")}</div>
          <div style={{ fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#ffb3d9", marginTop: 3 }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

function ReasonCard({ emoji, text, i }) {
  const [vis, setVis] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)",
      borderRadius: 20, padding: "1rem",
      border: "1px solid rgba(255,100,180,0.25)",
      boxShadow: "0 4px 24px rgba(255,45,153,0.15)",
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.5s ${i*0.08}s ease, transform 0.5s ${i*0.08}s ease`
    }}>
      <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>{emoji}</div>
      <p style={{ fontSize: "0.85rem", color: "#ffe0f0", lineHeight: 1.5 }}>{text}</p>
    </div>
  );
}

function HeartPicker() {
  const [filled, setFilled] = useState({});
  const items = ["your smile","your art","your edits","your silliness","your messages","your hugs","your voice","your love","your care","your heart","you being you","everything 🩷"];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
      {items.map((item, i) => (
        <button key={i} onClick={() => setFilled(p => ({ ...p, [i]: !p[i] }))} style={{
          display: "flex", alignItems: "center", gap: "0.3rem",
          background: filled[i] ? "linear-gradient(135deg, #ff2d99, #ff85cb)" : "rgba(255,255,255,0.08)",
          border: `1.5px solid ${filled[i] ? "#ff2d99" : "rgba(255,100,180,0.3)"}`,
          borderRadius: 100, padding: "0.45rem 0.9rem",
          fontSize: "0.82rem", color: filled[i] ? "white" : "#ffb3d9",
          cursor: "pointer", fontFamily: "'Lato', sans-serif",
          boxShadow: filled[i] ? "0 0 16px #ff2d9966" : "none",
          transform: filled[i] ? "scale(1.05)" : "scale(1)",
          transition: "all 0.2s", backdropFilter: "blur(8px)"
        }}>
          <span>{filled[i] ? "🩷" : "🤍"}</span>{item}
        </button>
      ))}
    </div>
  );
}

function SecretMsg() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={() => setOpen(!open)} style={{
        background: "linear-gradient(135deg, #ff2d99, #c2006e)",
        color: "white", border: "none", borderRadius: 100,
        padding: "0.9rem 2rem", fontSize: "1rem", cursor: "pointer",
        fontFamily: "'Lato', sans-serif",
        boxShadow: "0 0 30px #ff2d9966, 0 8px 24px rgba(255,45,153,0.4)",
        transition: "transform 0.15s", letterSpacing: "0.02em"
      }}>
        {open ? "close 🌸" : "tap for something special 🩷"}
      </button>
      {open && (
        <div style={{
          background: "rgba(255,255,255,0.07)", backdropFilter: "blur(16px)",
          borderRadius: 24, padding: "1.5rem", marginTop: "1.2rem",
          border: "1px solid rgba(255,100,180,0.3)",
          boxShadow: "0 0 40px rgba(255,45,153,0.2)",
          animation: "fadeIn 0.4s ease"
        }}>
          <p style={{ fontSize: "0.95rem", color: "#ffe0f0", lineHeight: 1.85, fontStyle: "italic", textAlign: "left" }}>
            baby i want u to know that u mean everything to me and that u are very very important to me. u bring me so much happiness and joy. you make me feel so loved and cared for and i can't thank u enough for that. thank u for being my best friend and girlfriend all at the same time. thank u for putting up with me on my bad days and the days that i'm just really annoying. thank you for actually taking the time to know the real me. thank u for making me feel so loved and cared for. i've never felt this level of careness and love from someone before and i'm happy it was u that's making me experience it. i would do anything to keep u healthy and alive. i'd give my life just so u could live yours. i hope our relationship continues to grow and last forever 🙂 i love you so much my girl !!! i wouldn't be who i am today without u and i probably wouldn't even be here if it wasn't for you 🙂 please never leave me because then i wouldn't have anyone to give my love and affection and careness too. you show me so much apperciation from your edits to art to your messages and youre just so silly i love you 🩷
          </p>
        </div>
      )}
    </div>
  );
}

function SongCard({ title, artist, emoji, delay }) {
  const [vis, setVis] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)",
      borderRadius: 20, padding: "1rem 1.2rem",
      border: "1px solid rgba(255,100,180,0.2)",
      display: "flex", alignItems: "center", gap: "0.8rem",
      opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(-20px)",
      transition: `opacity 0.5s ${delay}s ease, transform 0.5s ${delay}s ease`,
      boxShadow: "0 4px 20px rgba(255,45,153,0.1)"
    }}>
      <span style={{ fontSize: "1.8rem" }}>{emoji}</span>
      <div>
        <div style={{ color: "#ff9ee0", fontWeight: 600, fontSize: "0.9rem", textShadow: "0 0 8px #ff2d9944" }}>{title}</div>
        <div style={{ color: "#ffb3d9", fontSize: "0.75rem", marginTop: "0.1rem" }}>{artist}</div>
      </div>
      <span style={{ marginLeft: "auto", fontSize: "1.2rem", animation: "pulse 2s infinite" }}>🎵</span>
    </div>
  );
}

function PrettyCard({ emoji, text, delay }) {
  const [vis, setVis] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)",
      borderRadius: 20, padding: "1.1rem",
      border: "1px solid rgba(255,100,180,0.25)",
      opacity: vis ? 1 : 0, transform: vis ? "scale(1)" : "scale(0.9)",
      transition: `opacity 0.5s ${delay}s ease, transform 0.5s ${delay}s ease`,
      textAlign: "center"
    }}>
      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{emoji}</div>
      <p style={{ fontSize: "0.85rem", color: "#ffe0f0", lineHeight: 1.5 }}>{text}</p>
    </div>
  );
}

const GlowDivider = () => (
  <div style={{ textAlign: "center", padding: "1rem", position: "relative", zIndex: 1 }}>
    <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #ff2d99, transparent)", marginBottom: "0.6rem", opacity: 0.4 }} />
    <span style={{ color: "#ff85cb", letterSpacing: "0.3em", fontSize: "1rem", textShadow: "0 0 10px #ff2d99" }}>🌸 · 🩷 · 🌸</span>
    <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #ff2d99, transparent)", marginTop: "0.6rem", opacity: 0.4 }} />
  </div>
);

export default function App() {
  const floaters = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${(i / 16) * 100 + Math.random() * 4}%`,
    dur: `${7 + Math.random() * 7}s`,
    delay: `${Math.random() * 12}s`,
    size: `${1 + Math.random() * 1.2}rem`,
  }));

  const reasons = [
    { emoji: "🎨", text: "your art literally makes my heart skip" },
    { emoji: "✂️", text: "those edits you make?? insane talent honestly" },
    { emoji: "🫂", text: "you hold me even on my worst days" },
    { emoji: "💬", text: "your messages are the highlight of my day" },
    { emoji: "😂", text: "you're so silly and i love every second of it" },
    { emoji: "🌟", text: "you helped me become who i am today" },
    { emoji: "🫶", text: "you took the time to know the real me" },
    { emoji: "🌷", text: "you make me feel cared for like never before" },
  ];

  const songs = [
    { emoji: "🎧", title: "add her fav song here", artist: "artist name 🩷", delay: 0 },
    { emoji: "🎶", title: "another fav", artist: "artist name", delay: 0.1 },
    { emoji: "🎵", title: "our song", artist: "the one that hits different", delay: 0.2 },
    { emoji: "💿", title: "late night vibes", artist: "for when we talk all night", delay: 0.3 },
  ];

  const prettyThings = [
    { emoji: "🌷", text: "the way your eyes light when youre GIGGLINGG", delay: 0 },
    { emoji: "✨", text: "how pretty you look in literally everything, it's not fair", delay: 0.1 },
    { emoji: "🌸", text: "your laugh UGHH it makes everything instantly better", delay: 0.2 },
    { emoji: "💫", text: "the way you match my energy perfectly every single time", delay: 0.3 },
    { emoji: "🩷", text: "how you're equally silly and sweet and it's the most perfect combination", delay: 0.4 },
    { emoji: "🦋", text: "literally just you existing is the prettiest thing i've ever seen", delay: 0.5 },
  ];

  return (
    <div style={{ background: "#1a0020", minHeight: "100vh", overflowX: "hidden", fontFamily: "'Lato', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400&display=swap');
        body { background: #1a0020; margin: 0; }
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          8% { opacity: 1; } 92% { opacity: 0.9; }
          100% { transform: translateY(-115vh) rotate(360deg); opacity: 0; }
        }
        @keyframes heartbeat {
          0%,100% { transform: scale(1); }
          14% { transform: scale(1.18); }
          28% { transform: scale(1); }
          42% { transform: scale(1.12); }
          56% { transform: scale(1); }
        }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        @keyframes shimmer {
          0%,100% { color: #ff85cb; text-shadow: 0 0 8px #ff2d99; }
          50% { color: #ffb3d9; text-shadow: 0 0 20px #ff2d99, 0 0 40px #ff2d9966; }
        }
        @keyframes glow {
          0%,100% { box-shadow: 0 0 20px #ff2d9944, 0 0 40px #ff2d9922; }
          50% { box-shadow: 0 0 40px #ff2d9988, 0 0 80px #ff2d9944; }
        }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #ff2d99; border-radius: 4px; }
      `}</style>

      {/* BG MESH */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 20% 20%, #5c003e 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, #3d0030 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, #2a0025 0%, transparent 70%), #1a0020"
      }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 70% 20%, rgba(255,45,153,0.15) 0%, transparent 40%), radial-gradient(ellipse at 20% 70%, rgba(194,0,110,0.12) 0%, transparent 40%)"
      }} />

      {floaters.map(f => <FloatingHeart key={f.id} {...f} />)}

      {/* HERO */}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "3rem 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#ff9ee0", background: "rgba(255,45,153,0.15)", borderRadius: 100, padding: "0.3rem 1rem", marginBottom: "1.5rem", border: "1px solid rgba(255,45,153,0.4)", animation: "fadeDown 1s ease both", boxShadow: "0 0 16px rgba(255,45,153,0.2)" }}>made with all my love 🩷</div>
        <span style={{ fontSize: "5rem", lineHeight: 1, display: "block", marginBottom: "1rem", animation: "heartbeat 1.5s infinite ease-in-out, fadeDown 1s 0.2s ease both", filter: "drop-shadow(0 0 20px #ff2d99) drop-shadow(0 0 40px #ff2d9966)" }}>🩷</span>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3.5rem, 18vw, 6rem)", fontWeight: 700, color: "#ff9ee0", lineHeight: 1.05, textShadow: "0 0 30px #ff2d99, 0 0 60px #ff2d9944", animation: "fadeDown 1s 0.3s ease both", marginBottom: "0.4rem" }}>Lilac</h1>
        <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.1rem", color: "#ffb3d9", animation: "fadeDown 1s 0.5s ease both", marginBottom: "1.5rem", textShadow: "0 0 10px #ff2d9944" }}>my girl, my best friend, my everything</p>
        <p style={{ fontSize: "1rem", animation: "shimmer 2s infinite, fadeDown 1s 0.7s ease both", letterSpacing: "0.05em" }}>this one's for you ✨</p>
      </div>

      {/* COUNTER */}
      <div style={{ padding: "0 1rem 1rem", maxWidth: 480, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ background: "rgba(255,45,153,0.1)", backdropFilter: "blur(16px)", borderRadius: 24, padding: "1.8rem 1.2rem", textAlign: "center", border: "1px solid rgba(255,45,153,0.3)", animation: "glow 3s infinite" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#ff9ee0", fontSize: "1rem", marginBottom: "1.2rem", textShadow: "0 0 10px #ff2d9966" }}>time since you opened this 🩷</p>
          <LoveCounter />
        </div>
      </div>

      <GlowDivider />

      {/* WHY I LOVE YOU */}
      <div style={{ padding: "0.5rem 1.2rem 0.5rem", maxWidth: 480, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.8rem", color: "#ff9ee0", textShadow: "0 0 16px #ff2d9966" }}>why i love you</h2>
          <p style={{ color: "#ffb3d9", fontSize: "0.85rem", marginTop: "0.3rem" }}>just a few — there are way too many</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
          {reasons.map((r, i) => <ReasonCard key={i} {...r} i={i} />)}
        </div>
      </div>

      <GlowDivider />

      {/* HOW PRETTY */}
      <div style={{ padding: "0.5rem 1.2rem 0.5rem", maxWidth: 480, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.8rem", color: "#ff9ee0", textShadow: "0 0 16px #ff2d9966" }}>you're so pretty</h2>
          <p style={{ color: "#ffb3d9", fontSize: "0.85rem", marginTop: "0.3rem" }}>i have to remind you every day</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
          {prettyThings.map((p, i) => <PrettyCard key={i} {...p} />)}
        </div>
      </div>

      <GlowDivider />

      {/* MUSIC */}
      <div style={{ padding: "0.5rem 1.2rem 0.5rem", maxWidth: 480, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.8rem", color: "#ff9ee0", textShadow: "0 0 16px #ff2d9966" }}>our playlist 🎵</h2>
          <p style={{ color: "#ffb3d9", fontSize: "0.85rem", marginTop: "0.3rem" }}>songs that remind me of you</p>
        </div>
        <iframe
          style={{ borderRadius: 12 }}
          src="https://open.spotify.com/embed/playlist/3QJJ8Djqf6zMvVNOHrw2G6?utm_source=generator"
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>

      <GlowDivider />

      {/* HEART PICKER */}
      <div style={{ padding: "0.5rem 1.2rem 1rem", maxWidth: 480, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "1.2rem" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.8rem", color: "#ff9ee0", textShadow: "0 0 16px #ff2d9966" }}>tap what you love</h2>
          <p style={{ color: "#ffb3d9", fontSize: "0.85rem", marginTop: "0.3rem" }}>fill them all 🩷</p>
        </div>
        <HeartPicker />
      </div>

      <GlowDivider />

      {/* SECRET MESSAGE */}
      <div style={{ padding: "0.5rem 1.2rem 1rem", maxWidth: 480, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "1.2rem" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.8rem", color: "#ff9ee0", textShadow: "0 0 16px #ff2d9966" }}>from my heart</h2>
          <p style={{ color: "#ffb3d9", fontSize: "0.85rem", marginTop: "0.3rem" }}>something i really need you to know</p>
        </div>
        <SecretMsg />
      </div>

      {/* CLOSING */}
      <div style={{ textAlign: "center", padding: "3rem 1.5rem 5rem", position: "relative", zIndex: 1 }}>
        <span style={{ fontSize: "4rem", animation: "heartbeat 1.5s infinite", display: "block", marginBottom: "0.5rem", filter: "drop-shadow(0 0 16px #ff2d99)" }}>🫶</span>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#ff9ee0", marginBottom: "0.4rem", textShadow: "0 0 20px #ff2d9966" }}>i love you, Lilac</h2>
        <p style={{ color: "#ffb3d9", fontSize: "0.9rem" }}>forever and always, no matter what 🌷</p>
      </div>
    </div>
  );
}
