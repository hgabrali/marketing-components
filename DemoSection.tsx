import { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';

const TAB_KEYS = ['demo_tab_aeo', 'demo_tab_agentic', 'demo_tab_som', 'demo_tab_hallucination'] as const;
type TabKey = typeof TAB_KEYS[number];

/* ── Score Ring (canvas) ── */
const ScoreRing = ({ value, size = 160 }: { value: number; size?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1200, 1);
      setAnimated(Math.round((1 - Math.pow(1 - t, 3)) * value));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, size, size);
    const cx = size / 2, cy = size / 2, r = size / 2 - 14;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0.75 * Math.PI, 2.25 * Math.PI);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.stroke();
    const angle = 0.75 * Math.PI + (animated / 100) * 1.5 * Math.PI;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0.75 * Math.PI, angle);
    ctx.strokeStyle = animated >= 70 ? '#10b981' : animated >= 40 ? '#f59e0b' : '#ef4444';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.stroke();
  }, [animated, size]);

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <canvas ref={canvasRef} width={size} height={size} className="absolute inset-0" />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[2rem] font-extrabold text-foreground">{animated}</span>
        <span className="text-[0.68rem] text-muted-foreground uppercase tracking-[0.08em]">AEO Score</span>
      </div>
    </div>
  );
};

