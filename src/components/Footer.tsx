import React from 'react';
import { Heart, Bus, Phone, Compass, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      {/* Acknowledgement of Country banner */}
      <div className="bg-stone-900 border-b border-stone-800/80 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-stone-400 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <p className="leading-relaxed">
              <strong>Acknowledgement of Country:</strong> We acknowledge the Kaurna Meyunna people, the traditional custodians of the Adelaide Plains (Tarntanya), and pay respect to their elders past and present.
            </p>
          </div>
          <span className="text-stone-500 text-[11px] whitespace-nowrap">
            Tarntanya (Adelaide) • South Australia
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-stone-950 font-bold">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white">Adelaide Pocket Guide</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Empowering international students to discover Adelaide affordably, confidently and independently. Bringing budget activities, cheap eats, student deals and transparent transit into one welcoming pocket companion.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-800 text-[11px] text-amber-300 border border-stone-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Independent Student Initiative</span>
            </div>
          </div>

          {/* Quick Discovery Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">
              Explore Adelaide
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('explore')} className="hover:text-amber-400 transition-colors">
                  $0 Free Cultural Heritage Trail
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('explore')} className="hover:text-amber-400 transition-colors">
                  Glenelg Beach & Coastal Jetty Sunsets
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('explore')} className="hover:text-amber-400 transition-colors">
                  Adelaide Botanic Gardens & Glasshouses
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('food')} className="hover:text-amber-400 transition-colors">
                  Chinatown & Central Market Cheap Eats
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('food')} className="hover:text-amber-400 transition-colors">
                  Bakery on O’Connell (24/7 Student Staple)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('plan')} className="hover:text-amber-400 transition-colors">
                  Interactive Outing Cost Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Student Essentials */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">
              Student Essentials
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('essentials')} className="hover:text-amber-400 transition-colors">
                  Free City Tram Zone (South Tce to AEC)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('essentials')} className="hover:text-amber-400 transition-colors">
                  Free 98A/98C City Connector Buses
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('essentials')} className="hover:text-amber-400 transition-colors">
                  $27 / 28-Day Student Concession Pass
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('essentials')} className="hover:text-amber-400 transition-colors">
                  Palace Nova $10.50 Student Mondays
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('essentials')} className="hover:text-amber-400 transition-colors">
                  OSHC & Direct-Billing Student Clinics
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('essentials')} className="hover:text-amber-400 transition-colors">
                  Local Slang & Culture Decoder
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Helpful Contacts */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">
              Important Adelaide Numbers
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2 bg-stone-900/80 p-2 rounded border border-stone-800">
                <Phone className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-200">000 (Triple Zero)</span>
                  <p className="text-[11px]">Life-threatening Emergency (Free)</p>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-stone-900/80 p-2 rounded border border-stone-800">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-200">131 444</span>
                  <p className="text-[11px]">Non-Emergency Police Assistance</p>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-stone-900/80 p-2 rounded border border-stone-800">
                <Bus className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-200">1300 311 108</span>
                  <p className="text-[11px]">Adelaide Metro InfoLine (7am–8pm)</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <span>Built with care for international students living in South Australia</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Adelaide Pocket Guide</span>
            <span>•</span>
            <button onClick={() => onSelectTab('about')} className="hover:text-stone-300">
              FAQs & Feedback
            </button>
            <span>•</span>
            <span>Prices reviewed for 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
