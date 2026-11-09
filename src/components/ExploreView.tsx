import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Filter, 
  DollarSign, 
  Bus, 
  Clock, 
  Sparkles, 
  Heart, 
  Check, 
  SlidersHorizontal,
  Compass,
  ArrowUpDown
} from 'lucide-react';
import { Activity, ActivityInterest, LocationArea } from '../types';
import { ACTIVITIES } from '../data/activities';

interface ExploreViewProps {
  onOpenActivity: (activity: Activity) => void;
  plannedIds: string[];
  onTogglePlanActivity: (activity: Activity) => void;
  initialBudgetFilter?: number | null;
  onSelectTab: (tab: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onOpenActivity,
  plannedIds,
  onTogglePlanActivity,
  initialBudgetFilter = null,
  onSelectTab
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ActivityInterest>('all');
  const [selectedLocation, setSelectedLocation] = useState<LocationArea>('all');
  const [selectedBudgetTier, setSelectedBudgetTier] = useState<string>(
    initialBudgetFilter !== null ? String(initialBudgetFilter) : 'all'
  );
  const [selectedStyle, setSelectedStyle] = useState<'all' | 'solo' | 'social' | 'newcomer'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'cost_asc' | 'cost_desc' | 'name'>('featured');

  const categories: Array<{ id: ActivityInterest; label: string }> = [
    { id: 'all', label: 'All Interests' },
    { id: 'nature_parks', label: 'Nature & Parks' },
    { id: 'arts_culture', label: 'Arts & Culture' },
    { id: 'beach_coast', label: 'Coast & Beaches' },
    { id: 'hidden_gems', label: 'Hidden Gems' },
    { id: 'markets_shopping', label: 'Markets & Shopping' },
    { id: 'social_hangouts', label: 'Social & Hangouts' },
  ];

  const locations: Array<{ id: LocationArea; label: string }> = [
    { id: 'all', label: 'All Adelaide Areas' },
    { id: 'adelaide_cbd', label: 'Adelaide CBD' },
    { id: 'north_adelaide', label: 'North Adelaide' },
    { id: 'glenelg_coast', label: 'Glenelg & Coast' },
    { id: 'port_adelaide', label: 'Port Adelaide' },
    { id: 'adelaide_hills', label: 'Adelaide Hills' },
    { id: 'inner_suburbs', label: 'Inner Suburbs' },
  ];

  // Filtered & Sorted Activities
  const filteredActivities = useMemo(() => {
    return ACTIVITIES.filter((act) => {
      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = act.title.toLowerCase().includes(q);
        const matchesDesc = act.description.toLowerCase().includes(q);
        const matchesLoc = act.locationName.toLowerCase().includes(q);
        const matchesTip = act.studentTip.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesLoc && !matchesTip) return false;
      }

      // Style filter: solo vs social vs newcomer
      if (selectedStyle === 'solo') {
        if (act.socialVibe !== 'solo_friendly' && act.socialVibe !== 'both') return false;
      } else if (selectedStyle === 'social') {
        if (act.socialVibe !== 'social_meetup' && act.socialVibe !== 'both') return false;
      } else if (selectedStyle === 'newcomer') {
        if (!act.isNewcomerRecommended) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && act.category !== selectedCategory) {
        return false;
      }

      // Location filter
      if (selectedLocation !== 'all' && act.locationArea !== selectedLocation) {
        return false;
      }

      // Budget filter
      if (selectedBudgetTier === '0') {
        if (!act.isFree && act.costValue > 0) return false;
      } else if (selectedBudgetTier === '10') {
        if (act.costValue > 10) return false;
      } else if (selectedBudgetTier === '25') {
        if (act.costValue > 25) return false;
      } else if (selectedBudgetTier === '50') {
        if (act.costValue > 50) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
      if (sortBy === 'cost_asc') {
        return a.costValue - b.costValue;
      }
      if (sortBy === 'cost_desc') {
        return b.costValue - a.costValue;
      }
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [searchTerm, selectedStyle, selectedCategory, selectedLocation, selectedBudgetTier, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStyle('all');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSelectedBudgetTier('all');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Introduction */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E6F3F4] text-[#0A868C] border border-[#87A09B]/40">
          <Compass className="w-3.5 h-3.5 text-[#0A868C]" />
          <span>Discover Adelaide Affordably</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A2E2C] tracking-tight">
          Explore Adelaide: Budget-Friendly Activities
        </h1>
        <p className="text-[#475E5A] text-sm sm:text-base max-w-3xl leading-relaxed">
          Filter by your interests, neighborhood, or maximum budget. Every activity includes direct public transport guidance, student tips, and cost details so you can head out with total confidence.
        </p>
      </div>

      {/* Control Panel: Search & Filters */}
      <div className="bg-white border border-[#D4DDD9] rounded-2xl p-5 shadow-xs space-y-4">
        
        {/* Top Row: Search and Sort */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#87A09B] absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by name, beach, museum, park, koalas, or tram line..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D4DDD9] text-xs sm:text-sm text-[#1A2E2C] focus:outline-none focus:border-[#0A868C] placeholder:text-[#87A09B]"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative min-w-[170px]">
              <ArrowUpDown className="w-4 h-4 text-[#87A09B] absolute left-3 top-3" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-[#D4DDD9] text-xs sm:text-sm text-[#1A2E2C] bg-white focus:outline-none focus:border-[#0A868C] cursor-pointer appearance-none"
              >
                <option value="featured">Featured First</option>
                <option value="cost_asc">Cost: Low to High</option>
                <option value="cost_desc">Cost: High to Low</option>
                <option value="name">Name (A to Z)</option>
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="px-3.5 py-2.5 rounded-xl border border-[#D4DDD9] text-xs font-semibold text-[#475E5A] hover:text-[#0A868C] hover:bg-[#EFF4F2] transition-colors whitespace-nowrap cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Exploration Style: Solo vs Social vs Newcomer */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6E6A]">
            Exploration Style:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Styles' },
              { id: 'solo', label: '🌿 Solo & Quiet Discovery' },
              { id: 'social', label: '🤝 Social & Meet People' },
              { id: 'newcomer', label: '🌟 Newcomer Top Picks' },
            ].map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedStyle === style.id
                    ? 'bg-[#0A868C] text-white font-bold shadow-xs'
                    : 'bg-[#EFF4F2] text-[#2D4543] hover:bg-[#D4DDD9]'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6E6A]">
            By Interest:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-[#0A868C] text-white shadow-xs'
                      : 'bg-[#EFF4F2] text-[#2D4543] hover:bg-[#D4DDD9]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filters: Location & Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#EFF4F2]">
          
          {/* Location Area */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#5B6E6A] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#87A09B]" />
              <span>Location / Precinct:</span>
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value as LocationArea)}
              className="w-full px-3 py-2 rounded-xl border border-[#D4DDD9] text-xs text-[#1A2E2C] bg-white focus:outline-none focus:border-[#0A868C] cursor-pointer"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#5B6E6A] flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-[#87A09B]" />
              <span>Maximum Cost:</span>
            </label>
            <select
              value={selectedBudgetTier}
              onChange={(e) => setSelectedBudgetTier(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#D4DDD9] text-xs text-[#1A2E2C] bg-white focus:outline-none focus:border-[#0A868C] cursor-pointer"
            >
              <option value="all">Any Budget</option>
              <option value="0">$0.00 (100% Free Activities)</option>
              <option value="10">Under $10.00 AUD</option>
              <option value="25">Under $25.00 AUD</option>
              <option value="50">Under $50.00 AUD</option>
            </select>
          </div>

        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#5B6E6A]">
        <span>Showing <strong>{filteredActivities.length}</strong> activities matching your filters</span>
        {plannedIds.length > 0 && (
          <button
            onClick={() => onSelectTab('plan')}
            className="text-[#0666A7] font-bold hover:underline cursor-pointer"
          >
            {plannedIds.length} item{plannedIds.length > 1 ? 's' : ''} in your Outing Plan →
          </button>
        )}
      </div>

      {/* Activities Grid */}
      {filteredActivities.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#D4DDD9] p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#E6F3F4] text-[#0A868C] flex items-center justify-center mx-auto">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#1A2E2C]">No activities match your current filters</h3>
          <p className="text-xs text-[#5B6E6A] max-w-sm mx-auto">
            Try resetting your search query, increasing your budget limit, or clearing location filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-[#0A868C] hover:bg-[#076E73] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((act) => {
            const isPlanned = plannedIds.includes(act.id);
            return (
              <div
                key={act.id}
                className="bg-white rounded-2xl border border-[#D4DDD9] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Visual Image Header (if photo exists) */}
                {act.imageSrc && (
                  <div className="relative h-44 w-full overflow-hidden bg-[#EFF4F2]">
                    <img 
                      src={act.imageSrc} 
                      alt={act.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/95 text-[#0A868C] shadow-xs">
                        {act.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => onTogglePlanActivity(act)}
                        className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                          isPlanned
                            ? 'bg-[#D0A18F] text-[#1A2E2C]'
                            : 'bg-black/40 hover:bg-black/60 text-white'
                        }`}
                        title={isPlanned ? 'Remove from Outing Plan' : 'Add to Outing Plan'}
                      >
                        <Heart className={`w-4 h-4 ${isPlanned ? 'fill-[#1A2E2C]' : ''}`} />
                      </button>
                    </div>

                    {act.highlightTag && (
                      <div className="absolute bottom-2.5 left-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                          {act.highlightTag}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-5 space-y-3">
                  {!act.imageSrc && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E6F3F4] text-[#0A868C]">
                        {act.categoryLabel}
                      </span>
                      <button
                        onClick={() => onTogglePlanActivity(act)}
                        className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                          isPlanned
                            ? 'bg-[#D0A18F] text-[#1A2E2C]'
                            : 'bg-[#EFF4F2] hover:bg-[#D4DDD9] text-[#475E5A]'
                        }`}
                        title={isPlanned ? 'Remove from Outing Plan' : 'Add to Outing Plan'}
                      >
                        <Heart className={`w-4 h-4 ${isPlanned ? 'fill-[#1A2E2C]' : ''}`} />
                      </button>
                    </div>
                  )}

                  <div>
                    <h3 className="font-bold text-lg text-[#1A2E2C] group-hover:text-[#0A868C] transition-colors leading-snug">
                      {act.title}
                    </h3>
                    <p className="text-xs text-[#5B6E6A] flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-[#87A09B]" />
                      <span>{act.locationName}</span>
                    </p>
                  </div>

                  <p className="text-xs text-[#475E5A] line-clamp-3 leading-relaxed">
                    {act.description}
                  </p>

                  {/* Highlights & Cost */}
                  <div className="pt-2 border-t border-[#EFF4F2] space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#5B6E6A]">Cost:</span>
                      <span className={`font-bold ${act.isFree ? 'text-[#0A868C]' : 'text-[#1A2E2C]'}`}>
                        {act.costDescription}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[#5B6E6A]">
                      <span>Time Needed:</span>
                      <span className="font-medium text-[#1A2E2C]">{act.timeNeeded}</span>
                    </div>

                    {/* Transit summary badge */}
                    <div className="bg-[#EBF4FA] border border-[#0666A7]/20 p-2.5 rounded-xl text-[11px] text-[#0666A7] flex items-start gap-1.5">
                      <Bus className="w-3.5 h-3.5 text-[#0666A7] shrink-0 mt-0.5" />
                      <span className="line-clamp-2 leading-tight">{act.transitSummary}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 bg-[#F7F9F8] border-t border-[#EFF4F2] flex items-center gap-2">
                  <button
                    onClick={() => onOpenActivity(act)}
                    className="flex-1 py-2 text-xs font-semibold bg-white border border-[#D4DDD9] hover:bg-[#EFF4F2] text-[#1A2E2C] rounded-xl transition-colors text-center cursor-pointer"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onTogglePlanActivity(act)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer ${
                      isPlanned
                        ? 'bg-[#FBF4F1] text-[#B57F6C] border border-[#D0A18F]'
                        : 'bg-[#0A868C] text-white hover:bg-[#076E73]'
                    }`}
                  >
                    {isPlanned ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <span>+ Plan</span>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
