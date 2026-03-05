import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

const ROW_KEYS = [
  'hrc_mention_monitoring',
  'hrc_sentiment_tracking',
  'hrc_llm_reports',
  'hrc_competitive_bench',
  'hrc_semantic_drift',
  'hrc_tone_persona',
  'hrc_agentic_journey',
  'hrc_machine_persuasion',
  'hrc_hallucination_prev',
  'hrc_realtime_signal',
];

const ROW_VALUES: [boolean, boolean, boolean][] = [
  [true, true, true],
  [true, true, true],
  [true, true, true],
  [false, true, true],
  [false, false, true],
  [false, false, true],
  [false, false, true],
  [false, false, true],
  [false, false, true],
  [false, false, true],
];

const HowRankerCompares = () => {
  const { t } = useTranslation();

  const COLUMNS = [t('hrc_col_feature'), t('hrc_col_basic'), t('hrc_col_advanced'), 'Ranker AI Pro'];

  return (
    <section className="max-w-5xl mx-auto mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-foreground text-center mb-8 font-heading">
          {t('hrc_title')}
        </h2>

        <div className="rounded-xl border border-border overflow-hidden" style={{ backgroundColor: 'hsl(220 20% 8%)' }}>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {COLUMNS.map((col, i) => (
                    <TableHead
                      key={col}
                      className={cn(
                        'text-foreground font-semibold font-heading',
                        i === 0 ? 'w-[260px]' : 'text-center min-w-[120px]',
                        i === 3 && 'text-secondary bg-secondary/[0.06]'
                      )}
                    >
                      {col}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {ROW_KEYS.map((key, rowIdx) => (
                  <TableRow key={key}>
                    <TableCell className={cn(
                      'text-sm font-medium font-body',
                      ROW_VALUES[rowIdx][2] && !ROW_VALUES[rowIdx][0] ? 'text-foreground' : 'text-muted-foreground'
                    )}>
                      {t(key)}
                    </TableCell>
                    {ROW_VALUES[rowIdx].map((val, i) => (
                      <TableCell key={i} className={cn('text-center', i === 2 && 'bg-secondary/[0.06]')}>
                        {val ? (
                          <Check className={cn('h-4 w-4 mx-auto', i === 2 ? 'text-secondary' : 'text-muted-foreground/40')} />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/20 mx-auto" />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="grid grid-cols-4 border-t border-border">
            <div className="p-4 text-sm font-bold text-foreground font-heading">{t('hrc_total')}</div>
            <div className="p-4 text-center">
              <span className="text-lg font-bold text-muted-foreground/50">3</span>
              <span className="text-[10px] text-muted-foreground/40 block">{t('hrc_of_10')}</span>
            </div>
            <div className="p-4 text-center">
              <span className="text-lg font-bold text-muted-foreground/50">4</span>
              <span className="text-[10px] text-muted-foreground/40 block">{t('hrc_of_10')}</span>
            </div>
            <div className="p-4 text-center bg-secondary/[0.06]">
              <span className="text-lg font-bold text-secondary">10</span>
              <span className="text-[10px] text-secondary/60 block">{t('hrc_of_10')}</span>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground/50 mt-3 text-center font-body">
          {t('hrc_disclaimer')}
        </p>
      </motion.div>
    </section>
  );
};

export default HowRankerCompares;
