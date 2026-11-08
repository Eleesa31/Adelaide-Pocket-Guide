import { DiscountItem } from '../types';

export const STUDENT_DISCOUNTS: DiscountItem[] = [
  {
    id: 'disc-metro-pass',
    category: 'transit',
    title: 'Adelaide Metro 28-Day Student Pass',
    provider: 'Adelaide Metro',
    discountSummary: '$27.00 for 28 Days Unlimited Travel across all Buses, Trains & Trams',
    howToClaim: 'Buy a green Concession metroCARD at Adelaide Railway Station or selected newsagents. Top up with the 28-day student pass online or at recharge machines.',
    requirements: 'Valid full-time tertiary Student ID with transport concession sticker',
    badge: 'Saves ~$80/month'
  },
  {
    id: 'disc-palace-nova',
    category: 'cinema_fun',
    title: '$10.50 Movie Tickets on Student Mondays',
    provider: 'Palace Nova Eastend (Rundle St) & Prospect',
    discountSummary: '$10.50 general admission tickets every Monday for students',
    howToClaim: 'Book online or show your physical/digital student card at the box office on Rundle Street.',
    requirements: 'Valid Student ID card',
    badge: 'Over 50% Off'
  },
  {
    id: 'disc-hoyts-cinemas',
    category: 'cinema_fun',
    title: 'Hoyts Concession & Hoyts Rewards Student Deals',
    provider: 'Hoyts Norwood & Tea Tree Plaza',
    discountSummary: '$14.00 standard student concession tickets + $10 student Tuesdays',
    howToClaim: 'Select student concession ticket type online or present card at counter.',
    requirements: 'Student identification card',
    badge: 'Save $10/ticket'
  },
  {
    id: 'disc-art-gallery-exhibitions',
    category: 'culture',
    title: 'AGSA & SA Museum Special Exhibitions Concession',
    provider: 'Cultural Institutions on North Terrace',
    discountSummary: 'Permanent collections are 100% Free; ticketed international exhibitions have up to 40% student discount',
    howToClaim: 'Present student ID at the ticket counter.',
    requirements: 'Australian Tertiary Student Card',
    badge: 'Free / 40% Off'
  },
  {
    id: 'disc-unidays',
    category: 'tech_retail',
    title: 'UNiDAYS & Student Edge Australia Apps',
    provider: 'UNiDAYS / Student Edge',
    discountSummary: '10%–20% off ASOS, Apple, Cotton On, Nike, Domino’s, Chatime, and Boost Juice',
    howToClaim: 'Download the UNiDAYS and Student Edge apps and register using your university .edu.au email address.',
    requirements: 'Active student email address from Australian university or TAFE',
    badge: 'Daily Perks'
  },
  {
    id: 'disc-apple-education',
    category: 'tech_retail',
    title: 'Apple & Tech Education Pricing',
    provider: 'Apple Store Rundle Mall / JB Hi-Fi Education',
    discountSummary: 'Save up to $200 on MacBooks & iPads + discounted AppleCare and accessories',
    howToClaim: 'Show your university enrollment letter or student ID in-store at Apple Rundle Mall or JB Hi-Fi Education portal.',
    requirements: 'Proof of tertiary student enrollment',
    badge: 'Save up to $200'
  },
  {
    id: 'disc-op-shops',
    category: 'tech_retail',
    title: 'Op-Shop & Thrift Student Discounts (Salvos & Vinnies)',
    provider: 'Salvos Stores & Vinnies SA',
    discountSummary: '20% off all clothing, kitchenware and furniture on Student Discount days (usually Wednesdays)',
    howToClaim: 'Present student ID at checkout at stores along Glen Osmond Rd, Kidman Park or Norwood.',
    requirements: 'Valid Student ID',
    badge: '20% Off Secondhand'
  },
  {
    id: 'disc-food-clearance',
    category: 'food_drink',
    title: 'Adelaide Central Market "Cheap Saturday" Trays',
    provider: 'Central Market Stallholders',
    discountSummary: 'Whole trays of mangoes, avocados, berries, and vegetables for $1.00 – $3.00 from 2:00 PM onwards',
    howToClaim: 'Walk through the market aisles from 2:00 PM to 3:00 PM before Saturday close. Look for trays with handwritten $1/$2 signs.',
    requirements: 'Cash or card; no student ID required (open to all budget hunters)',
    badge: 'Massive Food Hack'
  }
];