/* ── Dimension bar ── */
const DimBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="flex items-center gap-3">
    <span className="w-[140px] text-[0.8rem] text-muted-foreground flex-shrink-0">{label}</span>
    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${value}%`, background: color }} />
    </div>
    <span className="w-10 text-right text-[0.8rem] font-semibold text-foreground">{value}%</span>
  </div>
);

/* ── Panel 1: AEO Score ── */
const ScorePanel = () => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-6 flex-wrap items-start">
      <ScoreRing value={78} />
      <div className="flex-1 flex flex-col gap-2.5 min-w-[200px]">
        <DimBar label={t('demo_dim_visibility')} value={85} color="linear-gradient(90deg, #0d9488, #06b6d4, #22d3ee)" />
        <DimBar label={t('demo_dim_sentiment')} value={72} color="linear-gradient(90deg, #0d9488, #06b6d4, #22d3ee)" />
        <DimBar label={t('demo_dim_accuracy')} value={93} color="linear-gradient(90deg, #059669, #10b981, #34d399)" />
        <DimBar label={t('demo_dim_tone')} value={64} color="linear-gradient(90deg, #d97706, #f59e0b, #fbbf24)" />
        <DimBar label={t('demo_dim_agentic')} value={58} color="linear-gradient(90deg, #d97706, #f59e0b, #fbbf24)" />
      </div>
    </div>
  );
};

/* ── Panel 2: Agentic Readiness ── */
const AgenticPanel = () => {
  const { t } = useTranslation();
  const journeyCards = [
    { labelKey: 'demo_journey_checkout', score: 89, statusKey: 'demo_status_ready', cls: 'text-[hsl(var(--success))]' },
    { labelKey: 'demo_journey_booking', score: 64, statusKey: 'demo_status_needs_work', cls: 'text-[hsl(var(--warning))]' },
    { labelKey: 'demo_journey_support', score: 42, statusKey: 'demo_status_critical', cls: 'text-[hsl(var(--destructive))]' },
  ];

  return (
    <div>
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
        {journeyCards.map(j => (
          <div key={j.labelKey} className="bg-accent border border-border rounded-lg p-5 text-center">
            <div className="text-[0.75rem] text-muted-foreground uppercase tracking-[0.06em]">{t(j.labelKey)}</div>
            <div className={`text-[2.2rem] font-extrabold mt-2 ${j.cls}`}>{j.score}</div>
            <div className="text-[0.75rem] text-muted-foreground mt-1">{t(j.statusKey)}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 bg-accent border border-border rounded-lg px-4 py-3 flex gap-3 items-start">
        <span className="text-[0.7rem] font-bold px-2 py-0.5 rounded whitespace-nowrap bg-[rgba(245,158,11,0.15)] text-[hsl(var(--warning))]">⚠️ {t('demo_severity_medium')}</span>
        <span className="text-sm text-foreground">{t('demo_recommendation')}</span>
      </div>
    </div>
  );
};

/* ── Panel 3: Share of Model (bar chart) ── */
const somData = [
  { model: 'ChatGPT', value: 38 },
  { model: 'Gemini', value: 29 },
  { model: 'Perplexity', value: 23 },
  { model: 'Claude', value: 18 },
  { model: 'Copilot', value: 12 },
];

const SomPanel = () => {
  const { t } = useTranslation();
  return (
    <div className="h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={somData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
          <XAxis type="number" domain={[0, 50]} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} unit="%" />
          <YAxis type="category" dataKey="model" tick={{ fontSize: 13, fill: 'hsl(var(--foreground))', fontWeight: 500 }} axisLine={false} tickLine={false} width={90} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '13px',
            }}
            formatter={(value: number) => [`${value}%`, t('demo_share')]}
          />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
            {somData.map((_, i) => (
              <Cell key={i} fill={['#3b82f6', '#2563eb', '#06b6d4', '#10b981', '#8b5cf6'][i]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

/* ── Panel 4: Hallucination Heatmap ── */
const heatmapRows = [
  { model: 'GPT-4', values: [0.12, 0.28, 0.09] },
  { model: 'Claude', values: [0.21, 0.15, 0.37] },
  { model: 'Gemini', values: [0.08, 0.23, 0.19] },
];
const heatCls = (v: number) =>
  v < 0.15 ? 'bg-[rgba(16,185,129,0.1)] text-[hsl(var(--success))]' :
  v < 0.25 ? 'bg-[rgba(245,158,11,0.1)] text-[hsl(var(--warning))]' :
             'bg-[rgba(239,68,68,0.1)] text-[hsl(var(--destructive))]';

const HeatmapPanel = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="grid text-[0.78rem]" style={{ gridTemplateColumns: '120px repeat(3, 1fr)', gap: '4px' }}>
        <div className="text-muted-foreground font-semibold py-2">{t('demo_heatmap_header')}</div>
        {[t('demo_heatmap_product'), t('demo_heatmap_support'), t('demo_heatmap_pricing')].map(h => (
          <div key={h} className="text-center text-muted-foreground font-semibold py-2">{h}</div>
        ))}
        {heatmapRows.map(row => (
          <div key={row.model} className="contents">
            <div className="flex items-center text-muted-foreground pl-1">{row.model}</div>
            {row.values.map((v, i) => (
              <div key={i} className={`rounded-md py-3.5 text-center font-bold text-[0.8rem] ${heatCls(v)}`}>
                {v.toFixed(2)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-4 text-[0.7rem] text-muted-foreground">
        <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-[rgba(16,185,129,0.3)]" /> {t('demo_heat_low')}</span>
        <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-[rgba(245,158,11,0.3)]" /> {t('demo_heat_medium')}</span>
        <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-[rgba(239,68,68,0.3)]" /> {t('demo_heat_high')}</span>
      </div>
    </div>
  );
};

/* ── Main Demo Section ── */
const DemoSection = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('demo_tab_aeo');
  const { t } = useTranslation();

  return (
    <section id="demo" className="py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.05em] px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            {t('demo_badge')}
          </span>
          <h2 className="text-foreground font-bold mt-3" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
            {t('demo_title')}
          </h2>
          <p className="text-muted-foreground mt-2">{t('demo_subtitle')}</p>
        </div>

        {/* Shell */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
          {/* Top bar */}
          <div className="bg-accent px-5 py-3 flex items-center gap-2.5 border-b border-border">
            <div className="flex gap-[7px]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 mx-3 bg-secondary border border-border rounded-lg px-3.5 py-1 text-[0.78rem] text-muted-foreground font-mono">
              https://demo.semantic.vision/aeo/dashboard
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-accent border-b border-border overflow-x-auto">
            {TAB_KEYS.map(tabKey => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`px-6 py-3 text-[0.82rem] font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tabKey
                    ? 'text-primary border-primary'
                    : 'text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                {t(tabKey)}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className="p-7 animate-fade-in" key={activeTab}>
            {activeTab === 'demo_tab_aeo' && <ScorePanel />}
            {activeTab === 'demo_tab_agentic' && <AgenticPanel />}
            {activeTab === 'demo_tab_som' && <SomPanel />}
            {activeTab === 'demo_tab_hallucination' && <HeatmapPanel />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
