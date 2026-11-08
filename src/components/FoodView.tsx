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
  Flame
} from 'lucide-react';
import { FoodSpot, LocationArea } from '../types';
import { FOOD_PLACES } from '../data/foodPlaces';

interface FoodViewProps {
  plannedIds: string[];
  onTogglePlanFood: (food: FoodSpot) => void;
  onSelectTab: (tab: string) => void;
}

export const FoodView: React.FC<FoodViewProps> = ({
  plannedIds,
  onTogglePlanFood,
  onSelectTab
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<LocationArea>('all');
  const [maxPrice, setMaxPrice] = useState<string>('all');
  const [onlyStudentDeals, setOnlyStudentDeals] = useState(false);
  const [onlyLateNight, setOnlyLateNight] = useState(false);

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

      return true;
    });
  }, [searchTerm, selectedLocation, maxPrice, onlyStudentDeals, onlyLateNight]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLocation('all');
    setMaxPrice('all');
    setOnlyStudentDeals(false);
    setOnlyLateNight(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Introduction */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-900">
          <UtensilsCrossed className="w-3.5 h-3.5 text-rose-600" />
          <span>Affordable Dining & Student Deals</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Food & Cafes: Student-Tested Cheap Eats
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          From legendary 24/7 bakeries to Chinatown food courts and Gouger Street dumplings. Discover verified meal prices, student ID discounts, and exact transit stops so you can eat well on a budget.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4">
        
        {/* Search & Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by restaurant, dish or cuisine (e.g. dumplings, bakery, pizza, roti)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-amber-500 placeholder:text-stone-400"
            />
          </div>

          <div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value as LocationArea)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 bg-white focus:outline-none focus:border-amber-500 cursor-pointer"
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
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
          
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
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
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    maxPrice === tier.value
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOnlyStudentDeals(!onlyStudentDeals)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                onlyStudentDeals
                  ? 'bg-amber-100 border-amber-300 text-amber-950 font-bold'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              <span>Has Student Perk</span>
            </button>

            <button
              onClick={() => setOnlyLateNight(!onlyLateNight)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                onlyLateNight
                  ? 'bg-indigo-100 border-indigo-300 text-indigo-950 font-bold'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
              <span>Late Night / 24/7</span>
            </button>

            <button
              onClick={resetFilters}
              className="text-xs text-stone-500 hover:text-stone-800 underline ml-1"
            >
              Reset
            </button>
          </div>

        </div>

      </div>

      {/* Results Count & Outing CTA */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <span>Showing <strong>{filteredFoods.length}</strong> dining spots</span>
        {plannedIds.length > 0 && (
          <button
            onClick={() => onSelectTab('plan')}
            className="text-amber-700 font-bold hover:underline"
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
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                
                {/* Badges */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900">
                      {food.cuisine}
                    </span>
                    {food.openLate && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 flex items-center gap-1">
                        <Moon className="w-3 h-3" />
                        <span>Late Night / 24-7</span>
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                    ~${food.estimatedMealCost.toFixed(2)} AUD
                  </span>
                </div>

                {/* Name & Address */}
                <div>
                  <h3 className="text-lg font-bold text-stone-900">
                    {food.name}
                  </h3>
                  <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-stone-400" />
                    <span>{food.address}</span>
                  </p>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {food.description}
                </p>

                {/* Student Deal Callout */}
                {food.studentDeal && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 font-medium">
                    <div className="flex items-center gap-1 text-amber-800 font-bold mb-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Student Special:</span>
                    </div>
                    <p className="text-[11px] leading-tight">{food.studentDeal}</p>
                  </div>
                )}

                {/* Dietary badges */}
                <div className="flex flex-wrap gap-1">
                  {food.dietaryNotes.map((note) => (
                    <span
                      key={note}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-stone-100 text-stone-600"
                    >
                      {note}
                    </span>
                  ))}
                </div>

                {/* Public Transport */}
                <div className="bg-sky-50 border border-sky-100 p-2.5 rounded-xl text-[11px] text-sky-950 flex items-start gap-1.5">
                  <Bus className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                  <span className="leading-tight">{food.transitSummary}</span>
                </div>

              </div>

              {/* Bottom popular item & Add to outing button */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                <div className="text-xs">
                  <span className="text-stone-400 block text-[10px]">Popular order</span>
                  <span className="font-semibold text-stone-800 line-clamp-1">{food.popularItem}</span>
                  <span className="text-[11px] font-bold text-stone-600">${food.popularItemPrice.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => onTogglePlanFood(food)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors flex items-center gap-1 ${
                    isPlanned
                      ? 'bg-rose-600 text-white hover:bg-rose-700'
                      : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
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
          );
        })}
      </div>

    </div>
  );
};
