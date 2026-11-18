import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ExploreView } from './components/ExploreView';
import { FoodView } from './components/FoodView';
import { PlanOutingView } from './components/PlanOutingView';
import { EssentialsView } from './components/EssentialsView';
import { AboutContactView } from './components/AboutContactView';
import { SavedView } from './components/SavedView';
import { ActivityModal } from './components/ActivityModal';
import { Activity, FoodSpot, LikedItem, OutingItem, PreMadeItinerary } from './types';
import { ACTIVITIES } from './data/activities';
import { FOOD_PLACES } from './data/foodPlaces';

const VALID_TABS = ['home', 'explore', 'food', 'cafe-blog', 'plan', 'saved', 'essentials', 'about'];

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return VALID_TABS.includes(hash) ? hash : 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (VALID_TABS.includes(hash)) {
        setCurrentTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const targetHash = `#${currentTab}`;
    if (window.location.hash !== targetHash) {
      window.history.replaceState(null, '', targetHash);
    }
  }, [currentTab]);

  const [modalActivity, setModalActivity] = useState<Activity | null>(null);
  const [initialBudgetFilter, setInitialBudgetFilter] = useState<number | null>(null);
  const [exploreSearchQuery, setExploreSearchQuery] = useState<string>('');
  const [foodSearchQuery, setFoodSearchQuery] = useState<string>('');
  const [searchTriggerKey, setSearchTriggerKey] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Planned items state (stored in localStorage if available)
  const [plannedItems, setPlannedItems] = useState<OutingItem[]>(() => {
    try {
      const saved = localStorage.getItem('adelaide_pocket_planned');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default starter plan for international students:
    return [
      {
        id: 'plan-botanic',
        refId: 'botanic-gardens',
        type: 'activity',
        title: 'Adelaide Botanic Garden & Glasshouses',
        cost: 0,
        locationName: 'North Terrace, Adelaide CBD',
        locationArea: 'adelaide_cbd',
        transitSummary: 'Free City Tram to Botanic Gardens stop or walk from campus',
        transitType: 'tram_free'
      },
      {
        id: 'plan-market-lunch',
        refId: 'chinatown-food-plaza',
        type: 'food',
        title: 'Chinatown Food Plaza Hainanese Chicken Rice',
        cost: 11.50,
        locationName: 'Gouger Street / Chinatown',
        locationArea: 'adelaide_cbd',
        transitSummary: 'Free Tram to Victoria Square stop; walk 3 mins down Moonta St',
        transitType: 'tram_free'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('adelaide_pocket_planned', JSON.stringify(plannedItems));
    } catch {
      // ignore
    }
  }, [plannedItems]);

  // Liked / Saved for future reference state (stored separately from Cost Calculator)
  const [likedItems, setLikedItems] = useState<LikedItem[]>(() => {
    try {
      const saved = localStorage.getItem('adelaide_pocket_liked');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('adelaide_pocket_liked', JSON.stringify(likedItems));
    } catch {
      // ignore
    }
  }, [likedItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const handleToggleLikeActivity = (activity: Activity) => {
    const exists = likedItems.some((item) => item.id === activity.id);
    if (exists) {
      setLikedItems((prev) => prev.filter((item) => item.id !== activity.id));
      showToast(`Removed "${activity.title}" from Saved Places`);
    } else {
      const newLike: LikedItem = {
        id: activity.id,
        type: 'activity',
        title: activity.title,
        subtitle: activity.categoryLabel,
        costLabel: activity.costDescription,
        costValue: activity.costValue,
        locationName: activity.locationName,
        transitSummary: activity.transitSummary,
        imageSrc: activity.imageSrc,
        savedAt: Date.now()
      };
      setLikedItems((prev) => [newLike, ...prev]);
      showToast(`Saved "${activity.title}" to Saved Places!`);
    }
  };

  const handleToggleLikeFood = (food: FoodSpot) => {
    const exists = likedItems.some((item) => item.id === food.id);
    if (exists) {
      setLikedItems((prev) => prev.filter((item) => item.id !== food.id));
      showToast(`Removed "${food.name}" from Saved Places`);
    } else {
      const newLike: LikedItem = {
        id: food.id,
        type: 'food',
        title: food.name,
        subtitle: food.cuisine,
        costLabel: `~$${food.estimatedMealCost.toFixed(2)} AUD`,
        costValue: food.estimatedMealCost,
        locationName: food.address,
        transitSummary: food.transitSummary,
        imageSrc: food.imageSrc,
        savedAt: Date.now()
      };
      setLikedItems((prev) => [newLike, ...prev]);
      showToast(`Saved "${food.name}" to Saved Places!`);
    }
  };

  const handleRemoveLiked = (id: string) => {
    const item = likedItems.find((i) => i.id === id);
    setLikedItems((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      showToast(`Removed "${item.title}" from Saved Places`);
    }
  };

  const handleClearLiked = () => {
    setLikedItems([]);
    showToast('Cleared all saved places');
  };

  const handleTogglePlanActivity = (activity: Activity) => {
    const existingIndex = plannedItems.findIndex(i => i.refId === activity.id);
    if (existingIndex >= 0) {
      setPlannedItems(prev => prev.filter(i => i.refId !== activity.id));
      showToast(`Removed "${activity.title}" from Outing Plan`);
    } else {
      const newItem: OutingItem = {
        id: `plan-${Date.now()}-${activity.id}`,
        refId: activity.id,
        type: 'activity',
        title: activity.title,
        cost: activity.costValue,
        locationName: activity.locationName,
        locationArea: activity.locationArea,
        transitSummary: activity.transitSummary,
        transitType: activity.transitType
      };
      setPlannedItems(prev => [...prev, newItem]);
      showToast(`Added "${activity.title}" to Outing Plan!`);
    }
  };

  const handleTogglePlanFood = (food: FoodSpot) => {
    const existingIndex = plannedItems.findIndex(i => i.refId === food.id);
    if (existingIndex >= 0) {
      setPlannedItems(prev => prev.filter(i => i.refId !== food.id));
      showToast(`Removed "${food.name}" from Outing Plan`);
    } else {
      const newItem: OutingItem = {
        id: `plan-${Date.now()}-${food.id}`,
        refId: food.id,
        type: 'food',
        title: food.name,
        cost: food.estimatedMealCost,
        locationName: food.address,
        locationArea: food.locationArea,
        transitSummary: food.transitSummary,
        transitType: 'tram_free'
      };
      setPlannedItems(prev => [...prev, newItem]);
      showToast(`Added "${food.name}" to Outing Plan!`);
    }
  };

  const handleRemoveItem = (id: string) => {
    const item = plannedItems.find(i => i.id === id);
    setPlannedItems(prev => prev.filter(i => i.id !== id));
    if (item) {
      showToast(`Removed "${item.title}"`);
    }
  };

  const handleClearAll = () => {
    setPlannedItems([]);
    showToast('Cleared all items in Outing Plan');
  };

  const handleAddCustomItem = (item: OutingItem) => {
    setPlannedItems(prev => [...prev, item]);
    showToast(`Added custom item "${item.title}"`);
  };

  const handleLoadPreMadeItinerary = (itinerary: PreMadeItinerary) => {
    const alreadyLoaded = plannedItems.some((item) => item.sourcePlanId === itinerary.id);
    if (alreadyLoaded) {
      setPlannedItems((prev) => prev.filter((item) => item.sourcePlanId !== itinerary.id));
      showToast(`Removed "${itinerary.title}" from your plan`);
      return;
    }

    const timestamp = Date.now();
    const newItems: OutingItem[] = itinerary.items.map((item, index) => {
      const matchedActivity = ACTIVITIES.find((a) =>
        a.title.toLowerCase().includes(item.title.toLowerCase())
      );
      const matchedFood = FOOD_PLACES.find((f) =>
        f.name.toLowerCase().includes(item.title.toLowerCase())
      );

      return {
        id: `itin-${itinerary.id}-${timestamp}-${index}`,
        refId: matchedActivity?.id || matchedFood?.id || `${itinerary.id}-${index}`,
        sourcePlanId: itinerary.id,
        type: item.type,
        title: item.title,
        cost: Number(item.cost) || 0,
        locationName: matchedActivity?.locationName || matchedFood?.address || 'Adelaide',
        locationArea: matchedActivity?.locationArea || matchedFood?.locationArea || 'adelaide_cbd',
        transitSummary: item.transitNote || 'Adelaide Metro',
        transitType:
          item.type === 'transit'
            ? 'bus_paid'
            : matchedActivity?.transitType || 'tram_free'
      };
    });

    setPlannedItems((prev) => [...prev, ...newItems]);
    showToast(`Added "${itinerary.title}" to your outing!`);
  };

  const handleFilterBudgetFromHome = (budgetMax: number) => {
    setInitialBudgetFilter(budgetMax);
    setExploreSearchQuery('');
    setSearchTriggerKey((k) => k + 1);
    setCurrentTab('explore');
  };

  const handleSearchFromHome = (rawQuery: string, forceTarget?: 'explore' | 'food') => {
    const q = rawQuery.trim();
    if (!q) return;
    const lower = q.toLowerCase();

    const activityMatches = ACTIVITIES.filter((act) =>
      act.title.toLowerCase().includes(lower) ||
      act.categoryLabel.toLowerCase().includes(lower) ||
      act.description.toLowerCase().includes(lower) ||
      act.locationName.toLowerCase().includes(lower) ||
      act.studentTip.toLowerCase().includes(lower) ||
      act.transitSummary.toLowerCase().includes(lower) ||
      act.address.toLowerCase().includes(lower) ||
      (act.highlightTag && act.highlightTag.toLowerCase().includes(lower))
    ).length;

    const foodMatches = FOOD_PLACES.filter((food) =>
      food.name.toLowerCase().includes(lower) ||
      food.cuisine.toLowerCase().includes(lower) ||
      food.popularItem.toLowerCase().includes(lower) ||
      food.address.toLowerCase().includes(lower) ||
      food.description.toLowerCase().includes(lower) ||
      (food.studentDeal ? food.studentDeal.toLowerCase().includes(lower) : false) ||
      food.transitSummary.toLowerCase().includes(lower) ||
      food.dietaryNotes.some((n) => n.toLowerCase().includes(lower))
    ).length;

    const isFoodIntent =
      forceTarget === 'food' ||
      (forceTarget !== 'explore' &&
        foodMatches > 0 &&
        (activityMatches === 0 ||
          /(cafe|coffee|cat|eat|food|meal|breakfast|lunch|dinner|bakery|dumpling|roti|mamak|noodle|pizza|gelato|kebab|halal)/.test(lower)));

    setInitialBudgetFilter(null);
    setSearchTriggerKey((k) => k + 1);

    if (isFoodIntent) {
      setFoodSearchQuery(q);
      setExploreSearchQuery('');
      setCurrentTab('food');
    } else {
      setExploreSearchQuery(q);
      setFoodSearchQuery('');
      setCurrentTab('explore');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavTabSelect = (tab: string) => {
    setCurrentTab(tab);
    if (tab !== 'explore') {
      setInitialBudgetFilter(null);
    } else {
      setExploreSearchQuery('');
      setSearchTriggerKey((k) => k + 1);
    }
    if (tab === 'food') {
      setFoodSearchQuery('');
      setSearchTriggerKey((k) => k + 1);
    }
  };

  const plannedRefIds = plannedItems.map(i => i.refId);
  const likedIds = likedItems.map(i => i.id);

  return (
    <div className="min-h-screen bg-[#F7F9F8] text-[#1A2E2C] flex flex-col font-sans selection:bg-[#0A868C] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A2E2C] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xl border border-[#87A09B]/40 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#0A868C]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        currentTab={currentTab === 'cafe-blog' ? 'food' : currentTab}
        onSelectTab={handleNavTabSelect}
        plannedCount={plannedItems.length}
        likedCount={likedItems.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            onSelectTab={handleNavTabSelect}
            onOpenActivity={setModalActivity}
            onFilterBudget={handleFilterBudgetFromHome}
            onSearch={handleSearchFromHome}
            plannedIds={plannedRefIds}
            onTogglePlanActivity={handleTogglePlanActivity}
            likedIds={likedIds}
            onToggleLikeActivity={handleToggleLikeActivity}
          />
        )}

        {currentTab === 'explore' && (
          <ExploreView
            onOpenActivity={setModalActivity}
            plannedIds={plannedRefIds}
            onTogglePlanActivity={handleTogglePlanActivity}
            likedIds={likedIds}
            onToggleLikeActivity={handleToggleLikeActivity}
            initialBudgetFilter={initialBudgetFilter}
            initialSearchQuery={exploreSearchQuery}
            searchTriggerKey={searchTriggerKey}
            onSelectTab={handleNavTabSelect}
          />
        )}

        {(currentTab === 'food' || currentTab === 'cafe-blog') && (
          <FoodView
            key={currentTab}
            plannedIds={plannedRefIds}
            onTogglePlanFood={handleTogglePlanFood}
            likedIds={likedIds}
            onToggleLikeFood={handleToggleLikeFood}
            initialSearchQuery={foodSearchQuery}
            searchTriggerKey={searchTriggerKey}
            onSelectTab={handleNavTabSelect}
            initialSubView={currentTab === 'cafe-blog' ? 'blog' : 'directory'}
          />
        )}

        {currentTab === 'plan' && (
          <PlanOutingView
            plannedItems={plannedItems}
            onRemoveItem={handleRemoveItem}
            onClearAll={handleClearAll}
            onLoadPreMadeItinerary={handleLoadPreMadeItinerary}
            onSelectTab={setCurrentTab}
            onAddCustomItem={handleAddCustomItem}
          />
        )}

        {currentTab === 'saved' && (
          <SavedView
            likedItems={likedItems}
            plannedIds={plannedRefIds}
            onRemoveLiked={handleRemoveLiked}
            onClearLiked={handleClearLiked}
            onOpenActivity={setModalActivity}
            onTogglePlanActivity={handleTogglePlanActivity}
            onTogglePlanFood={handleTogglePlanFood}
            onSelectTab={setCurrentTab}
          />
        )}

        {currentTab === 'essentials' && (
          <EssentialsView />
        )}

        {currentTab === 'about' && (
          <AboutContactView />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={setCurrentTab} />

      {/* Activity Details Modal */}
      <ActivityModal
        activity={modalActivity}
        onClose={() => setModalActivity(null)}
        isPlanned={modalActivity ? plannedRefIds.includes(modalActivity.id) : false}
        onTogglePlan={(act) => {
          handleTogglePlanActivity(act);
        }}
        isLiked={modalActivity ? likedIds.includes(modalActivity.id) : false}
        onToggleLike={(act) => {
          handleToggleLikeActivity(act);
        }}
      />

    </div>
  );
}
