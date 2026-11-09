import React, { useState } from 'react';
import { 
  Bus, 
  Tag, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  HeartPulse, 
  Sparkles, 
  ExternalLink,
  Info,
  DollarSign,
  Compass,
  CheckSquare,
  Square,
  HelpCircle
} from 'lucide-react';
import { 
  STUDENT_DISCOUNTS, 
  TRANSIT_GUIDE_DATA, 
  SETTLING_IN_GUIDES, 
  SOCIAL_COMMUNITY_RESOURCES,
  NEWCOMER_CHECKLIST
} from '../data/studentEssentials';
import { DiscountItem } from '../types';

export const EssentialsView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'newcomer' | 'transport' | 'discounts' | 'settling' | 'social'>('newcomer');
  const [selectedDiscountCategory, setSelectedDiscountCategory] = useState<string>('all');
  const [completedChecklistSteps, setCompletedChecklistSteps] = useState<number[]>([]);

  const toggleChecklistStep = (stepNum: number) => {
    setCompletedChecklistSteps(prev => 
      prev.includes(stepNum) ? prev.filter(s => s !== stepNum) : [...prev, stepNum]
    );
  };

  const discountCategories = [
    { id: 'all', label: 'All Discounts' },
    { id: 'transit', label: 'Transit Passes' },
    { id: 'cinema_fun', label: 'Movies & Entertainment' },
    { id: 'culture', label: 'Museums & Galleries' },
    { id: 'tech_retail', label: 'Tech & Clothing' },
    { id: 'food_drink', label: 'Food & Groceries' },
  ];

  const filteredDiscounts = STUDENT_DISCOUNTS.filter((item) => {
    if (selectedDiscountCategory !== 'all' && item.category !== selectedDiscountCategory) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Audience Notice */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#E6F3F4] text-[#0A868C] border border-[#87A09B]/40">
          <BookOpen className="w-3.5 h-3.5 text-[#0A868C]" />
          <span>Tailored for International Students Aged 18–30</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A2E2C] tracking-tight">
          Student Essentials & Newcomer Survival Guide
        </h1>
        <p className="text-[#475E5A] text-sm sm:text-base max-w-3xl leading-relaxed">
          Designed specifically for newcomers who are budget-conscious, new to Adelaide, and dependent on public transport. Master the local transit system, claim verified student discounts, and find welcoming communities to build a genuine sense of belonging.
        </p>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-2 border-b border-[#D4DDD9] overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'newcomer', label: 'Newcomer Survival (First 30 Days)', icon: Compass, badge: 'Start Here' },
          { id: 'transport', label: 'Public Transport Guide', icon: Bus },
          { id: 'discounts', label: 'Student Discounts Directory', icon: Tag },
          { id: 'settling', label: 'Settling in Adelaide', icon: ShieldCheck },
          { id: 'social', label: 'Social Connection & Belonging', icon: Users, badge: 'Make Friends' },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-3 rounded-t-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                active
                  ? 'border-[#0A868C] text-[#0A868C] bg-[#E6F3F4]/60'
                  : 'border-transparent text-[#5B6E6A] hover:text-[#0A868C] hover:bg-[#EFF4F2]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                  active ? 'bg-[#0A868C] text-white' : 'bg-[#D4DDD9] text-[#1A2E2C]'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sub-tab 0: Newcomer Survival Checklist (First 30 Days) */}
      {activeSubTab === 'newcomer' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-[#0A868C] via-[#087378] to-[#0666A7] rounded-3xl p-6 sm:p-8 text-white shadow-md space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold bg-white/20 text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#D0A18F]" />
              <span>Welcome to South Australia!</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Your First 30 Days in Adelaide: Confidence Checklist
            </h2>
            <p className="text-xs sm:text-sm text-[#E6F3F4] max-w-3xl leading-relaxed">
              Arriving in a brand-new city can feel intimidating. Check off these 6 vital steps to master transit, save money from Day 1, avoid getting lost, and start feeling like a true Adelaide local.
            </p>

            {/* Progress counter */}
            <div className="pt-2 flex items-center gap-3 text-xs">
              <div className="bg-black/30 rounded-full h-3 flex-1 overflow-hidden">
                <div 
                  className="bg-[#D0A18F] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${(completedChecklistSteps.length / NEWCOMER_CHECKLIST.length) * 100}%` }}
                />
              </div>
              <span className="font-bold text-[#E6F3F4] shrink-0">
                {completedChecklistSteps.length} of {NEWCOMER_CHECKLIST.length} completed
              </span>
            </div>
          </div>

          {/* Checklist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NEWCOMER_CHECKLIST.map((step) => {
              const isDone = completedChecklistSteps.includes(step.step);
              return (
                <div
                  key={step.step}
                  onClick={() => toggleChecklistStep(step.step)}
                  className={`bg-white border rounded-2xl p-6 shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-4 group ${
                    isDone 
                      ? 'border-[#0A868C] bg-[#E6F3F4]/30' 
                      : 'border-[#D4DDD9] hover:border-[#0A868C]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                          isDone 
                            ? 'bg-[#0A868C] text-white' 
                            : 'bg-[#EFF4F2] text-[#0A868C] group-hover:bg-[#0A868C] group-hover:text-white'
                        }`}>
                          {step.step}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#87A09B]">
                          Step {step.step}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        {isDone ? (
                          <span className="text-[#0A868C] flex items-center gap-1">
                            <CheckSquare className="w-5 h-5 text-[#0A868C]" />
                            <span>Done!</span>
                          </span>
                        ) : (
                          <span className="text-[#87A09B] group-hover:text-[#0A868C] flex items-center gap-1">
                            <Square className="w-5 h-5" />
                            <span>Mark complete</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className={`text-base font-bold ${isDone ? 'text-[#0A868C]' : 'text-[#1A2E2C]'}`}>
                      {step.title}
                    </h3>

                    <p className="text-xs text-[#475E5A] leading-relaxed">
                      {step.detail}
                    </p>
                  </div>

                  {/* Pro Tip */}
                  <div className="p-3 bg-[#EFF4F2] rounded-xl border border-[#87A09B]/40 text-xs text-[#1A2E2C]">
                    <span className="font-bold text-[#0A868C]">Student Pro-Tip: </span>
                    <span>{step.proTip}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Sub-tab 1: Public Transport Guide */}
      {activeSubTab === 'transport' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Free Tram Zone Feature Card */}
          <div className="bg-gradient-to-br from-[#0A868C] via-[#076E73] to-[#0666A7] rounded-3xl p-6 sm:p-8 text-white shadow-md space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/20">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-[#0A868C] uppercase tracking-wider">
                  100% Free Public Transport
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  The Adelaide Free City Tram Zone
                </h2>
              </div>
              <div className="text-left md:text-right">
                <span className="text-[#D0A18F] font-bold text-sm block">No metroCARD tap required</span>
                <span className="text-xs text-[#E6F3F4]">Hop on & hop off at any stop in the zone</span>
              </div>
            </div>

            <p className="text-[#E6F3F4] text-xs sm:text-sm leading-relaxed max-w-3xl">
              Trams operating within the city centre are completely free for all passengers. You can travel from South Terrace, past Victoria Square and Rundle Mall, all the way to the Adelaide Entertainment Centre in the west, or branch east to the Adelaide Botanic Gardens.
            </p>

            {/* List of Free Tram Stops */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D0A18F]">
                Stops in the Free Tram Zone:
              </span>
              <div className="flex flex-wrap gap-2">
                {TRANSIT_GUIDE_DATA.freeZones[0].stops?.map((stop) => (
                  <span
                    key={stop}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#1A2E2C]/50 border border-white/20 text-white flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-[#D0A18F]" />
                    <span>{stop}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Concession metroCARD Rates & Guide */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <div className="bg-white border border-[#D4DDD9] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-[#1A2E2C] font-bold text-lg">
                <CreditCard className="w-5 h-5 text-[#0A868C]" />
                <h2>Student Concession Fares (2026)</h2>
              </div>
              <p className="text-xs text-[#5B6E6A] leading-relaxed">
                Adelaide Metro offers heavily subsidized fares for full-time university and college students aged 18+ using the green Concession metroCARD.
              </p>

              <div className="space-y-2.5 pt-2">
                {TRANSIT_GUIDE_DATA.metroCard.fares.map((fare) => (
                  <div
                    key={fare.type}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#EFF4F2] border border-[#D4DDD9] text-xs"
                  >
                    <span className="text-[#1A2E2C] font-medium pr-2">{fare.type}</span>
                    <span className="font-black text-sm text-[#0A868C] whitespace-nowrap">{fare.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#D4DDD9] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-[#1A2E2C] font-bold text-lg">
                <Info className="w-5 h-5 text-[#0666A7]" />
                <h2>Crucial Rules to Avoid Transit Fines</h2>
              </div>
              <p className="text-xs text-[#5B6E6A] leading-relaxed">
                South Australian transport officers carry handheld scanners and issue fines (often exceeding $200) for common mistakes. Follow these golden rules:
              </p>

              <div className="space-y-3 pt-2">
                {TRANSIT_GUIDE_DATA.metroCard.topTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#475E5A]">
                    <CheckCircle2 className="w-4 h-4 text-[#0A868C] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#E6F3F4] rounded-xl border border-[#0A868C]/30 text-xs text-[#076E73] font-medium">
                <strong>Where to buy:</strong> Buy your Concession metroCARD ($5 fee) at Adelaide Railway Station InfoCentre or campus bookshops.
              </div>
            </div>

          </div>

          {/* Free City Connector Buses & O-Bahn */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#D4DDD9] rounded-2xl p-6 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#0A868C] uppercase tracking-wider">
                Free Bus Routes
              </span>
              <h3 className="text-lg font-bold text-[#1A2E2C]">
                City Connector Buses (98A, 98C, 99A, 99C)
              </h3>
              <p className="text-xs text-[#5B6E6A] leading-relaxed">
                Free loops linking the CBD and North Adelaide. Air-conditioned with wheelchair access and free Wi-Fi on board. No ticket or metroCARD tap is required.
              </p>
              <div className="p-3 bg-[#EFF4F2] rounded-xl text-xs text-[#1A2E2C] space-y-1">
                <div><strong>Route 98A / 98C:</strong> Links CBD, North Terrace, Adelaide Oval, O’Connell St & Melbourne St.</div>
                <div><strong>Route 99A / 99C:</strong> Smaller loop inside Adelaide CBD shopping and market district.</div>
              </div>
            </div>

            <div className="bg-white border border-[#D4DDD9] rounded-2xl p-6 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#0666A7] uppercase tracking-wider">
                Rapid Guided Transit
              </span>
              <h3 className="text-lg font-bold text-[#1A2E2C]">
                O-Bahn Guided Busway (To Tea Tree Plaza)
              </h3>
              <p className="text-xs text-[#5B6E6A] leading-relaxed">
                The world-famous guided bus system where city buses lock into raised concrete tracks and cruise at 100km/h directly from the CBD through River Torrens linear park.
              </p>
              <div className="p-3 bg-[#EBF4FA] rounded-xl text-xs text-[#1A2E2C] space-y-1">
                <div><strong>Great for:</strong> Westfield Tea Tree Plaza shopping center, Linear Park walks, and northeastern campuses.</div>
                <div><strong>Fare:</strong> Standard concession rates apply outside CBD.</div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Sub-tab 2: Student Discounts Directory */}
      {activeSubTab === 'discounts' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {discountCategories.map((cat) => {
              const active = selectedDiscountCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedDiscountCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#0A868C] text-white font-bold'
                      : 'bg-white border border-[#D4DDD9] text-[#2D4543] hover:bg-[#EFF4F2]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDiscounts.map((disc) => (
              <div
                key={disc.id}
                className="bg-white border border-[#D4DDD9] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[#87A09B]">
                      {disc.provider}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E6F3F4] text-[#0A868C]">
                      {disc.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1A2E2C]">
                    {disc.title}
                  </h3>

                  <div className="p-3 bg-[#EFF4F2] rounded-xl border border-[#D4DDD9] text-xs text-[#1A2E2C] font-medium">
                    {disc.discountSummary}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#EFF4F2] text-xs">
                  <div>
                    <span className="font-bold text-[#1A2E2C]">How to claim: </span>
                    <span className="text-[#5B6E6A]">{disc.howToClaim}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#1A2E2C]">Requirement: </span>
                    <span className="text-[#87A09B] italic">{disc.requirements}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Sub-tab 3: Settling in Adelaide */}
      {activeSubTab === 'settling' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SETTLING_IN_GUIDES.map((guide) => (
              <div
                key={guide.id}
                className="bg-white border border-[#D4DDD9] rounded-2xl p-6 shadow-xs space-y-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#E6F3F4] text-[#0A868C] flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#1A2E2C]">
                    {guide.title}
                  </h3>
                </div>

                <ul className="space-y-2.5 text-xs text-[#475E5A] leading-relaxed">
                  {guide.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0A868C] shrink-0 mt-1.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-tab 4: Social Connection & Belonging */}
      {activeSubTab === 'social' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="bg-gradient-to-r from-[#0A868C] via-[#0666A7] to-[#0A868C] rounded-3xl p-6 sm:p-8 text-white space-y-2 shadow-md">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-white text-[#0A868C] uppercase tracking-wider">
              Building Your Sense of Belonging
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Opportunities for Social Connection & Meeting Locals
            </h2>
            <p className="text-xs sm:text-sm text-[#E6F3F4] font-medium max-w-2xl leading-relaxed">
              Whether you want low-key language exchanges, weekend run clubs, university societies, or casual board-game hangouts, Adelaide is known for its warm, inclusive youth culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SOCIAL_COMMUNITY_RESOURCES.map((res) => (
              <div
                key={res.title}
                className="bg-white border border-[#D4DDD9] rounded-2xl p-6 shadow-xs space-y-3 flex flex-col justify-between group hover:border-[#0A868C] transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#EFF4F2] text-[#4F6D67]">
                      {res.type}
                    </span>
                    <span className="text-[11px] font-semibold text-[#0A868C] bg-[#E6F3F4] px-2 py-0.5 rounded-full">
                      Free / Low-Cost
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#1A2E2C] group-hover:text-[#0A868C] transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-xs text-[#475E5A] leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EFF4F2] flex items-center justify-between text-xs text-[#5B6E6A]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#87A09B]" />
                    <span>{res.location}</span>
                  </span>
                  {res.actionUrl !== '#' && (
                    <a
                      href={res.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0A868C] hover:text-[#076E73] font-bold flex items-center gap-1"
                    >
                      <span>Join / Learn More</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
