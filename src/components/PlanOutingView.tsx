import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  MapPin, 
  Bus, 
  Trash2, 
  Plus, 
  Share2, 
  Check, 
  Sparkles, 
  Compass, 
  Utensils, 
  AlertCircle, 
  ArrowRight, 
  Printer, 
  Copy,
  CreditCard,
  DollarSign
} from 'lucide-react';
import { OutingItem, PreMadeItinerary } from '../types';
import { PRE_MADE_ITINERARIES } from '../data/itineraries';
import { ACTIVITIES } from '../data/activities';
import { FOOD_PLACES } from '../data/foodPlaces';

interface PlanOutingViewProps {
  plannedItems: OutingItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onLoadPreMadeItinerary: (itinerary: PreMadeItinerary) => void;
  onSelectTab: (tab: string) => void;
  onAddCustomItem: (item: OutingItem) => void;
}

export const PlanOutingView: React.FC<PlanOutingViewProps> = ({
  plannedItems,
  onRemoveItem,
  onClearAll,
  onLoadPreMadeItinerary,
  onSelectTab,
  onAddCustomItem
}) => {
  const [targetBudget, setTargetBudget] = useState<number>(25);
  const [startingPoint, setStartingPoint] = useState<string>('North Terrace (Uni Adelaide / UniSA)');
  const [transitPassType, setTransitPassType] = useState<'concession_single' | 'unlimited_pass' | 'free_zone_only'>('concession_single');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Custom quick add modal state
  const [customTitle, setCustomTitle] = useState('');
  const [customCost, setCustomCost] = useState('5');
  const [customType, setCustomType] = useState<'activity' | 'food'>('food');
  const [showCustomModal, setShowCustomModal] = useState(false);

  // Transport calculation logic:
  // Count how many trips outside the free zone
  const transportCost = useMemo(() => {
    if (transitPassType === 'unlimited_pass' || transitPassType === 'free_zone_only') {
      return 0;
    }
    // Check which items require paid transit
    const paidTripsCount = plannedItems.filter(item => 
      item.transitType !== 'tram_free' && item.transitType !== 'bus_free' && item.transitType !== 'walk'
    ).length;

    // Student concession fare: $1.25 peak round trip or transfer
    // Cap at concession daily cap (~$5.30)
    const baseFarePerTrip = 1.25;
    // Assume return trip if there's at least one paid destination
    const trips = paidTripsCount > 0 ? Math.max(2, paidTripsCount * 2) : 0;
    const total = Math.min(5.30, trips * baseFarePerTrip);
    return total;
  }, [plannedItems, transitPassType]);

  const activitiesCost = useMemo(() => {
    return plannedItems
      .filter(i => i.type === 'activity')
      .reduce((sum, item) => sum + item.cost, 0);
  }, [plannedItems]);

  const foodCost = useMemo(() => {
    return plannedItems
      .filter(i => i.type === 'food')
      .reduce((sum, item) => sum + item.cost, 0);
  }, [plannedItems]);

  const grandTotal = useMemo(() => {
    return activitiesCost + foodCost + transportCost;
  }, [activitiesCost, foodCost, transportCost]);

  const budgetRemaining = targetBudget - grandTotal;
  const isOverBudget = grandTotal > targetBudget;

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;
    const costNum = parseFloat(customCost) || 0;
    onAddCustomItem({
      id: `custom-${Date.now()}`,
      refId: `custom-${Date.now()}`,
      type: customType,
      title: customTitle.trim(),
      cost: costNum,
      locationName: 'Adelaide',
      locationArea: 'adelaide_cbd',
      transitSummary: 'Local walking / Adelaide Metro',
      transitType: 'walk'
    });
    setCustomTitle('');
    setShowCustomModal(false);
  };

  const handleCopySummary = () => {
    const lines = [
      `🎒 My Adelaide Outing Plan (Budget: $${targetBudget.toFixed(2)} AUD)`,
      `📍 Starting from: ${startingPoint}`,
      `💰 Estimated Total: $${grandTotal.toFixed(2)} AUD (Transport: $${transportCost.toFixed(2)}, Activities: $${activitiesCost.toFixed(2)}, Food: $${foodCost.toFixed(2)})`,
      `---------------------------------`,
      ...plannedItems.map((item, idx) => `${idx + 1}. [${item.type.toUpperCase()}] ${item.title} - $${item.cost.toFixed(2)} AUD (${item.locationName})`),
      `---------------------------------`,
      `Created with Adelaide Pocket Guide for International Students`
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900">
          <Calculator className="w-3.5 h-3.5 text-emerald-700" />
          <span>Interactive Cost Estimator & Route Planner</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Plan Your Outing: Estimated Costs & Transit
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          Avoid spending surprises. Build your custom Adelaide day trip below or load a pre-made student budget day. The calculator figures out your total expenses—including concession tram/bus fares, dining, and admissions!
        </p>
      </div>

      {/* Pre-made Itineraries Quick Load Strip */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Or Load a Ready-Made Student Itinerary:</span>
          </span>
          <span className="text-[11px] text-stone-400">Click to instantly populate your plan</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRE_MADE_ITINERARIES.map((itin) => (
            <div
              key={itin.id}
              className="bg-white border border-stone-200 hover:border-amber-400 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3 text-left group"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                    {itin.badge}
                  </span>
                  <span className="text-xs font-black text-emerald-700">
                    ~${itin.estimatedTotal.toFixed(2)} AUD
                  </span>
                </div>
                <h3 className="font-bold text-sm text-stone-900 group-hover:text-amber-700 transition-colors">
                  {itin.title}
                </h3>
                <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                  {itin.subtitle}
                </p>
              </div>

              <button
                onClick={() => onLoadPreMadeItinerary(itin)}
                className="w-full py-1.5 px-3 rounded-lg bg-stone-100 group-hover:bg-amber-500 text-stone-800 group-hover:text-stone-950 font-bold text-xs transition-colors flex items-center justify-center gap-1"
              >
                <span>Load This Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Outing Dashboard: Left (Config & Summary) + Right (Itinerary list) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Target Budget, Transit Settings & Total Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Settings Box */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-600" />
              <span>Outing Parameters</span>
            </h2>

            {/* Target Budget Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                <span>My Spending Target:</span>
                <span className="text-base font-black text-amber-600">${targetBudget.toFixed(2)} AUD</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                step="5"
                value={targetBudget}
                onChange={(e) => setTargetBudget(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400">
                <span>$0 (Free Day)</span>
                <span>$25</span>
                <span>$50</span>
                <span>$80 (Full Weekend)</span>
              </div>
            </div>

            {/* Starting Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>Starting From:</span>
              </label>
              <select
                value={startingPoint}
                onChange={(e) => setStartingPoint(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-800 bg-white focus:outline-none focus:border-amber-500"
              >
                <option value="North Terrace (Uni Adelaide / UniSA)">North Terrace (Uni of Adelaide / UniSA)</option>
                <option value="UniSA City West (Hindley St / BioMed)">UniSA City West (Hindley St / BioMed)</option>
                <option value="Flinders University (Bedford Park)">Flinders University (Bedford Park)</option>
                <option value="UniSA Mawson Lakes Campus">UniSA Mawson Lakes Campus</option>
                <option value="South Terrace / Victoria Square">South Terrace / Victoria Square</option>
                <option value="Glenelg / Western Suburbs">Glenelg / Western Coastline</option>
              </select>
            </div>

            {/* Public Transit Concession Rule */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-600 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-stone-400" />
                <span>Transit Fare Preference:</span>
              </label>
              <select
                value={transitPassType}
                onChange={(e) => setTransitPassType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-800 bg-white focus:outline-none focus:border-amber-500"
              >
                <option value="concession_single">Student Concession Pay-As-You-Go ($1.25 peak / $0.85 off-peak)</option>
                <option value="unlimited_pass">Already have 28-Day Student Pass ($0 extra cost)</option>
                <option value="free_zone_only">Staying in Free Tram Zone & Free 98A Bus ($0 cost)</option>
              </select>
            </div>
          </div>

          {/* Cost Breakdown Card */}
          <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 shadow-xl border border-stone-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Estimated Cost Breakdown</span>
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                isOverBudget
                  ? 'bg-rose-500 text-white'
                  : 'bg-emerald-500 text-stone-950'
              }`}>
                {isOverBudget ? 'Over Budget' : 'Within Budget'}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-stone-300">
                <span>Activities & Admissions:</span>
                <span className="font-bold text-white">${activitiesCost.toFixed(2)} AUD</span>
              </div>
              <div className="flex items-center justify-between text-stone-300">
                <span>Food, Meals & Snacks:</span>
                <span className="font-bold text-white">${foodCost.toFixed(2)} AUD</span>
              </div>
              <div className="flex items-center justify-between text-stone-300">
                <span className="flex items-center gap-1">
                  <span>Adelaide Metro Transport:</span>
                  {transitPassType === 'unlimited_pass' && (
                    <span className="text-[10px] text-emerald-400 font-semibold">(28-Day Pass)</span>
                  )}
                </span>
                <span className="font-bold text-white">${transportCost.toFixed(2)} AUD</span>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-sm">
                <span className="font-bold text-amber-400">Total Estimated Outing:</span>
                <span className="font-black text-xl text-amber-400">${grandTotal.toFixed(2)} AUD</span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-stone-400">Target Budget:</span>
                <span className="text-stone-300 font-semibold">${targetBudget.toFixed(2)} AUD</span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-stone-400">Remaining Cushion:</span>
                <span className={`font-bold ${budgetRemaining >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {budgetRemaining >= 0 ? `+$${budgetRemaining.toFixed(2)}` : `-$${Math.abs(budgetRemaining).toFixed(2)}`}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={handleCopySummary}
                className="flex-1 py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedNotification ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Plan</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                className="py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Outing Stops & Transit Guidance (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
              <div>
                <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <span>Your Planned Outing Stops</span>
                  <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                    {plannedItems.length} stops
                  </span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Starting from: <strong>{startingPoint}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCustomModal(true)}
                  className="px-3 py-1.5 rounded-xl border border-stone-200 hover:border-amber-400 text-xs font-semibold text-stone-700 flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Custom Item</span>
                </button>

                {plannedItems.length > 0 && (
                  <button
                    onClick={onClearAll}
                    className="px-2.5 py-1.5 text-xs text-stone-400 hover:text-rose-600 transition-colors"
                    title="Clear all items"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Custom Item Form Dropdown / Modal */}
            {showCustomModal && (
              <form onSubmit={handleAddCustom} className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900">Add Custom Outing Item or Expense</span>
                  <button 
                    type="button" 
                    onClick={() => setShowCustomModal(false)}
                    className="text-amber-800 text-xs font-bold"
                  >
                    Cancel
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Bubble Tea on Gouger St"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="sm:col-span-2 px-3 py-1.5 text-xs rounded-lg border border-amber-300 bg-white focus:outline-none"
                    autoFocus
                  />
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-stone-500">$</span>
                    <input
                      type="number"
                      step="0.5"
                      placeholder="Cost"
                      value={customCost}
                      onChange={(e) => setCustomCost(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs rounded-lg border border-amber-300 bg-white focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2 text-xs">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        checked={customType === 'food'}
                        onChange={() => setCustomType('food')}
                      />
                      <span>Food / Drink</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        checked={customType === 'activity'}
                        onChange={() => setCustomType('activity')}
                      />
                      <span>Activity</span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </form>
            )}

            {/* List of stops */}
            {plannedItems.length === 0 ? (
              <div className="py-12 px-4 text-center space-y-4 border-2 border-dashed border-stone-200 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-stone-800 text-base">Your outing plan is currently empty</h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Add activities from the <strong>Explore</strong> page or cheap meals from <strong>Food & Cafes</strong>, or pick one of our ready-made itineraries above!
                  </p>
                </div>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => onSelectTab('explore')}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors"
                  >
                    Browse Activities
                  </button>
                  <button
                    onClick={() => onSelectTab('food')}
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors"
                  >
                    Browse Food Spots
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Starting pin */}
                <div className="flex items-center gap-3 text-xs text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-200/80">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    S
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-stone-800">Trip Starts: {startingPoint}</span>
                    <p className="text-[11px] text-stone-400">Prepare student ID & metroCARD</p>
                  </div>
                </div>

                {/* Items timeline */}
                {plannedItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative bg-white border border-stone-200 rounded-xl p-4 shadow-sm hover:border-amber-300 transition-all space-y-2 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              item.type === 'activity'
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-rose-100 text-rose-900'
                            }`}>
                              {item.type}
                            </span>
                            <span className="text-xs text-stone-400">
                              {item.locationName}
                            </span>
                          </div>
                          <h4 className="font-bold text-stone-900 text-sm mt-0.5">
                            {item.title}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-black text-sm text-stone-900">
                          {item.cost === 0 ? 'Free' : `$${item.cost.toFixed(2)}`}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-stone-100 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Step Transit Guidance */}
                    <div className="bg-sky-50 border border-sky-100 p-2.5 rounded-lg text-xs text-sky-950 flex items-start gap-2 mt-2">
                      <Bus className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-tight">
                        <span className="font-bold text-sky-900">Transit Step: </span>
                        {item.transitSummary}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Return trip notice */}
                <div className="flex items-center gap-3 text-xs text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-200/80">
                  <div className="w-6 h-6 rounded-full bg-stone-700 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    E
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-stone-800">Return to Campus / Home</span>
                    <p className="text-[11px] text-stone-400">2-hour transfer rule may apply on your return trip</p>
                  </div>
                </div>

              </div>
            )}

            {/* Bottom Add more prompt */}
            <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-stone-500">Want to explore more spots?</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectTab('explore')}
                  className="text-amber-700 font-bold hover:underline"
                >
                  + Add more Activities
                </button>
                <span className="text-stone-300">•</span>
                <button
                  onClick={() => onSelectTab('food')}
                  className="text-amber-700 font-bold hover:underline"
                >
                  + Add more Meals
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
