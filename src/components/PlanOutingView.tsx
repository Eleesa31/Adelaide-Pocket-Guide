import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Bus,
  Trash2,
  Plus,
  Check,
  Compass,
  Printer,
  Copy
} from 'lucide-react';
import { OutingItem, PreMadeItinerary } from '../types';
import { PRE_MADE_ITINERARIES } from '../data/itineraries';

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
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Simple inline add-item form state
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customCost, setCustomCost] = useState('10');
  const [customType, setCustomType] = useState<'food' | 'activity' | 'transit'>('food');

  // Direct, transparent category sums (always equals exact sum of items in Your Planned Stops)
  const { activitiesCost, activityCount, foodCost, foodCount, transportCost, transitCount, grandTotal } =
    useMemo(() => {
      let actSum = 0;
      let actCnt = 0;
      let fSum = 0;
      let fCnt = 0;
      let tSum = 0;
      let tCnt = 0;

      for (const item of plannedItems) {
        const price = Number(item.cost) || 0;
        if (item.type === 'food') {
          fSum += price;
          fCnt += 1;
        } else if (item.type === 'transit') {
          tSum += price;
          tCnt += 1;
        } else {
          actSum += price;
          actCnt += 1;
        }
      }

      return {
        activitiesCost: actSum,
        activityCount: actCnt,
        foodCost: fSum,
        foodCount: fCnt,
        transportCost: tSum,
        transitCount: tCnt,
        grandTotal: actSum + fSum + tSum
      };
    }, [plannedItems]);

  const budgetRemaining = targetBudget - grandTotal;
  const isOverBudget = grandTotal > targetBudget;

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;
    const costNum = Math.max(0, parseFloat(customCost) || 0);
    onAddCustomItem({
      id: `custom-${Date.now()}`,
      refId: `custom-${Date.now()}`,
      type: customType,
      title: customTitle.trim(),
      cost: costNum,
      locationName: 'Adelaide',
      locationArea: 'adelaide_cbd',
      transitSummary:
        customType === 'transit' ? 'Adelaide Metro Student Concession Fare' : 'Walk or Free City Tram',
      transitType: customType === 'transit' ? 'bus_paid' : 'walk'
    });
    setCustomTitle('');
    setShowCustomForm(false);
  };

  const handleQuickAddMetroFare = () => {
    onAddCustomItem({
      id: `metro-return-${Date.now()}`,
      refId: `metro-return-${Date.now()}`,
      type: 'transit',
      title: 'Adelaide Metro Return Fare (Concession)',
      cost: 2.5,
      locationName: 'Adelaide Metro',
      locationArea: 'adelaide_cbd',
      transitSummary: '$1.25 each way with Student Concession metroCARD',
      transitType: 'bus_paid'
    });
  };

  const handleCopySummary = () => {
    const lines = [
      `My Adelaide Outing Plan (Budget: $${targetBudget.toFixed(2)} AUD)`,
      `Total Estimated Cost: $${grandTotal.toFixed(2)} AUD`,
      `- Activities (${activityCount}): $${activitiesCost.toFixed(2)} AUD`,
      `- Food & Cafes (${foodCount}): $${foodCost.toFixed(2)} AUD`,
      `- Public Transport (${transitCount}): $${transportCost.toFixed(2)} AUD`,
      `---------------------------------`,
      ...plannedItems.map(
        (item, idx) =>
          `${idx + 1}. [${item.type.toUpperCase()}] ${item.title} — ${
            item.cost === 0 ? 'Free' : `$${item.cost.toFixed(2)} AUD`
          }`
      )
    ];
    navigator.clipboard?.writeText(lines.join('\n'));
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#0666A7]">
          <Calculator className="w-4 h-4" />
          <span>Outing Cost Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A2E2C] tracking-tight">
          Plan Your Outing &amp; Total Cost
        </h1>
        <p className="text-[#475E5A] text-sm sm:text-base max-w-2xl leading-relaxed">
          Combine ready-made student day plans, activities, and cheap meals below. Every item in your list adds up automatically so you know your exact outing total.
        </p>
      </div>

      {/* Ready-Made Student Plans (Additive: load 1 or combine multiple!) */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-[#1A2E2C]">
            Quick-Add Ready-Made Student Plans
          </h2>
          <span className="text-xs text-[#5B6E6A]">
            Click to add or combine multiple plans
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRE_MADE_ITINERARIES.map((itin) => {
            const isLoaded = plannedItems.some((i) => i.sourcePlanId === itin.id);
            return (
              <div
                key={itin.id}
                className={`rounded-2xl p-4 border transition-all flex flex-col justify-between gap-3 ${
                  isLoaded
                    ? 'bg-[#E6F3F4]/60 border-[#0A868C]'
                    : 'bg-white border-[#D4DDD9] hover:border-[#0A868C]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-[#5B6E6A] truncate">{itin.badge}</span>
                    <span className="font-mono tabular-nums font-bold text-[#0A868C] shrink-0">
                      ${itin.estimatedTotal.toFixed(2)}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-[#1A2E2C] leading-snug">
                    {itin.title}
                  </h3>
                  <p className="text-xs text-[#5B6E6A] line-clamp-2">
                    {itin.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => onLoadPreMadeItinerary(itin)}
                  className={`w-full py-2 px-3 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    isLoaded
                      ? 'bg-[#0A868C] text-white hover:bg-[#076E73]'
                      : 'bg-[#EFF4F2] hover:bg-[#0A868C] text-[#1A2E2C] hover:text-white'
                  }`}
                >
                  {isLoaded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added (Click to Remove)</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Plan</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main 2-Column Workspace: Stops List (Left) + Simple Cost Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Planned Stops List (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#D4DDD9] rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EFF4F2]">
            <div>
              <h2 className="text-lg font-bold text-[#1A2E2C]">
                Your Planned Outing Stops ({plannedItems.length})
              </h2>
              <p className="text-xs text-[#5B6E6A]">
                All items listed here are included in your total cost
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCustomForm(!showCustomForm)}
                className="px-3 py-1.5 rounded-xl bg-[#EFF4F2] hover:bg-[#D4DDD9] text-xs font-semibold text-[#1A2E2C] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Custom</span>
              </button>

              {plannedItems.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="px-2.5 py-1.5 text-xs font-semibold text-[#5B6E6A] hover:text-[#B57F6C] transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Inline Custom Item Form */}
          {showCustomForm && (
            <form
              onSubmit={handleAddCustom}
              className="bg-[#EFF4F2] border border-[#D4DDD9] rounded-xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-bold text-[#1A2E2C]">
                <span>Add Custom Expense or Stop</span>
                <button
                  type="button"
                  onClick={() => setShowCustomForm(false)}
                  className="text-[#5B6E6A] hover:text-[#1A2E2C] cursor-pointer"
                >
                  Cancel
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. Iced Coffee or Bus Fare"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="sm:col-span-2 px-3 py-2 text-xs rounded-lg border border-[#D4DDD9] bg-white focus:outline-none focus:border-[#0A868C]"
                  autoFocus
                />
                <div className="flex items-center gap-1 bg-white border border-[#D4DDD9] rounded-lg px-2.5">
                  <span className="text-xs text-[#5B6E6A]">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.10"
                    value={customCost}
                    onChange={(e) => setCustomCost(e.target.value)}
                    className="w-full py-2 text-xs font-mono tabular-nums focus:outline-none"
                  />
                </div>
                <select
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value as 'food' | 'activity' | 'transit')}
                  className="px-2.5 py-2 text-xs rounded-lg border border-[#D4DDD9] bg-white focus:outline-none focus:border-[#0A868C] cursor-pointer"
                >
                  <option value="food">Food / Drink</option>
                  <option value="activity">Activity</option>
                  <option value="transit">Transport</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0A868C] hover:bg-[#076E73] text-white font-bold text-xs rounded-lg cursor-pointer"
                >
                  Add to Plan
                </button>
              </div>
            </form>
          )}

          {/* Items List */}
          {plannedItems.length === 0 ? (
            <div className="py-10 px-4 text-center space-y-3 border border-dashed border-[#D4DDD9] rounded-xl">
              <Compass className="w-8 h-8 text-[#87A09B] mx-auto" />
              <div className="space-y-1">
                <h3 className="font-bold text-[#1A2E2C] text-sm">
                  No stops in your plan yet
                </h3>
                <p className="text-xs text-[#5B6E6A] max-w-sm mx-auto">
                  Pick a ready-made plan above, or add activities and meals from Explore and Food &amp; Cafes.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                <button
                  onClick={() => onSelectTab('explore')}
                  className="px-4 py-2 rounded-xl bg-[#0A868C] hover:bg-[#076E73] text-white font-bold text-xs cursor-pointer"
                >
                  Browse Activities
                </button>
                <button
                  onClick={() => onSelectTab('food')}
                  className="px-4 py-2 rounded-xl bg-[#EFF4F2] hover:bg-[#D4DDD9] text-[#1A2E2C] font-semibold text-xs cursor-pointer"
                >
                  Browse Food &amp; Cafes
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-[#EFF4F2]">
              {plannedItems.map((item, index) => (
                <div
                  key={item.id}
                  className="py-3.5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-[#EFF4F2] text-[#0A868C] font-mono tabular-nums font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[11px] text-[#5B6E6A]">
                        <span
                          className={`font-bold capitalize ${
                            item.type === 'food'
                              ? 'text-[#B57F6C]'
                              : item.type === 'transit'
                                ? 'text-[#0666A7]'
                                : 'text-[#0A868C]'
                          }`}
                        >
                          {item.type === 'transit' ? 'Transport' : item.type}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{item.locationName}</span>
                      </div>
                      <h4 className="font-bold text-sm text-[#1A2E2C] truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#5B6E6A] truncate">
                        {item.transitSummary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono tabular-nums font-bold text-sm text-[#1A2E2C]">
                      {item.cost === 0 ? 'Free' : `$${item.cost.toFixed(2)}`}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-[#87A09B] hover:text-[#B57F6C] hover:bg-[#EFF4F2] rounded-lg transition-colors cursor-pointer"
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Bottom Actions */}
          <div className="pt-4 border-t border-[#EFF4F2] flex flex-wrap items-center justify-between gap-2 text-xs">
            <button
              onClick={handleQuickAddMetroFare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EBF4FA] hover:bg-[#0666A7] text-[#0666A7] hover:text-white font-semibold transition-colors cursor-pointer"
            >
              <Bus className="w-3.5 h-3.5" />
              <span>+ Add $2.50 Return Bus/Tram Fare</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onSelectTab('explore')}
                className="text-[#0A868C] font-bold hover:underline cursor-pointer"
              >
                + Activities
              </button>
              <button
                onClick={() => onSelectTab('food')}
                className="text-[#B57F6C] font-bold hover:underline cursor-pointer"
              >
                + Food &amp; Cafes
              </button>
            </div>
          </div>
        </div>

        {/* Right: Simple Cost Summary Card (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 bg-[#1A2E2C] text-white rounded-2xl p-6 space-y-6 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-[#2D4543]">
            <h2 className="text-base font-bold">Cost Summary</h2>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                isOverBudget
                  ? 'bg-[#D0A18F] text-[#1A2E2C]'
                  : 'bg-[#0A868C] text-white'
              }`}
            >
              {isOverBudget ? 'Over Budget' : 'Within Budget'}
            </span>
          </div>

          {/* Simple Budget Target Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#D4DDD9]">
              <span>My Budget Limit:</span>
              <span className="font-mono tabular-nums font-bold text-white">
                ${targetBudget.toFixed(2)} AUD
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[15, 25, 40, 60].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTargetBudget(preset)}
                  className={`py-1.5 rounded-lg text-xs font-mono tabular-nums font-bold transition-colors cursor-pointer ${
                    targetBudget === preset
                      ? 'bg-[#0A868C] text-white'
                      : 'bg-[#2D4543] text-[#D4DDD9] hover:bg-[#3D5B55]'
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>
          </div>

          {/* Transparent Line-by-Line Totals */}
          <div className="space-y-3 text-xs sm:text-sm pt-1">
            <div className="flex items-center justify-between text-[#D4DDD9]">
              <span>Activities ({activityCount})</span>
              <span className="font-mono tabular-nums font-bold text-white">
                ${activitiesCost.toFixed(2)} AUD
              </span>
            </div>
            <div className="flex items-center justify-between text-[#D4DDD9]">
              <span>Food &amp; Cafes ({foodCount})</span>
              <span className="font-mono tabular-nums font-bold text-white">
                ${foodCost.toFixed(2)} AUD
              </span>
            </div>
            <div className="flex items-center justify-between text-[#D4DDD9]">
              <span>Public Transport ({transitCount})</span>
              <span className="font-mono tabular-nums font-bold text-white">
                ${transportCost.toFixed(2)} AUD
              </span>
            </div>

            <div className="pt-4 border-t border-[#2D4543] flex items-baseline justify-between">
              <span className="font-bold text-sm text-[#E6F3F4]">Total Outing Cost</span>
              <span className="font-mono tabular-nums font-black text-2xl text-[#0A868C]">
                ${grandTotal.toFixed(2)} AUD
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-[#87A09B]">
              <span>Budget Balance</span>
              <span
                className={`font-mono tabular-nums font-bold ${
                  budgetRemaining >= 0 ? 'text-[#A0AA9B]' : 'text-[#D0A18F]'
                }`}
              >
                {budgetRemaining >= 0
                  ? `+$${budgetRemaining.toFixed(2)} remaining`
                  : `-$${Math.abs(budgetRemaining).toFixed(2)} over`}
              </span>
            </div>
          </div>

          {/* Copy & Print */}
          <div className="pt-2 flex gap-2">
            <button
              onClick={handleCopySummary}
              className="flex-1 py-2.5 px-3 rounded-xl bg-[#2D4543] hover:bg-[#3D5B55] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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
              onClick={() => window.print()}
              className="py-2.5 px-4 rounded-xl bg-[#2D4543] hover:bg-[#3D5B55] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