export const TRANSIT_GUIDE_DATA = {
  metroCard: {
    title: 'Adelaide Metro Concession Card Essentials',
    summary: 'Public transport in Adelaide is fully integrated across buses, trains, and trams using the green Concession metroCARD.',
    fares: [
      { type: 'Student Concession Peak (M-F before 9:00 AM, 3:01 PM - 7:00 PM)', price: '$1.25' },
      { type: 'Student Concession Off-Peak (9:01 AM - 3:00 PM, after 7:01 PM, all weekends & public holidays)', price: '$0.85' },
      { type: '2-Hour Free Transfer Window (free changes across bus/train/tram)', price: '$0.00' },
      { type: '28-Day Unlimited Student Pass', price: '$27.00' }
    ],
    topTips: [
      'Always validate: Tap your card on the validator every time you board a bus, train, or tram—even during free transfers.',
      'Always carry your Student ID card: Transit officers regularly inspect cards and can issue heavy fines if you use a concession card without your student ID.',
      'Where to buy: Adelaide Railway Station InfoCentre, Adelaide Central Market newsagents, or campus student hubs ($5 card fee).'
    ]
  },
  freeZones: [
    {
      title: 'Free City Tram Zone',
      coverage: 'Valid between South Terrace, Adelaide Entertainment Centre, Festival Plaza, and the Adelaide Botanic Gardens.',
      rule: 'No metroCARD tap needed! Just hop on and hop off within the designated free zone boundaries.',
      stops: ['South Terrace', 'City South', 'Victoria Square', 'Pirie St', 'Rundle Mall', 'Railway Station', 'Festival Plaza', 'University', 'Botanic Gardens', 'City West', 'Thebarton', 'Entertainment Centre']
    },
    {
      title: 'Free City Connector Buses (Routes 98A, 98C, 99A, 99C)',
      coverage: 'Circulates around the Adelaide CBD (99A/99C) and links Adelaide CBD with North Adelaide (98A/98C).',
      rule: '100% Free for everyone. No card tapping or payment required. Air-conditioned with wheelchair/pram access and free Wi-Fi.',
      stops: ['Adelaide Central Market', 'Victoria Square', 'North Terrace', 'Adelaide Zoo', 'O’Connell Street', 'Melbourne Street', 'Adelaide Oval']
    },
    {
      title: 'O-Bahn Guided Busway',
      coverage: 'The fastest busway in the world, running on dedicated concrete tracks from the CBD to Klemzig, Paradise, and Tea Tree Plaza up to 100km/h.',
      rule: 'Standard concession fares apply outside the free city zone. Great for visiting Tea Tree Plaza shopping center and northeastern scenic parks.'
    }
  ]
};

