import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Compass, 
  MapPin, 
  Bus, 
  ArrowRight, 
  Heart, 
  Utensils, 
  Calculator, 
  GraduationCap, 
  Clock,
  DollarSign
} from 'lucide-react';
import { Activity } from '../types';
import { 
  ACTIVITIES, 
  oceanBeachImg, 
  waterfallImg, 
  forestImg, 
  botanicTreesImg 
} from '../data/activities';

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

  // Top 3 hand-picked favorites with real photography
  const topThreeActivities = [
    ACTIVITIES.find(a => a.id === 'glenelg-beach-sunset') || ACTIVITIES[0],
    ACTIVITIES.find(a => a.id === 'waterfall-gully-falls') || ACTIVITIES[1],
    ACTIVITIES.find(a => a.id === 'botanic-gardens') || ACTIVITIES[2],
  ];

  const natureSpotcards = [
    {
      id: 'ocean-beach',
      title: 'Glenelg Ocean Beach & Jetty',
      tag: '🌊 Ocean & Beach',
      transitNote: 'Direct Tram • $1.25 Concession',
      cost: '100% Free Beach',
      description: 'Golden sands, historic wooden jetty, and unforgettable coastal sunsets over the gulf.',
      img: oceanBeachImg,
      activity: ACTIVITIES.find(a => a.id === 'glenelg-beach-sunset') || ACTIVITIES[0]
    },
    {
      id: 'waterfall-gully',
      title: 'Waterfall Gully First Falls',
      tag: '💦 Cascading Waterfall',
      transitNote: 'Bus 142 / 864 • Cleland Park',
      cost: '100% Free Park Entry',
      description: 'Lush fern gully and crystal clear 30m waterfall cascading over dark rocky cliffs.',
      img: waterfallImg,
      activity: ACTIVITIES.find(a => a.id === 'waterfall-gully-falls') || ACTIVITIES[0]
    },
    {
      id: 'hills-forest',
      title: 'Adelaide Hills Native Forest',
      tag: '🌲 Forest & Gum Trees',
      transitNote: 'Train to Belair / Bus to Mt Lofty',
      cost: '100% Free Trails',
      description: 'Towering eucalyptus canopy, tranquil hiking trails, birdsong, and wild sleeping koalas.',
      img: forestImg,
      activity: ACTIVITIES.find(a => a.id === 'mount-lofty-botanic') || ACTIVITIES[0]
    },
    {
      id: 'botanic-trees',
      title: 'Botanic Gardens Moreton Bay Figs',
      tag: '🌳 Ancient Heritage Trees',
      transitNote: 'Free City Tram Zone ($0)',
      cost: '100% Free Oasis',
      description: 'Iconic giant Moreton Bay Fig trees with massive sculptural roots, shade, and rose gardens.',
      img: botanicTreesImg,
      activity: ACTIVITIES.find(a => a.id === 'botanic-gardens') || ACTIVITIES[0]
    }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSelectTab('explore');
    }
  };

  const handleQuickTagClick = (tag: string) => {
    if (tag === 'Free Tram') {
      onSelectTab('essentials');
    } else if (tag === 'Under $10') {
      onFilterBudget(10);
      onSelectTab('explore');
    } else if (tag === 'Cheap Eats') {
      onSelectTab('food');
    } else if (tag === 'Newcomer Guide') {
      onSelectTab('essentials');
    } else {
      onSelectTab('explore');
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      
      {/* Hero Section: Fresh, Calming Teal & Sage Tints */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E6F3F4] via-[#EFF4F2] to-[#F7F9F8] border-b border-[#D4DDD9] pt-8 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Subtle Audience Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-[#0A868C] border border-[#87A09B]/40 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0A868C] animate-pulse" />
            <span>Adelaide International Student Pocket Guide</span>
          </div>

          {/* Simple, welcoming headline */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1A2E2C] tracking-tight leading-tight">
            Explore Adelaide <span className="text-[#0A868C]">affordably</span> and with total confidence.
          </h1>

          {/* Short, reassuring subtitle */}
          <p className="text-sm sm:text-base text-[#475E5A] max-w-2xl mx-auto leading-relaxed font-normal">
            Your simple, stress-free guide to free cultural activities, student food deals, transparent public transport, and making friends in South Australia.
          </p>

          {/* Clean Search Bar with Deep Teal Focus */}
          <form onSubmit={handleSearchSubmit} className="pt-2 max-w-xl mx-auto">
            <div className="relative flex items-center bg-white rounded-2xl p-1.5 shadow-xs border border-[#87A09B]/40 hover:border-[#0A868C] transition-colors">
              <Search className="w-5 h-5 text-[#87A09B] ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Search activities, cheap eats, tram stops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm text-[#1A2E2C] bg-transparent focus:outline-none placeholder:text-[#87A09B]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#0A868C] hover:bg-[#076E73] text-white font-bold text-xs sm:text-sm shrink-0 transition-colors shadow-xs cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Suggested Topic Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className="text-[#6C827E] font-medium">Popular:</span>
            {[
              { label: '🚋 Free Tram Zone', tag: 'Free Tram' },
              { label: '🍜 Cheap Eats', tag: 'Cheap Eats' },
              { label: '💰 Under $10 Outings', tag: 'Under $10' },
              { label: '🎒 Newcomer Guide', tag: 'Newcomer Guide' },
            ].map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => handleQuickTagClick(chip.tag)}
                className="px-3 py-1 rounded-full bg-white hover:bg-[#E6F3F4] text-[#2D4543] hover:text-[#0A868C] border border-[#87A09B]/40 transition-colors font-medium text-[11px] cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Quick Nature Escapes Mini Bar */}
          <div className="pt-2 flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-1 max-w-2xl mx-auto scrollbar-none">
            {natureSpotcards.map((spot) => (
              <button
                key={spot.id}
                type="button"
                onClick={() => onOpenActivity(spot.activity)}
                className="group flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/90 hover:bg-white border border-[#D4DDD9] hover:border-[#0A868C] shadow-2xs hover:shadow-xs transition-all cursor-pointer text-left shrink-0"
              >
                <img
                  src={spot.img}
                  alt={spot.title}
                  className="w-7 h-7 rounded-lg object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <span className="block text-[11px] font-bold text-[#1A2E2C] group-hover:text-[#0A868C] transition-colors leading-tight">
                    {spot.tag.split(' ').slice(1).join(' ') || spot.tag}
                  </span>
                  <span className="block text-[9px] text-[#5B6E6A]">
                    {spot.cost}
                  </span>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Main 4 Action Gateways: Simple, Clear & Color Harmonized */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1A2E2C] tracking-tight">
            What would you like to do today?
          </h2>
          <p className="text-xs sm:text-sm text-[#5B6E6A]">
            Choose a section to see detailed recommendations and guides.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Gateway 1: Explore Activities (Deep Teal Accent) */}
          <button
            onClick={() => onSelectTab('explore')}
            className="text-left bg-white hover:bg-[#E6F3F4]/50 border border-[#D4DDD9] hover:border-[#0A868C] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group h-full cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E6F3F4] text-[#0A868C] flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#1A2E2C] group-hover:text-[#0A868C] transition-colors">
                  Explore Adelaide
                </h3>
                <p className="text-xs text-[#5B6E6A] mt-1 leading-relaxed">
                  Budget activities, beaches, botanical gardens, and viewpoints sorted by cost and precinct.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-[#0A868C] group-hover:translate-x-0.5 transition-transform">
              <span>Browse 12+ Activities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Gateway 2: Food & Cafes (Terracotta Blush Accent) */}
          <button
            onClick={() => onSelectTab('food')}
            className="text-left bg-white hover:bg-[#FBF4F1]/60 border border-[#D4DDD9] hover:border-[#D0A18F] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group h-full cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FBF4F1] text-[#B57F6C] flex items-center justify-center font-bold">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#1A2E2C] group-hover:text-[#B57F6C] transition-colors">
                  Food & Cheap Eats
                </h3>
                <p className="text-xs text-[#5B6E6A] mt-1 leading-relaxed">
                  Student meals under $15, 24/7 bakeries on O’Connell St, and Chinatown food court specials.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-[#B57F6C] group-hover:translate-x-0.5 transition-transform">
              <span>View Cheap Eats</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Gateway 3: Plan Outing (Ocean Blue Accent) */}
          <button
            onClick={() => onSelectTab('plan')}
            className="text-left bg-white hover:bg-[#EBF4FA]/60 border border-[#D4DDD9] hover:border-[#0666A7] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group h-full cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EBF4FA] text-[#0666A7] flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#1A2E2C] group-hover:text-[#0666A7] transition-colors">
                  Outing Cost Calculator
                </h3>
                <p className="text-xs text-[#5B6E6A] mt-1 leading-relaxed">
                  Pick spots and estimate total expenses including public transit, meals, and tickets before you go.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-[#0666A7] group-hover:translate-x-0.5 transition-transform">
              <span>Calculate Budget</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Gateway 4: Student Essentials (Sage / Laurel Accent) */}
          <button
            onClick={() => onSelectTab('essentials')}
            className="text-left bg-white hover:bg-[#EFF4F2]/70 border border-[#D4DDD9] hover:border-[#87A09B] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group h-full cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFF4F2] text-[#4F6D67] flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#1A2E2C] group-hover:text-[#0A868C] transition-colors">
                  Student Essentials
                </h3>
                <p className="text-xs text-[#5B6E6A] mt-1 leading-relaxed">
                  First 30 days checklist, Free Tram Zone stops, student discounts, banking, and transit etiquette.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-[#4F6D67] group-hover:translate-x-0.5 transition-transform">
              <span>Read Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

        </div>
      </section>

      {/* Gentle "Free in Adelaide" Quick Highlights (Laurel / Sage Minimal Strip) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFF4F2] border border-[#D4DDD9] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A868C] bg-white px-2 py-0.5 rounded border border-[#87A09B]/30">
              Good To Know
            </span>
            <h3 className="font-bold text-[#1A2E2C] text-base">
              Things that are 100% Free in Adelaide:
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs w-full md:w-auto">
            <div className="bg-white border border-[#D4DDD9] px-3 py-2 rounded-xl text-center">
              <span className="font-bold text-[#0666A7] block">Free City Tram</span>
              <span className="text-[#5B6E6A] text-[10px]">South Tce to AEC</span>
            </div>
            <div className="bg-white border border-[#D4DDD9] px-3 py-2 rounded-xl text-center">
              <span className="font-bold text-[#0A868C] block">Free 98A/98C Bus</span>
              <span className="text-[#5B6E6A] text-[10px]">North Adelaide Loop</span>
            </div>
            <div className="bg-white border border-[#D4DDD9] px-3 py-2 rounded-xl text-center">
              <span className="font-bold text-[#1A2E2C] block">Art Gallery & Museum</span>
              <span className="text-[#5B6E6A] text-[10px]">Permanent Exhibits $0</span>
            </div>
            <div className="bg-white border border-[#D4DDD9] px-3 py-2 rounded-xl text-center">
              <span className="font-bold text-[#4F6D67] block">29 Parklands</span>
              <span className="text-[#5B6E6A] text-[10px]">Ring around the CBD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Nature & Scenic Escapes: Ocean, Waterfalls, Forests & Giant Trees */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#0A868C] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#0A868C]" />
              <span>Adelaide's Natural Wonders</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A2E2C] tracking-tight">
              Ocean, Waterfalls & Ancient Forests
            </h2>
            <p className="text-xs text-[#5B6E6A]">
              Recharge between study sessions. Reach pristine ocean beaches, rainforest waterfalls, and native gum tree forests for $0 to $1.25 on public transport.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('explore')}
            className="text-xs font-bold text-[#0A868C] hover:text-[#076E73] flex items-center gap-1 group self-start sm:self-auto cursor-pointer"
          >
            <span>Explore all nature spots</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 4 Nature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {natureSpotcards.map((spot) => (
            <div
              key={spot.id}
              onClick={() => onOpenActivity(spot.activity)}
              className="group bg-white rounded-2xl border border-[#D4DDD9] hover:border-[#0A868C] overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden bg-[#EFF4F2]">
                <img
                  src={spot.img}
                  alt={spot.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[#1A2E2C] shadow-xs">
                    {spot.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-semibold text-[#E6F3F4] block uppercase tracking-wider">
                    {spot.transitNote}
                  </span>
                  <h4 className="font-bold text-sm sm:text-base leading-snug drop-shadow-sm line-clamp-1">
                    {spot.title}
                  </h4>
                </div>
              </div>

              <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#475E5A] line-clamp-2 leading-relaxed">
                  {spot.description}
                </p>
                <div className="pt-2 border-t border-[#EFF4F2] flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#0A868C]">{spot.cost}</span>
                  <span className="font-semibold text-[#0666A7] group-hover:underline flex items-center gap-0.5">
                    View tips →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hand-Picked 3 Favorites: Clean, Uncluttered Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <span className="text-xs font-semibold text-[#0A868C] uppercase tracking-wider">
              Student Favorites
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A2E2C] tracking-tight">
              Top Places to Start Exploring
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('explore')}
            className="text-xs font-bold text-[#0A868C] hover:text-[#076E73] flex items-center gap-1 group self-start sm:self-auto cursor-pointer"
          >
            <span>See all 12+ places</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topThreeActivities.map((act) => {
            const isPlanned = plannedIds.includes(act.id);
            return (
              <div
                key={act.id}
                className="bg-white border border-[#D4DDD9] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Visual Header using Real Photo or Deep Teal to Ocean Blue gradient */}
                <div className="h-44 relative overflow-hidden flex flex-col justify-between text-white p-4 bg-[#0A868C]">
                  {act.imageSrc ? (
                    <>
                      <img
                        src={act.imageSrc}
                        alt={act.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A868C] via-[#087378] to-[#0666A7]" />
                  )}

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-[#1A2E2C] shadow-xs">
                      {act.categoryLabel}
                    </span>
                    <button
                      onClick={() => onTogglePlanActivity(act)}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                        isPlanned ? 'bg-[#D0A18F] text-[#1A2E2C]' : 'bg-black/35 hover:bg-black/55 text-white'
                      }`}
                      title={isPlanned ? 'Remove from plan' : 'Add to plan'}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isPlanned ? 'fill-[#1A2E2C]' : ''}`} />
                    </button>
                  </div>

                  <div className="relative z-10">
                    <span className="text-[11px] font-medium text-white/90 block">
                      {act.locationName}
                    </span>
                    <h3 className="font-bold text-base leading-snug line-clamp-1 drop-shadow-sm text-white">
                      {act.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <p className="text-xs text-[#475E5A] line-clamp-2 leading-relaxed">
                    {act.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#EFF4F2] text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#6C827E]">Cost:</span>
                      <span className="font-bold text-[#1A2E2C]">{act.costDescription}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#0666A7] bg-[#EBF4FA] px-2 py-1 rounded-lg">
                      <Bus className="w-3 h-3 text-[#0666A7] shrink-0" />
                      <span className="line-clamp-1">{act.transitSummary}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onOpenActivity(act)}
                      className="flex-1 py-1.5 text-xs font-semibold bg-[#EFF4F2] hover:bg-[#D4DDD9] text-[#1A2E2C] rounded-xl transition-colors text-center cursor-pointer"
                    >
                      Details & Tips
                    </button>
                    <button
                      onClick={() => onTogglePlanActivity(act)}
                      className={`py-1.5 px-3 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                        isPlanned
                          ? 'bg-[#FBF4F1] text-[#B57F6C]'
                          : 'bg-[#0A868C] hover:bg-[#076E73] text-white'
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

      {/* Gentle Help & Reassurance Card with palette accents */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E6F3F4]/60 border border-[#87A09B]/40 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left max-w-xl">
            <span className="text-xs font-bold text-[#0A868C] flex items-center justify-center sm:justify-start gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#0A868C]" />
              <span>New in Adelaide?</span>
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#1A2E2C]">
              Not sure where to start in your first 30 days?
            </h3>
            <p className="text-xs sm:text-sm text-[#475E5A] leading-relaxed">
              We’ve prepared a practical newcomer checklist to help you take the airport bus, understand the city grid, avoid transit fines, and make new friends.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onSelectTab('essentials')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0A868C] hover:bg-[#076E73] text-white font-bold text-xs sm:text-sm transition-colors text-center shadow-xs cursor-pointer"
            >
              First 30 Days Checklist
            </button>
            <button
              onClick={() => onSelectTab('about')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-[#EFF4F2] text-[#2D4543] font-semibold text-xs sm:text-sm border border-[#D4DDD9] transition-colors text-center cursor-pointer"
            >
              FAQs & Support
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
