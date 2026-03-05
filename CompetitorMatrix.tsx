import { motion } from 'framer-motion';
import { Check, X, Eye, Crosshair } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const competitors = [
  'Goodie AI', 'AeoAgent.ai', 'xSeek', 'Scrunch AI', 'Profound', 'Revere AI', 'Peec AI',
];

const featureKeys = [
  { key: 'cm_f1', others: true, ranker: true },
  { key: 'cm_f2', others: true, ranker: true },
  { key: 'cm_f3', others: true, ranker: true },
  { key: 'cm_f4', others: true, ranker: true },
  { key: 'cm_f5', others: false, ranker: true },
  { key: 'cm_f6', others: false, ranker: true },
  { key: 'cm_f7', others: false, ranker: true },
  { key: 'cm_f8', others: false, ranker: true },
  { key: 'cm_f9', others: false, ranker: true },
  { key: 'cm_f10', others: false, ranker: true },
  { key: 'cm_f11', others: false, ranker: true },
  { key: 'cm_f12', others: false, ranker: true },
];

interface Props {
  compact?: boolean;
}

const CompetitorMatrix = ({ compact = false }: Props) => {
  const { t } = useTranslation();

  return (
    <section className={cn('relative scroll-mt-20', compact ? 'py-16' : 'py-28')} id="competitors">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 mb-6 surface-elevated">
            <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground font-body tracking-widest uppercase">
              {t('cm_badge')}
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('cm_title_1')} <span className="text-muted-foreground line-through decoration-destructive/60">{t('cm_title_monitor')}</span>.{' '}
            {t('cm_title_2')} <span className="text-gradient-brand">{t('cm_title_persuade')}</span>.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body">
            {t('cm_subtitle')}
          </p>
        </motion.div>

        {/* Competitor pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {competitors.map((name) => (
            <span
              key={name}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground surface-elevated"
            >
              <Eye className="h-3 w-3" />
              {name}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-secondary/40 px-3 py-1 text-xs font-bold text-secondary bg-secondary/10">
            <Crosshair className="h-3 w-3" />
            Ranker AI
          </span>
        </motion.div>

        {/* Dark Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-xl border border-border overflow-hidden" style={{ backgroundColor: 'hsl(220 20% 8%)' }}>
            {/* Table Header */}
            <div className="grid grid-cols-[1fr_100px_120px] sm:grid-cols-[1fr_140px_160px] border-b border-border">
              <div className="p-4 text-sm font-semibold text-muted-foreground font-heading">{t('cm_col_capability')}</div>
              <div className="p-4 text-center text-sm font-semibold text-muted-foreground font-heading">{t('cm_col_others')}</div>
              <div className="p-4 text-center text-sm font-bold text-secondary font-heading relative">
                <div className="absolute inset-0 bg-secondary/[0.06]" />
                <span className="relative">Ranker AI</span>
              </div>
            </div>

            {/* Table Rows */}
            {featureKeys.map((f, i) => {
              const isActive = !f.others;
              return (
                <div
                  key={f.key}
                  className={cn(
                    'grid grid-cols-[1fr_100px_120px] sm:grid-cols-[1fr_140px_160px]',
                    i < featureKeys.length - 1 && 'border-b border-border/40',
                    isActive && 'bg-secondary/[0.02]'
                  )}
                >
                  <div className={cn(
                    'p-3 px-4 text-sm font-body',
                    isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
                  )}>
                    {t(f.key)}
                  </div>
                  <div className="p-3 flex items-center justify-center">
                    {f.others ? (
                      <Check className="h-4 w-4 text-muted-foreground/30" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground/25" />
                    )}
                  </div>
                  <div className="p-3 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-secondary/[0.06]" />
                    <Check className="h-4 w-4 text-secondary relative" />
                  </div>
                </div>
              );
            })}

            {/* Footer summary */}
            <div className="grid grid-cols-[1fr_100px_120px] sm:grid-cols-[1fr_140px_160px] border-t border-border">
              <div className="p-4 text-sm font-bold text-foreground font-heading">{t('cm_total')}</div>
              <div className="p-4 text-center">
                <span className="text-lg font-bold text-muted-foreground/50">4</span>
                <span className="text-[10px] text-muted-foreground/40 block">{t('cm_of_12')}</span>
              </div>
              <div className="p-4 text-center relative">
                <div className="absolute inset-0 bg-secondary/[0.06]" />
                <span className="text-lg font-bold text-secondary relative">12</span>
                <span className="text-[10px] text-secondary/60 block relative">{t('cm_of_12')}</span>
              </div>
            </div>
          </div>

          {/* Footnote */}
          <p className="text-[11px] text-muted-foreground/50 mt-3 text-center font-body">
            {t('cm_footnote')}
          </p>
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-2xl mx-auto mt-10 text-center"
        >
          <p className="text-lg font-heading font-semibold text-foreground">
            {t('cm_callout_1')}{' '}
            <span className="text-gradient-brand">{t('cm_callout_2')}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CompetitorMatrix;
