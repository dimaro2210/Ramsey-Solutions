import { useState, useEffect, useRef } from "react";
import { Search, ArrowLeft, ChevronRight, BookOpen } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

interface SearchResult {
  id: string;
  topic: string;
  question: string;
  answer: string;
  link?: string;
  linkLabel?: string;
  category: string;
}

const POPULAR_TOPICS = [
  "How do I get out of debt?",
  "What are the 7 Baby Steps?",
  "How do I create a budget?",
  "How should I start investing?",
  "What insurance do I need?",
  "Should I use credit cards?",
];

export default function AskRamsey() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const doSearch = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setHasSearched(true);
    setSearchParams({ q: q.trim() });

    try {
      const apiBase = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(
        `${apiBase}/api/askramsey?q=${encodeURIComponent(q.trim())}`
      );
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setResults(data.results);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      doSearch(initialQuery);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(query);
  };

  const handleTopicClick = (topic: string) => {
    setQuery(topic);
    doSearch(topic);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001934] to-[#003561]">
      <div className="bg-[#001934]/80 backdrop-blur-sm sticky top-0 z-10 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Link
              to="/"
              className="text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-white font-bold text-xl">
                Ask Ramsey, Get Advice
              </h1>
              <p className="text-white/50 text-xs">
                Search for money advice built on Ramsey principles
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for money advice..."
              className="w-full py-3 pl-12 pr-14 rounded-full bg-white text-gray-800 text-base placeholder:text-gray-400 outline-none border-2 border-transparent focus:border-[#0073B9]"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0073B9] hover:bg-[#005a94] text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!hasSearched && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#FCD214] rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-[#003561]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              What can we help you with?
            </h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Search for advice on debt, budgeting, investing, insurance, and
              more — all based on Ramsey's proven principles.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
              {POPULAR_TOPICS.map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleTopicClick(topic)}
                  className="text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 text-sm transition-colors border border-white/10"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-16">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 bg-[#FCD214] rounded-full animate-bounce [animation-delay:0ms]"></div>
              <div className="w-3 h-3 bg-[#FCD214] rounded-full animate-bounce [animation-delay:150ms]"></div>
              <div className="w-3 h-3 bg-[#FCD214] rounded-full animate-bounce [animation-delay:300ms]"></div>
            </div>
          </div>
        )}

        {hasSearched && !loading && results.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/70 text-lg mb-2">
              No results found for "{searchParams.get("q")}"
            </p>
            <p className="text-white/50 text-sm mb-6">
              Try searching for topics like "debt", "budget", "investing", or
              "insurance"
            </p>
            <button
              onClick={() => {
                setQuery("");
                setHasSearched(false);
                setSearchParams({});
                inputRef.current?.focus();
              }}
              className="text-[#FCD214] hover:text-[#FCD214]/80 text-sm font-medium transition-colors"
            >
              Clear search
            </button>
          </div>
        )}

        {hasSearched && !loading && results.length > 0 && (
          <div className="space-y-6">
            <p className="text-white/50 text-sm">
              {results.length} result{results.length !== 1 ? "s" : ""} for "
              {searchParams.get("q")}"
            </p>
            {results.map((result) => (
              <div
                key={result.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="inline-block px-3 py-1 bg-[#0073B9]/30 text-[#6EC1E4] text-xs font-medium rounded-full">
                    {result.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {result.topic}
                </h3>
                <p className="text-white/50 text-sm mb-4 italic">
                  {result.question}
                </p>
                <div className="text-white/80 text-sm leading-relaxed whitespace-pre-line mb-4">
                  {result.answer}
                </div>
                {result.link && (
                  <Link
                    to={result.link}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0073B9] hover:bg-[#005a94] text-white text-sm font-semibold rounded-full transition-colors"
                  >
                    {result.linkLabel || "Learn More"}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
