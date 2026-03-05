import { motion } from 'framer-motion';
import { Crosshair, Layers, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';

const cardKeys = [
  { icon: Crosshair, titleKey: 'why_card1_title', descKey: 'why_card1_desc' },
  { icon: Layers, titleKey: 'why_card2_title', descKey: 'why_card2_desc' },
  { icon: BarChart3, titleKey: 'why_card3_title', descKey: 'why_card3_desc' },
];

const WhyRankerAI = () => {
  const { user } = useAuth();
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
            {t('why_title_1')} <span className="text-gradient-brand">Ranker AI</span> {t('why_title_2')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body">
            {t('why_subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cardKeys.map((card, i) => (
            <motion.div
              key={card.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="group rounded-xl border border-border bg-card p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:glow-secondary">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 border border-secondary/20">
                  <card.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{t(card.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-body">{t(card.descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to={user ? '/dashboard' : '/auth'}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Button size="lg" className="font-semibold text-base px-8 gap-2 bg-gradient-brand text-primary-foreground rounded-lg glow-primary">
                {t('why_cta')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyRankerAI;
