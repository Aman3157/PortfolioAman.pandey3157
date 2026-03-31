import { useState, useEffect, useRef, useCallback } from "react";

const FILTERS = [
  { name: "None",      css: "" },
  { name: "Clarendon", css: "contrast(1.2) saturate(1.35)" },
  { name: "Gingham",   css: "brightness(1.05) hue-rotate(-10deg)" },
  { name: "Moon",      css: "grayscale(1) contrast(1.1) brightness(1.1)" },
  { name: "Lark",      css: "contrast(0.9) brightness(1.1) saturate(1.4)" },
  { name: "Reyes",     css: "sepia(0.22) brightness(1.1) contrast(0.85) saturate(0.75)" },
  { name: "Juno",      css: "saturate(1.4) contrast(1.15)" },
  { name: "Slumber",   css: "saturate(0.66) brightness(1.05) sepia(0.08)" },
  { name: "Crema",     css: "contrast(0.9) saturate(0.9) brightness(1.08) sepia(0.18)" },
  { name: "Aden",      css: "hue-rotate(-20deg) contrast(0.9) saturate(0.85) brightness(1.2)" },
  { name: "Perpetua",  css: "contrast(1.1) saturate(1.1) brightness(1.02)" },
  { name: "Ludwig",    css: "contrast(1.05) brightness(1.05) saturate(1.1)" },
];

