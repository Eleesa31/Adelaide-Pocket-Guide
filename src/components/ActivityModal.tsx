import React from 'react';
import { 
  X, 
  MapPin, 
  Bus, 
  Clock, 
  Sun, 
  Lightbulb, 
  Utensils, 
  Plus, 
  Check, 
  Compass,
  DollarSign
} from 'lucide-react';
import { Activity } from '../types';

interface ActivityModalProps {
  activity: Activity | null;
  onClose: () => void;
  isPlanned: boolean;
  onTogglePlan: (activity: Activity) => void;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({
  activity,
  onClose,
  isPlanned,
  onTogglePlan
}) => {
  if (!activity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 text-stone-800 relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header banner */}
        <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 text-white p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-stone-900 shadow-sm">
              {activity.categoryLabel}
            </span>
            {activity.isFree ? (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-sm">
                100% Free Entry
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-stone-950 shadow-sm">
                Budget: ~${activity.costValue.toFixed(2)} AUD
              </span>
            )}
            {activity.highlightTag && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                {activity.highlightTag}
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            {activity.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-amber-100 mt-2">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{activity.locationName}</span>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-6">
          
          {/* Description */}
          <div>
            <h4 className="text-xs uppercase font-bold text-stone-400 tracking-wider mb-1.5">
              About This Experience
            </h4>
            <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
              {activity.description}
            </p>
          </div>

          {/* Quick info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase block">Time Recommended</span>
                <span className="text-sm font-semibold text-stone-800">{activity.timeNeeded}</span>
              </div>
            </div>

            <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 flex items-start gap-3">
              <Sun className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase block">Best Time to Visit</span>
                <span className="text-sm font-semibold text-stone-800">{activity.bestTimeToVisit}</span>
              </div>
            </div>

            <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase block">Cost / Admission</span>
                <span className="text-sm font-semibold text-stone-800">{activity.costDescription}</span>
              </div>
            </div>

            <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 flex items-start gap-3">
              <Compass className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase block">Address</span>
                <span className="text-xs font-medium text-stone-700 leading-tight">{activity.address}</span>
              </div>
            </div>
          </div>

          {/* Public Transport Guidance */}
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2 text-sky-900 font-bold text-sm">
              <Bus className="w-4 h-4 text-sky-700" />
              <span>Public Transport Guidance</span>
              {activity.transitType === 'tram_free' && (
                <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full ml-auto">
                  Free Tram Zone! No Card Needed
                </span>
              )}
              {activity.transitType === 'bus_free' && (
                <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full ml-auto">
                  Free 98A/98C Connector
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-sky-950 leading-relaxed">
              {activity.transitSummary}
            </p>
          </div>

          {/* Student Insider Tip */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1.5 text-amber-900 font-bold text-sm">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Student Insider Tip</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
              {activity.studentTip}
            </p>
          </div>

          {/* Nearby Affordable Eats */}
          {activity.nearbyFood && (
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-start gap-3">
              <Utensils className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-stone-700 block mb-0.5">Nearby Affordable Eats</span>
                <span className="text-xs text-stone-600">{activity.nearbyFood}</span>
              </div>
            </div>
          )}

          {/* Modal Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-200">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors text-center"
            >
              Back to List
            </button>

            <button
              onClick={() => onTogglePlan(activity)}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
                isPlanned
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
              }`}
            >
              {isPlanned ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>In Your Outing Plan (Click to Remove)</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to My Outing Plan</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
