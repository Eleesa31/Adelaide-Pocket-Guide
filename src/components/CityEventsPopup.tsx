import React, { useState } from 'react';
import {
  X,
  Calendar,
  MapPin,
  Bus,
  Sparkles,
  Plus,
  Check,
  Lightbulb,
  Ticket
} from 'lucide-react';
import { CITY_EVENTS, CityEvent } from '../data/cityEvents';

interface CityEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  plannedIds: string[];
  onAddEventToPlan: (event: CityEvent) => void;
}

export const CityEventsModal: React.FC<CityEventsModalProps> = ({
  isOpen,
  onClose,
  plannedIds,
  onAddEventToPlan
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'free'>('all');

  if (!isOpen) return null;

  const visibleEvents = CITY_EVENTS.filter((ev) =>
    filterMode === 'free' ? ev.isFree : true
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A2E2C]/65 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[88vh] overflow-hidden border border-[#D4DDD9] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0A868C] via-[#087378] to-[#0666A7] text-white p-5 sm:p-6 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#D0A18F]" />
              <span>Upcoming in Adelaide (Nov 2026 – Early 2027)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Near-Future City Events &amp; Pop-Ups
            </h2>
            <p className="text-xs sm:text-sm text-[#E6F3F4]">
              Verified upcoming concerts, outdoor fireworks, and summer festivals happening next—with Free City Tram stops and student concession tips.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close city events pop-up"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-5 sm:px-6 py-3 bg-[#F7F9F8] border-b border-[#D4DDD9] flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                filterMode === 'all'
                  ? 'bg-[#0A868C] text-white'
                  : 'bg-white border border-[#D4DDD9] text-[#475E5A] hover:bg-[#EFF4F2]'
              }`}
            >
              Upcoming Events ({CITY_EVENTS.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('free')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                filterMode === 'free'
                  ? 'bg-[#0A868C] text-white'
                  : 'bg-white border border-[#D4DDD9] text-[#475E5A] hover:bg-[#EFF4F2]'
              }`}
            >
              100% Free Entry ({CITY_EVENTS.filter((e) => e.isFree).length})
            </button>
          </div>
          <span className="text-[11px] text-[#5B6E6A]">
            Add any event to your Outing Cost Calculator
          </span>
        </div>

        {/* Scrollable Events List */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {visibleEvents.map((ev) => {
            const isAdded = plannedIds.includes(ev.id);
            return (
              <div
                key={ev.id}
                className="bg-white border border-[#D4DDD9] hover:border-[#0A868C]/50 rounded-2xl overflow-hidden shadow-xs transition-colors"
              >
                {/* Fun Visual Event Header */}
                <div className="relative h-44 sm:h-52 w-full bg-gradient-to-br from-[#0A868C] to-[#0666A7] overflow-hidden">
                  <img
                    src={ev.imageSrc}
                    alt={ev.title}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                  <div className="absolute top-3 right-3">
                    <button
                      type="button"
                      onClick={() => onAddEventToPlan(ev)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md whitespace-nowrap ${
                        isAdded
                          ? 'bg-[#FBF4F1] text-[#B57F6C] border border-[#D0A18F]'
                          : 'bg-[#0A868C] hover:bg-[#076E73] text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>In Calculator</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Calculator</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-[#E6F3F4]">
                      <span className="text-[#D0A18F] font-bold">{ev.statusBadge}</span>
                      <span aria-hidden="true">·</span>
                      <span>{ev.seasonTag}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold leading-snug drop-shadow-sm text-white">
                      {ev.title}
                    </h3>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-4 sm:p-5 space-y-3">
                  <p className="text-xs sm:text-sm text-[#475E5A] leading-relaxed">
                    {ev.summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="bg-[#F7F9F8] border border-[#EFF4F2] rounded-xl p-2.5 flex items-start gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#0A868C] shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] font-bold uppercase text-[#5B6E6A]">When</span>
                        <span className="font-semibold text-[#1A2E2C]">{ev.dateWindow}</span>
                      </div>
                    </div>
                    <div className="bg-[#F7F9F8] border border-[#EFF4F2] rounded-xl p-2.5 flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#B57F6C] shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] font-bold uppercase text-[#5B6E6A]">Where</span>
                        <span className="font-semibold text-[#1A2E2C]">{ev.location}</span>
                      </div>
                    </div>
                    <div className="bg-[#F7F9F8] border border-[#EFF4F2] rounded-xl p-2.5 flex items-start gap-2">
                      <Ticket className="w-3.5 h-3.5 text-[#0666A7] shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] font-bold uppercase text-[#5B6E6A]">Student Cost</span>
                        <span className="font-semibold text-[#1A2E2C]">{ev.costLabel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-[#EBF4FA] border border-[#0666A7]/20 rounded-xl p-2.5 flex items-start gap-2 text-[#0666A7]">
                      <Bus className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span className="leading-snug">{ev.transitTip}</span>
                    </div>
                    <div className="bg-[#EFF4F2] border border-[#D4DDD9] rounded-xl p-2.5 flex items-start gap-2 text-[#2D4543]">
                      <Lightbulb className="w-3.5 h-3.5 text-[#0A868C] shrink-0 mt-0.5" />
                      <span className="leading-snug">{ev.studentTip}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
