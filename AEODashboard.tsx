import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// ── Types ────────────────────────────────────────────────────────────────────

interface Metric {
  label: string;
  value: number;
  color: string;
}

interface SoMBrand {
  name: string;
  share: number;
  color: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const METRICS: Metric[] = [
  { label: "Visibility",         value: 85, color: "#06b6d4" },
  { label: "Sentiment",          value: 72, color: "#06b6d4" },
  { label: "Accuracy",           value: 93, color: "#10b981" },
  { label: "Tone Alignment",     value: 64, color: "#f59e0b" },
  { label: "Agentic Readiness",  value: 58, color: "#f59e0b" },
];

const SOM_BRANDS: SoMBrand[] = [
  { name: "Your Brand",   share: 34, color: "#06b6d4" },
  { name: "Competitor A", share: 28, color: "#6366f1" },
  { name: "Competitor B", share: 21, color: "#8b5cf6" },
  { name: "Competitor C", share: 17, color: "#64748b" },
];

const TREND_DATA = [
  { week: "W1", score: 61 },
  { week: "W2", score: 65 },
  { week: "W3", score: 70 },
  { week: "W4", score: 68 },
  { week: "W5", score: 74 },
  { week: "W6", score: 71 },
  { week: "W7", score: 78 },
];

const TABS = ["AEO Score", "Agentic Readiness", "Share of Model", "Hallucination Heatmap"] as const;
type Tab = typeof TABS[number];

// ── Animated Score Ring ───────────────────────────────────────────────────────

function ScoreRing({ score }: { score: number }) {
  const [displayed, setDisplayed] = useState(0);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progress = (displayed / 100) * circumference * 0.75;

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 1400;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - pct, 3);
      setDisplayed(Math.round(ease * score));
      if (pct < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const scoreColor =
    displayed >= 80 ? "#10b981" : displayed >= 60 ? "#06b6d4" : "#f59e0b";

  return (
    <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>
      <svg width="140" height="140" style={{ transform: "rotate(135deg)" }}>
        <circle
          cx="70" cy="70" r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="10"
          strokeDasharray={`${circumference * 0.75} ${circumference}`}
          strokeLinecap="round"
        />
        <circle
          cx="70" cy="70" r={radius}
          fill="none"
          stroke={scoreColor}
          strokeWidth="10"
          strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: "stroke 0.4s", filter: `drop-shadow(0 0 8px ${scoreColor})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bold text-white" style={{ fontSize: 36, lineHeight: 1, fontFamily: "'DM Mono', monospace" }}>
          {displayed}
        </span>
        <span className="text-xs tracking-widest mt-1" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "monospace" }}>
          AEO SCORE
        </span>
      </div>
    </div>
  );
}

// ── Animated Bar ──────────────────────────────────────────────────────────────

function MetricBar({ metric, delay }: { metric: Metric; delay: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(metric.value), delay);
    return () => clearTimeout(t);
  }, [metric.value, delay]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm w-36 shrink-0" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "monospace" }}>
        {metric.label}
      </span>
      <div className="flex-1 rounded-full overflow-hidden" style={{ height: 6, background: "rgba(255,255,255,0.08)" }}>
        <div
          style={{
            width: `${width}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${metric.color}cc, ${metric.color})`,
            borderRadius: 999,
            boxShadow: `0 0 8px ${metric.color}88`,
            transition: "width 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>
      <span className="text-sm font-bold w-10 text-right" style={{ color: metric.color, fontFamily: "monospace" }}>
        {metric.value}%
      </span>
    </div>
  );
}

// ── Share of Model Grid ───────────────────────────────────────────────────────

function ShareOfModel() {
  return (
    <div className="space-y-3 pt-2">
      <p className="text-xs tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>
        BRAND MENTION DISTRIBUTION · LAST 30 DAYS
      </p>
      {SOM_BRANDS.map((b) => (
        <div key={b.name} className="space-y-1">
          <div className="flex justify-between text-xs" style={{ fontFamily: "monospace" }}>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>{b.name}</span>
            <span style={{ color: b.color }}>{b.share}%</span>
          </div>
          <div className="rounded-full overflow-hidden" style={{ height: 8, background: "rgba(255,255,255,0.06)" }}>
            <div
              style={{
                width: `${b.share}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${b.color}99, ${b.color})`,
                borderRadius: 999,
                boxShadow: `0 0 6px ${b.color}66`,
              }}
            />
          </div>
        </div>
      ))}
      <div className="grid grid-cols-2 gap-3 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {[
          { label: "Total Queries Sampled", value: "12,840" },
          { label: "Models Analyzed", value: "7" },
          { label: "Avg. Mention Rank", value: "#2.3" },
          { label: "Trend (30d)", value: "+6.4%" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{s.label}</div>
            <div className="text-base font-bold" style={{ color: "#06b6d4", fontFamily: "'DM Mono', monospace" }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Hallucination Heatmap ─────────────────────────────────────────────────────

function HallucinationHeatmap() {
  const categories = ["Product Info", "Pricing", "Features", "Comparisons", "Reviews", "Availability"];
  const models = ["GPT-4o", "Gemini", "Claude", "Perplexity", "Llama"];
  const data: Record<string, Record<string, number>> = {
    "GPT-4o":      { "Product Info": 12, "Pricing": 34, "Features": 8,  "Comparisons": 22, "Reviews": 5,  "Availability": 41 },
    "Gemini":      { "Product Info": 8,  "Pricing": 27, "Features": 15, "Comparisons": 18, "Reviews": 9,  "Availability": 33 },
    "Claude":      { "Product Info": 4,  "Pricing": 11, "Features": 6,  "Comparisons": 9,  "Reviews": 3,  "Availability": 14 },
    "Perplexity":  { "Product Info": 19, "Pricing": 42, "Features": 23, "Comparisons": 31, "Reviews": 14, "Availability": 52 },
    "Llama":       { "Product Info": 28, "Pricing": 55, "Features": 31, "Comparisons": 38, "Reviews": 22, "Availability": 61 },
  };

  const getColor = (v: number) => {
    if (v < 10) return { bg: "rgba(16,185,129,0.25)", text: "#10b981" };
    if (v < 25) return { bg: "rgba(245,158,11,0.2)",  text: "#f59e0b" };
    return              { bg: "rgba(239,68,68,0.2)",   text: "#ef4444" };
  };

  return (
    <div className="overflow-x-auto pt-2">
      <p className="text-xs tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>
        HALLUCINATION RATE % BY MODEL & CATEGORY
      </p>
      <table className="w-full text-xs" style={{ borderCollapse: "collapse", fontFamily: "monospace" }}>
        <thead>
          <tr>
            <th className="text-left pb-2 pr-3" style={{ color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>Model</th>
            {categories.map((c) => (
              <th key={c} className="pb-2 px-1 text-center" style={{ color: "rgba(255,255,255,0.35)", fontWeight: 400, whiteSpace: "nowrap" }}>
                {c.split(" ")[0]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {models.map((m) => (
            <tr key={m}>
              <td className="py-1 pr-3" style={{ color: "rgba(255,255,255,0.65)" }}>{m}</td>
              {categories.map((c) => {
                const v = data[m][c];
                const { bg, text } = getColor(v);
                return (
                  <td key={c} className="py-1 px-1 text-center">
                    <div className="rounded mx-auto flex items-center justify-center"
                      style={{ background: bg, color: text, width: 40, height: 28, fontWeight: 700 }}>
                      {v}%
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-4 mt-3 text-xs" style={{ fontFamily: "monospace" }}>
        {[{ c: "#10b981", label: "Low (<10%)" }, { c: "#f59e0b", label: "Medium (10–25%)" }, { c: "#ef4444", label: "High (>25%)" }].map(x => (
          <div key={x.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ background: x.c, opacity: 0.8 }} />
            <span style={{ color: "rgba(255,255,255,0.4)" }}>{x.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Custom Tooltip ─────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-2" style={{
      background: "rgba(15,20,40,0.95)",
      border: "1px solid rgba(6,182,212,0.3)",
      backdropFilter: "blur(12px)",
      fontFamily: "monospace",
    }}>
      <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</p>
      <p className="text-sm font-bold" style={{ color: "#06b6d4" }}>Score: {payload[0].value}</p>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function AEODashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("AEO Score");

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "radial-gradient(ellipse at 20% 20%, #0c1220 0%, #060910 60%, #000408 100%)" }}
    >
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", top: "10%", left: "15%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "20%", right: "10%",
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)",
        }} />
      </div>

      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4" style={{
            background: "rgba(6,182,212,0.1)",
            border: "1px solid rgba(6,182,212,0.25)",
          }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#06b6d4" }} />
            <span className="text-xs tracking-widest" style={{ color: "#06b6d4", fontFamily: "monospace" }}>LIVE INTERACTIVE DEMO</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2" style={{ letterSpacing: "-0.02em" }}>
            See AEO Intelligence in Action
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace", fontSize: 14 }}>
            Real-time scoring, agentic readiness, and hallucination analysis.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl overflow-hidden" style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}>
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#10b981" }} />
            <div className="flex-1 ml-3 rounded-lg px-3 py-1.5 text-xs" style={{
              background: "rgba(6,182,212,0.08)",
              border: "1px solid rgba(6,182,212,0.2)",
              color: "rgba(6,182,212,0.7)",
              fontFamily: "monospace",
            }}>
              https://demo.ranker.ai/aeo/dashboard
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex px-4 pt-3 gap-1" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2.5 text-xs rounded-t-lg transition-all duration-200"
                style={{
                  fontFamily: "monospace",
                  color: activeTab === tab ? "#06b6d4" : "rgba(255,255,255,0.4)",
                  background: activeTab === tab ? "rgba(6,182,212,0.08)" : "transparent",
                  borderBottom: activeTab === tab ? "2px solid #06b6d4" : "2px solid transparent",
                  cursor: "pointer",
                  outline: "none",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "AEO Score" && (
              <div className="flex gap-8 items-start">
                {/* Left: Ring */}
                <div className="shrink-0 flex flex-col items-center gap-3">
                  <ScoreRing score={78} />
                  <div className="text-center space-y-1">
                    {[
                      { label: "Vis",  v: "85%" },
                      { label: "Sent", v: "72%" },
                      { label: "Acc",  v: "93%" },
                      { label: "PA",   v: "1.2×" },
                    ].map((s) => (
                      <div key={s.label} className="flex justify-between gap-4 text-xs" style={{ fontFamily: "monospace" }}>
                        <span style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</span>
                        <span style={{ color: "rgba(255,255,255,0.7)" }}>{s.v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Bars + Chart */}
                <div className="flex-1 space-y-4">
                  <div className="space-y-3">
                    {METRICS.map((m, i) => (
                      <MetricBar key={m.label} metric={m} delay={200 + i * 120} />
                    ))}
                  </div>

                  {/* Trend chart */}
                  <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-xs mb-3 tracking-widest" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>
                      7-WEEK AEO SCORE TREND
                    </p>
                    <ResponsiveContainer width="100%" height={120}>
                      <LineChart data={TREND_DATA} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                        <XAxis dataKey="week" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
                        <YAxis domain={[55, 85]} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="#06b6d4"
                          strokeWidth={2.5}
                          dot={{ fill: "#06b6d4", r: 3, strokeWidth: 0 }}
                          activeDot={{ r: 5, fill: "#06b6d4", stroke: "rgba(6,182,212,0.3)", strokeWidth: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Agentic Readiness" && (
              <div className="space-y-5">
                <p className="text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>
                  AGENTIC READINESS BREAKDOWN · PERSONA-WEIGHTED
                </p>
                {[
                  { label: "Tool Invocation Fitness",   value: 71, color: "#06b6d4", note: "High" },
                  { label: "Structured Data Coverage",  value: 88, color: "#10b981", note: "Excellent" },
                  { label: "Knowledge Graph Density",   value: 54, color: "#f59e0b", note: "Medium" },
                  { label: "Intent Signal Clarity",     value: 66, color: "#06b6d4", note: "Good" },
                  { label: "Multi-step Reasoning Path", value: 49, color: "#f59e0b", note: "Medium" },
                  { label: "Citation Trustworthiness",  value: 91, color: "#10b981", note: "Excellent" },
                ].map((m) => (
                  <div key={m.label} className="flex items-center gap-3">
                    <span className="text-sm w-52 shrink-0" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "monospace" }}>{m.label}</span>
                    <div className="flex-1 rounded-full overflow-hidden" style={{ height: 6, background: "rgba(255,255,255,0.08)" }}>
                      <div style={{
                        width: `${m.value}%`, height: "100%",
                        background: `linear-gradient(90deg, ${m.color}99, ${m.color})`,
                        borderRadius: 999, boxShadow: `0 0 8px ${m.color}88`,
                        transition: "width 1s cubic-bezier(0.16,1,0.3,1)",
                      }} />
                    </div>
                    <span className="text-xs w-12 text-right" style={{ color: m.color, fontFamily: "monospace" }}>{m.value}%</span>
                    <span className="text-xs w-16" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>{m.note}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Share of Model" && <ShareOfModel />}
            {activeTab === "Hallucination Heatmap" && <HallucinationHeatmap />}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 flex items-center justify-between text-xs" style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(0,0,0,0.2)",
            fontFamily: "monospace",
            color: "rgba(255,255,255,0.25)",
          }}>
            <span>Last sync: 2 min ago · 7 models · 30-day window</span>
            <span style={{ color: "#06b6d4", cursor: "pointer" }}>Request Full Report →</span>
          </div>
        </div>
      </div>
    </div>
  );
}
