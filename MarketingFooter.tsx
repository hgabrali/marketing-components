import { Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MarketingFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-foreground font-heading font-bold text-lg">ranker-ai<span className="text-muted-foreground">.de</span></h3>
            <p className="text-sm text-muted-foreground mt-2">
              © {new Date().getFullYear()} Semantic Visibility. Created by Hande Gabrali Knobloch
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">{t('footer_product')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/#pillars" className="text-muted-foreground hover:text-foreground transition-colors">{t('footer_features')}</a></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">{t('footer_pricing')}</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">{t('footer_resources')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/#formula" className="text-muted-foreground hover:text-foreground transition-colors">{t('footer_docs')}</a></li>
              <li><a href="/#architecture" className="text-muted-foreground hover:text-foreground transition-colors">{t('footer_api')}</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">{t('footer_company')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/impressum" className="text-muted-foreground hover:text-foreground transition-colors">{t('footer_impressum')}</Link></li>
              <li><Link to="/datenschutz" className="text-muted-foreground hover:text-foreground transition-colors">{t('footer_datenschutz')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">{t('footer_bottom_tagline')}</p>
          <div className="flex items-center gap-3">
            <a href="https://www.dmca.com/Protection/Status.aspx?ID=26e98dc8-3c29-400e-8120-88663b14c90f" title="DMCA.com Protection Status" className="dmca-badge" target="_blank" rel="noopener noreferrer">
              <img src="https://images.dmca.com/Badges/dmca_protected_sml_120l.png?ID=26e98dc8-3c29-400e-8120-88663b14c90f" alt="DMCA.com Protection Status" className="h-5" />
            </a>
            <a href="https://www.linkedin.com/company/ranker-ai" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://twitter.com/rankerai" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MarketingFooter;
