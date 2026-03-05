import { ReactNode } from 'react';
import MarketingNav from './MarketingNav';
import MarketingFooter from './MarketingFooter';

const MarketingLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-background">
    <MarketingNav />
    <div className="flex-1 pt-[70px]">{children}</div>
    <MarketingFooter />
  </div>
);

export default MarketingLayout;
