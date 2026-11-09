import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  MapPin, 
  Bus, 
  Trash2, 
  Plus, 
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
  const transportCost = useMemo(() => {
    if (transitPassType === 'unlimited_pass' || transitPassType === 'free_zone_only') {
      return 0;
    }
    const paidTripsCount = plannedItems.filter(item => 
      item.transitType !== 'tram_free' && item.transitType !== 'bus_free' && item.transitType !== 'walk'
    ).length;

    const baseFarePerTrip = 1.25;
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF4FA] text-[#0666A7] border border-[#0666A7]/30">
          <Calculator className="w-3.5 h-3.5 text-[#0666A7]" />
          <span>Interactive Cost Estimator & Route Planner</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A2E2C] tracking-tight">
          Plan Your Outing: Estimated Costs & Transit
        </h1>
        <p className="text-[#475E5A] text-sm sm:text-base max-w-3xl leading-relaxed">
          Avoid spending surprises. Build your custom Adelaide day trip below or load a pre-made student budget day. The calculator figures out your total expenses—including concession tram/bus fares, dining, and admissions!
        </p>
      </div>

      {/* Pre-made Itineraries Quick Load Strip */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5B6E6A] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#0A868C]" />
            <span>Or Load a Ready-Made Student Itinerary:</span>
          </span>
          <span className="text-[11px] text-[#87A09B]">Click to instantly populate your plan</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRE_MADE_ITINERARIES.map((itin) => (
            <div
              key={itin.id}
              className="bg-white border border-[#D4DDD9] hover:border-[#0A868C] rounded-xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 text-left group"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E6F3F4] text-[#0A868C]">
                    {itin.badge}
                  </span>
                  <span className="text-xs font-black text-[#0A868C]">
                    ~${itin.estimatedTotal.toFixed(2)} AUD
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[#1A2E2C] group-hover:text-[#0A868C] transition-colors">
                  {itin.title}
                </h3>
                <p className="text-[11px] text-[#5B6E6A] mt-1 line-clamp-2">
                  {itin.subtitle}
                </p>
              </div>

              <button
                onClick={() => onLoadPreMadeItinerary(itin)}
                className="w-full py-1.5 px-3 rounded-lg bg-[#EFF4F2] group-hover:bg-[#0A868C] text-[#2D4543] group-hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
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
          <div className="bg-white border border-[#D4DDD9] rounded-2xl p-6 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-[#1A2E2C] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#0A868C]" />
              <span>Outing Parameters</span>
            </h2>

            {/* Target Budget Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#1A2E2C]">
                <span>My Spending Target:</span>
                <span className="text-base font-black text-[#0A868C]">${targetBudget.toFixed(2)} AUD</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                step="5"
                value={targetBudget}
                onChange={(e) => setTargetBudget(Number(e.target.value))}
                className="w-full accent-[#0A868C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#87A09B]">
                <span>$0 (Free Day)</span>
                <span>$25</span>
                <span>$50</span>
                <span>$80 (Full Weekend)</span>
              </div>
            </div>

            {/* Starting Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#475E5A] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#87A09B]" />
                <span>Starting From:</span>
              </label>
              <select
                value={startingPoint}
                onChange={(e) => setStartingPoint(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D4DDD9] text-xs text-[#1A2E2C] bg-white focus:outline-none focus:border-[#0A868C]"
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
              <label className="text-xs font-bold text-[#475E5A] flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-[#87A09B]" />
                <span>Transit Fare Preference:</span>
              </label>
              <select
                value={transitPassType}
                onChange={(e) => setTransitPassType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-[#D4DDD9] text-xs text-[#1A2E2C] bg-white focus:outline-none focus:border-[#0A868C]"
              >
                <option value="concession_single">Student Concession Pay-As-You-Go ($1.25 peak / $0.85 off-peak)</option>
                <option value="unlimited_pass">Already have 28-Day Student Pass ($0 extra cost)</option>
                <option value="free_zone_only">Staying in Free Tram Zone & Free 98A Bus ($0 cost)</option>
              </select>
            </div>
          </div>

          {/* Cost Breakdown Card styled with Deep Marine Charcoal and Coolors Accents */}
          <div className="bg-[#1A2E2C] text-[#EFF4F2] rounded-2xl p-6 shadow-md border border-[#87A09B]/30 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#2D4543]">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#0A868C]" />
                <span>Estimated Cost Breakdown</span>
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                isOverBudget
                  ? 'bg-[#D0A18F] text-[#1A2E2C]'
                  : 'bg-[#0A868C] text-white'
              }`}>
                {isOverBudget ? 'Over Budget' : 'Within Budget'}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-[#D4DDD9]">
                <span>Activities & Admissions:</span>
                <span className="font-bold text-white">${activitiesCost.toFixed(2)} AUD</span>
              </div>
              <div className="flex items-center justify-between text-[#D4DDD9]">
                <span>Food, Meals & Snacks:</span>
                <span className="font-bold text-white">${foodCost.toFixed(2)} AUD</span>
              </div>
              <div className="flex items-center justify-between text-[#D4DDD9]">
                <span className="flex items-center gap-1">
                  <span>Adelaide Metro Transport:</span>
                  {transitPassType === 'unlimited_pass' && (
                    <span className="text-[10px] text-[#A0AA9B] font-semibold">(28-Day Pass)</span>
                  )}
                </span>
                <span className="font-bold text-white">${transportCost.toFixed(2)} AUD</span>
              </div>

              <div className="pt-3 border-t border-[#2D4543] flex items-center justify-between text-sm">
                <span className="font-bold text-[#E6F3F4]">Total Estimated Outing:</span>
                <span className="font-black text-xl text-[#0A868C]">${grandTotal.toFixed(2)} AUD</span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[#87A09B]">Target Budget:</span>
                <span className="text-white font-semibold">${targetBudget.toFixed(2)} AUD</span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[#87A09B]">Remaining Cushion:</span>
                <span className={`font-bold ${budgetRemaining >= 0 ? 'text-[#A0AA9B]' : 'text-[#D0A18F]'}`}>
                  {budgetRemaining >= 0 ? `+$${budgetRemaining.toFixed(2)}` : `-$${Math.abs(budgetRemaining).toFixed(2)}`}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={handleCopySummary}
                className="flex-1 py-2 px-3 rounded-xl bg-[#2D4543] hover:bg-[#3D5B55] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedNotification ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#0A868C]" />
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
                className="py-2 px-3 rounded-xl bg-[#2D4543] hover:bg-[#3D5B55] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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
          
          <div className="bg-white border border-[#D4DDD9] rounded-2xl p-6 shadow-xs space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EFF4F2]">
              <div>
                <h2 className="text-lg font-bold text-[#1A2E2C] flex items-center gap-2">
                  <span>Your Planned Outing Stops</span>
                  <span className="text-xs font-bold bg-[#E6F3F4] text-[#0A868C] px-2.5 py-0.5 rounded-full">
                    {plannedItems.length} stops
                  </span>
                </h2>
                <p className="text-xs text-[#5B6E6A] mt-0.5">
                  Starting from: <strong>{startingPoint}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCustomModal(true)}
                  className="px-3 py-1.5 rounded-xl border border-[#D4DDD9] hover:border-[#0A868C] text-xs font-semibold text-[#1A2E2C] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Custom Item</span>
                </button>

                {plannedItems.length > 0 && (
                  <button
                    onClick={onClearAll}
                    className="px-2.5 py-1.5 text-xs text-[#87A09B] hover:text-[#D0A18F] transition-colors cursor-pointer"
                    title="Clear all items"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Custom Item Form Modal */}
            {showCustomModal && (
              <form onSubmit={handleAddCustom} className="bg-[#EFF4F2] border border-[#87A09B]/40 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1A2E2C]">Add Custom Outing Item or Expense</span>
                  <button 
                    type="button" 
                    onClick={() => setShowCustomModal(false)}
                    className="text-[#5B6E6A] text-xs font-bold cursor-pointer"
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
                    className="sm:col-span-2 px-3 py-1.5 text-xs rounded-lg border border-[#D4DDD9] bg-white focus:outline-none focus:border-[#0A868C]"
                    autoFocus
                  />
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-[#5B6E6A]">$</span>
                    <input
                      type="number"
                      step="0.5"
                      placeholder="Cost"
                      value={customCost}
                      onChange={(e) => setCustomCost(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs rounded-lg border border-[#D4DDD9] bg-white focus:outline-none focus:border-[#0A868C]"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2 text-xs">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        checked={customType === 'food'}
                        onChange={() => setCustomType('food')}
                      />
                      <span>Food / Drink</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
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
                    className="px-3 py-1 bg-[#0A868C] hover:bg-[#076E73] text-white font-bold text-xs rounded-lg cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </form>
            )}

            {/* List of stops */}
            {plannedItems.length === 0 ? (
              <div className="py-12 px-4 text-center space-y-4 border-2 border-dashed border-[#D4DDD9] rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-[#EFF4F2] text-[#0A868C] flex items-center justify-center mx-auto">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-[#1A2E2C] text-base">Your outing plan is currently empty</h3>
                  <p className="text-xs text-[#5B6E6A] max-w-sm mx-auto">
                    Add activities from the <strong>Explore</strong> page or cheap meals from <strong>Food & Cafes</strong>, or pick one of our ready-made itineraries above!
                  </p>
                </div>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => onSelectTab('explore')}
                    className="px-4 py-2 rounded-xl bg-[#0A868C] hover:bg-[#076E73] text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Browse Activities
                  </button>
                  <button
                    onClick={() => onSelectTab('food')}
                    className="px-4 py-2 rounded-xl bg-[#EFF4F2] hover:bg-[#D4DDD9] text-[#1A2E2C] font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Browse Food Spots
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Starting pin */}
                <div className="flex items-center gap-3 text-xs text-[#5B6E6A] bg-[#EFF4F2] p-3 rounded-xl border border-[#D4DDD9]">
                  <div className="w-6 h-6 rounded-full bg-[#0A868C] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    S
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-[#1A2E2C]">Trip Starts: {startingPoint}</span>
                    <p className="text-[11px] text-[#5B6E6A]">Prepare student ID & metroCARD</p>
                  </div>
                </div>

                {/* Items timeline */}
                {plannedItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative bg-white border border-[#D4DDD9] rounded-xl p-4 shadow-xs hover:border-[#0A868C] transition-all space-y-2 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#0A868C] text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              item.type === 'activity'
                                ? 'bg-[#E6F3F4] text-[#0A868C]'
                                : 'bg-[#FBF4F1] text-[#B57F6C]'
                            }`}>
                              {item.type}
                            </span>
                            <span className="text-xs text-[#87A09B]">
                              {item.locationName}
                            </span>
                          </div>
                          <h4 className="font-bold text-[#1A2E2C] text-sm mt-0.5">
                            {item.title}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-black text-sm text-[#1A2E2C]">
                          {item.cost === 0 ? 'Free' : `$${item.cost.toFixed(2)}`}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 text-[#87A09B] hover:text-[#D0A18F] hover:bg-[#EFF4F2] rounded-lg transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Step Transit Guidance */}
                    <div className="bg-[#EBF4FA] border border-[#0666A7]/20 p-2.5 rounded-lg text-xs text-[#0666A7] flex items-start gap-2 mt-2">
                      <Bus className="w-3.5 h-3.5 text-[#0666A7] shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-tight">
                        <span className="font-bold text-[#0666A7]">Transit Step: </span>
                        {item.transitSummary}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Return trip notice */}
                <div className="flex items-center gap-3 text-xs text-[#5B6E6A] bg-[#EFF4F2] p-3 rounded-xl border border-[#D4DDD9]">
                  <div className="w-6 h-6 rounded-full bg-[#87A09B] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    E
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-[#1A2E2C]">Return to Campus / Home</span>
                    <p className="text-[11px] text-[#5B6E6A]">2-hour transfer rule may apply on your return trip</p>
                  </div>
                </div>

              </div>
            )}

            {/* Bottom Add more prompt */}
            <div className="pt-4 border-t border-[#EFF4F2] flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[#5B6E6A]">Want to explore more spots?</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectTab('explore')}
                  className="text-[#0A868C] font-bold hover:underline cursor-pointer"
                >
                  + Add more Activities
                </button>
                <span className="text-[#87A09B]">•</span>
                <button
                  onClick={() => onSelectTab('food')}
                  className="text-[#0666A7] font-bold hover:underline cursor-pointer"
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
