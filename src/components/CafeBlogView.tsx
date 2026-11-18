import React, { useState } from 'react';
import {
  ArrowLeft,
  Wifi,
  Bus,
  Coffee,
  BookOpen,
  Cat,
  Plus,
  Check,
  Copy,
  MapPin,
  Clock,
  DollarSign,
  Calculator,
  Heart
} from 'lucide-react';
import { FoodSpot } from '../types';
import {
  FOOD_PLACES,
  cafeStudyHeroImg,
  cafeBreakfastImg,
  cafeCatLoungeImg
} from '../data/foodPlaces';

interface CafeBlogViewProps {
  plannedIds: string[];
  likedIds: string[];
  onTogglePlanFood: (food: FoodSpot) => void;
  onToggleLikeFood: (food: FoodSpot) => void;
  onBackToDirectory: () => void;
  onSelectTab: (tab: string) => void;
}

export const CafeBlogView: React.FC<CafeBlogViewProps> = ({
  plannedIds,
  likedIds,
  onTogglePlanFood,
  onToggleLikeFood,
  onBackToDirectory,
  onSelectTab
}) => {
  const [copiedArticle, setCopiedArticle] = useState(false);

  const studyCafes = ['script-and-bean', 'the-rose-eastend', 'bakery-on-oconnell']
    .map((id) => FOOD_PLACES.find((f) => f.id === id))
    .filter((f): f is FoodSpot => Boolean(f));

  const breakfastCafes = ['peter-rabbit', 'lucias-pizza', 'bakery-on-oconnell']
    .map((id) => FOOD_PLACES.find((f) => f.id === id))
    .filter((f): f is FoodSpot => Boolean(f));

  const catCafes = ['meowme-cat-cafe', 'sassys-cat-cafe']
    .map((id) => FOOD_PLACES.find((f) => f.id === id))
    .filter((f): f is FoodSpot => Boolean(f));

  const tableCafes = [
    ...studyCafes,
    FOOD_PLACES.find((f) => f.id === 'peter-rabbit'),
    FOOD_PLACES.find((f) => f.id === 'lucias-pizza'),
    ...catCafes
  ].filter((f, idx, arr): f is FoodSpot => Boolean(f) && arr.findIndex((x) => x?.id === f?.id) === idx);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopyBlogText = () => {
    const plainArticle = `# Best Budget-Friendly Cafes Near Me in Adelaide for Students (Study, Breakfast & Cat Cafes)

Finding a budget-friendly cafe near campus with fast Wi-Fi, affordable food, and easy public transport can feel overwhelming—especially when you're living on a student budget. Whether you are searching for a "cafe near me study" spot with power and quiet tables, an affordable "cafe near me for breakfast" before a 9 AM lecture, or even a cozy "cat cafe near me" to de-stress during exam week, Adelaide has plenty of accessible options.

## 1. Best "Cafe Near Me Study" Spots with Free Wi-Fi & Quiet Seating
- **Script and Bean Café (Level 1, Regent Arcade, Rundle Mall)**: Free Rundle Mall Wi-Fi, bookshop calm, sourdough toastie & flat white ~$11.50. Transit: Free City Tram to Rundle Mall or University stop.
- **The Rose Eastend (31 East Terrace, CBD)**: Peaceful upstairs sunlit study loft with free Wi-Fi, bagels & juice ~$13.50. Transit: Free 98A/98C City Connector bus or Botanic Gardens Free Tram.
- **Bakery on O’Connell (128-130 O’Connell St, North Adelaide)**: Open 24/7 with free Wi-Fi, pies & iced lattes ~$8.50 (10% student discount after 9 PM). Transit: Free 98A/98C City Connector bus.

## 2. Best "Cafe Near Me for Breakfast" Under $15
- **Peter Rabbit Cafe (234-244 Hindley St, CBD)**: Leafy garden seating steps from UniSA City West, free Wi-Fi, brioche rolls & smashed avo ~$13.00–$14.50. Transit: Free City Tram to City West stop.
- **Lucia’s Pizza & Spaghetti Bar (Adelaide Central Market)**: Crispy Italian focaccia panini & espresso ~$11.00. Transit: Free City Tram to Victoria Square stop.
- **Bakery on O’Connell (North Adelaide)**: Warm pastries, toasties & coffee under $9.00. Transit: Free 98A/98C bus.

## 3. Best "Cat Cafe Near Me" for Study Breaks & Mental Wellness
- **MeowMe Cat Cafe (106 Glen Osmond Rd, Parkside)**: Cozy cat lounge & desserts ~$15.00. Transit: Direct Adelaide Metro Bus 170, 171, or 172 from Grenfell St (~10 mins on $1.25 concession).
- **Sassy’s Cat Cafe & Adoption Centre (499A Payneham Rd, Felixstow)**: Rescue cats, concession lounge entry & cupcakes ~$14.00. Transit: Direct Bus 174 or 178 from Currie St / Grenfell St.

## Quick Tips for Studying in Cafes on a Student Budget
1. Ride Adelaide's Free City Tram & 98A/98C Connector Buses so transport adds $0 to your study day.
2. Arrive with a full battery and phone hotspot backup during midday rushes.
3. Visit between 9:00–11:30 AM or after 2:00 PM for quiet tables.`;

    navigator.clipboard?.writeText(plainArticle);
    setCopiedArticle(true);
    setTimeout(() => setCopiedArticle(false), 2500);
  };

  const renderCafeFeatureCard = (food: FoodSpot, highlightNote: string) => {
    const isPlanned = plannedIds.includes(food.id);
    const isLiked = likedIds.includes(food.id);
    return (
      <div
        key={food.id}
        className="bg-white border border-[#D4DDD9] rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-xs"
      >
        <div className="space-y-2.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="font-bold text-base sm:text-lg text-[#1A2E2C] leading-snug">
                {food.name}
              </h4>
              <p className="text-xs text-[#5B6E6A] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#87A09B] shrink-0" />
                <span>{food.address}</span>
              </p>
            </div>
            <span className="font-mono tabular-nums text-xs font-bold text-[#0A868C] bg-[#E6F3F4] px-2.5 py-1 rounded-lg shrink-0">
              ~${food.estimatedMealCost.toFixed(2)} AUD
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#475E5A] leading-relaxed">
            {highlightNote}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
            <div className="bg-[#EBF4FA] border border-[#0666A7]/15 rounded-xl p-2.5 flex items-start gap-2 text-[#0666A7]">
              <Bus className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span className="leading-snug text-[11px]">{food.transitSummary}</span>
            </div>
            <div className="bg-[#EFF4F2] border border-[#D4DDD9] rounded-xl p-2.5 flex items-start gap-2 text-[#1A2E2C]">
              <Wifi className="w-3.5 h-3.5 text-[#0A868C] shrink-0 mt-0.5" />
              <span className="leading-snug text-[11px]">
                {food.wifiAvailable
                  ? 'Free Wi-Fi available for laptop study'
                  : 'Phone-free relaxation lounge (book ahead)'}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-[#EFF4F2] flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-[#5B6E6A]">
            Best order: <strong className="text-[#1A2E2C]">{food.popularItem}</strong>{' '}
            <span className="font-mono tabular-nums text-[#0A868C]">(${food.popularItemPrice.toFixed(2)})</span>
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleLikeFood(food)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border ${
                isLiked
                  ? 'bg-[#FBF4F1] border-[#D0A18F] text-[#B57F6C]'
                  : 'bg-[#EFF4F2] border-[#D4DDD9] text-[#475E5A] hover:bg-[#D4DDD9]'
              }`}
              title={isLiked ? 'Remove from Saved Places' : 'Save for Future Reference'}
              aria-label={isLiked ? `Remove ${food.name} from Saved Places` : `Save ${food.name} for Future Reference`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#B57F6C]' : ''}`} />
              <span>{isLiked ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={() => onTogglePlanFood(food)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                isPlanned
                  ? 'bg-[#FBF4F1] text-[#B57F6C] border border-[#D0A18F]'
                  : 'bg-[#0A868C] hover:bg-[#076E73] text-white'
              }`}
            >
              {isPlanned ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added to Plan</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Outing Plan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBackToDirectory}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-[#D4DDD9] text-[#1A2E2C] hover:border-[#0A868C] hover:text-[#0A868C] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Food &amp; Cafes Directory</span>
        </button>

        <button
          onClick={handleCopyBlogText}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#EFF4F2] hover:bg-[#D4DDD9] text-[#1A2E2C] transition-colors cursor-pointer"
        >
          {copiedArticle ? <Check className="w-3.5 h-3.5 text-[#0A868C]" /> : <Copy className="w-3.5 h-3.5 text-[#5B6E6A]" />}
          <span>{copiedArticle ? 'Blog Post Copied' : 'Copy Blog Article'}</span>
        </button>
      </div>

      {/* Editorial Article Header */}
      <header className="space-y-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#5B6E6A] font-medium">
          <span className="text-[#0A868C] font-bold">Student Cafe Guide</span>
          <span aria-hidden="true">·</span>
          <span>6 min read</span>
          <span aria-hidden="true">·</span>
          <span>Updated November 2026</span>
          <span aria-hidden="true">·</span>
          <span>Wi-Fi &amp; Public Transit Verified</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#1A2E2C] tracking-tight leading-[1.15] text-balance">
          Best Budget-Friendly Cafes Near Me in Adelaide for Students
        </h1>

        <p className="text-base sm:text-lg text-[#475E5A] leading-relaxed max-w-3xl">
          Finding a budget-friendly cafe that welcomes laptops, serves affordable meals, and sits right on a free tram or bus line makes student life dramatically easier. Whether you are typing up assignments, grabbing breakfast before a 9 AM lecture, or unwinding with rescue cats during exam week, here is our complete student guide to Adelaide’s best value cafes.
        </p>

        {/* Hero Cover Photo */}
        <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden border border-[#D4DDD9]">
          <img
            src={cafeStudyHeroImg}
            alt="Student studying with laptop, notebook, and coffee in a sunlit Adelaide cafe"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1 max-w-xl">
              <span className="text-xs font-semibold text-[#E6F3F4]">
                Public Transport Accessible · Free Wi-Fi · Meals Under $15 AUD
              </span>
              <p className="text-sm sm:text-base font-bold leading-snug">
                Every cafe below is reachable by Free City Tram, Free 98A/98C Connector, or a $1.25 Adelaide Metro student concession ride.
              </p>
            </div>
          </div>
        </div>

        {/* Table of Contents / Quick Jump Links */}
        <nav
          aria-label="Blog sections"
          className="bg-white border border-[#D4DDD9] rounded-2xl p-4 sm:p-5 flex flex-wrap items-center gap-2 sm:gap-3"
        >
          <span className="text-xs font-bold text-[#5B6E6A] mr-1">Jump to section:</span>
          <button
            onClick={() => scrollToSection('study-cafes')}
            className="px-3 py-1.5 rounded-xl bg-[#E6F3F4] hover:bg-[#0A868C] text-[#0A868C] hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Study Cafes &amp; Wi-Fi</span>
          </button>
          <button
            onClick={() => scrollToSection('breakfast-cafes')}
            className="px-3 py-1.5 rounded-xl bg-[#FBF4F1] hover:bg-[#D0A18F] text-[#B57F6C] hover:text-[#1A2E2C] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Breakfast Under $15</span>
          </button>
          <button
            onClick={() => scrollToSection('cat-cafes')}
            className="px-3 py-1.5 rounded-xl bg-[#EBF4FA] hover:bg-[#0666A7] text-[#0666A7] hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Cat className="w-3.5 h-3.5" />
            <span>Cat Cafes Near Me</span>
          </button>
          <button
            onClick={() => scrollToSection('cafe-comparison')}
            className="px-3 py-1.5 rounded-xl bg-[#EFF4F2] hover:bg-[#D4DDD9] text-[#1A2E2C] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Price &amp; Transit Table</span>
          </button>
        </nav>
      </header>

      {/* Section 1: cafe near me study */}
      <section id="study-cafes" className="space-y-6 scroll-mt-24">
        <div className="space-y-2 border-b border-[#D4DDD9] pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0A868C]">
            <Wifi className="w-4 h-4" />
            <span>01. Focus, Wi-Fi &amp; Quiet Tables</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2E2C] tracking-tight">
            Best Cafe Near Me Study Spots (Free Wi-Fi &amp; Easy Tram Access)
          </h2>
          <p className="text-sm sm:text-base text-[#475E5A] leading-relaxed">
            When you type <strong>“cafe near me study”</strong> during assignment week, not every espresso bar fits the bill—many busy brunch venues discourage laptops at lunchtime. The best student study cafes pair reliable free Wi-Fi and natural daylight with budget snacks and zero-cost tram or bus access.
          </p>
        </div>

        <div className="space-y-4">
          {studyCafes.map((cafe) => {
            const notes: Record<string, string> = {
              'script-and-bean':
                'Hidden upstairs inside Dymocks in Regent Arcade, Script and Bean is one of the calmest study-friendly cafes in central Adelaide. You get reliable Free Rundle Mall Wi-Fi, big heritage windows, and warm toastie combos under $12—just two minutes from the Free City Tram stop.',
              'the-rose-eastend':
                'Located a short stroll from the University of Adelaide East End precinct, The Rose Eastend features a quieter upstairs loft flooded with natural light. Connect to free cafe Wi-Fi, order a $13.50 bagel and juice, and ride home free on the 98A/98C City Connector.',
              'bakery-on-oconnell':
                'Pulling an all-nighter before a deadline? Bakery on O’Connell stays open 24/7 with indoor seating, free Wi-Fi, and unbeatable value—show your student ID after 9 PM for 10% off savoury pies and iced coffees. Hop straight on the Free 98A/98C bus across the street.'
            };
            return renderCafeFeatureCard(cafe, notes[cafe.id] || cafe.description);
          })}
        </div>

        {/* Study Etiquette & Library Backup Box */}
        <div className="bg-[#EFF4F2] border border-[#D4DDD9] rounded-2xl p-5 space-y-2">
          <h3 className="text-sm font-bold text-[#1A2E2C] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0A868C]" />
            <span>Smart Study Tip for Budget-Conscious Students</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#475E5A] leading-relaxed">
            Aim to study in cafes during quieter hours (<strong>9:00 AM – 11:30 AM</strong> or <strong>after 2:00 PM</strong>), and arrive with your laptop fully charged with a phone hotspot ready as backup. Need guaranteed power sockets, blazing-fast Wi-Fi, and $0 coffee pressure? Walk 3 minutes to the <strong>State Library of South Australia (North Terrace)</strong> or <strong>Adelaide City Library (Rundle Place)</strong>.
          </p>
        </div>
      </section>

      {/* Section 2: cafe near me for breakfast */}
      <section id="breakfast-cafes" className="space-y-6 scroll-mt-24">
        <div className="space-y-2 border-b border-[#D4DDD9] pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#B57F6C]">
            <Coffee className="w-4 h-4" />
            <span>02. Affordable Morning Fuel</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2E2C] tracking-tight">
            Best Cafe Near Me for Breakfast Under $15 AUD
          </h2>
          <p className="text-sm sm:text-base text-[#475E5A] leading-relaxed">
            Searching for a <strong>“cafe near me for breakfast”</strong> shouldn’t mean paying $26 for smashed avocado. By choosing bakeries, market coffee bars, and campus-adjacent garden cafes along Adelaide’s free transit loops, you can eat a hearty hot breakfast and drink barista coffee for $8 to $14.50.
          </p>
        </div>

        {/* Breakfast Photo & Highlights Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-5 rounded-2xl overflow-hidden border border-[#D4DDD9] min-h-[240px]">
            <img
              src={cafeBreakfastImg}
              alt="Affordable toasted sourdough focaccia melt, flaky croissant, and iced latte breakfast"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="md:col-span-7 bg-white border border-[#D4DDD9] rounded-2xl p-5 sm:p-6 flex flex-col justify-center space-y-3">
            <span className="text-xs font-bold text-[#B57F6C]">Why Morning Deals Beat Sit-Down Brunch</span>
            <h3 className="text-xl font-bold text-[#1A2E2C]">
              How to Keep Student Breakfasts Under $15
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#475E5A]">
              <li>
                <strong>1. Skip weekend surcharges:</strong> Bakery toasties, egg-and-bacon brioche rolls, and market focaccia paninis give you real hot food at half the price of plated brunch menus.
              </li>
              <li>
                <strong>2. Ride the Free Tram to breakfast:</strong> All three morning picks below sit inside Adelaide’s $0 Free Tram or Free 98A/98C Connector zone, keeping your total morning spend transparent.
              </li>
              <li>
                <strong>3. Bring a reusable keep-cup:</strong> Many CBD espresso bars shave $0.50 off your morning flat white or iced latte when you bring your own cup.
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {breakfastCafes.map((cafe) => {
            const notes: Record<string, string> = {
              'peter-rabbit':
                'Steps from the Free City West Tram stop and UniSA, Peter Rabbit’s leafy outdoor garden feels miles away from traffic. Grab a generous breakfast brioche roll or morning pastry with free outdoor Wi-Fi before heading to class.',
              'lucias-pizza':
                'Inside Adelaide Central Market’s Western Arcade, Lucia’s serves toasted mozzarella and prosciutto focaccia paninis plus classic Italian espresso for around $11—accessible straight from the Free Victoria Square Tram stop.',
              'bakery-on-oconnell':
                'For early birds catching an 8 AM bus, Bakery on O’Connell bakes warm croissants, savoury breakfast pies, and toasties round the clock—pair a pastry and coffee for under $9.'
            };
            return renderCafeFeatureCard(cafe, notes[cafe.id] || cafe.description);
          })}
        </div>
      </section>

      {/* Section 3: cat cafe near me */}
      <section id="cat-cafes" className="space-y-6 scroll-mt-24">
        <div className="space-y-2 border-b border-[#D4DDD9] pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0666A7]">
            <Cat className="w-4 h-4" />
            <span>03. Exam-Season Study Breaks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2E2C] tracking-tight">
            Best Cat Cafe Near Me Accessible by Public Transport
          </h2>
          <p className="text-sm sm:text-base text-[#475E5A] leading-relaxed">
            Missing pets back home or burned out after back-to-back midterms? Searching <strong>“cat cafe near me”</strong> leads to two wonderful Adelaide rescue sanctuaries where you can sip coffee, enjoy affordable sweet treats, and spend calming time with friendly cats—both reachable in 10 to 15 minutes on a $1.25 concession bus ride.
          </p>
        </div>

        {/* Cat Cafe Photo Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-7 bg-[#EBF4FA] border border-[#0666A7]/20 rounded-2xl p-5 sm:p-6 flex flex-col justify-center space-y-3 order-2 md:order-1">
            <span className="text-xs font-bold text-[#0666A7]">Before You Visit an Adelaide Cat Cafe</span>
            <h3 className="text-xl font-bold text-[#1A2E2C]">
              Quick Student Checklist for Cat Lounges
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#475E5A]">
              <li>
                <strong>Book a 30-min or 1-hour slot ahead:</strong> Visitor numbers inside the cat rooms are capped so the rescue cats stay relaxed. Reserve online or message their social pages before hopping on the bus.
              </li>
              <li>
                <strong>Use your Student Concession metroCARD:</strong> Both venues sit just outside the CBD along major arterial bus corridors—costing just $1.25 peak or $0.85 off-peak each way.
              </li>
              <li>
                <strong>Enjoy screen-free rest:</strong> Cat cafes are ideal for unplugging from laptops—leave the textbooks at home and give yourself a genuine mental reset.
              </li>
            </ul>
          </div>
          <div className="md:col-span-5 rounded-2xl overflow-hidden border border-[#D4DDD9] min-h-[240px] order-1 md:order-2">
            <img
              src={cafeCatLoungeImg}
              alt="Relaxed cats sleeping on sunlit cushioned bench in a cozy cat cafe lounge"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="space-y-4">
          {catCafes.map((cafe) => {
            const notes: Record<string, string> = {
              'meowme-cat-cafe':
                'Just 10 minutes down Glen Osmond Road via Adelaide Metro Bus 170, 171, or 172 from Grenfell St, MeowMe combines a cozy cat play room with affordable iced matcha, coffee, and desserts.',
              'sassys-cat-cafe':
                'Take Bus 174 or 178 straight from Currie St / Grenfell St to Payneham Rd in Felixstow. Sassy’s partners with local rescue groups and offers concession-friendly 30-minute cat cuddle sessions alongside coffee and cupcakes.'
            };
            return renderCafeFeatureCard(cafe, notes[cafe.id] || cafe.description);
          })}
        </div>
      </section>

      {/* Section 4: Comparison Table with Tabular Numerals */}
      <section id="cafe-comparison" className="space-y-5 scroll-mt-24">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#1A2E2C] tracking-tight">
            At-a-Glance Student Cafe Comparison
          </h2>
          <p className="text-xs sm:text-sm text-[#5B6E6A]">
            Compare average spend, Wi-Fi availability, and Adelaide Metro routes before planning your outing.
          </p>
        </div>

        <div className="bg-white border border-[#D4DDD9] rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#EFF4F2] border-b border-[#D4DDD9] text-[#1A2E2C]">
                  <th className="py-3.5 px-4 font-bold">Cafe Name</th>
                  <th className="py-3.5 px-4 font-bold">Best For</th>
                  <th className="py-3.5 px-4 font-bold">Est. Spend</th>
                  <th className="py-3.5 px-4 font-bold">Free Wi-Fi</th>
                  <th className="py-3.5 px-4 font-bold">Public Transport Route</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFF4F2]">
                {tableCafes.map((cafe) => (
                  <tr key={cafe.id} className="hover:bg-[#F7F9F8] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#1A2E2C] whitespace-nowrap">
                      {cafe.name}
                    </td>
                    <td className="py-3.5 px-4 text-[#475E5A]">
                      {cafe.studyFriendly
                        ? 'Study & Coffee'
                        : cafe.id.includes('cat')
                          ? 'Cat Lounge Break'
                          : 'Budget Breakfast'}
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums font-bold text-[#0A868C] whitespace-nowrap">
                      ${cafe.estimatedMealCost.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-[#475E5A] whitespace-nowrap">
                      {cafe.wifiAvailable ? 'Yes (Free)' : 'Unplugged'}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[#0666A7]">
                      {cafe.transitSummary.split(';')[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom Call-to-Action */}
      <section className="bg-[#E6F3F4] border border-[#87A09B]/40 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-[#1A2E2C]">
            Want to calculate your full cafe &amp; transit budget?
          </h3>
          <p className="text-xs sm:text-sm text-[#475E5A] max-w-xl">
            Add any study cafe, breakfast spot, or cat cafe above and open the Outing Cost Calculator to combine meals with your Adelaide Metro concession fare.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('plan')}
            className="px-5 py-2.5 rounded-xl bg-[#0A868C] hover:bg-[#076E73] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Calculator className="w-4 h-4" />
            <span>Open Cost Calculator</span>
          </button>
          <button
            onClick={onBackToDirectory}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#EFF4F2] text-[#1A2E2C] border border-[#D4DDD9] text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            Browse All Food Spots
          </button>
        </div>
      </section>
    </article>
  );
};
