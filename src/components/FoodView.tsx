import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  UtensilsCrossed, 
  DollarSign, 
  Bus, 
  Clock, 
  Tag, 
  Plus, 
  Check, 
  Moon, 
  Sparkles,
  SlidersHorizontal,
  Flame,
  Wifi,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { FoodSpot, LocationArea } from '../types';
import { FOOD_PLACES, cafeStudyHeroImg } from '../data/foodPlaces';
import { CafeBlogView } from './CafeBlogView';

interface FoodViewProps {
  plannedIds: string[];
  onTogglePlanFood: (food: FoodSpot) => void;
  onSelectTab: (tab: string) => void;
  initialSubView?: 'directory' | 'blog';
}

export const FoodView: React.FC<FoodViewProps> = ({
  plannedIds,
  onTogglePlanFood,
  onSelectTab,
  initialSubView = 'directory'
}) => {
  const [subView, setSubView] = useState<'directory' | 'blog'>(initialSubView);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<LocationArea>('all');
  const [maxPrice, setMaxPrice] = useState<string>('all');
  const [onlyStudentDeals, setOnlyStudentDeals] = useState(false);
  const [onlyLateNight, setOnlyLateNight] = useState(false);
  const [onlyStudyWifi, setOnlyStudyWifi] = useState(false);

  const filteredFoods = useMemo(() => {
    return FOOD_PLACES.filter((food) => {
      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = food.name.toLowerCase().includes(q);
        const matchesCuisine = food.cuisine.toLowerCase().includes(q);
        const matchesItem = food.popularItem.toLowerCase().includes(q);
        const matchesAddress = food.address.toLowerCase().includes(q);
        if (!matchesName && !matchesCuisine && !matchesItem && !matchesAddress) return false;
      }

      // Location filter
      if (selectedLocation !== 'all' && food.locationArea !== selectedLocation) {
        return false;
      }

      // Price filter
      if (maxPrice === '10' && food.estimatedMealCost > 10) return false;
      if (maxPrice === '13' && food.estimatedMealCost > 13) return false;
      if (maxPrice === '15' && food.estimatedMealCost > 15) return false;

      // Student deals only
      if (onlyStudentDeals && !food.studentDeal) return false;

      // Late night only
      if (onlyLateNight && !food.openLate) return false;

      // Study & Free Wi-Fi only
      if (onlyStudyWifi && !food.wifiAvailable && !food.studyFriendly) return false;

      return true;
    });
  }, [searchTerm, selectedLocation, maxPrice, onlyStudentDeals, onlyLateNight, onlyStudyWifi]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLocation('all');
    setMaxPrice('all');
    setOnlyStudentDeals(false);
    setOnlyLateNight(false);
    setOnlyStudyWifi(false);
  };

  if (subView === 'blog') {
    return (
      <CafeBlogView
        plannedIds={plannedIds}
        onTogglePlanFood={onTogglePlanFood}
        onBackToDirectory={() => {
          setSubView('directory');
          onSelectTab('food');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectTab={onSelectTab}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Mode Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FBF4F1] text-[#B57F6C] border border-[#D0A18F]/40">
            <UtensilsCrossed className="w-3.5 h-3.5 text-[#B57F6C]" />
            <span>Affordable Dining & Student Deals</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1A2E2C] tracking-tight">
            Food & Cafes: Student-Tested Cheap Eats
          </h1>
          <p className="text-[#475E5A] text-sm sm:text-base max-w-2xl leading-relaxed">
            From study-friendly cafes with free Wi-Fi and cat lounges to 24/7 bakeries and Chinatown dumplings. Verified AUD prices and exact Adelaide Metro transit routes.
          </p>
        </div>

        {/* Sub-view switcher */}
        <div className="inline-flex items-center gap-1 p-1 bg-[#EFF4F2] border border-[#D4DDD9] rounded-xl self-start md:self-auto shrink-0">
          <button
            onClick={() => setSubView('directory')}
            className="px-3.5 py-2 rounded-lg text-xs font-bold bg-white text-[#0A868C] shadow-xs cursor-pointer whitespace-nowrap"
          >
            All Food &amp; Cafes
          </button>
          <button
            onClick={() => {
              setSubView('blog');
              onSelectTab('cafe-blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-[#475E5A] hover:text-[#0A868C] transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Cafe Guide Blog</span>
          </button>
        </div>
      </div>

      {/* Featured Blog Banner */}
      <div
        onClick={() => {
          setSubView('blog');
          onSelectTab('cafe-blog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="group bg-white border border-[#D4DDD9] hover:border-[#0A868C] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all grid grid-cols-1 md:grid-cols-12 cursor-pointer"
      >
        <div className="md:col-span-4 relative h-44 md:h-auto overflow-hidden bg-[#EFF4F2]">
          <img
            src={cafeStudyHeroImg}
            alt="Student studying with laptop and coffee in Adelaide cafe"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-none" />
        </div>
        <div className="md:col-span-8 p-5 sm:p-6 flex flex-col justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-[#5B6E6A]">
              <span className="font-bold text-[#0A868C]">Featured Student Blog Post</span>
              <span aria-hidden="true">·</span>
              <span>6 min read</span>
              <span aria-hidden="true">·</span>
              <span>Wi-Fi &amp; Transit Guide</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#1A2E2C] group-hover:text-[#0A868C] transition-colors">
              Best Budget-Friendly Cafes Near Me: Study Spots, Breakfast Under $15 &amp; Cat Cafes
            </h2>
            <p className="text-xs sm:text-sm text-[#475E5A] leading-relaxed">
              Looking for a quiet study cafe with free Wi-Fi, affordable morning fuel before class, or a stress-busting cat cafe accessible by Adelaide Metro bus or free tram? Read our complete student guide.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A868C]">
            <span>Read Full Blog Guide</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#D4DDD9] rounded-2xl p-5 shadow-xs space-y-4">
        
        {/* Search & Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-[#87A09B] absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by restaurant, dish or cuisine (e.g. dumplings, bakery, pizza, roti)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D4DDD9] text-xs sm:text-sm text-[#1A2E2C] focus:outline-none focus:border-[#0A868C] placeholder:text-[#87A09B]"
            />
          </div>

          <div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value as LocationArea)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#D4DDD9] text-xs sm:text-sm text-[#1A2E2C] bg-white focus:outline-none focus:border-[#0A868C] cursor-pointer"
            >
              <option value="all">All Locations</option>
              <option value="adelaide_cbd">Adelaide CBD & Chinatown</option>
              <option value="north_adelaide">North Adelaide (O’Connell St)</option>
              <option value="glenelg_coast">Glenelg Beach & Jetty Rd</option>
              <option value="inner_suburbs">Inner Suburbs</option>
            </select>
          </div>
        </div>

        {/* Price & Quick Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#EFF4F2]">
          
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6E6A]">
              Max Meal Price:
            </span>
            <div className="flex items-center gap-1">
              {[
                { label: 'Any', value: 'all' },
                { label: '<$10', value: '10' },
                { label: '<$13', value: '13' },
                { label: '<$15', value: '15' },
              ].map((tier) => (
                <button
                  key={tier.value}
                  onClick={() => setMaxPrice(tier.value)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    maxPrice === tier.value
                      ? 'bg-[#0A868C] text-white font-bold'
                      : 'bg-[#EFF4F2] text-[#2D4543] hover:bg-[#D4DDD9]'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setOnlyStudyWifi(!onlyStudyWifi)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border cursor-pointer ${
                onlyStudyWifi
                  ? 'bg-[#E6F3F4] border-[#0A868C] text-[#0A868C] font-bold'
                  : 'bg-white border-[#D4DDD9] text-[#475E5A] hover:bg-[#EFF4F2]'
              }`}
            >
              <Wifi className="w-3.5 h-3.5 text-[#0A868C]" />
              <span>Study &amp; Free Wi-Fi</span>
            </button>

            <button
              onClick={() => setOnlyStudentDeals(!onlyStudentDeals)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border cursor-pointer ${
                onlyStudentDeals
                  ? 'bg-[#FBF4F1] border-[#D0A18F] text-[#B57F6C] font-bold'
                  : 'bg-white border-[#D4DDD9] text-[#475E5A] hover:bg-[#EFF4F2]'
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-[#D0A18F]" />
              <span>Has Student Perk</span>
            </button>

            <button
              onClick={() => setOnlyLateNight(!onlyLateNight)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border cursor-pointer ${
                onlyLateNight
                  ? 'bg-[#EBF4FA] border-[#0666A7] text-[#0666A7] font-bold'
                  : 'bg-white border-[#D4DDD9] text-[#475E5A] hover:bg-[#EFF4F2]'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-[#0666A7]" />
              <span>Late Night / 24/7</span>
            </button>

            <button
              onClick={resetFilters}
              className="text-xs text-[#5B6E6A] hover:text-[#0A868C] underline ml-1 cursor-pointer"
            >
              Reset
            </button>
          </div>

        </div>

      </div>

      {/* Results Count & Outing CTA */}
      <div className="flex items-center justify-between text-xs text-[#5B6E6A]">
        <span>Showing <strong>{filteredFoods.length}</strong> dining spots</span>
        {plannedIds.length > 0 && (
          <button
            onClick={() => onSelectTab('plan')}
            className="text-[#0666A7] font-bold hover:underline cursor-pointer"
          >
            Review total outing budget in Planner →
          </button>
        )}
      </div>

      {/* Foods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map((food) => {
          const isPlanned = plannedIds.includes(food.id);
          return (
            <div
              key={food.id}
              className="bg-white rounded-2xl border border-[#D4DDD9] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {food.imageSrc && (
                <div className="relative h-40 w-full overflow-hidden bg-[#EFF4F2]">
                  <img
                    src={food.imageSrc}
                    alt={food.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {food.wifiAvailable && (
                    <span className="absolute bottom-2.5 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/65 text-white text-[10px] font-semibold backdrop-blur-xs">
                      <Wifi className="w-3 h-3 text-[#87A09B]" />
                      <span>Free Wi-Fi</span>
                    </span>
                  )}
                </div>
              )}

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  
                  {/* Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EFF4F2] text-[#0A868C]">
                        {food.cuisine}
                      </span>
                      {food.openLate && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF4FA] text-[#0666A7] flex items-center gap-1">
                          <Moon className="w-3 h-3" />
                          <span>Late Night / 24-7</span>
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-black text-[#0A868C] bg-[#E6F3F4] px-2.5 py-1 rounded-lg border border-[#0A868C]/30 shrink-0 font-mono tabular-nums">
                      ~${food.estimatedMealCost.toFixed(2)} AUD
                    </span>
                  </div>

                {/* Name & Address */}
                <div>
                  <h3 className="text-lg font-bold text-[#1A2E2C]">
                    {food.name}
                  </h3>
                  <p className="text-xs text-[#5B6E6A] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-[#87A09B]" />
                    <span>{food.address}</span>
                  </p>
                </div>

                <p className="text-xs text-[#475E5A] leading-relaxed">
                  {food.description}
                </p>

                {/* Student Deal Callout using Terracotta Blush */}
                {food.studentDeal && (
                  <div className="bg-[#FBF4F1] border border-[#D0A18F]/50 rounded-xl p-3 text-xs text-[#1A2E2C] font-medium">
                    <div className="flex items-center gap-1 text-[#B57F6C] font-bold mb-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D0A18F]" />
                      <span>Student Special:</span>
                    </div>
                    <p className="text-[11px] leading-tight text-[#4A3B35]">{food.studentDeal}</p>
                  </div>
                )}

                {/* Dietary badges */}
                <div className="flex flex-wrap gap-1">
                  {food.dietaryNotes.map((note) => (
                    <span
                      key={note}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#EFF4F2] text-[#4F6D67]"
                    >
                      {note}
                    </span>
                  ))}
                </div>

                {/* Public Transport */}
                <div className="bg-[#EBF4FA] border border-[#0666A7]/20 p-2.5 rounded-xl text-[11px] text-[#0666A7] flex items-start gap-1.5">
                  <Bus className="w-3.5 h-3.5 text-[#0666A7] shrink-0 mt-0.5" />
                  <span className="leading-tight">{food.transitSummary}</span>
                </div>

              </div>

              {/* Bottom popular item & Add to outing button */}
              <div className="pt-3 border-t border-[#EFF4F2] flex items-center justify-between gap-3">
                <div className="text-xs">
                  <span className="text-[#87A09B] block text-[10px]">Popular order</span>
                  <span className="font-semibold text-[#1A2E2C] line-clamp-1">{food.popularItem}</span>
                  <span className="text-[11px] font-bold text-[#5B6E6A]">${food.popularItemPrice.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => onTogglePlanFood(food)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors flex items-center gap-1 cursor-pointer ${
                    isPlanned
                      ? 'bg-[#FBF4F1] text-[#B57F6C] border border-[#D0A18F]'
                      : 'bg-[#0A868C] hover:bg-[#076E73] text-white'
                  }`}
                >
                  {isPlanned ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>In Outing</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Meal</span>
                    </>
                  )}
                </button>
              </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