export const SETTLING_IN_GUIDES = [
  {
    id: 'banking',
    title: 'Student Bank Accounts with $0 Fees',
    icon: 'CreditCard',
    points: [
      'Major banks (Commonwealth Bank, ANZ, NAB, Westpac) offer fee-free student transaction accounts with contactless Visa/Mastercard debit cards.',
      'You can easily set up your account online before arriving in Australia or visit a branch on King William Street or Rundle Mall with your passport and CoE / Student ID.',
      'Australia is almost entirely cashless—Apple Pay, Google Pay, and contactless cards are accepted everywhere from supermarkets to food trucks.'
    ]
  },
  {
    id: 'sim-cards',
    title: 'Best Budget Mobile SIM Plans in Australia',
    icon: 'Smartphone',
    points: [
      'Major carriers (Telstra, Optus, Vodafone) are often expensive ($40–$70/mo). Instead, use budget MVNO carriers that use the exact same Telstra or Optus mobile networks.',
      'Aldi Mobile ($17–$25/mo on Telstra network, unlimited data rollover, pick up SIM at any ALDI store).',
      'Boost Mobile (Full Telstra 4G/5G coverage, great for regional trips into the Outback or Barossa Valley).',
      'Belong / Felix Mobile ($25–$35/mo with carbon-neutral endless data).'
    ]
  },
  {
    id: 'health-oshc',
    title: 'OSHC (Health Cover) & Bulk-Billing Doctors',
    icon: 'HeartPulse',
    points: [
      'As an international student, your Overseas Student Health Cover (OSHC) with providers like Allianz Care, Bupa, Medibank, or NIB is compulsory.',
      'Look for "Direct Billing" or "Bulk Billing" GP medical centres so you do not pay out-of-pocket upfront.',
      'Adelaide Health Clinic (City), Uni of Adelaide Health Practice (Horace Lamb Building), and Flinders Uni Medical Centre offer direct billing for students.',
      'For immediate free health advice 24/7, call Healthdirect at 1800 022 222 to speak with a registered nurse.'
    ]
  },
  {
    id: 'safety-emergency',
    title: 'Safety, Water & Emergency Contacts',
    icon: 'ShieldCheck',
    points: [
      'Emergency (Police / Fire / Ambulance): Call 000 (Triple Zero). Free call from any phone even with no SIM credit.',
      'Non-Emergency Police Assistance: Call 131 444 (for reporting lost property, noise issues, minor incidents).',
      'Lifeline Crisis Mental Health Support: Call 13 11 14 (free, confidential, 24/7 empathetic support).',
      'Tap water in Adelaide: 100% clean, rigorously tested, and safe to drink straight from the tap. Carry a reusable water bottle to refill at free public taps across the city.'
    ]
  },
  {
    id: 'slang-decoder',
    title: 'Local Adelaide & Aussie Slang Decoder',
    icon: 'Sparkles',
    points: [
      '"Heaps good" = Iconic South Australian slang meaning extremely good / awesome!',
      '"Arvo" = Afternoon ("See you this arvo at the library").',
      '"Brekkie" = Breakfast.',
      '"Servo" = Service / petrol station with convenience food.',
      '"Bottle-o" = Bottle shop / liquor store.',
      '"Maccas" = McDonald’s.',
      '"No worries" = You’re welcome / it’s totally fine / don’t stress.',
      '"Thongs" = Rubber flip-flops for the beach (not undergarments!).',
      '"Pie Floater" = South Australian delicacy: a meat pie submerged in hot thick green pea soup, topped with tomato sauce!'
    ]
  }
];

export const SOCIAL_COMMUNITY_RESOURCES = [
  {
    title: 'StudyAdelaide Hub & Free Student Events',
    description: 'The South Australian Government official international student agency. Hosts free international student welcome festivals, career workshops, city walking tours, free tickets to AFL football games, and student hub workspaces.',
    actionUrl: 'https://studyadelaide.com',
    location: '55 Currie Street, Adelaide SA 5000',
    type: 'Official Community'
  },
  {
    title: 'Torrens River parkrun (Free Weekly 5km)',
    description: 'Every Saturday at 8:00 AM at Elder Park. A completely free, volunteer-led 5km walk, jog, or run along the river. Great way to make local Australian friends and stay active.',
    actionUrl: 'https://www.parkrun.com.au/torrens/',
    location: 'Elder Park, Adelaide Riverbank',
    type: 'Fitness & Friends'
  },
  {
    title: 'Adelaide City Library & Innovation Lab',
    description: 'Located in Rundle Place (Level 3). Features free 3D printers, digital audio studios, quiet meeting rooms, board games, language exchange groups, and ultra-fast free Wi-Fi.',
    actionUrl: 'https://www.cityofadelaide.com.au/community/library-services/',
    location: 'Level 3, Rundle Place, Rundle Mall',
    type: 'Study & Tech'
  },
  {
    title: 'University Clubs & Associations',
    description: 'Join over 100+ cultural, language, sports, and hobby clubs at YouX (Uni Adelaide), USASA (UniSA), and FUSA (Flinders). Membership is typically $5–$10/year and includes free weekly barbecues, pizza nights, and day trips.',
    actionUrl: '#',
    location: 'On all university campuses',
    type: 'Campus Life'
  },
  {
    title: 'The Lost Dice Board Game Social Cafe',
    description: 'A welcoming space on King William Street with over 500 board games. Great for casual weekend hangouts with flatmates or attending their open social gamer evenings without needing alcohol.',
    actionUrl: 'https://thelostdice.com.au',
    location: '111 King William St, Adelaide CBD',
    type: 'Youth Social Space'
  },
  {
    title: 'Adelaide Language & Culture Exchange Meetups',
    description: 'Weekly free conversational meetups held in relaxed cafes around Victoria Square and North Terrace. Perfect for practicing English, sharing your home language, and meeting students from 40+ countries.',
    actionUrl: '#',
    location: 'Victoria Square & Rundle St cafes',
    type: 'Language & Friends'
  }
];

