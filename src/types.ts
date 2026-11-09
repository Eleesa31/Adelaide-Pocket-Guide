export type BudgetCategory = 'free' | 'under10' | 'under25' | 'under50';

export type ActivityInterest = 
  | 'all'
  | 'nature_parks'
  | 'arts_culture'
  | 'beach_coast'
  | 'hidden_gems'
  | 'markets_shopping'
  | 'social_hangouts';

export type LocationArea = 
  | 'all'
  | 'adelaide_cbd'
  | 'north_adelaide'
  | 'glenelg_coast'
  | 'port_adelaide'
  | 'adelaide_hills'
  | 'inner_suburbs';

export interface Activity {
  id: string;
  title: string;
  category: ActivityInterest;
  categoryLabel: string;
  locationArea: LocationArea;
  locationName: string;
  costDescription: string;
  costValue: number; // in AUD
  isFree: boolean;
  transitSummary: string;
  transitType: 'tram_free' | 'tram_paid' | 'bus_free' | 'bus_paid' | 'train' | 'walk';
  timeNeeded: string;
  bestTimeToVisit: string;
  studentTip: string;
  description: string;
  highlightTag?: string;
  featured?: boolean;
  imageSrc?: string;
  imagePrompt?: string;
  address: string;
  nearbyFood?: string;
  socialVibe?: 'solo_friendly' | 'social_meetup' | 'both';
  isNewcomerRecommended?: boolean;
}

export interface FoodSpot {
  id: string;
  name: string;
  cuisine: string;
  locationArea: LocationArea;
  address: string;
  priceRange: '$' | '$$';
  estimatedMealCost: number; // in AUD
  studentDeal?: string;
  popularItem: string;
  popularItemPrice: number;
  dietaryNotes: string[]; // e.g. Halal, Vegan options, Vegetarian
  transitSummary: string;
  openLate: boolean;
  studentVibe: string;
  description: string;
  featured?: boolean;
}

export interface DiscountItem {
  id: string;
  category: 'transit' | 'cinema_fun' | 'food_drink' | 'culture' | 'tech_retail';
  title: string;
  provider: string;
  discountSummary: string;
  howToClaim: string;
  requirements: string;
  linkText?: string;
  badge: string;
}

export interface OutingItem {
  id: string;
  type: 'activity' | 'food';
  refId: string;
  title: string;
  cost: number;
  locationName: string;
  locationArea: LocationArea;
  transitSummary: string;
  transitType: string;
}

export interface PreMadeItinerary {
  id: string;
  title: string;
  subtitle: string;
  targetBudget: number;
  estimatedTotal: number;
  duration: string;
  badge: string;
  description: string;
  items: Array<{
    title: string;
    type: 'activity' | 'food' | 'transit';
    cost: number;
    description: string;
    transitNote?: string;
  }>;
}
