import React, { useState } from 'react';
import { 
  Info, 
  HelpCircle, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  Compass, 
  ShieldCheck,
  Heart,
  DollarSign
} from 'lucide-react';
import { FAQS_DATA } from '../data/faqs';

export const AboutContactView: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Contact / Feedback form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formInstitution, setFormInstitution] = useState('University of Adelaide');
  const [formCategory, setFormCategory] = useState('Feedback & Suggestion');
  const [formMessage, setFormMessage] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    if (activeCategory !== 'all' && faq.category !== activeCategory) {
      return false;
    }
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formMessage.trim()) return;

    // Simulate submission
    setSubmittedMessage(true);
    setTimeout(() => {
      setFormName('');
      setFormEmail('');
      setFormMessage('');
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Title & Mission */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900">
            <Info className="w-3.5 h-3.5 text-amber-700" />
            <span>About Adelaide Pocket Guide</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900">
            <span>Primary Audience: International Students Aged 18–30</span>
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Helping International Students Discover Adelaide with Ease
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          The primary target audience is <strong>international students aged 18–30 living in Adelaide</strong>, particularly newcomers who are budget-conscious, unfamiliar with the city, and dependent on public transport. The website also caters to students who enjoy independent exploration but want opportunities to discover local culture, meet people, and build a lasting sense of belonging in Adelaide.
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5 text-amber-700" />
          </div>
          <h3 className="font-bold text-stone-900 text-base">Budget Transparency</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Every listed activity and dining spot features verified AUD prices, concession tips, and grocery hacks, preventing spending anxiety.
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5 text-emerald-700" />
          </div>
          <h3 className="font-bold text-stone-900 text-base">Independent Confidence</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Clear public transport directions (free tram stops, 98A buses, train platforms) ensure you can travel around Adelaide independently and safely.
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <Heart className="w-5 h-5 text-rose-700" />
          </div>
          <h3 className="font-bold text-stone-900 text-base">Social Connection</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Discover community events, free weekend parkruns, student clubs, and welcoming social hubs to make lifelong friends in Adelaide.
          </p>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="space-y-6 pt-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-900">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            Everything International Students Ask
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Clear, honest answers to common questions about living and exploring Adelaide.
          </p>
        </div>

        {/* Category Filter for FAQs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All FAQs' },
            { id: 'transit', label: 'Transport & Fares' },
            { id: 'cost', label: 'Living Costs' },
            { id: 'student_life', label: 'Student Life' },
            { id: 'social', label: 'Making Friends' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-50/80 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-stone-900">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-lg bg-stone-100 text-stone-600 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Feedback & Contact Form */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-900">
            <MessageSquare className="w-3.5 h-3.5 text-rose-600" />
            <span>Community Feedback & Support</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900">
            Have Feedback, a Question or a Hidden Gem to Share?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Did you find a fantastic new $10 student lunch deal or an awesome sunset lookout? We regularly update Adelaide Pocket Guide with community suggestions.
          </p>
        </div>

        {submittedMessage ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3 animate-fadeIn">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-emerald-900">
              Thank you! Your feedback has been received.
            </h3>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              We review every recommendation to help fellow international students enjoy Adelaide safely and affordably.
            </p>
            <button
              onClick={() => setSubmittedMessage(false)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria or Ken"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. student@uni.edu.au"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">
                  University / College
                </label>
                <select
                  value={formInstitution}
                  onChange={(e) => setFormInstitution(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 bg-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="University of Adelaide">University of Adelaide</option>
                  <option value="UniSA">University of South Australia (UniSA)</option>
                  <option value="Flinders University">Flinders University</option>
                  <option value="TAFE SA">TAFE SA</option>
                  <option value="Torrens University">Torrens University</option>
                  <option value="Other">Other Institution / Language College</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">
                  Topic / Message Type
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 bg-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="Feedback & Suggestion">General Feedback & Suggestion</option>
                  <option value="Submit a Gem">Submit a Secret Spot or Student Deal</option>
                  <option value="Report Price Change">Report an Updated Price or Transit Change</option>
                  <option value="Customer Support">App Help & Support</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700">
                Your Message / Details *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Share your thoughts, recommend an affordable bakery or ask a question..."
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Submit to Adelaide Pocket Guide</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
