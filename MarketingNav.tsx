import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, LogOut, User as UserIcon, LayoutDashboard } from 'lucide-react';
import logoIcon from '@/assets/logo-icon.png';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import RankerLogo from '@/components/dashboard/RankerLogo';
import LanguageSwitcher from '@/components/marketing/LanguageSwitcher';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const MarketingNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const { t } = useTranslation();

  const navLinks = [
    { label: t('nav_features'), href: '/#pillars' },
    { label: t('nav_how_it_works'), href: '/#how-it-works' },
    { label: t('nav_pricing'), href: '/pricing' },
  ];

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return location.pathname === '/' && location.hash === href.slice(1);
    return location.pathname === href;
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? 'U';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[70px] border-b border-border/50" style={{ backdropFilter: 'blur(16px)', backgroundColor: 'hsl(var(--background) / 0.8)' }}>
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-heading font-semibold text-lg text-foreground no-underline shrink-0" aria-label="Ranker AI Home">
          <img src={logoIcon} alt="Ranker AI" className="h-8 w-8 rounded-lg" loading="lazy" />
          ranker-ai<span className="text-muted-foreground">.de</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map((link) =>
            link.href.startsWith('/#') ? (
              <a
                key={link.label}
                href={link.href}
                className="text-[0.9rem] font-medium transition-colors text-muted-foreground hover:text-foreground no-underline"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className={cn(
                  'text-[0.9rem] font-medium transition-colors no-underline hover:text-foreground',
                  isActive(link.href) ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher compact />
          {loading ? (
            <div className="h-8 w-20 bg-muted rounded animate-pulse" />
          ) : user ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="font-medium gap-1.5">
                  <LayoutDashboard className="h-4 w-4" />
                  {t('nav_dashboard')}
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    <span className="text-xs font-bold text-primary">{initials}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="gap-2 cursor-pointer">
                      <LayoutDashboard className="h-4 w-4" />
                      {t('nav_dashboard')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="gap-2 cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4" />
                    {t('nav_sign_out')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="font-semibold text-foreground">
                  {t('nav_sign_in')}
                </Button>
              </Link>
              <Link to="/auth?tab=signup">
                <Button size="sm" className="font-semibold bg-gradient-brand text-primary-foreground rounded-lg px-5">
                  {t('nav_get_started')}
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 pt-12">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) =>
                link.href.startsWith('/#') ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'text-base font-medium transition-colors py-2',
                      isActive(link.href) ? 'text-primary' : 'text-foreground hover:text-primary'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}

              {/* Language switcher in mobile */}
              <div className="py-2">
                <LanguageSwitcher />
              </div>

              <div className="border-t border-border pt-4 mt-2 flex flex-col gap-3">
                {loading ? null : user ? (
                  <>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{initials}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{user.user_metadata?.full_name || 'User'}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                    <Link to="/dashboard" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full font-medium gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        {t('nav_dashboard')}
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full font-medium gap-2 text-destructive hover:text-destructive"
                      onClick={() => { handleSignOut(); setOpen(false); }}
                    >
                      <LogOut className="h-4 w-4" />
                      {t('nav_sign_out')}
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full font-medium">
                        {t('nav_sign_in')}
                      </Button>
                    </Link>
                    <Link to="/auth?tab=signup" onClick={() => setOpen(false)}>
                      <Button className="w-full font-semibold">
                        {t('nav_get_started')}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default MarketingNav;
