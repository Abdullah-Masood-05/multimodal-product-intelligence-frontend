"use client";

import React, { useState } from 'react';
import DropZone from '@/components/DropZone';
import ResultPanel from '@/components/ResultPanel';
import CampaignBuilder from '@/components/CampaignBuilder';
import CampaignResults from '@/components/CampaignResults';
import TwinSimulator from '@/components/TwinSimulator';
import TwinResults from '@/components/TwinResults';
import MarketResearcher from '@/components/MarketResearcher';
import MarketResults from '@/components/MarketResults';
import PricingStrategist from '@/components/PricingStrategist';
import PricingResults from '@/components/PricingResults';
import ThemeToggle from '@/components/ThemeToggle';

type Tab = 'analyze' | 'campaign' | 'twin' | 'market' | 'pricing';

const TABS: { id: Tab; label: string }[] = [
  { id: 'analyze', label: '🔍 Product Analysis' },
  { id: 'campaign', label: '📢 Ad Campaign' },
  { id: 'twin', label: '🤖 Twin Simulator' },
  { id: 'market', label: '📊 Market Researcher' },
  { id: 'pricing', label: '💰 Pricing Strategist' },
];

export default function Home() {
  const [tab, setTab] = useState<Tab>('analyze');

  // Analyze state
  const [analyzeResult, setAnalyzeResult] = useState<any>(null);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);

  // Campaign state
  const [campaignResult, setCampaignResult] = useState<any>(null);
  const [campaignError, setCampaignError] = useState<string | null>(null);

  // Twin state
  const [twinResult, setTwinResult] = useState<any>(null);
  const [twinError, setTwinError] = useState<string | null>(null);

  // Market state
  const [marketResult, setMarketResult] = useState<any>(null);
  const [marketError, setMarketError] = useState<string | null>(null);

  // Pricing state
  const [pricingResult, setPricingResult] = useState<any>(null);
  const [pricingError, setPricingError] = useState<string | null>(null);

  const handleAnalyzeResult = (data: any) => { setAnalyzeResult(data); setAnalyzeError(null); };
  const handleAnalyzeError = (msg: string) => { setAnalyzeError(msg); setAnalyzeResult(null); };

  const handleCampaignResult = (data: any) => { setCampaignResult(data); setCampaignError(null); };
  const handleCampaignError = (msg: string) => { setCampaignError(msg); setCampaignResult(null); };

  const handleTwinResult = (data: any) => { setTwinResult(data); setTwinError(null); };
  const handleTwinError = (msg: string) => { setTwinError(msg); setTwinResult(null); };

  const handleMarketResult = (data: any) => { setMarketResult(data); setMarketError(null); };
  const handleMarketError = (msg: string) => { setMarketError(msg); setMarketResult(null); };

  const handlePricingResult = (data: any) => { setPricingResult(data); setPricingError(null); };
  const handlePricingError = (msg: string) => { setPricingError(msg); setPricingResult(null); };

  const errorBox = "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 p-4 rounded-lg border border-red-100 dark:border-red-900 text-center text-sm";

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="relative text-center mb-8">
          <div className="absolute right-0 top-0">
            <ThemeToggle />
          </div>
          <img src="/logo.svg" alt="ProductIQ logo" className="w-20 h-20 mx-auto mb-3 rounded-2xl" />
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight">Product IQ</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">AI-powered multimodal product intelligence</p>
        </header>

        {/* Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-xl bg-gray-100 dark:bg-gray-900 p-1">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-all
                  ${tab === id
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Analyze Tab */}
        {tab === 'analyze' && (
          <section className="space-y-6">
            <DropZone onResult={handleAnalyzeResult} onError={handleAnalyzeError} />
            {analyzeError && <div className={errorBox}>{analyzeError}</div>}
            {analyzeResult && <ResultPanel data={analyzeResult} />}
          </section>
        )}

        {/* Campaign Tab */}
        {tab === 'campaign' && (
          <section className="space-y-6">
            <CampaignBuilder onResult={handleCampaignResult} onError={handleCampaignError} />
            {campaignError && <div className={errorBox}>{campaignError}</div>}
            {campaignResult && <CampaignResults data={campaignResult} />}
          </section>
        )}

        {/* Twin Simulator Tab */}
        {tab === 'twin' && (
          <section className="space-y-6">
            <TwinSimulator onResult={handleTwinResult} onError={handleTwinError} />
            {twinError && <div className={errorBox}>{twinError}</div>}
            {twinResult && <TwinResults data={twinResult} />}
          </section>
        )}

        {/* Market Researcher Tab */}
        {tab === 'market' && (
          <section className="space-y-6">
            <MarketResearcher onResult={handleMarketResult} onError={handleMarketError} />
            {marketError && <div className={errorBox}>{marketError}</div>}
            {marketResult && <MarketResults data={marketResult} />}
          </section>
        )}

        {/* Pricing Strategist Tab */}
        {tab === 'pricing' && (
          <section className="space-y-6">
            <PricingStrategist onResult={handlePricingResult} onError={handlePricingError} />
            {pricingError && <div className={errorBox}>{pricingError}</div>}
            {pricingResult && <PricingResults data={pricingResult} />}
          </section>
        )}
      </div>
    </main>
  );
}
