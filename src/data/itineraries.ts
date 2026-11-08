import { PreMadeItinerary } from '../types';

export const PRE_MADE_ITINERARIES: PreMadeItinerary[] = [
  {
    id: 'itin-free-culture',
    title: 'The $0 City Cultural Heritage Trail',
    subtitle: 'Art, Architecture & Secret Gardens without spending a single dollar',
    targetBudget: 0,
    estimatedTotal: 0,
    duration: 'Half Day (3.5 hours)',
    badge: '100% Free',
    description: 'Explore the grandest spots of Adelaide on foot and via the Free City Tram zone. Perfect for your first week in the city.',
    items: [
      {
        title: 'Start at Art Gallery of South Australia',
        type: 'activity',
        cost: 0,
        description: 'Explore world-class Indigenous Australian art collections and contemporary galleries in air-conditioned comfort.',
        transitNote: 'Take Free City Tram to University / Art Gallery stop on North Terrace.'
      },
      {
        title: 'State Library Mortlock Wing ("Harry Potter Library")',
        type: 'activity',
        cost: 0,
        description: 'Walk 100 meters next door to gaze at the magnificent two-storey Victorian library balustrades and grab free Wi-Fi.',
        transitNote: '1 min walk from Art Gallery.'
      },
      {
        title: 'Adelaide Botanic Garden & Bicentennial Glasshouse',
        type: 'activity',
        cost: 0,
        description: 'Stroll east along North Terrace into the lush 50-hectare historic gardens and tropical rainforest glasshouse.',
        transitNote: 'Hop on the Free Tram 1 stop to Botanic Gardens or 6 mins scenic walk.'
      },
      {
        title: 'River Torrens Sunset Stroll',
        type: 'activity',
        cost: 0,
        description: 'Head to Elder Park to watch black swans glide across the water as the sun sets over Adelaide Oval.',
        transitNote: 'Short 8 mins walk down Frome Rd or King William Rd.'
      }
    ]
  },
  {
    id: 'itin-glenelg-sunset',
    title: 'The $10 Sunday Beach & Sunset Escape',
    subtitle: 'Classic Adelaide coastline adventure with tram ride, beach swim, and seaside chips',
    targetBudget: 15,
    estimatedTotal: 9.80,
    duration: 'Afternoon to Sunset (4 hours)',
    badge: 'Best Value Beach Trip',
    description: 'Jump on the historic tram straight to the sand, swim in calm gulf waters, spot dolphins from the jetty, and enjoy beachside snacks.',
    items: [
      {
        title: 'Tram from Victoria Square to Glenelg',
        type: 'transit',
        cost: 1.25,
        description: 'Board the Glenelg Tram in the CBD with your Student Concession metroCARD (~35 mins scenic ride).',
        transitNote: 'Catch tram at Victoria Square Stop VS1.'
      },
      {
        title: 'Moseley Square & Glenelg Jetty Dolphin Spotting',
        type: 'activity',
        cost: 0,
        description: 'Walk the heritage timber jetty to look for wild dolphins swimming right beside the pylons.',
        transitNote: 'Tram terminus stops right at Moseley Square.'
      },
      {
        title: 'Hot Beachside Hot Chips & Cold Drink',
        type: 'food',
        cost: 7.30,
        description: 'Grab a large scoop of crispy seasoned chips and a cold beverage on Jetty Road to eat on the grass reserve.',
        transitNote: 'Jetty Road shops 1 min away.'
      },
      {
        title: 'Return Tram back to Adelaide CBD',
        type: 'transit',
        cost: 1.25,
        description: 'Watch the orange golden sunset sink into the ocean, then hop on the tram back to the city.',
        transitNote: 'Frequent trams every 15-20 mins until late.'
      }
    ]
  },
  {
    id: 'itin-chinatown-central-market',
    title: 'The $15 Central Market & Chinatown Feast',
    subtitle: 'Multi-cultural street food, market tasting hacks, and late afternoon bargains',
    targetBudget: 20,
    estimatedTotal: 14.50,
    duration: '2.5 hours (Best on Friday or Saturday)',
    badge: 'Foodie Favourite',
    description: 'Experience South Australia’s culinary heart. Taste cheeses, grab authentic Asian comfort food, and score bargain fruit trays.',
    items: [
      {
        title: 'Adelaide Central Market Walkabout & Free Tastings',
        type: 'activity',
        cost: 0,
        description: 'Smell fresh roasted coffee and taste artisan sourdough and local cheeses at market stalls.',
        transitNote: 'Free Tram to Victoria Square stop; 2 mins walk west.'
      },
      {
        title: 'Authentic Chinatown Food Plaza Lunch',
        type: 'food',
        cost: 11.50,
        description: 'Hearty Malaysian Roti Canai with chicken curry or steaming Hainanese chicken rice bowl.',
        transitNote: 'Walk through Chinatown Paifang Arch on Moonta St.'
      },
      {
        title: 'Saturday 2 PM Clearance Fruit Box Hack',
        type: 'food',
        cost: 3.00,
        description: 'Snag a massive carton of fresh South Australian strawberries, berries, or ripe avocados for just $2–$3.',
        transitNote: 'Back into Central Market aisles.'
      }
    ]
  },
  {
    id: 'itin-belair-koalas',
    title: 'The $6 Hills Nature & Wild Koala Trail',
    subtitle: 'Catch the suburban train into the Adelaide foothills for native wildlife',
    targetBudget: 15,
    estimatedTotal: 5.00,
    duration: 'Half Day (4 hours)',
    badge: 'Wild Aussie Wildlife',
    description: 'You do not need to pay $45 for a commercial wildlife park. Catch the regular train into Belair National Park to spot wild koalas sleeping in gum trees.',
    items: [
      {
        title: 'Train from Adelaide Railway Station to Belair',
        type: 'transit',
        cost: 1.25,
        description: 'Board the Belair line train through the scenic Adelaide Hills tunnels (concession fare).',
        transitNote: 'Adelaide Railway Station Platform 3 or 4.'
      },
      {
        title: 'Belair National Park Bushwalk & Koala Spotting',
        type: 'activity',
        cost: 0,
        description: 'Free walk-in entry directly from the train platform. Spot sleeping koalas, wild kookaburras, and friendly emus.',
        transitNote: 'Park entrance is 20m from Belair train platform.'
      },
      {
        title: 'Free Gas BBQ / Picnic Lunch on Main Oval',
        type: 'food',
        cost: 2.50,
        description: 'Bring simple bread, sausages or picnic sandwiches to cook on the free electric BBQs under the shady gum trees.',
        transitNote: 'Clean public facilities & free drinking water taps on site.'
      },
      {
        title: 'Return Train to Adelaide CBD',
        type: 'transit',
        cost: 1.25,
        description: 'Relax on the scenic 35-min descent back to the city center.',
        transitNote: 'Trains run hourly on weekends.'
      }
    ]
  }
];
