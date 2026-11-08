import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Compass, 
  MapPin, 
  DollarSign, 
  Bus, 
  Clock, 
  ArrowRight, 
  Heart, 
  Utensils, 
  CheckCircle2, 
  ShieldCheck, 
  Coins
} from 'lucide-react';
import { Activity, FoodSpot } from '../types';
import { ACTIVITIES } from '../data/activities';
import { FOOD_PLACES } from '../data/foodPlaces';
import adelaideHeroImg from '../assets/adelaide-hero.svg';
import adelaideTramImg from '../assets/adelaide-tram.svg';
import adelaideBeachImg from '../assets/adelaide-beach.svg';

interface HomeViewProps {
  onSelectTab: (tab: string) => void;
  onOpenActivity: (activity: Activity) => void;
  onFilterBudget: (budgetMax: number) => void;
  plannedIds: string[];
  onTogglePlanActivity: (activity: Activity) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  onOpenActivity,
  onFilterBudget,
  plannedIds,
  onTogglePlanActivity
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const featuredActivities = ACTIVITIES.filter(a => a.featured).slice(0, 4);
  const featuredFoods = FOOD_PLACES.filter(f => f.featured).slice(0, 3);

  // Quick budget presets
  const budgetPresets = [
    { label: '$0 Free Adventures', max: 0, desc: 'Museums, Botanic Gardens, Coastal trails', color: 'from-emerald-500 to-teal-600', badge: '100% Free' },
    { label: 'Under $10 Pocket Trips', max: 10, desc: 'Beach sunsets & 24/7 bakery pies', color: 'from-amber-500 to-orange-600', badge: 'Super Cheap' },
    { label: 'Under $25 Day Outings', max: 25, desc: 'Hills koala hike, train + warm lunch', color: 'from-sky-500 to-indigo-600', badge: 'Popular' },
    { label: 'Under $50 Big Weekend', max: 50, desc: 'Full day adventure + multi-course feast', color: 'from-purple-500 to-pink-600', badge: 'Weekend Treat' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSelectTab('explore');
    }
  };

