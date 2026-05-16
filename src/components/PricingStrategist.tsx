"use client";

import React, { useState } from 'react';
import { DollarSign, Loader2, Play } from 'lucide-react';
import { runPricingStrategy } from '../lib/api';

interface PricingStrategistProps {
  onResult: (data: any) => void;
  onError: (error: string) => void;
}

const inputClass = `w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm
  text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 placeholder-gray-400 dark:placeholder-gray-500
  focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none`;

export default function PricingStrategist({ onResult, onError }: PricingStrategistProps) {
  const [loading, setLoading] = useState(false);

  const [marketData, setMarketData] = useState('');
  const [twinData, setTwinData] = useState('');
  const [baseCost, setBaseCost] = useState('');

  const handleSubmit = async () => {
    if (!marketData.trim()) { onError('Please provide market competitor data.'); return; }
    if (!twinData.trim()) { onError('Please provide customer twin data.'); return; }

    setLoading(true);
    try {
      const data = await runPricingStrategy(marketData, twinData, baseCost);
      onResult(data);
    } catch (err: any) {
      onError(err.response?.data?.detail || 'Pricing strategy failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900 rounded-xl p-4 text-sm text-amber-800 dark:text-amber-300">
        <strong>Agent 4 (Pricing Strategist)</strong> requires inputs from Agent 2 (Market Researcher) and Agent 3 (Customer Psychologist). Paste their JSON outputs below to calculate the optimal price.
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Base Manufacturing/Acquisition Cost <span className="text-gray-400 dark:text-gray-500 font-normal">(Optional)</span></label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
          <input
            type="text"
            value={baseCost}
            onChange={(e) => setBaseCost(e.target.value)}
            placeholder="e.g. 250.00"
            className={`${inputClass} pl-9`}
            disabled={loading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Agent 2: Market Data</label>
          <textarea
            value={marketData}
            onChange={(e) => setMarketData(e.target.value)}
            placeholder='Paste Market Researcher JSON here...'
            rows={8}
            className={`${inputClass} font-mono resize-none`}
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Agent 3: Customer Twin Data</label>
          <textarea
            value={twinData}
            onChange={(e) => setTwinData(e.target.value)}
            placeholder='Paste Twin Simulator JSON here...'
            rows={8}
            className={`${inputClass} font-mono resize-none`}
            disabled={loading}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 dark:disabled:bg-gray-800 dark:disabled:text-gray-500 text-white font-semibold rounded-xl
          transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
      >
        {loading ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Calculating Optimal Price...</>
        ) : (
          <><Play className="w-5 h-5" /> Calculate Pricing Strategy</>
        )}
      </button>
    </div>
  );
}
