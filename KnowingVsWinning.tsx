import { motion } from 'framer-motion';
import { Eye, Crosshair, TrendingUp, ShieldCheck, Brain, Zap, FileText, Radio, GitCompareArrows, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const knowingKeys = [
  { icon: Eye, labelKey: 'kvw_k1_label', valueKey: 'kvw_k1_value', subKey: 'kvw_k1_sub' },
  { icon: TrendingUp, labelKey: 'kvw_k2_label', valueKey: 'kvw_k2_value', subKey: 'kvw_k2_sub' },
  { icon: Brain, labelKey: 'kvw_k3_label', valueKey: 'kvw_k3_value', subKey: 'kvw_k3_sub' },
  { icon: FileText, labelKey: 'kvw_k4_label', valueKey: 'kvw_k4_value', subKey: 'kvw_k4_sub' },
  { icon: AlertTriangle, labelKey: 'kvw_k5_label', valueKey: 'kvw_k5_value', subKey: 'kvw_k5_sub' },
];

const winningKeys = [
  { icon: Crosshair, labelKey: 'kvw_w1_label', valueKey: 'kvw_w1_value', subKey: 'kvw_w1_sub' },
  { icon: ShieldCheck, labelKey: 'kvw_w2_label', valueKey: 'kvw_w2_value', subKey: 'kvw_w2_sub' },
  { icon: Radio, labelKey: 'kvw_w3_label', valueKey: 'kvw_w3_value', subKey: 'kvw_w3_sub' },
  { icon: GitCompareArrows, labelKey: 'kvw_w4_label', valueKey: 'kvw_w4_value', subKey: 'kvw_w4_sub' },
  { icon: Zap, labelKey: 'kvw_w5_label', valueKey: 'kvw_w5_value', subKey: 'kvw_w5_sub' },
];

const KnowingVsWinning = () => {
  const { t } = useTranslation();

  return (
    <section className="py-28 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('kvw_title_1')} <span className="text-muted-foreground">{t('kvw_knowing')}</span> {t('kvw_title_and')}{' '}
            <span className="text-gradient-brand">{t('kvw_winning')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body">
            {t('kvw_subtitle')}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* LEFT — Knowing */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted border border-border">
                <Eye className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-muted-foreground">{t('kvw_knowing')}</h3>
                <p className="text-xs text-muted-foreground/60">{t('kvw_knowing_sub')}</p>
              </div>
            </div>

            <div className="space-y-5 flex-1">
              {knowingKeys.map((item) => (
                <div key={item.labelKey} className="flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/50 border border-border/50">
                    <item.icon className="h-4 w-4 text-muted-foreground/50" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-medium text-muted-foreground">{t(item.labelKey)}</span>
                      <span className="text-sm font-bold text-muted-foreground/70 font-mono">{t(item.valueKey)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground/40 mt-0.5">{t(item.subKey)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-border/50 text-center">
              <p className="text-xs text-muted-foreground/40 uppercase tracking-widest font-semibold">
                {t('kvw_knowing_footer')}
              </p>
            </div>
          </motion.div>

          {/* RIGHT — Winning */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-xl border border-secondary/30 overflow-hidden flex flex-col"
            style={{ backgroundColor: 'hsl(174 72% 46% / 0.04)' }}
          >
            <div className="p-8 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15 border border-secondary/20 glow-secondary">
                  <Crosshair className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">{t('kvw_winning')}</h3>
                  <p className="text-xs text-secondary/70">{t('kvw_winning_sub')}</p>
                </div>
              </div>

              <div className="space-y-5 flex-1">
                {winningKeys.map((item) => (
                  <div key={item.labelKey} className="flex items-center gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10 border border-secondary/20">
                      <item.icon className="h-4 w-4 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm font-medium text-foreground">{t(item.labelKey)}</span>
                        <span className="text-sm font-bold text-secondary font-mono">{t(item.valueKey)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{t(item.subKey)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-secondary/20 text-center">
                <p className="text-xs text-secondary/60 uppercase tracking-widest font-semibold">
                  {t('kvw_winning_footer')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default KnowingVsWinning;
