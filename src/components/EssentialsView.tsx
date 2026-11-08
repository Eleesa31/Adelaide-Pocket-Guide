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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-950 border border-amber-300">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          <span>Tailored for International Students Aged 18–30</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Student Essentials & Newcomer Survival Guide
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          Designed specifically for newcomers who are budget-conscious, new to Adelaide, and dependent on public transport. Master the local transit system, claim verified student discounts, and find welcoming communities to build a genuine sense of belonging.
        </p>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-1 scrollbar-none">
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
              className={`flex items-center gap-2 px-3.5 py-3 rounded-t-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
                active
                  ? 'border-amber-500 text-amber-600 bg-amber-50/50'
                  : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                  active ? 'bg-amber-500 text-stone-950' : 'bg-stone-200 text-stone-700'
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
          <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold bg-white/20 text-white">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Welcome to South Australia!</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Your First 30 Days in Adelaide: Confidence Checklist
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 max-w-3xl leading-relaxed">
              Arriving in a brand-new city can feel intimidating. Check off these 6 vital steps to master transit, save money from Day 1, avoid getting lost, and start feeling like a true Adelaide local.
            </p>

            {/* Progress counter */}
            <div className="pt-2 flex items-center gap-3 text-xs">
              <div className="bg-black/30 rounded-full h-3 flex-1 overflow-hidden">
                <div 
                  className="bg-amber-300 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${(completedChecklistSteps.length / NEWCOMER_CHECKLIST.length) * 100}%` }}
                />
              </div>
              <span className="font-bold text-amber-200 shrink-0">
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
                  className={`bg-white border rounded-2xl p-6 shadow-sm transition-all cursor-pointer flex flex-col justify-between space-y-4 group ${
                    isDone 
                      ? 'border-emerald-300 bg-emerald-50/30' 
                      : 'border-stone-200 hover:border-amber-400'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                          isDone 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-amber-100 text-amber-900 group-hover:bg-amber-500 group-hover:text-stone-950'
                        }`}>
                          {step.step}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                          Step {step.step}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        {isDone ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckSquare className="w-5 h-5 text-emerald-600" />
                            <span>Done!</span>
                          </span>
                        ) : (
                          <span className="text-stone-400 group-hover:text-amber-600 flex items-center gap-1">
                            <Square className="w-5 h-5" />
                            <span>Mark complete</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className={`text-base font-bold ${isDone ? 'text-emerald-950' : 'text-stone-900'}`}>
                      {step.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>

                  {/* Pro Tip */}
                  <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 text-xs text-amber-950">
                    <span className="font-bold text-amber-900">Student Pro-Tip: </span>
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
          <div className="bg-gradient-to-br from-emerald-800 via-teal-900 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-emerald-700/60">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-400 text-stone-950 uppercase tracking-wider">
                  100% Free Public Transport
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  The Adelaide Free City Tram Zone
                </h2>
              </div>
              <div className="text-left md:text-right">
                <span className="text-emerald-300 font-bold text-sm block">No metroCARD tap required</span>
                <span className="text-xs text-stone-300">Hop on & hop off at any stop in the zone</span>
              </div>
            </div>

            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed max-w-3xl">
              Trams operating within the city centre are completely free for all passengers. You can travel from South Terrace, past Victoria Square and Rundle Mall, all the way to the Adelaide Entertainment Centre in the west, or branch east to the Adelaide Botanic Gardens.
            </p>

            {/* List of Free Tram Stops */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Stops in the Free Tram Zone:
              </span>
              <div className="flex flex-wrap gap-2">
                {TRANSIT_GUIDE_DATA.freeZones[0].stops?.map((stop) => (
                  <span
                    key={stop}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-950/80 border border-emerald-600/40 text-emerald-100 flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{stop}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Concession metroCARD Rates & Guide */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-lg">
                <CreditCard className="w-5 h-5 text-amber-600" />
                <h2>Student Concession Fares (2026)</h2>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Adelaide Metro offers heavily subsidized fares for full-time university and college students aged 18+ using the green Concession metroCARD.
              </p>

              <div className="space-y-2.5 pt-2">
                {TRANSIT_GUIDE_DATA.metroCard.fares.map((fare) => (
                  <div
                    key={fare.type}
                    className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                  >
                    <span className="text-stone-700 font-medium pr-2">{fare.type}</span>
                    <span className="font-black text-sm text-stone-900 whitespace-nowrap">{fare.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-lg">
                <Info className="w-5 h-5 text-sky-600" />
                <h2>Crucial Rules to Avoid Transit Fines</h2>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                South Australian transport officers carry handheld scanners and issue fines (often exceeding $200) for common mistakes. Follow these golden rules:
              </p>

              <div className="space-y-3 pt-2">
                {TRANSIT_GUIDE_DATA.metroCard.topTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium">
                <strong>Where to buy:</strong> Buy your Concession metroCARD ($5 fee) at Adelaide Railway Station InfoCentre or campus bookshops.
              </div>
            </div>

          </div>

          {/* Free City Connector Buses & O-Bahn */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                Free Bus Routes
              </span>
              <h3 className="text-lg font-bold text-stone-900">
                City Connector Buses (98A, 98C, 99A, 99C)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Free loops linking the CBD and North Adelaide. Air-conditioned with wheelchair access and free Wi-Fi on board. No ticket or metroCARD tap is required.
              </p>
              <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-700 space-y-1">
                <div><strong>Route 98A / 98C:</strong> Links CBD, North Terrace, Adelaide Oval, O’Connell St & Melbourne St.</div>
                <div><strong>Route 99A / 99C:</strong> Smaller loop inside Adelaide CBD shopping and market district.</div>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Rapid Guided Transit
              </span>
              <h3 className="text-lg font-bold text-stone-900">
                O-Bahn Guided Busway (To Tea Tree Plaza)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                The world-famous guided bus system where city buses lock into raised concrete tracks and cruise at 100km/h directly from the CBD through River Torrens linear park.
              </p>
              <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-700 space-y-1">
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
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
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
                className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-stone-500">
                      {disc.provider}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                      {disc.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900">
                    {disc.title}
                  </h3>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs text-stone-800 font-medium">
                    {disc.discountSummary}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
                  <div>
                    <span className="font-bold text-stone-700">How to claim: </span>
                    <span className="text-stone-600">{disc.howToClaim}</span>
                  </div>
                  <div>
                    <span className="font-bold text-stone-700">Requirement: </span>
                    <span className="text-stone-500 italic">{disc.requirements}</span>
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
                className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900">
                    {guide.title}
                  </h3>
                </div>

                <ul className="space-y-2.5 text-xs text-stone-600 leading-relaxed">
                  {guide.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
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
          
          <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-stone-950 space-y-2 shadow-lg">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-stone-950 text-white uppercase tracking-wider">
              Building Your Sense of Belonging
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Opportunities for Social Connection & Meeting Locals
            </h2>
            <p className="text-xs sm:text-sm text-stone-950 font-medium max-w-2xl leading-relaxed">
              Whether you want low-key language exchanges, weekend run clubs, university societies, or casual board-game hangouts, Adelaide is known for its warm, inclusive youth culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SOCIAL_COMMUNITY_RESOURCES.map((res) => (
              <div
                key={res.title}
                className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-3 flex flex-col justify-between group hover:border-amber-400 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-stone-100 text-stone-700">
                      {res.type}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Free / Low-Cost
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{res.location}</span>
                  </span>
                  {res.actionUrl !== '#' && (
                    <a
                      href={res.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1"
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
