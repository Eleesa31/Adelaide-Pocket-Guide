import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ExploreView } from './components/ExploreView';
import { FoodView } from './components/FoodView';
import { PlanOutingView } from './components/PlanOutingView';
import { EssentialsView } from './components/EssentialsView';
import { AboutContactView } from './components/AboutContactView';
import { ActivityModal } from './components/ActivityModal';
import { Activity, FoodSpot, OutingItem, PreMadeItinerary } from './types';
import { ACTIVITIES } from './data/activities';
import { FOOD_PLACES } from './data/foodPlaces';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [modalActivity, setModalActivity] = useState<Activity | null>(null);
  const [initialBudgetFilter, setInitialBudgetFilter] = useState<number | null>(null);
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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
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
    const newItems: OutingItem[] = itinerary.items.map((item, index) => {
      let matchedActivity = ACTIVITIES.find(a => a.title.toLowerCase().includes(item.title.toLowerCase()));
      let matchedFood = FOOD_PLACES.find(f => f.name.toLowerCase().includes(item.title.toLowerCase()));

      return {
        id: `itin-${Date.now()}-${index}`,
        refId: matchedActivity?.id || matchedFood?.id || `custom-${index}`,
        type: item.type === 'food' ? 'food' : 'activity',
        title: item.title,
        cost: item.cost,
        locationName: matchedActivity?.locationName || matchedFood?.address || 'Adelaide',
        locationArea: matchedActivity?.locationArea || matchedFood?.locationArea || 'adelaide_cbd',
        transitSummary: item.transitNote || 'Adelaide Metro',
        transitType: matchedActivity?.transitType || 'tram_free'
      };
    });

    setPlannedItems(newItems);
    showToast(`Loaded "${itinerary.title}"!`);
  };

  const handleFilterBudgetFromHome = (budgetMax: number) => {
    setInitialBudgetFilter(budgetMax);
    setCurrentTab('explore');
  };

  const plannedRefIds = plannedItems.map(i => i.refId);

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
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'explore') setInitialBudgetFilter(null);
        }}
        plannedCount={plannedItems.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            onSelectTab={setCurrentTab}
            onOpenActivity={setModalActivity}
            onFilterBudget={handleFilterBudgetFromHome}
            plannedIds={plannedRefIds}
            onTogglePlanActivity={handleTogglePlanActivity}
          />
        )}

        {currentTab === 'explore' && (
          <ExploreView
            onOpenActivity={setModalActivity}
            plannedIds={plannedRefIds}
            onTogglePlanActivity={handleTogglePlanActivity}
            initialBudgetFilter={initialBudgetFilter}
            onSelectTab={setCurrentTab}
          />
        )}

        {currentTab === 'food' && (
          <FoodView
            plannedIds={plannedRefIds}
            onTogglePlanFood={handleTogglePlanFood}
            onSelectTab={setCurrentTab}
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
      />

    </div>
  );
}
