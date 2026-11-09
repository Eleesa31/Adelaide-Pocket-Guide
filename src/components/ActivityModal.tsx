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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A2E2C]/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#D4DDD9] text-[#1A2E2C] relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header banner with Image or Deep Teal to Ocean Blue gradient */}
        {activity.imageSrc ? (
          <div className="relative h-60 sm:h-72 w-full overflow-hidden rounded-t-2xl">
            <img 
              src={activity.imageSrc} 
              alt={activity.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-6 right-6 text-white space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-[#1A2E2C] shadow-xs">
                  {activity.categoryLabel}
                </span>
                {activity.isFree ? (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E6F3F4] text-[#0A868C] shadow-xs">
                    100% Free Entry
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D0A18F] text-[#1A2E2C] shadow-xs">
                    Budget: ~${activity.costValue.toFixed(2)} AUD
                  </span>
                )}
                {activity.highlightTag && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-xs">
                    {activity.highlightTag}
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                {activity.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-white/90">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{activity.locationName}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-[#0A868C] via-[#087378] to-[#0666A7] text-white p-6 rounded-t-2xl relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-[#1A2E2C] shadow-xs">
                {activity.categoryLabel}
              </span>
              {activity.isFree ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E6F3F4] text-[#0A868C] shadow-xs">
                  100% Free Entry
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D0A18F] text-[#1A2E2C] shadow-xs">
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

            <div className="flex items-center gap-1.5 text-xs text-[#E6F3F4] mt-2">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{activity.locationName}</span>
            </div>
          </div>
        )}

        {/* Content body */}
        <div className="p-6 space-y-6">
          
          {/* Description */}
          <div>
            <h4 className="text-xs uppercase font-bold text-[#87A09B] tracking-wider mb-1.5">
              About This Experience
            </h4>
            <p className="text-[#475E5A] leading-relaxed text-sm sm:text-base">
              {activity.description}
            </p>
          </div>

          {/* Quick info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="bg-[#EFF4F2] border border-[#D4DDD9] rounded-xl p-3.5 flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#0A868C] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#5B6E6A] uppercase block">Time Recommended</span>
                <span className="text-sm font-semibold text-[#1A2E2C]">{activity.timeNeeded}</span>
              </div>
            </div>

            <div className="bg-[#EFF4F2] border border-[#D4DDD9] rounded-xl p-3.5 flex items-start gap-3">
              <Sun className="w-5 h-5 text-[#D0A18F] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#5B6E6A] uppercase block">Best Time to Visit</span>
                <span className="text-sm font-semibold text-[#1A2E2C]">{activity.bestTimeToVisit}</span>
              </div>
            </div>

            <div className="bg-[#EFF4F2] border border-[#D4DDD9] rounded-xl p-3.5 flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-[#0A868C] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#5B6E6A] uppercase block">Cost / Admission</span>
                <span className="text-sm font-semibold text-[#1A2E2C]">{activity.costDescription}</span>
              </div>
            </div>

            <div className="bg-[#EFF4F2] border border-[#D4DDD9] rounded-xl p-3.5 flex items-start gap-3">
              <Compass className="w-5 h-5 text-[#0666A7] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#5B6E6A] uppercase block">Address</span>
                <span className="text-xs font-medium text-[#1A2E2C] leading-tight">{activity.address}</span>
              </div>
            </div>
          </div>

          {/* Public Transport Guidance */}
          <div className="bg-[#EBF4FA] border border-[#0666A7]/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2 text-[#0666A7] font-bold text-sm">
              <Bus className="w-4 h-4 text-[#0666A7]" />
              <span>Public Transport Guidance</span>
              {activity.transitType === 'tram_free' && (
                <span className="text-[11px] font-bold bg-[#E6F3F4] text-[#0A868C] border border-[#0A868C]/30 px-2 py-0.5 rounded-full ml-auto">
                  Free Tram Zone! No Card Needed
                </span>
              )}
              {activity.transitType === 'bus_free' && (
                <span className="text-[11px] font-bold bg-[#E6F3F4] text-[#0A868C] border border-[#0A868C]/30 px-2 py-0.5 rounded-full ml-auto">
                  Free 98A/98C Connector
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#1A2E2C] leading-relaxed">
              {activity.transitSummary}
            </p>
          </div>

          {/* Student Insider Tip */}
          <div className="bg-[#EFF4F2] border border-[#87A09B]/40 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1.5 text-[#0A868C] font-bold text-sm">
              <Lightbulb className="w-4 h-4 text-[#0A868C]" />
              <span>Student Insider Tip</span>
            </div>
            <p className="text-xs sm:text-sm text-[#475E5A] leading-relaxed">
              {activity.studentTip}
            </p>
          </div>

          {/* Nearby Affordable Eats */}
          {activity.nearbyFood && (
            <div className="bg-[#FBF4F1] border border-[#D0A18F]/40 rounded-xl p-4 flex items-start gap-3">
              <Utensils className="w-4 h-4 text-[#B57F6C] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#1A2E2C] block mb-0.5">Nearby Affordable Eats</span>
                <span className="text-xs text-[#5B6E6A]">{activity.nearbyFood}</span>
              </div>
            </div>
          )}

          {/* Modal Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#EFF4F2]">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-[#5B6E6A] hover:text-[#1A2E2C] hover:bg-[#EFF4F2] rounded-xl transition-colors text-center cursor-pointer"
            >
              Back to List
            </button>

            <button
              onClick={() => onTogglePlan(activity)}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer ${
                isPlanned
                  ? 'bg-[#FBF4F1] text-[#B57F6C] border border-[#D0A18F]'
                  : 'bg-[#0A868C] hover:bg-[#076E73] text-white'
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
