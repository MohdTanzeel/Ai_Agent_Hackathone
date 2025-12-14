"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Ensure your API Route at src/app/api/analyze/route.ts is set up!
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0e17] text-slate-300 font-sans flex flex-col items-center py-16 px-4">
      {/* Header Section */}
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-2">
          {/* Shield Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 text-cyan-500"
          >
            <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.352-.272-2.657-.759-3.88a.75.75 0 00-.722-.515 11.209 11.209 0 01-7.877-3.08zM12 4.343a9.713 9.713 0 00-6.108 2.697 11.25 11.25 0 016.108 13.648 11.25 11.25 0 016.108-13.648A9.713 9.713 0 0012 4.343z" clipRule="evenodd" />
          </svg>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-amber-500">
            SCOPESHIELD
          </h1>
        </div>
        <p className="text-lg md:text-xl text-slate-400">
          The Freelancer's Guardian • Instant scope analysis, risk assessment, and pricing
        </p>
      </header>

      {/* Main Card */}
      <div className="w-full max-w-3xl bg-[#111827]/80 p-8 rounded-3xl shadow-2xl border border-slate-800/50 relative overflow-hidden">
        {/* Top Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent blur-sm"></div>

        <label className="block text-sm font-bold text-cyan-500 mb-4 uppercase tracking-wider">
          CLIENT REQUIREMENT
        </label>

        <div className="relative">
          <textarea
            className="w-full h-48 bg-[#0d1117] border border-slate-700/50 rounded-xl p-5 text-slate-300 placeholder-slate-600 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all outline-none resize-none text-lg"
            placeholder="e.g., I want a clone of Uber for dog walking with real-time tracking, payments, and reviews..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {/* Grammarly-like Icon (Purely decorative based on image) */}
          <div className="absolute bottom-4 right-4">
             <div className="w-8 h-8 rounded-full bg-teal-900/30 border border-teal-500/50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-teal-400">
                  <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.75 6a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6.75a.75.75 0 01.75-.75zm10.5 0a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6.75a.75.75 0 01.75-.75zm-5.25 5.25a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75zm-9 5.25a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V17.25a.75.75 0 01.75-.75zm18 0a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V17.25a.75.75 0 01.75-.75zm-9 5.25a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75z" clipRule="evenodd" />
                  <path d="M12 9a.75.75 0 01.75.75V15a.75.75 0 01-1.5 0V9.75A.75.75 0 0112 9z" />
                </svg>
             </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center text-amber-600/80 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
              <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
            </svg>
            <span>Powered by AI Analysis</span>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !input.trim()}
            className={`px-8 py-3 rounded-xl font-bold text-lg tracking-wider transition-all flex items-center ${
              loading || !input.trim()
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-600 to-amber-600 hover:from-cyan-500 hover:to-amber-500 text-[#0a0e17] shadow-lg shadow-cyan-900/20"
            }`}
          >
            {loading ? "ANALYZING..." : "ANALYZE SCOPE"}
            {!loading && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-950/30 border border-red-500/30 text-red-400 rounded-xl text-center">
            {error}
          </div>
        )}
      </div>

      {/* Results Section - Displays the JSON from Kestra */}
      {result && (
        <div className="w-full max-w-3xl mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-[#111827]/80 border border-slate-800/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-amber-500"></div>
             <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400 mb-6">
               Analysis Results
             </h3>
             <div className="bg-[#0d1117] p-6 rounded-xl border border-slate-800/50 overflow-x-auto">
                <pre className="whitespace-pre-wrap text-sm text-cyan-300/80 font-mono">
                  {JSON.stringify(result, null, 2)}
                </pre>
             </div>
          </div>
        </div>
      )}
    </main>
  );
}