import { useState, useEffect, useRef } from "react";

const EMOJIS = ["🩷", "💗", "💓", "💕", "💞", "🌸", "✨", "🌷", "💝", "🫶"];

function FloatingHeart({ left, dur, delay, size }) {
  const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  return (
    <div style={{
      position: "fixed", left, top: "110%", fontSize: size,
      animation: `floatUp ${dur} ${delay} infinite linear`,
      pointerEvents: "none", zIndex: 0,
      filter: "drop-shadow(0 0 6px #ffb3cc88)"
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
        <div key={l} style={{ background: "white", borderRadius: 16, padding: "0.8rem 0.2rem", textAlign: "center", boxShadow: "0 4px 16px #ffb3cc44" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.7rem", fontWeight: 700, color: "#c93060", lineHeight: 1 }}>{String(v).padStart(2,"0")}</div>
          <div style={{ fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#a0527a", marginTop: 3 }}>{l}</div>
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
      background: "white", borderRadius: 20, padding: "1rem",
      boxShadow: "0 4px 20px #ffb3cc33", border: "1px solid #ffd6e7",
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.5s ${i*0.08}s ease, transform 0.5s ${i*0.08}s ease`
    }}>
      <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>{emoji}</div>
      <p style={{ fontSize: "0.85rem", color: "#5a1a35", lineHeight: 1.5 }}>{text}</p>
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
          background: filled[i] ? "linear-gradient(135deg, #ffb3cc, #ff85aa)" : "white",
          border: `2px solid ${filled[i] ? "#ff85aa" : "#ffd6e7"}`,
          borderRadius: 100, padding: "0.45rem 0.9rem",
          fontSize: "0.82rem", color: filled[i] ? "#c93060" : "#5a1a35",
          cursor: "pointer", fontFamily: "'Lato', sans-serif",
          boxShadow: filled[i] ? "0 4px 12px #ffb3cc88" : "none",
          transform: filled[i] ? "scale(1.05)" : "scale(1)",
          transition: "all 0.2s"
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
        background: "linear-gradient(135deg, #ff85aa, #e8527e)",
        color: "white", border: "none", borderRadius: 100,
        padding: "0.9rem 2rem", fontSize: "1rem", cursor: "pointer",
        fontFamily: "'Lato', sans-serif", boxShadow: "0 8px 24px #ff85aa88",
        transition: "transform 0.15s", letterSpacing: "0.02em"
      }}>
        {open ? "close 🌸" : "tap for something special 🩷"}
      </button>
      {open && (
        <div style={{
          background: "white", borderRadius: 24, padding: "1.5rem",
          marginTop: "1.2rem", border: "2px solid #ffd6e7",
          boxShadow: "0 8px 32px #ffb3cc44",
          animation: "fadeIn 0.4s ease"
        }}>
          <p style={{ fontSize: "0.95rem", color: "#5a1a35", lineHeight: 1.85, fontStyle: "italic", textAlign: "left" }}>
            baby i want u to know that u mean everything to me and that u are very very important to me. u bring me so much happiness and joy. you make me feel so loved and cared for and i can't thank u enough for that. thank u for being my best friend and girlfriend all at the same time. thank u for putting up with me on my bad days and the days that i'm just not there because of school or work and i know im not on a lot but youve been so patient. thank you for actually taking the time to know the real me. thank u for making me feel so loved and cared for. i've never felt this level of careness and love from someone before and i'm happy it was u that's making me experience it. i would do anything to keep u healthy and alive. i'd give my life just so u could live yours. i hope our relationship continues to grow and last forever 🙂 i love you so much my girl !!! i wouldn't be who i am today without u and i probably wouldn't even be here if it wasn't for you 🙂 please never leave me because then i wouldn't have anyone to give my love and affection and careness too. you show me so much apperciation from your edits to art to your messages and youre just so silly i love you 🩷
          </p>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const floaters = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${(i / 16) * 100 + Math.random() * 6}%`,
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

  return (
    <div style={{ background: "#fff0f5", minHeight: "100vh", overflowX: "hidden", fontFamily: "'Lato', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400&display=swap');
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 0.9; }
          100% { transform: translateY(-115vh) rotate(360deg); opacity: 0; }
        }
        @keyframes heartbeat {
          0%,100% { transform: scale(1); }
          14% { transform: scale(1.18); }
          28% { transform: scale(1); }
          42% { transform: scale(1.12); }
          56% { transform: scale(1); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%,100% { color: #e8527e; }
          50% { color: #c93060; text-shadow: 0 0 10px #ff85aa; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #ffb3cc; border-radius: 4px; }
      `}</style>

      {floaters.map(f => <FloatingHeart key={f.id} {...f} />)}

      {/* HERO */}
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "3rem 1.5rem", position: "relative", zIndex: 1,
        background: "radial-gradient(ellipse at 60% 30%, #ffc8dd66 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, #ffb3cc44 0%, transparent 50%)"
      }}>
        <div style={{
          fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase",
          color: "#e8527e", background: "#ffd6e7", borderRadius: 100,
          padding: "0.3rem 1rem", marginBottom: "1.5rem",
          border: "1px solid #ffb3cc", animation: "fadeDown 1s ease both"
        }}>made with all my love 🩷</div>

        <span style={{
          fontSize: "5rem", lineHeight: 1, display: "block", marginBottom: "1rem",
          animation: "heartbeat 1.5s infinite ease-in-out, fadeDown 1s 0.2s ease both",
          filter: "drop-shadow(0 0 20px #ff85aaaa)"
        }}>🩷</span>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(3.5rem, 18vw, 6rem)",
          fontWeight: 700, color: "#c93060", lineHeight: 1.05,
          textShadow: "0 4px 24px #ff85aa66",
          animation: "fadeDown 1s 0.3s ease both",
          marginBottom: "0.4rem"
        }}>Lilac</h1>

        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic", fontSize: "1.1rem",
          color: "#a0527a", animation: "fadeDown 1s 0.5s ease both",
          marginBottom: "1.5rem"
        }}>my girl, my best friend, my everything</p>

        <p style={{
          fontSize: "1rem", color: "#e8527e",
          animation: "shimmer 2s infinite, fadeDown 1s 0.7s ease both",
          letterSpacing: "0.05em"
        }}>this one's for you ✨</p>
      </div>

      {/* COUNTER */}
      <div style={{ padding: "0 1rem 1rem", maxWidth: 480, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{
          background: "linear-gradient(135deg, #ffd6e7, #ffb3cc)",
          borderRadius: 24, padding: "1.8rem 1.2rem", textAlign: "center",
          boxShadow: "0 8px 32px #ffb3cc55", border: "1px solid #ffb3cc"
        }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#c93060", fontSize: "1rem", marginBottom: "1.2rem" }}>
            time since you opened this 🩷
          </p>
          <LoveCounter />
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ textAlign: "center", color: "#ffb3cc", letterSpacing: "0.3em", padding: "0.5rem", zIndex: 1, position: "relative" }}>🌸 · 🌷 · 🌸</div>

      {/* REASONS */}
      <div style={{ padding: "1rem 1.2rem 0.5rem", maxWidth: 480, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.8rem", color: "#c93060" }}>why i love you</h2>
          <p style={{ color: "#a0527a", fontSize: "0.85rem", marginTop: "0.3rem" }}>just a few — there are way too many</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
          {reasons.map((r, i) => <ReasonCard key={i} {...r} i={i} />)}
        </div>
      </div>

      <div style={{ textAlign: "center", color: "#ffb3cc", letterSpacing: "0.3em", padding: "1.2rem", zIndex: 1, position: "relative" }}>💕 · 💗 · 💕</div>

      {/* HEART PICKER */}
      <div style={{ padding: "0 1.2rem 1rem", maxWidth: 480, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "1.2rem" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.8rem", color: "#c93060" }}>tap what you love</h2>
          <p style={{ color: "#a0527a", fontSize: "0.85rem", marginTop: "0.3rem" }}>fill them all 🩷</p>
        </div>
        <HeartPicker />
      </div>

      <div style={{ textAlign: "center", color: "#ffb3cc", letterSpacing: "0.3em", padding: "1.2rem", zIndex: 1, position: "relative" }}>🌸 · ✨ · 🌸</div>

      {/* SECRET MESSAGE */}
      <div style={{ padding: "0 1.2rem 1rem", maxWidth: 480, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "1.2rem" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.8rem", color: "#c93060" }}>from my heart</h2>
          <p style={{ color: "#a0527a", fontSize: "0.85rem", marginTop: "0.3rem" }}>something i really need you to know</p>
        </div>
        <SecretMsg />
      </div>

      {/* CLOSING */}
      <div style={{
        textAlign: "center", padding: "3rem 1.5rem 5rem",
        background: "radial-gradient(ellipse at center, #ffc8dd44 0%, transparent 70%)",
        position: "relative", zIndex: 1
      }}>
        <span style={{ fontSize: "4rem", animation: "heartbeat 1.5s infinite", display: "block", marginBottom: "0.5rem" }}>🫶</span>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#c93060", marginBottom: "0.4rem" }}>i love you, Lilac</h2>
        <p style={{ color: "#a0527a", fontSize: "0.9rem" }}>forever and always, no matter what 🌷</p>
      </div>
    </div>
  );
}