const STEPS = ["source", "trim", "filter", "adjust", "caption", "preview"];
const STEP_LABELS = ["Source", "Trim", "Filter", "Adjust", "Caption", "Preview"];
const fmt = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(Math.floor(s%60)).padStart(2,"0")}`;

export default function VideoStudio() {
  const [step, setStep]           = useState("source");
  const [mode, setMode]           = useState("idle");
  const [stream, setStream]       = useState(null);
  const [mediaRec, setMediaRec]   = useState(null);
  const [recording, setRecording] = useState(false);
  const [recTimer, setRecTimer]   = useState(0);
  const [videoUrl, setVideoUrl]   = useState(null);
  const [blobUrl, setBlobUrl]     = useState(null);
  const [duration, setDuration]   = useState(0);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd]     = useState(100);
  const [filter, setFilter]       = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast]   = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [caption, setCaption]     = useState("");
  const [captionPos, setCaptionPos] = useState("bottom");
  const [captionColor, setCaptionColor] = useState("#ffffff");
  const [embedLink, setEmbedLink] = useState("");
  const [embedUrl, setEmbedUrl]   = useState(null);
  const [dragOver, setDragOver]   = useState(false);
  const [previewTime, setPreviewTime] = useState(0);

  const liveRef    = useRef(null);
  const previewRef = useRef(null);
  const chunksRef  = useRef([]);
  const timerRef   = useRef(null);

  const stopStream = useCallback(() => {
    if (stream) stream.getTracks().forEach(t => t.stop());
    setStream(null);
    clearInterval(timerRef.current);
  }, [stream]);

  const filterCSS = [
    FILTERS[filter].css,
    brightness !== 100 ? `brightness(${brightness}%)` : "",
    contrast   !== 100 ? `contrast(${contrast}%)` : "",
    saturation !== 100 ? `saturate(${saturation}%)` : "",
  ].filter(Boolean).join(" ") || "none";

  // ── Camera ──
  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(s); setMode("record"); setRecTimer(0);
      setTimeout(() => {
        if (liveRef.current) { liveRef.current.srcObject = s; liveRef.current.play(); }
      }, 80);
    } catch { alert("Camera/mic permission denied."); }
  };

  const startRec = () => {
    chunksRef.current = [];
    const mr = new MediaRecorder(stream, { mimeType: "video/webm" });
    mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const url  = URL.createObjectURL(blob);
      setBlobUrl(url); setVideoUrl(url);
      setMode("recorded"); stopStream(); setStep("trim");
    };
    mr.start(); setMediaRec(mr); setRecording(true);
    timerRef.current = setInterval(() => setRecTimer(t => t + 1), 1000);
  };

  const stopRec = () => {
    mediaRec.stop();
    setRecording(false);
    clearInterval(timerRef.current);
  };

  // ── File upload ──
  const handleFile = file => {
    if (!file || !file.type.startsWith("video/")) return;
    const url = URL.createObjectURL(file);
    setBlobUrl(url); setVideoUrl(url);
    setMode("uploaded"); setStep("trim");
  };

  // ── Embed ──
  const handleEmbed = () => {
    let url = embedLink.trim();
    if (url.includes("youtube.com/watch?v="))
      url = `https://www.youtube.com/embed/${url.split("v=")[1].split("&")[0]}`;
    else if (url.includes("youtu.be/"))
      url = `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`;
    else if (url.includes("drive.google.com/file/d/")) {
      const id = url.match(/\/d\/([^/]+)/)?.[1];
      if (id) url = `https://drive.google.com/file/d/${id}/preview`;
    }
    setEmbedUrl(url); setMode("embed"); setStep("preview");
  };

  // ── Trim sync ──
  useEffect(() => {
    const v = previewRef.current; if (!v) return;
    const onTime = () => setPreviewTime(v.currentTime);
    const onMeta = () => { setDuration(v.duration); setTrimEnd(100); };
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
    };
  }, [videoUrl, step]);

  useEffect(() => {
    const v = previewRef.current; if (!v || !duration) return;
    const endSec = (trimEnd / 100) * duration;
    if (v.currentTime >= endSec) {
      v.pause();
      v.currentTime = (trimStart / 100) * duration;
    }
  }, [previewTime, trimStart, trimEnd, duration]);

  const playTrim = () => {
    const v = previewRef.current;
    if (v && duration) { v.currentTime = (trimStart / 100) * duration; v.play(); }
  };

  // ── Navigation ──
  const stepIdx = STEPS.indexOf(step);
  const goNext  = () => { const n = STEPS[stepIdx + 1]; if (n) setStep(n); };
  const goPrev  = () => { const p = STEPS[stepIdx - 1]; if (p) setStep(p); };
  const resetAll = () => {
    stopStream();
    setStep("source"); setMode("idle");
    setVideoUrl(null); setBlobUrl(null); setEmbedUrl(null);
    setFilter(0); setBrightness(100); setContrast(100); setSaturation(100);
    setCaption(""); setTrimStart(0); setTrimEnd(100); setRecTimer(0);
  };

  // ── Caption overlay style ──
  const captionOverlay = {
    position: "absolute", left: "50%", transform: "translateX(-50%)",
    padding: "6px 16px", background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(6px)", borderRadius: 8,
    fontSize: 15, fontWeight: 700, color: captionColor,
    maxWidth: "90%", textAlign: "center", pointerEvents: "none",
    fontFamily: "Syne, sans-serif", textShadow: "0 2px 8px rgba(0,0,0,0.8)",
    ...(captionPos === "top"
      ? { top: 14, bottom: "auto" }
      : captionPos === "center"
      ? { top: "50%", transform: "translate(-50%,-50%)", bottom: "auto" }
      : { bottom: 14 }),
  };

  // ── Shared video preview ──
  const VideoPreview = () => (
    <div style={{ position: "relative", background: "#000", width: "100%", aspectRatio: "16/9" }}>
      <video
        ref={previewRef} src={videoUrl} controls playsInline
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", filter: filterCSS }}
      />
      {caption && <div style={captionOverlay}>{caption}</div>}
    </div>
  );

  return (
    <div style={{ background: "#0a0a12", border: "1px solid rgba(0,229,255,0.12)", borderRadius: 20, overflow: "hidden", fontFamily: "'DM Sans','Segoe UI',sans-serif", color: "#e8e8f0" }}>

      {/* ── Progress bar ── */}
      <div style={{ display: "flex", alignItems: "center", padding: "14px 16px", background: "#07070e", borderBottom: "1px solid rgba(255,255,255,0.05)", overflowX: "auto" }}>
        {STEP_LABELS.map((label, i) => {
          const isActive = i === stepIdx, isDone = i < stepIdx;
          const locked = i > stepIdx && (mode === "idle" || mode === "record" || mode === "embedInput");
          return (
            <div key={label} style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
              <div onClick={() => !locked && isDone && setStep(STEPS[i])}
                style={{ width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, cursor: isDone ? "pointer" : "default", transition: "all 0.3s", opacity: locked ? 0.25 : 1, color: isDone ? "#0a0a12" : "#fff",
                  background: isDone ? "#00e5ff" : isActive ? "linear-gradient(135deg,#00e5ff,#7c4dff)" : "#1a1a2e",
                  border: isActive ? "2px solid #00e5ff" : isDone ? "2px solid #00e5ff" : "2px solid #2a2a3e",
                  boxShadow: isActive ? "0 0 12px rgba(0,229,255,0.5)" : "none" }}>
                {isDone ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginLeft: 5, marginRight: 4, whiteSpace: "nowrap", opacity: locked ? 0.25 : 1, color: isActive || isDone ? "#00e5ff" : "#3a3a5a" }}>{label}</span>
              {i < STEP_LABELS.length - 1 && <div style={{ flex: 1, height: 1, background: isDone ? "rgba(0,229,255,0.35)" : "rgba(255,255,255,0.06)", minWidth: 8, marginRight: 8 }} />}
            </div>
          );
        })}
      </div>

      {/* ══ SOURCE ══ */}
      {step === "source" && (
        <div style={{ padding: 20 }}>
          {mode === "idle" && (
            <div
              style={{ border: "2px dashed", borderColor: dragOver ? "#00e5ff" : "rgba(0,229,255,0.2)", borderRadius: 16, padding: "32px 20px", textAlign: "center", background: dragOver ? "rgba(0,229,255,0.04)" : "#0f0f1a", transition: "all 0.2s" }}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
            >
              <div style={{ fontSize: 40, marginBottom: 10 }}>🎬</div>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "Syne,sans-serif", marginBottom: 4 }}>Add your intro video</div>
              <div style={{ fontSize: 12, color: "#7a7a9a", marginBottom: 24 }}>Drag & drop, record with webcam, or embed a link</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, maxWidth: 420, margin: "0 auto" }}>
                <div style={srcBtn} onClick={startCamera}>
                  <span style={{ fontSize: 26, display: "block", marginBottom: 8 }}>📹</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#e8e8f0" }}>Record Webcam</span>
                </div>
                <label style={srcBtn}>
                  <span style={{ fontSize: 26, display: "block", marginBottom: 8 }}>📁</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#e8e8f0" }}>Upload File</span>
                  <input type="file" accept="video/*" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
                </label>
                <div style={srcBtn} onClick={() => setMode("embedInput")}>
                  <span style={{ fontSize: 26, display: "block", marginBottom: 8 }}>🔗</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#e8e8f0" }}>YouTube / Drive</span>
                </div>
              </div>
            </div>
          )}

          {mode === "record" && (
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: recording ? "#ff4444" : "#7a7a9a", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                {recording && <span style={{ animation: "blink 1s infinite" }}>●</span>}
                {recording ? `RECORDING  ${fmt(recTimer)}` : "LIVE PREVIEW"}
              </div>
              <video ref={liveRef} muted autoPlay playsInline style={{ width: "100%", borderRadius: 12, background: "#000", aspectRatio: "16/9", objectFit: "cover", display: "block" }} />
              <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                {!recording
                  ? <button onClick={startRec} style={recBtn}>● Start Recording</button>
                  : <button onClick={stopRec} style={{ ...recBtn, background: "#cc2200" }}>■ Stop  {fmt(recTimer)}</button>
                }
                <button onClick={() => { stopStream(); setMode("idle"); }} style={ghostBtn}>Cancel</button>
              </div>
              <div style={{ marginTop: 14, background: "#1a1a26", border: "1px solid rgba(0,229,255,0.1)", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#7a7a9a", marginBottom: 8 }}>📝 Script</div>
                <div style={{ fontSize: 12, color: "#a0a0c0", lineHeight: 1.9 }}>
                  "Hello! My name is Aman Pandey. I'm a Full Stack Developer with 4+ years of experience in Ionic Angular, TypeScript, Node.js and Socket.IO. I've built Kanteeno — a food delivery & kitchen streaming app — and Healaxy, a complete hospital management system. I've published multiple apps on both the App Store and Google Play. I'm ready to contribute to your team. Thank you!"
                </div>
              </div>
            </div>
          )}

          {mode === "embedInput" && (
            <div style={{ background: "#0f0f1a", border: "1px solid rgba(0,229,255,0.12)", borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "Syne,sans-serif", marginBottom: 12 }}>🔗 Paste Video Link</div>
              <input style={{ width: "100%", background: "#1a1a2e", border: "1px solid rgba(0,229,255,0.2)", borderRadius: 8, padding: "10px 14px", color: "#e8e8f0", fontSize: 13, boxSizing: "border-box", marginBottom: 14, outline: "none" }}
                placeholder="https://youtube.com/watch?v=... or https://drive.google.com/..."
                value={embedLink} onChange={e => setEmbedLink(e.target.value)} />
              <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                <button onClick={handleEmbed} disabled={!embedLink.trim()} style={{ ...primaryBtn, opacity: !embedLink.trim() ? 0.5 : 1 }}>Embed →</button>
                <button onClick={() => setMode("idle")} style={ghostBtn}>← Back</button>
              </div>
              <div style={{ fontSize: 12, color: "#7a7a9a", lineHeight: 2, background: "rgba(124,77,255,0.07)", padding: "12px 14px", borderRadius: 8 }}>
                <strong style={{ color: "#a0a0c0" }}>YouTube:</strong> Open video → Share → Copy Link<br />
                <strong style={{ color: "#a0a0c0" }}>Google Drive:</strong> Upload → Right click → Share → "Anyone with link" → Copy
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══ TRIM ══ */}
      {step === "trim" && videoUrl && (
        <div>
          <VideoPreview />
          <div style={{ padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "Syne,sans-serif", marginBottom: 4 }}>✂️ Trim Video</div>
            <div style={{ fontSize: 12, color: "#7a7a9a", marginBottom: 14 }}>
              Start: <strong style={{ color: "#00e5ff" }}>{fmt((trimStart / 100) * duration)}</strong> &nbsp;→&nbsp;
              End: <strong style={{ color: "#00e5ff" }}>{fmt((trimEnd / 100) * duration)}</strong> &nbsp;|&nbsp;
              Duration: <strong style={{ color: "#e8e8f0" }}>{fmt(((trimEnd - trimStart) / 100) * duration)}</strong>
            </div>
            <div style={{ position: "relative", height: 48, background: "#1a1a2e", borderRadius: 8, overflow: "hidden", marginBottom: 8 }}>
              <div style={{ position: "absolute", top: 0, bottom: 0, left: `${trimStart}%`, width: `${trimEnd - trimStart}%`, background: "rgba(0,229,255,0.15)", borderLeft: "2px solid #00e5ff", borderRight: "2px solid #00e5ff", pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: 0, bottom: 0, width: 2, left: `${duration ? (previewTime / duration) * 100 : 0}%`, background: "#fff", opacity: 0.8, pointerEvents: "none", zIndex: 2 }} />
              <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: `${trimStart}%`, background: "rgba(0,0,0,0.5)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: `${100 - trimEnd}%`, background: "rgba(0,0,0,0.5)", pointerEvents: "none" }} />
              <input type="range" min={0} max={trimEnd - 1} value={trimStart} onChange={e => setTrimStart(Number(e.target.value))} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "ew-resize", zIndex: 3 }} />
              <input type="range" min={trimStart + 1} max={100} value={trimEnd} onChange={e => setTrimEnd(Number(e.target.value))} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "ew-resize", zIndex: 3 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#7a7a9a", marginBottom: 14 }}>
              <span>0:00</span><span>{fmt(duration)}</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={playTrim} style={primaryBtn}>▶ Preview Trim</button>
              <button onClick={() => { setTrimStart(0); setTrimEnd(100); }} style={ghostBtn}>↺ Reset</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ FILTER ══ */}
      {step === "filter" && videoUrl && (
        <div>
          <VideoPreview />
          <div style={{ padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "Syne,sans-serif", marginBottom: 14 }}>🎨 Instagram Filters</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
              {FILTERS.map((f, i) => (
                <button key={f.name} onClick={() => setFilter(i)}
                  style={{ background: "#1a1a2e", border: `2px solid ${filter === i ? "#00e5ff" : "rgba(255,255,255,0.08)"}`, borderRadius: 10, padding: "8px 6px", cursor: "pointer", transition: "all 0.2s", boxShadow: filter === i ? "0 0 14px rgba(0,229,255,0.3)" : "none" }}>
                  <div style={{ aspectRatio: "16/9", borderRadius: 6, background: "linear-gradient(135deg,#1a3a5c,#5c1a3a,#3a5c1a)", filter: [f.css, `brightness(${brightness}%)`, `contrast(${contrast}%)`, `saturate(${saturation}%)`].filter(Boolean).join(" ") || "none", marginBottom: 6 }} />
                  <div style={{ fontSize: 10, fontWeight: 700, color: filter === i ? "#00e5ff" : "#7a7a9a" }}>{f.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ ADJUST ══ */}
      {step === "adjust" && videoUrl && (
        <div>
          <VideoPreview />
          <div style={{ padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "Syne,sans-serif", marginBottom: 16 }}>⚙️ Adjust</div>
            {[
              { label: "Brightness", icon: "☀️", val: brightness, set: setBrightness, min: 50, max: 150 },
              { label: "Contrast",   icon: "◑",  val: contrast,   set: setContrast,   min: 50, max: 150 },
              { label: "Saturation", icon: "🎨", val: saturation, set: setSaturation, min: 0,  max: 200 },
            ].map(({ label, icon, val, set, min, max }) => (
              <div key={label} style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 15 }}>{icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#00e5ff", fontFamily: "Syne,sans-serif" }}>{val}%</span>
                </div>
                <input type="range" min={min} max={max} value={val} onChange={e => set(Number(e.target.value))} style={{ width: "100%", accentColor: "#00e5ff", cursor: "pointer" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#3a3a5a", marginTop: 2 }}>
                  <span>{min}%</span><span>100%</span><span>{max}%</span>
                </div>
              </div>
            ))}
            <button onClick={() => { setBrightness(100); setContrast(100); setSaturation(100); }} style={ghostBtn}>↺ Reset All</button>
          </div>
        </div>
      )}

      {/* ══ CAPTION ══ */}
      {step === "caption" && videoUrl && (
        <div>
          <VideoPreview />
          <div style={{ padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "Syne,sans-serif", marginBottom: 12 }}>💬 Caption Overlay</div>
            <textarea value={caption} onChange={e => setCaption(e.target.value)} rows={3} placeholder="Type your caption..."
              style={{ width: "100%", background: "#1a1a2e", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 8, padding: "10px 14px", color: "#e8e8f0", fontSize: 13, resize: "none", boxSizing: "border-box", fontFamily: "inherit", outline: "none", marginBottom: 14 }} />
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#7a7a9a", marginBottom: 8 }}>Position</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {["top", "center", "bottom"].map(p => (
                <button key={p} onClick={() => setCaptionPos(p)} style={{ padding: "7px 14px", borderRadius: 6, border: `1px solid ${captionPos === p ? "#00e5ff" : "rgba(255,255,255,0.1)"}`, background: "transparent", color: captionPos === p ? "#00e5ff" : "#7a7a9a", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>
                  {p === "top" ? "⬆ Top" : p === "center" ? "⬛ Center" : "⬇ Bottom"}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#7a7a9a", marginBottom: 8 }}>Text Color</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              {["#ffffff", "#000000", "#00e5ff", "#ffcc00", "#ff4444", "#7c4dff", "#00ff88"].map(c => (
                <button key={c} onClick={() => setCaptionColor(c)} style={{ width: 26, height: 26, borderRadius: "50%", background: c, border: `3px solid ${captionColor === c ? "#00e5ff" : "transparent"}`, cursor: "pointer", transition: "all 0.2s", boxShadow: captionColor === c ? `0 0 10px ${c}` : "none" }} />
              ))}
              <input type="color" value={captionColor} onChange={e => setCaptionColor(e.target.value)} style={{ width: 26, height: 26, borderRadius: "50%", border: "none", cursor: "pointer", padding: 0 }} title="Custom color" />
            </div>
          </div>
        </div>
      )}

      {/* ══ PREVIEW ══ */}
      {step === "preview" && (
        <div style={{ padding: 20 }}>
          {mode === "embed" ? (
            <iframe src={embedUrl} style={{ width: "100%", aspectRatio: "16/9", border: "none", borderRadius: 14, display: "block" }} allow="autoplay;fullscreen" allowFullScreen title="Video" />
          ) : videoUrl ? (
            <div style={{ position: "relative", background: "#000", borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
              <video src={videoUrl} controls style={{ width: "100%", aspectRatio: "16/9", display: "block", filter: filterCSS, objectFit: "contain" }} playsInline />
              {caption && <div style={captionOverlay}>{caption}</div>}
            </div>
          ) : null}
          <div style={{ background: "#0f0f1a", border: "1px solid rgba(0,229,255,0.1)", borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
            <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#7a7a9a" }}>Edit Summary</div>
            {[
              ["Filter",     FILTERS[filter].name],
              ["Brightness", `${brightness}%`],
              ["Contrast",   `${contrast}%`],
              ["Saturation", `${saturation}%`],
              ...(caption ? [["Caption", `"${caption}"`]] : []),
              ...(duration > 0 ? [["Trim", `${fmt((trimStart/100)*duration)} → ${fmt((trimEnd/100)*duration)}`]] : []),
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 14px", borderBottom: "1px solid rgba(255,255,255,0.03)", fontSize: 12 }}>
                <span style={{ color: "#7a7a9a", textTransform: "uppercase", fontSize: 10, letterSpacing: 0.5 }}>{k}</span>
                <span style={{ color: "#00e5ff", fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
          {blobUrl && (
            <div style={{ textAlign: "center" }}>
              <a href={blobUrl} download="aman-pandey-intro.webm" style={{ ...primaryBtn, textDecoration: "none", display: "inline-block" }}>⬇ Download Video</a>
              <div style={{ fontSize: 11, color: "#7a7a9a", marginTop: 10, lineHeight: 1.7 }}>
                Download → upload to YouTube or Google Drive → use "YouTube/Drive" option to embed permanently.
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Nav buttons ── */}
      {step !== "source" && (
        <div style={{ display: "flex", gap: 10, padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.05)", justifyContent: "space-between", background: "#07070e" }}>
          <button onClick={goPrev} style={ghostBtn}>← Back</button>
          <button onClick={resetAll} style={ghostBtn}>✕ Start Over</button>
          {step !== "preview" && <button onClick={goNext} style={primaryBtn}>Next →</button>}
        </div>
      )}

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}

/* ── Shared button styles ── */
const srcBtn = {
  background: "#1a1a2e", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 10,
  padding: "16px 8px", cursor: "pointer", display: "block",
  transition: "all 0.2s", textAlign: "center", color: "inherit",
};
const recBtn = {
  padding: "10px 22px", borderRadius: 8, background: "#ff4444",
  color: "#fff", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13,
};
const primaryBtn = {
  padding: "10px 22px", borderRadius: 8,
  background: "linear-gradient(135deg,#00e5ff,#7c4dff)",
  color: "#0a0a0f", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13,
};
const ghostBtn = {
  padding: "10px 16px", borderRadius: 8, background: "transparent",
  color: "#a0a0c0", border: "1px solid rgba(255,255,255,0.1)",
  cursor: "pointer", fontSize: 13,
};