export interface NewcomerStep {
  step: number;
  title: string;
  category: 'transit' | 'navigation' | 'social' | 'budget';
  summary: string;
  detail: string;
  proTip: string;
}

export const NEWCOMER_CHECKLIST: NewcomerStep[] = [
  {
    step: 1,
    title: 'Airport to City for $1.25 (Skip the $40 Taxi!)',
    category: 'transit',
    summary: 'Catch Adelaide Metro JetBus J1 or J2 right outside Adelaide Airport terminal.',
    detail: 'Do not pay $35 to $45 for an airport taxi or rideshare! The JetBus stops directly outside Terminal 1 and takes you straight down Sir Donald Bradman Drive into the CBD / King William St in 20 minutes.',
    proTip: 'You can tap your contactless Visa/Mastercard directly or buy a ticket from the driver or airport vending machine.'
  },
  {
    step: 2,
    title: 'The Adelaide Grid: Why You Won’t Get Lost',
    category: 'navigation',
    summary: 'Designed as a 1-square-mile grid surrounded by 29 lush parklands.',
    detail: 'Adelaide CBD is completely flat and planned in a perfect grid. The four edges are North Terrace, South Terrace, East Terrace, and West Terrace. Victoria Square (Tarntanyangga) sits right in the dead center. King William Street cuts north-to-south. If you ever feel disoriented, walk in any direction—within 10 minutes you will hit a green park or a tram line!',
    proTip: 'Look for Mount Lofty and the Adelaide Hills in the background—they are always in the East!'
  },
  {
    step: 3,
    title: 'Crucial: You Must Flag Down Buses in Adelaide!',
    category: 'transit',
    summary: 'Buses will NOT stop automatically just because you are standing at the stop.',
    detail: 'In South Australia, bus drivers will drive straight past your stop unless you clearly raise your arm out horizontally as the bus approaches. It surprises almost every new student from overseas!',
    proTip: 'Press the red "STOP" button inside the bus roughly 100 meters before your destination stop.'
  },
  {
    step: 4,
    title: 'Get Your Concession Sticker & Green metroCARD',
    category: 'budget',
    summary: 'Save hundreds of dollars on transport during your degree.',
    detail: 'On your first week on campus, go to your Student Hub (Uni of Adelaide Hub Central, UniSA Campus Central, Flinders Connect) and ask for your transport concession sticker for your Student ID card. Then purchase the green Concession metroCARD.',
    proTip: 'If you commute 4+ days a week, load the $27 28-day pass for unlimited travel across all trains, trams, and buses.'
  },
  {
    step: 5,
    title: 'Free Fast Wi-Fi & Clean Tap Water Everywhere',
    category: 'budget',
    summary: 'Never pay for bottled water or waste your mobile data in the city.',
    detail: 'Adelaide has safe, crisp tap water compliant with world standards. Free public chilled refill stations are installed along North Terrace, Rundle Mall, and Victoria Square. Connect to "AdelaideFreeWiFi" throughout the CBD, plus eduroam on any campus.',
    proTip: 'Download offline Google Maps for Adelaide on your phone so you have directions even without data.'
  },
  {
    step: 6,
    title: 'Find Your Social Circle in Your First Month',
    category: 'social',
    summary: 'Build a genuine sense of belonging and avoid homesickness.',
    detail: 'Adelaide is known as Australia’s warmest and most accessible student town. Attend the free StudyAdelaide international student welcome festivals, drop into the weekly 5km Torrens river parkrun (you can walk or jog!), or join student clubs during O-Week for free weekly barbecues.',
    proTip: 'Join the international student society for your home country AND an interest-based club (like hiking, photography, or badminton) to make both local and global friends.'
  }
];

