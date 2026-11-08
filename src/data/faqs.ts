export interface FAQItem {
  id: string;
  category: 'transit' | 'cost' | 'student_life' | 'social';
  question: string;
  answer: string;
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'transit',
    question: 'How does the Free City Tram Zone actually work?',
    answer: 'The tram is 100% free between South Terrace in the southern CBD all the way up King William Street, North Terrace, to the Adelaide Entertainment Centre, as well as the eastern spur to the Botanic Gardens. You DO NOT need to tap your metroCARD if you remain inside this zone. You simply step on and step off!'
  },
  {
    id: 'faq-2',
    category: 'transit',
    question: 'What is the cheapest way to travel daily as an international student?',
    answer: 'If you use public transit frequently (more than 11 trips a week), buy the 28-Day Adelaide Metro Student Pass for $27.00. This provides 28 consecutive days of unlimited bus, train, and tram travel across the entire metropolitan network. Make sure your university student ID has a current semester concession sticker attached!'
  },
  {
    id: 'faq-3',
    category: 'cost',
    question: 'Is Adelaide cheaper than Sydney or Melbourne for international students?',
    answer: 'Yes! Official national data consistently shows Adelaide has a roughly 15%–22% lower cost of living than Sydney and Melbourne, particularly for student accommodation and public transport. Many of Adelaide’s premier attractions (Art Gallery, Museum, Botanic Garden, River Torrens trails, State Library, all Adelaide beaches) have $0 admission fees.'
  },
  {
    id: 'faq-4',
    category: 'transit',
    question: 'How do the 98A/98C Free City Connector buses work?',
    answer: 'Routes 98A (anti-clockwise) and 98C (clockwise) link Adelaide CBD with North Adelaide. They run every 30 minutes 7 days a week and are completely free for both locals and visitors. Route 99A/99C does a smaller loop inside the CBD. Look for the distinctive red and yellow "City Connector" buses.'
  },
  {
    id: 'faq-5',
    category: 'student_life',
    question: 'Where can I buy affordable fresh groceries and vegetables?',
    answer: 'Adelaide Central Market is legendary on Saturday afternoons from 2:00 PM to 3:00 PM for "cheap trays" ($1 to $2 boxes of fruit and veggies). For everyday groceries, ALDI stores (e.g. Gouger St / Chinatown or Hawthorn) are significantly cheaper than Coles and Woolworths. Also check out Indian & Asian grocery stores on Grote St and Moonta St.'
  },
  {
    id: 'faq-6',
    category: 'social',
    question: 'How do I make local friends and practice speaking English in Adelaide?',
    answer: 'We recommend: 1) Participating in free StudyAdelaide community events and international student dinners; 2) Joining weekly university clubs during O-Week or online; 3) The free Torrens parkrun every Saturday morning at 8:00 AM in Elder Park; 4) Volunteering through Conservation Volunteers SA or at local food charities; 5) Language exchange meetups at Adelaide City Library.'
  },
  {
    id: 'faq-7',
    category: 'student_life',
    question: 'Can I drink tap water in Adelaide?',
    answer: 'Yes, 100%. Adelaide drinking water meets all Australian Drinking Water Guidelines and is thoroughly treated and safe to drink directly from any indoor or public outdoor drinking fountain. Some students buy a basic filter jug if they prefer a milder mineral taste, but boiling is completely unnecessary.'
  },
  {
    id: 'faq-8',
    category: 'student_life',
    question: 'What should I do in an emergency?',
    answer: 'For life-threatening emergencies (Police, Fire, Ambulance), immediately call 000 (Triple Zero). For non-urgent police matters (e.g. lost passport, noise complaint), call 131 444. If you need 24/7 mental health crisis support, call Lifeline on 13 11 14. All these services are confidential.'
  }
];
