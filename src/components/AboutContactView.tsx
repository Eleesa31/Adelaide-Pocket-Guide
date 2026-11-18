import React, { useState, useEffect } from 'react';
import { 
  Info, 
  HelpCircle, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  CheckCircle2, 
  Mail, 
  Compass, 
  Heart,
  DollarSign,
  ExternalLink,
  Copy,
  Check,
  Download,
  Trash2,
  ClipboardList
} from 'lucide-react';
import { FAQS_DATA } from '../data/faqs';
import { FeedbackEntry } from '../types';

const OWNER_EMAIL = 'eleesaanil2001@gmail.com';
const GITHUB_ISSUES_URL = 'https://github.com/Eleesa31/Adelaide-Pocket-Guide/issues/new';

export const AboutContactView: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Contact / Feedback form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formInstitution, setFormInstitution] = useState('University of Adelaide');
  const [formCategory, setFormCategory] = useState('Feedback & Suggestion');
  const [formMessage, setFormMessage] = useState('');
  const [lastSubmitted, setLastSubmitted] = useState<FeedbackEntry | null>(null);
  const [copiedSubmission, setCopiedSubmission] = useState(false);

  // Saved feedback review log (persisted in browser localStorage)
  const [feedbackLog, setFeedbackLog] = useState<FeedbackEntry[]>(() => {
    try {
      const saved = localStorage.getItem('adelaide_pocket_feedback');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });
  const [showReviewPanel, setShowReviewPanel] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'reviewed' | 'added'>('all');

  useEffect(() => {
    try {
      localStorage.setItem('adelaide_pocket_feedback', JSON.stringify(feedbackLog));
    } catch {
      // ignore
    }
  }, [feedbackLog]);

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

    const newEntry: FeedbackEntry = {
      id: `fb-${Date.now()}`,
      name: formName.trim(),
      email: formEmail.trim() || undefined,
      institution: formInstitution,
      category: formCategory,
      message: formMessage.trim(),
      status: 'new',
      createdAt: Date.now()
    };

    setFeedbackLog((prev) => [newEntry, ...prev]);
    setLastSubmitted(newEntry);
    setFormName('');
    setFormEmail('');
    setFormMessage('');
  };

  const buildMailtoHref = (entry: FeedbackEntry) => {
    const subject = `[Adelaide Pocket Guide] ${entry.category} from ${entry.name}`;
    const body = [
      `Name: ${entry.name}`,
      `Institution: ${entry.institution}`,
      `Reply Email: ${entry.email || 'Not provided'}`,
      `Topic: ${entry.category}`,
      '',
      'Message / Recommendation:',
      entry.message
    ].join('\n');
    return `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const buildGithubIssueHref = (entry: FeedbackEntry) => {
    const title = `[${entry.category}] ${entry.message.slice(0, 65)}${entry.message.length > 65 ? '...' : ''}`;
    const body = [
      `### Community Feedback / Suggestion`,
      `- **Submitted By:** ${entry.name}`,
      `- **Institution:** ${entry.institution}`,
      `- **Topic:** ${entry.category}`,
      `- **Contact Email:** ${entry.email || 'Not provided'}`,
      '',
      `### Details`,
      entry.message
    ].join('\n');
    return `${GITHUB_ISSUES_URL}?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
  };

  const handleCopyEntry = (entry: FeedbackEntry) => {
    const text = [
      `[Adelaide Pocket Guide — ${entry.category}]`,
      `From: ${entry.name} (${entry.institution})`,
      `Email: ${entry.email || 'Not provided'}`,
      `Date: ${new Date(entry.createdAt).toLocaleString()}`,
      `Message: ${entry.message}`
    ].join('\n');
    navigator.clipboard?.writeText(text);
    setCopiedSubmission(true);
    setTimeout(() => setCopiedSubmission(false), 2200);
  };

  const handleUpdateStatus = (id: string, status: FeedbackEntry['status']) => {
    setFeedbackLog((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleDeleteEntry = (id: string) => {
    setFeedbackLog((prev) => prev.filter((item) => item.id !== id));
  };

  const handleExportCsv = () => {
    if (feedbackLog.length === 0) return;
    const escapeCsv = (val: string) => `"${val.replace(/"/g, '""')}"`;
    const headers = ['Date', 'Status', 'Topic', 'Name', 'Institution', 'Email', 'Message'];
    const rows = feedbackLog.map((item) => [
      new Date(item.createdAt).toISOString(),
      item.status,
      item.category,
      item.name,
      item.institution,
      item.email || '',
      item.message
    ]);
    const csvContent = [headers, ...rows].map((r) => r.map(escapeCsv).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `adelaide-pocket-guide-feedback-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredFeedback = feedbackLog.filter((item) =>
    statusFilter === 'all' ? true : item.status === statusFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Title & Mission */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E6F3F4] text-[#0A868C]">
            <Info className="w-3.5 h-3.5 text-[#0A868C]" />
            <span>About Adelaide Pocket Guide</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF4F2] text-[#475E5A]">
            <span>Primary Audience: International Students Aged 18–30</span>
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A2E2C] tracking-tight">
          Helping International Students Discover Adelaide with Ease
        </h1>
        <p className="text-[#475E5A] text-sm sm:text-base leading-relaxed">
          The primary target audience is <strong>international students aged 18–30 living in Adelaide</strong>, particularly newcomers who are budget-conscious, unfamiliar with the city, and dependent on public transport. The website also caters to students who enjoy independent exploration but want opportunities to discover local culture, meet people, and build a lasting sense of belonging in Adelaide.
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#87A09B]/20 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#E6F3F4] text-[#0A868C] flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5 text-[#0A868C]" />
          </div>
          <h3 className="font-bold text-[#1A2E2C] text-base">Budget Transparency</h3>
          <p className="text-xs text-[#5B6E6A] leading-relaxed">
            Every listed activity and dining spot features verified AUD prices, concession tips, and grocery hacks, preventing spending anxiety.
          </p>
        </div>

        <div className="bg-white border border-[#87A09B]/20 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#EBF4FA] text-[#0666A7] flex items-center justify-center font-bold">
            <Compass className="w-5 h-5 text-[#0666A7]" />
          </div>
          <h3 className="font-bold text-[#1A2E2C] text-base">Independent Confidence</h3>
          <p className="text-xs text-[#5B6E6A] leading-relaxed">
            Clear public transport directions (free tram stops, 98A buses, train platforms) ensure you can travel around Adelaide independently and safely.
          </p>
        </div>

        <div className="bg-white border border-[#87A09B]/20 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FBF4F1] text-[#D0A18F] flex items-center justify-center font-bold">
            <Heart className="w-5 h-5 text-[#D0A18F]" />
          </div>
          <h3 className="font-bold text-[#1A2E2C] text-base">Social Connection</h3>
          <p className="text-xs text-[#5B6E6A] leading-relaxed">
            Discover community events, free weekend parkruns, student clubs, and welcoming social hubs to make lifelong friends in Adelaide.
          </p>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="space-y-6 pt-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF4FA] text-[#0666A7]">
            <HelpCircle className="w-3.5 h-3.5 text-[#0666A7]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A2E2C]">
            Everything International Students Ask
          </h2>
          <p className="text-xs sm:text-sm text-[#5B6E6A]">
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
                  ? 'bg-[#0A868C] text-white shadow-sm font-bold'
                  : 'bg-white border border-[#87A09B]/30 text-[#475E5A] hover:bg-[#EFF4F2]'
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
                className="bg-white border border-[#87A09B]/20 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#EFF4F2]/50 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-[#1A2E2C]">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-lg bg-[#EFF4F2] text-[#0A868C] shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#475E5A] leading-relaxed border-t border-[#87A09B]/20 bg-[#F7F9F8]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Feedback & Contact Form */}
      <div className="bg-white border border-[#D4DDD9] rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FBF4F1] text-[#B57F6C]">
              <MessageSquare className="w-3.5 h-3.5 text-[#B57F6C]" />
              <span>Community Feedback & Support</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1A2E2C]">
              Have Feedback, a Question or a Hidden Gem to Share?
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6E6A]">
              Did you find a fantastic new $10 student lunch deal or an awesome sunset lookout? Save your note below or send it directly via email or GitHub Issues so we can review and update the guide.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowReviewPanel(!showReviewPanel)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#EFF4F2] hover:bg-[#D4DDD9] text-[#1A2E2C] border border-[#D4DDD9] transition-colors shrink-0 self-start cursor-pointer"
          >
            <ClipboardList className="w-4 h-4 text-[#0A868C]" />
            <span>Review Submitted Notes ({feedbackLog.length})</span>
            {showReviewPanel ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {lastSubmitted ? (
          <div className="p-6 bg-[#E6F3F4] border border-[#0A868C]/30 rounded-2xl space-y-4">
            <div className="text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#0A868C] mx-auto" />
              <h3 className="text-base font-bold text-[#0A868C]">
                Note Saved! Choose how to send it to the site maintainer:
              </h3>
              <p className="text-xs text-[#475E5A] max-w-lg mx-auto leading-relaxed">
                Your submission is saved in this browser&apos;s Review Queue below. Because this site runs statically on GitHub Pages without a cloud database, use one of the direct delivery buttons below so the maintainer receives your feedback right away:
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              <a
                href={buildMailtoHref(lastSubmitted)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0A868C] hover:bg-[#076E73] text-white text-xs font-bold transition-colors shadow-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send via Email ({OWNER_EMAIL})</span>
              </a>

              <a
                href={buildGithubIssueHref(lastSubmitted)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0666A7] hover:bg-[#05548A] text-white text-xs font-bold transition-colors shadow-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Submit on GitHub Issues</span>
              </a>

              <button
                type="button"
                onClick={() => handleCopyEntry(lastSubmitted)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-[#EFF4F2] text-[#1A2E2C] border border-[#D4DDD9] text-xs font-semibold transition-colors cursor-pointer"
              >
                {copiedSubmission ? <Check className="w-3.5 h-3.5 text-[#0A868C]" /> : <Copy className="w-3.5 h-3.5 text-[#5B6E6A]" />}
                <span>{copiedSubmission ? 'Copied Note' : 'Copy Text'}</span>
              </button>

              <button
                type="button"
                onClick={() => setLastSubmitted(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#5B6E6A] hover:text-[#1A2E2C] hover:bg-white/70 transition-colors cursor-pointer"
              >
                Write Another Note
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A2E2C]">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria or Ken"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4DDD9] text-xs sm:text-sm text-[#1A2E2C] focus:outline-none focus:border-[#0A868C] focus:ring-1 focus:ring-[#0A868C]/30"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A2E2C]">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. student@uni.edu.au"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4DDD9] text-xs sm:text-sm text-[#1A2E2C] focus:outline-none focus:border-[#0A868C] focus:ring-1 focus:ring-[#0A868C]/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A2E2C]">
                  University / College
                </label>
                <select
                  value={formInstitution}
                  onChange={(e) => setFormInstitution(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4DDD9] text-xs sm:text-sm text-[#1A2E2C] bg-white focus:outline-none focus:border-[#0A868C] cursor-pointer"
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
                <label className="text-xs font-bold text-[#1A2E2C]">
                  Topic / Message Type
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4DDD9] text-xs sm:text-sm text-[#1A2E2C] bg-white focus:outline-none focus:border-[#0A868C] cursor-pointer"
                >
                  <option value="Feedback & Suggestion">General Feedback & Suggestion</option>
                  <option value="Submit a Gem">Submit a Secret Spot or Student Deal</option>
                  <option value="Report Price Change">Report an Updated Price or Transit Change</option>
                  <option value="Customer Support">App Help & Support</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A2E2C]">
                Your Message / Details *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Share your thoughts, recommend an affordable bakery or ask a question..."
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4DDD9] text-xs sm:text-sm text-[#1A2E2C] focus:outline-none focus:border-[#0A868C] focus:ring-1 focus:ring-[#0A868C]/30 resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#0A868C] hover:bg-[#076E73] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Save &amp; Prepare Feedback</span>
            </button>
          </form>
        )}

        {/* Owner Review Queue & Delivery Channels */}
        {showReviewPanel && (
          <div className="pt-6 border-t border-[#EFF4F2] space-y-5">
            <div className="bg-[#F7F9F8] border border-[#D4DDD9] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#1A2E2C]">
                  How to Access &amp; Review Feedback
                </h3>
                <p className="text-xs text-[#475E5A] leading-relaxed max-w-2xl">
                  Submissions below are stored locally in <strong>this browser</strong>. Feedback sent from other students&apos; devices arrives via email (<strong>{OWNER_EMAIL}</strong>) or your repository&apos;s{' '}
                  <a
                    href="https://github.com/Eleesa31/Adelaide-Pocket-Guide/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0666A7] font-semibold underline"
                  >
                    GitHub Issues tab
                  </a>.
                </p>
              </div>
              {feedbackLog.length > 0 && (
                <button
                  type="button"
                  onClick={handleExportCsv}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#EFF4F2] border border-[#D4DDD9] text-xs font-bold text-[#1A2E2C] shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#0A868C]" />
                  <span>Export CSV</span>
                </button>
              )}
            </div>

            {feedbackLog.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: `All (${feedbackLog.length})` },
                  { id: 'new', label: `New (${feedbackLog.filter((i) => i.status === 'new').length})` },
                  { id: 'reviewed', label: `Reviewed (${feedbackLog.filter((i) => i.status === 'reviewed').length})` },
                  { id: 'added', label: `Added to Guide (${feedbackLog.filter((i) => i.status === 'added').length})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setStatusFilter(tab.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      statusFilter === tab.id
                        ? 'bg-[#0A868C] text-white'
                        : 'bg-[#EFF4F2] text-[#475E5A] hover:bg-[#D4DDD9]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            {filteredFeedback.length === 0 ? (
              <div className="p-6 text-center rounded-2xl border border-dashed border-[#D4DDD9] text-xs text-[#5B6E6A]">
                No feedback entries stored in this browser yet. Submit a test note above to see it appear here.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFeedback.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white border border-[#D4DDD9] rounded-2xl p-4 space-y-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-sm text-[#1A2E2C]">{entry.name}</span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#EFF4F2] text-[#475E5A] font-medium">
                            {entry.institution}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#FBF4F1] text-[#B57F6C] font-semibold">
                            {entry.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#5B6E6A] mt-0.5">
                          {new Date(entry.createdAt).toLocaleString()}
                          {entry.email ? ` • ${entry.email}` : ''}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={entry.status}
                          onChange={(e) => handleUpdateStatus(entry.id, e.target.value as FeedbackEntry['status'])}
                          className="px-2.5 py-1 rounded-lg border border-[#D4DDD9] text-xs font-semibold text-[#1A2E2C] bg-white cursor-pointer"
                          aria-label="Update feedback status"
                        >
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="added">Added to Guide</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="p-1.5 rounded-lg text-[#87A09B] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete feedback note"
                          aria-label="Delete feedback note"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#2D4543] leading-relaxed bg-[#F7F9F8] p-3 rounded-xl border border-[#EFF4F2]">
                      {entry.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
