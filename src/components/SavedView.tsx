import React, { useState } from 'react';
import {
  Heart,
  MapPin,
  Bus,
  Plus,
  Check,
  Trash2,
  Compass,
  UtensilsCrossed,
  Calculator
} from 'lucide-react';
import { Activity, FoodSpot, LikedItem } from '../types';
import { ACTIVITIES } from '../data/activities';
import { FOOD_PLACES } from '../data/foodPlaces';

interface SavedViewProps {
  likedItems: LikedItem[];
  plannedIds: string[];
  onRemoveLiked: (id: string) => void;
  onClearLiked: () => void;
  onOpenActivity: (activity: Activity) => void;
  onTogglePlanActivity: (activity: Activity) => void;
  onTogglePlanFood: (food: FoodSpot) => void;
  onSelectTab: (tab: string) => void;
}

export const SavedView: React.FC<SavedViewProps> = ({
  likedItems,
  plannedIds,
  onRemoveLiked,
  onClearLiked,
  onOpenActivity,
  onTogglePlanActivity,
  onTogglePlanFood,
  onSelectTab
}) => {
  const [filterType, setFilterType] = useState<'all' | 'activity' | 'food'>('all');

  const filteredItems = likedItems.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const activityCount = likedItems.filter((i) => i.type === 'activity').length;
  const foodCount = likedItems.filter((i) => i.type === 'food').length;

  const handleTogglePlan = (item: LikedItem) => {
    if (item.type === 'activity') {
      const act = ACTIVITIES.find((a) => a.id === item.id);
      if (act) onTogglePlanActivity(act);
    } else {
      const food = FOOD_PLACES.find((f) => f.id === item.id);
      if (food) onTogglePlanFood(food);
    }
  };

  const handleViewActivity = (id: string) => {
    const act = ACTIVITIES.find((a) => a.id === id);
    if (act) onOpenActivity(act);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#B57F6C]">
            <Heart className="w-4 h-4 fill-[#D0A18F] text-[#B57F6C]" />
            <span>Saved for Future Reference</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1A2E2C] tracking-tight">
            My Saved Places ({likedItems.length})
          </h1>
          <p className="text-sm sm:text-base text-[#475E5A] max-w-2xl leading-relaxed">
            Activities, cafes, and cheap eats you liked for later. Keep them bookmarked here without adding them to your Cost Calculator until you are ready to go.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {likedItems.length > 0 && (
            <button
              onClick={onClearLiked}
              className="px-3.5 py-2 rounded-xl border border-[#D4DDD9] hover:border-[#B57F6C] text-xs font-semibold text-[#5B6E6A] hover:text-[#B57F6C] transition-colors cursor-pointer"
            >
              Clear Saved
            </button>
          )}
          <button
            onClick={() => onSelectTab('plan')}
            className="px-4 py-2 rounded-xl bg-[#0666A7] hover:bg-[#05548A] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Open Cost Calculator</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      {likedItems.length > 0 && (
        <div className="inline-flex items-center gap-1 p-1 bg-[#EFF4F2] border border-[#D4DDD9] rounded-xl">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterType === 'all'
                ? 'bg-white text-[#0A868C] shadow-xs font-bold'
                : 'text-[#475E5A] hover:text-[#1A2E2C]'
            }`}
          >
            All Saved ({likedItems.length})
          </button>
          <button
            onClick={() => setFilterType('activity')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterType === 'activity'
                ? 'bg-white text-[#0A868C] shadow-xs font-bold'
                : 'text-[#475E5A] hover:text-[#1A2E2C]'
            }`}
          >
            Activities ({activityCount})
          </button>
          <button
            onClick={() => setFilterType('food')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterType === 'food'
                ? 'bg-white text-[#0A868C] shadow-xs font-bold'
                : 'text-[#475E5A] hover:text-[#1A2E2C]'
            }`}
          >
            Cafes &amp; Eateries ({foodCount})
          </button>
        </div>
      )}

      {/* Empty State or Saved Grid */}
      {likedItems.length === 0 ? (
        <div className="bg-white border border-[#D4DDD9] rounded-2xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#FBF4F1] text-[#B57F6C] flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-[#1A2E2C]">No saved places yet</h2>
            <p className="text-xs sm:text-sm text-[#5B6E6A] max-w-md mx-auto">
              Tap the heart icon on any activity, study cafe, or cheap eatery across the site to bookmark it here for future reference.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => onSelectTab('explore')}
              className="px-4 py-2.5 rounded-xl bg-[#0A868C] hover:bg-[#076E73] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Activities</span>
            </button>
            <button
              onClick={() => onSelectTab('food')}
              className="px-4 py-2.5 rounded-xl bg-[#EFF4F2] hover:bg-[#D4DDD9] text-[#1A2E2C] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Browse Food &amp; Cafes</span>
            </button>
          </div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white border border-[#D4DDD9] rounded-2xl p-8 text-center space-y-3">
          <p className="text-sm text-[#5B6E6A]">
            No saved items in this category yet.
          </p>
          <button
            onClick={() => setFilterType('all')}
            className="px-4 py-2 rounded-xl bg-[#0A868C] text-white text-xs font-bold cursor-pointer"
          >
            Show All Saved ({likedItems.length})
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isPlanned = plannedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white border border-[#D4DDD9] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                {item.imageSrc && (
                  <div className="relative h-40 w-full overflow-hidden bg-[#EFF4F2]">
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <button
                      onClick={() => onRemoveLiked(item.id)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-[#D0A18F] text-[#1A2E2C] hover:bg-white transition-colors cursor-pointer"
                      title="Remove from Saved Places"
                    >
                      <Heart className="w-4 h-4 fill-[#1A2E2C]" />
                    </button>
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-[#0A868C]">
                        {item.type === 'food' ? 'Cafe / Eatery' : 'Activity'} · {item.subtitle}
                      </span>
                      {!item.imageSrc && (
                        <button
                          onClick={() => onRemoveLiked(item.id)}
                          className="p-1.5 rounded-full bg-[#FBF4F1] text-[#B57F6C] hover:bg-[#D0A18F]/40 transition-colors cursor-pointer shrink-0"
                          title="Remove from Saved Places"
                        >
                          <Heart className="w-4 h-4 fill-[#B57F6C]" />
                        </button>
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-[#1A2E2C] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#5B6E6A] flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#87A09B] shrink-0" />
                        <span>{item.locationName}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-[#EFF4F2]">
                      <span className="text-[#5B6E6A]">Estimated Cost:</span>
                      <span className="font-mono tabular-nums font-bold text-[#1A2E2C]">
                        {item.costLabel}
                      </span>
                    </div>

                    <div className="bg-[#EBF4FA] border border-[#0666A7]/15 p-2.5 rounded-xl text-[11px] text-[#0666A7] flex items-start gap-1.5">
                      <Bus className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span className="line-clamp-2 leading-tight">{item.transitSummary}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#EFF4F2] flex items-center gap-2">
                    {item.type === 'activity' ? (
                      <button
                        onClick={() => handleViewActivity(item.id)}
                        className="px-3 py-2 rounded-xl border border-[#D4DDD9] hover:bg-[#EFF4F2] text-xs font-semibold text-[#1A2E2C] transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                    ) : (
                      <button
                        onClick={() => onRemoveLiked(item.id)}
                        className="p-2 rounded-xl border border-[#D4DDD9] hover:border-[#B57F6C] text-[#5B6E6A] hover:text-[#B57F6C] transition-colors cursor-pointer"
                        title="Remove from Saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => handleTogglePlan(item)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        isPlanned
                          ? 'bg-[#FBF4F1] text-[#B57F6C] border border-[#D0A18F]'
                          : 'bg-[#0A868C] hover:bg-[#076E73] text-white'
                      }`}
                    >
                      {isPlanned ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>In Cost Calculator</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Cost Calculator</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
