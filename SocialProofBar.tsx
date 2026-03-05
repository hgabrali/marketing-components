import { motion } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';
import { Globe, Building2, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const stats = [
  { icon: Globe, value: 12, suffix: '+', labelKey: 'social_proof_countries', decimals: 0 },
  { icon: Building2, value: 47, suffix: '+', labelKey: 'social_proof_brands', decimals: 0 },
  { icon: Search, value: 2.3, suffix: 'M+', labelKey: 'social_proof_queries', decimals: 1 },
];

const SocialProofBar = () => {
  const { t } = useTranslation();

  return (
    <section className="py-14 relative">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-xl border border-border surface-elevated p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4">
              {stats.map((stat, i) => (
                <StatItem key={stat.labelKey} stat={stat} delay={i * 150} />
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-6 font-body">
              {t('social_proof_footnote')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const StatItem = ({
  stat,
  delay,
}: {
  stat: (typeof stats)[number];
  delay: number;
}) => {
  const { t } = useTranslation();
  const count = useCountUp(stat.value, 1400, stat.decimals, delay);

  return (
    <div className="flex flex-col items-center text-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 border border-secondary/20 glow-secondary">
        <stat.icon className="h-5 w-5 text-secondary" />
      </div>
      <div className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
        {count}
        <span className="text-secondary">{stat.suffix}</span>
      </div>
      <span className="text-sm text-muted-foreground font-body">{t(stat.labelKey)}</span>
    </div>
  );
};

export default SocialProofBar;