  return (
    <div className="space-y-16 pb-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-stone-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 shadow-2xl border border-stone-800">
        <div className="absolute inset-0 opacity-25 mix-blend-luminosity pointer-events-none">
          <img 
            src={adelaideHeroImg} 
            alt="Adelaide skyline and River Torrens" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent pointer-events-none" />

        <div className="relative max-w-4xl px-6 sm:px-12 py-12 sm:py-20 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>International Students (Aged 18–30)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Bus className="w-3.5 h-3.5 text-emerald-400" />
              <span>Public Transport-First</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-stone-100">
            Explore Adelaide <span className="text-amber-400">Affordably</span>, Confidently & Independently.
          </h1>

          <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl font-light">
            Your friendly pocket companion for newcomers unfamiliar with the city and navigating without a car. Discover $0 hidden gems, cheap student eats, effortless public transport hacks, and welcoming opportunities to meet people and feel at home.
          </p>

          {/* Quick Newcomer / Solo vs Social Action buttons */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => onSelectTab('essentials')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Compass className="w-4 h-4 text-stone-950" />
              <span>Newcomer Survival Checklist</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('explore')}
              className="px-4 py-2 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-stone-200 font-semibold text-xs sm:text-sm border border-stone-700 transition-colors"
            >
              <span>Independent Solo Exploration</span>
            </button>
          </div>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearchSubmit} className="pt-2 max-w-xl">
            <div className="relative flex items-center bg-white rounded-2xl p-1.5 shadow-lg border border-stone-200">
              <Search className="w-5 h-5 text-stone-400 ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Search activities, food, tram stops (e.g. Glenelg, Botanic, Dumplings)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm text-stone-900 bg-transparent focus:outline-none placeholder:text-stone-400"
              />
              <button
                type="button"
                onClick={() => onSelectTab('explore')}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shrink-0 transition-colors shadow-sm"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Stats Banner */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="bg-stone-900/80 backdrop-blur-sm border border-stone-800 p-3 rounded-xl">
              <span className="text-amber-400 font-bold text-lg block">$0.00</span>
              <span className="text-stone-400 text-[11px] leading-tight block">Free City Tram Zone in CBD</span>
            </div>
            <div className="bg-stone-900/80 backdrop-blur-sm border border-stone-800 p-3 rounded-xl">
              <span className="text-emerald-400 font-bold text-lg block">$1.25</span>
              <span className="text-stone-400 text-[11px] leading-tight block">Student Concession Fare Peak</span>
            </div>
            <div className="bg-stone-900/80 backdrop-blur-sm border border-stone-800 p-3 rounded-xl">
              <span className="text-amber-400 font-bold text-lg block">$27.00</span>
              <span className="text-stone-400 text-[11px] leading-tight block">28-Day Unlimited Pass</span>
            </div>
            <div className="bg-stone-900/80 backdrop-blur-sm border border-stone-800 p-3 rounded-xl">
              <span className="text-sky-400 font-bold text-lg block">29 Parks</span>
              <span className="text-stone-400 text-[11px] leading-tight block">Free Green Parklands Ring</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Budget Discovery Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <Coins className="w-3.5 h-3.5" />
            <span>Fast Budget Filters</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            How much do you want to spend today?
          </h2>
          <p className="text-sm text-stone-600">
            Click any budget tier to instantly see matching activities, cheap eats, and transit routes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {budgetPresets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                onFilterBudget(preset.max);
                onSelectTab('explore');
              }}
              className="text-left bg-white hover:bg-stone-50 border border-stone-200/90 hover:border-amber-400 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className={`h-1.5 w-full absolute top-0 left-0 bg-gradient-to-r ${preset.color}`} />
              <div className="flex items-center justify-between mb-3 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                  {preset.badge}
                </span>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                {preset.label}
              </h3>
              <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                {preset.desc}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Experiences Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Must-Do For New Students</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Featured Adelaide Experiences
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Hand-picked by international students who call Adelaide home.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('explore')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
          >
            <span>View All 12+ Activities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredActivities.map((act) => {
            const isPlanned = plannedIds.includes(act.id);
            return (
              <div
                key={act.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group"
              >
                {/* Visual Header */}
                <div className="h-44 bg-gradient-to-br from-amber-700 via-rose-700 to-amber-900 relative p-4 flex flex-col justify-between text-white overflow-hidden">
                  <div className="flex items-center justify-between z-10">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-stone-900 shadow-sm">
                      {act.categoryLabel}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTogglePlanActivity(act);
                      }}
                      className={`p-1.5 rounded-full transition-colors ${
                        isPlanned
                          ? 'bg-rose-500 text-white'
                          : 'bg-black/30 hover:bg-black/50 text-white'
                      }`}
                      title={isPlanned ? 'Remove from Outing Plan' : 'Add to Outing Plan'}
                    >
                      <Heart className={`w-4 h-4 ${isPlanned ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  {/* Aesthetic visual illustration backdrop */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src={act.id === 'glenelg-beach-sunset' ? adelaideBeachImg : adelaideTramImg} 
                      alt="" 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  <div className="z-10">
                    <span className="text-[11px] font-semibold text-amber-200 block mb-0.5">
                      {act.locationName}
                    </span>
                    <h3 className="font-bold text-base leading-snug line-clamp-2">
                      {act.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {act.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Admission</span>
                      </span>
                      <span className="font-bold text-stone-900">
                        {act.costDescription}
                      </span>
                    </div>

                    <div className="flex items-start gap-1 text-[11px] text-sky-800 bg-sky-50 p-2 rounded-lg">
                      <Bus className="w-3.5 h-3.5 shrink-0 mt-0.5 text-sky-600" />
                      <span className="line-clamp-2">{act.transitSummary}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => onOpenActivity(act)}
                      className="flex-1 py-2 px-3 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl transition-colors text-center"
                    >
                      Full Details & Tips
                    </button>
                    <button
                      onClick={() => onTogglePlanActivity(act)}
                      className={`py-2 px-3 text-xs font-bold rounded-xl transition-colors ${
                        isPlanned
                          ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                          : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                      }`}
                    >
                      {isPlanned ? 'Planned ✓' : '+ Add'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Adelaide Student Essentials Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-3xl p-6 sm:p-10 text-white border border-stone-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Bus className="w-3.5 h-3.5 text-amber-400" />
              <span>Public Transport Super-Guide</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Don’t spend money when transit is free!
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Adelaide offers one of the most generous free transit zones in Australia. The City Tram is free between South Terrace, the Entertainment Centre and the Botanic Gardens. Plus, the 98A/98C Connector buses take you around North Adelaide for $0.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onSelectTab('essentials')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-colors shadow-sm"
              >
                Open Student Transit Guide
              </button>
              <button
                onClick={() => onSelectTab('plan')}
                className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs sm:text-sm border border-stone-700 transition-colors"
              >
                Calculate Outing Costs
              </button>
            </div>
          </div>

          <div className="w-full lg:w-96 bg-stone-800/90 rounded-2xl p-5 border border-stone-700 space-y-3.5 text-xs">
            <h4 className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Concession Rules Summary</span>
            </h4>
            <div className="space-y-2 text-stone-300">
              <div className="flex justify-between pb-1.5 border-b border-stone-700">
                <span>Free City Tram</span>
                <span className="font-bold text-emerald-400">$0.00</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-stone-700">
                <span>Free 98A/98C Bus</span>
                <span className="font-bold text-emerald-400">$0.00</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-stone-700">
                <span>Student Off-Peak Concession</span>
                <span className="font-bold text-white">$0.85</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-stone-700">
                <span>Student Peak Concession</span>
                <span className="font-bold text-white">$1.25</span>
              </div>
              <div className="flex justify-between">
                <span>28-Day Unlimited Pass</span>
                <span className="font-bold text-amber-400">$27.00</span>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 italic">
              *Requires green Concession metroCARD + student ID sticker.
            </p>
          </div>
        </div>
      </section>

      {/* Affordable Food & Cafes Sneak Peek */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 mb-2">
              <Utensils className="w-3.5 h-3.5" />
              <span>Local Student Favourites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Affordable Food & Student Dining
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Eat generously without wrecking your weekly grocery budget.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('food')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
          >
            <span>Browse All Food Spots</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredFoods.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900">
                    {food.cuisine}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Meal ~${food.estimatedMealCost.toFixed(2)} AUD
                  </span>
                </div>

                <h3 className="text-lg font-bold text-stone-900 mb-1">
                  {food.name}
                </h3>
                <p className="text-xs text-stone-500 flex items-center gap-1 mb-3">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-stone-400" />
                  <span>{food.address}</span>
                </p>

                <p className="text-xs text-stone-600 leading-relaxed mb-3">
                  {food.description}
                </p>

                {food.studentDeal && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-950 font-medium">
                    <span className="font-bold text-amber-800 block">Student Perk:</span>
                    {food.studentDeal}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500">Popular: <strong>{food.popularItem}</strong></span>
                <span className="font-bold text-stone-800">${food.popularItemPrice.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA to Plan Your Outing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-500 via-rose-500 to-amber-600 rounded-3xl p-8 sm:p-12 text-stone-950 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-950">
              Ready to plan your day in Adelaide?
            </h3>
            <p className="text-xs sm:text-sm text-stone-900 font-medium leading-relaxed">
              Use our interactive Outing & Budget Calculator to pick activities, add budget meals, estimate public transport costs, and get turnkey directions!
            </p>
          </div>
          <button
            onClick={() => onSelectTab('plan')}
            className="px-6 py-3.5 rounded-2xl bg-stone-950 hover:bg-stone-900 text-white font-bold text-sm shadow-lg hover:scale-105 transition-all shrink-0"
          >
            Launch Outing Calculator
          </button>
        </div>
      </section>

    </div>
  );
};
