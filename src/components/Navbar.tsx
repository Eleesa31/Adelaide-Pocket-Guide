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
    { id: 'plan', label: 'Plan Outing', icon: Calculator, badge: plannedCount > 0 ? plannedCount : undefined },
    { id: 'essentials', label: 'Student Essentials', icon: GraduationCap },
    { id: 'about', label: 'About & FAQs', icon: Info },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md text-[#1A2E2C] border-b border-[#D4DDD9] shadow-xs transition-colors">
      
      {/* Top gentle reminder banner using Ocean / Teal tints */}
      <div className="bg-[#E6F3F4] text-[#076E73] text-xs py-1.5 px-4 font-medium flex items-center justify-between text-center overflow-x-auto whitespace-nowrap border-b border-[#C2DFE1]">
        <div className="flex items-center gap-2 mx-auto">
          <span className="inline-flex items-center gap-1 bg-[#0A868C] text-white px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
            Transit Tip
          </span>
          <span>Adelaide CBD Trams are <strong>100% Free</strong> between South Tce, Entertainment Centre & Botanic Gardens</span>
          <span className="hidden sm:inline text-[#87A09B]">•</span>
          <span className="hidden sm:inline">Student Concession is only $1.25 peak / $0.85 off-peak</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Brand */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0A868C] text-white flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-bold tracking-tight text-[#1A2E2C] group-hover:text-[#0A868C] transition-colors">
                  Adelaide Pocket Guide
                </span>
                <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#EFF4F2] text-[#3D5B55] border border-[#87A09B]/40">
                  Student Companion
                </span>
              </div>
              <p className="text-[11px] text-[#5B6E6A] hidden sm:block">
                Affordable • Confident • Independent
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0A868C] text-white shadow-xs'
                      : 'text-[#3E5552] hover:text-[#0A868C] hover:bg-[#EFF4F2]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#87A09B]'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                      isActive ? 'bg-[#D0A18F] text-[#1A2E2C]' : 'bg-[#0A868C] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleNavClick('plan')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0666A7] hover:bg-[#05548A] text-white shadow-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D0A18F]" />
              <span>Cost Calculator</span>
              {plannedCount > 0 && (
                <span className="bg-[#D0A18F] text-[#1A2E2C] px-1.5 py-0.2 rounded-full text-[10px] font-black">
                  {plannedCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#3E5552] hover:text-[#0A868C] hover:bg-[#EFF4F2] focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#D4DDD9] px-4 pt-2 pb-5 space-y-1 shadow-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#0A868C] text-white font-bold'
                    : 'text-[#3E5552] hover:bg-[#EFF4F2] hover:text-[#0A868C]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#87A09B]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    isActive ? 'bg-[#D0A18F] text-[#1A2E2C]' : 'bg-[#0A868C] text-white'
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
