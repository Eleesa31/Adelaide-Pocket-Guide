import React, { useState } from 'react';
import { 
  Compass, 
  UtensilsCrossed, 
  MapPin, 
  Calculator, 
  GraduationCap, 
  Info, 
  Menu, 
  X, 
  Sparkles, 
  Bus
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  plannedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, plannedCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'explore', label: 'Explore Adelaide', icon: MapPin },
    { id: 'food', label: 'Food & Cafes', icon: UtensilsCrossed },
    { id: 'plan', label: 'Plan Your Outing', icon: Calculator, badge: plannedCount > 0 ? plannedCount : undefined },
    { id: 'essentials', label: 'Student Essentials', icon: GraduationCap },
    { id: 'about', label: 'About & Contact', icon: Info },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-stone-800 transition-colors">
      {/* Top micro-announcement banner for international students */}
      <div className="bg-amber-600/90 text-stone-950 text-xs py-1 px-4 font-medium flex items-center justify-between text-center overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-2 mx-auto">
          <span className="inline-flex items-center gap-1 bg-amber-400 text-stone-950 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
            Student Tip
          </span>
          <span>Trams in Adelaide CBD between South Tce, Entertainment Centre & Botanic Gardens are <strong>100% Free</strong></span>
          <span className="hidden sm:inline text-amber-950/60">•</span>
          <span className="hidden sm:inline">28-day Student Concession Pass is only $27.00</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Brand */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-stone-950 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  Adelaide Pocket Guide
                </span>
                <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Student Edition
                </span>
              </div>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                Affordable • Confident • Independent Exploration
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className={`px-1.5 py-0.2 rounded-full text-xs font-bold ${
                      isActive ? 'bg-stone-900 text-amber-400' : 'bg-amber-500 text-stone-950'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleNavClick('plan')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cost Calculator</span>
              {plannedCount > 0 && (
                <span className="bg-emerald-950 text-emerald-200 px-1.5 py-0.5 rounded text-[11px]">
                  {plannedCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-2 pb-5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    isActive ? 'bg-stone-900 text-amber-300' : 'bg-amber-500 text-stone-950'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
