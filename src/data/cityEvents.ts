import supercarsImg from '../assets/images/event_supercars_adelaide_1795021966013.jpg';
import carolsImg from '../assets/images/event_carols_elder_park_1795021966646.jpg';
import nyeImg from '../assets/images/event_nye_fireworks_1795021967955.jpg';
import tourDownUnderImg from '../assets/images/event_tour_down_under_1795021968552.jpg';
import fringeImg from '../assets/images/event_adelaide_fringe_1795021968091.jpg';

export interface CityEvent {
  id: string;
  title: string;
  seasonTag: string;
  dateWindow: string;
  location: string;
  costLabel: string;
  costValue: number;
  isFree: boolean;
  transitTip: string;
  studentTip: string;
  summary: string;
  statusBadge: 'Starting Soon' | 'Upcoming Dec 2026' | 'Early 2027' | 'Free Entry';
  imageSrc: string;
}

export const CITY_EVENTS: CityEvent[] = [
  {
    id: 'adelaide-supercars',
    title: 'bp Adelaide Grand Final (Supercars 500 & Concerts)',
    seasonTag: 'Motorsport & Headline Concerts',
    dateWindow: 'Nov 26 – Nov 29, 2026',
    location: 'Victoria Park / Adelaide Street Circuit (East End)',
    costLabel: 'Student Concession Day Pass from ~$45 (Free Rundle St pop-ups)',
    costValue: 45,
    isFree: false,
    transitTip: 'Take the Free 98A/98C City Connector or walk 10 mins east from Rundle Mall along Flinders St—circuit roads close around Victoria Park.',
    studentTip: 'After-race concerts feature Hilltop Hoods (Sat) and Guns N’ Roses (Sun). Look for Ticketek Student Concession day passes or soak up the free live atmosphere along Rundle St in the East End.',
    summary: 'Adelaide’s massive season-ending Supercars street race through the leafy eastern parklands with aerial shows, street food villages, and big evening concerts.',
    statusBadge: 'Starting Soon',
    imageSrc: supercarsImg
  },
  {
    id: 'carols-by-candlelight',
    title: 'St John Carols by Candlelight & Fireworks',
    seasonTag: 'Festive Lawn Concert & River Fireworks',
    dateWindow: 'Sat, Dec 12, 2026 (Gates 3 PM · Fireworks 10:30 PM)',
    location: 'Elder Park / Tarntanya Wama (River Torrens)',
    costLabel: '100% Free Lawn Entry',
    costValue: 0,
    isFree: true,
    transitTip: 'Hop on the Free City Tram to Adelaide Railway Station / Festival Plaza stop—Elder Park lawn sits right outside.',
    studentTip: 'Bring a picnic rug and snacks with housemates! Gates open at 3 PM with food trucks and markets, Community Concert kicks off at 5 PM, and fireworks light up the River Torrens at 10:30 PM.',
    summary: 'South Australia’s biggest summer festive evening beside the River Torrens—pack a picnic blanket for free live music, candlelit carols, and 10:30 PM river fireworks.',
    statusBadge: 'Free Entry',
    imageSrc: carolsImg
  },
  {
    id: 'nye-adelaide',
    title: 'Adelaide New Year’s Eve at Elder Park & Glenelg',
    seasonTag: 'Live Music & Dual Fireworks',
    dateWindow: 'Thu, Dec 31, 2026 (Evening – 12:15 AM)',
    location: 'Elder Park (CBD) & Glenelg Foreshore',
    costLabel: '100% Free Waterfront Celebrations',
    costValue: 0,
    isFree: true,
    transitTip: 'Adelaide Metro runs extra late-night trams & trains on NYE—Tram from CBD to Glenelg takes 35 mins ($1.25 student concession).',
    studentTip: 'Two great free fireworks shows: head to Elder Park for live bands plus 9 PM & midnight fireworks over the River Torrens, or take the tram to Glenelg Beach for oceanfront countdown vibes.',
    summary: 'Ring in 2027 along the River Torrens or at Glenelg Jetty with free outdoor stages, pop-up food stalls, and midnight fireworks over the water.',
    statusBadge: 'Free Entry',
    imageSrc: nyeImg
  },
  {
    id: 'tour-down-under',
    title: 'Santos Tour Down Under & City Tour Village',
    seasonTag: 'Pro Cycling, Food Trucks & Summer Party',
    dateWindow: 'Jan 16 – Jan 24, 2027',
    location: 'Victoria Square / Tarntanyangga & East End',
    costLabel: '100% Free Village & Street Viewing',
    costValue: 0,
    isFree: true,
    transitTip: 'Take the Free City Tram straight to Victoria Square stop right beside the main Tour Village stage.',
    studentTip: 'Even if you don’t cycle, Victoria Square turns into a lively summer hangout with free live DJs, pro team pits, outdoor giant screens, and shaded food-truck lawns.',
    summary: 'International cycling teams hit Adelaide for sunny twilight criterium racing, free evening concerts, and open-air summer street parties in Victoria Square.',
    statusBadge: 'Free Entry',
    imageSrc: tourDownUnderImg
  },
  {
    id: 'adelaide-fringe',
    title: 'Adelaide Fringe & Garden of Unearthly Delights',
    seasonTag: 'Outdoor Carnivals, Comedy & Pop-Up Villages',
    dateWindow: 'Feb 19 – Mar 21, 2027',
    location: 'Rundle Park, Gluttony (Rymill Park) & East End',
    costLabel: 'Free Park Hub Entry (Student Rush Tix $10–$20)',
    costValue: 15,
    isFree: false,
    transitTip: 'Ride the Free Botanic Gardens Tram right onto East Terrace—The Garden and Gluttony entrance gates are steps away.',
    studentTip: 'Entering The Garden and Gluttony is completely free—great for fairy lights, late-night street food, and outdoor atmosphere. Grab same-day BankSA Rush Tix on the Fringe app for cheap $10–$20 shows.',
    summary: 'The world’s second-largest arts festival turns Adelaide’s eastern parklands into glowing outdoor villages packed with Spiegel tents, pop-up kitchens, and comedy.',
    statusBadge: 'Early 2027',
    imageSrc: fringeImg
  }
];
