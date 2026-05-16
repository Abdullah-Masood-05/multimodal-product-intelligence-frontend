"use client";

import React from 'react';
import { DollarSign, BarChart2, ShieldAlert, Crosshair, PackageSearch } from 'lucide-react';

interface MarketResultsProps {
  data: any;
}

export default function MarketResults({ data }: MarketResultsProps) {
  if (!data || !data.market_positioning) return null;

  const { market_positioning, competitor_analysis, insights, competitors_found } = data;

  return (
    <div className="space-y-6">

      {/* Top Level Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-100 dark:border-blue-900 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-4 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Market Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/70 dark:bg-gray-900/60 p-4 rounded-xl border border-blue-50 dark:border-blue-900/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold flex items-center gap-1 mb-1">
              <Crosshair className="w-3 h-3 text-blue-600 dark:text-blue-400" /> Positioning
            </p>
            <p className="text-xl font-extrabold text-gray-900 dark:text-gray-50">{market_positioning}</p>
          </div>
          <div className="bg-white/70 dark:bg-gray-900/60 p-4 rounded-xl border border-blue-50 dark:border-blue-900/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold flex items-center gap-1 mb-1">
              <DollarSign className="w-3 h-3 text-blue-600 dark:text-blue-400" /> Avg Market Price
            </p>
            <p className="text-xl font-extrabold text-gray-900 dark:text-gray-50">{insights.average_market_price}</p>
          </div>
          <div className="bg-white/70 dark:bg-gray-900/60 p-4 rounded-xl border border-blue-50 dark:border-blue-900/50 md:col-span-2">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold flex items-center gap-1 mb-1">
              <ShieldAlert className="w-3 h-3 text-blue-600 dark:text-blue-400" /> Price Competitiveness
            </p>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{insights.price_competitiveness}</p>
          </div>
        </div>

        <div className="mt-4 bg-white/50 dark:bg-gray-900/50 p-4 rounded-xl border border-blue-50 dark:border-blue-900/50">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-2">Market Demand Summary</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{insights.market_demand_summary}</p>
        </div>
      </div>

      {/* Competitors List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 px-1 flex items-center gap-2">
          <PackageSearch className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          Competitor Analysis ({competitors_found} found)
        </h3>

        {competitor_analysis && competitor_analysis.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {competitor_analysis.map((comp: any, idx: number) => (
              <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-md font-bold text-gray-900 dark:text-gray-100 flex-1 pr-2">{comp.competitor_name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    comp.threat_level.toLowerCase() === 'high' ? 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400' :
                    comp.threat_level.toLowerCase() === 'medium' ? 'bg-yellow-100 dark:bg-yellow-950/60 text-yellow-700 dark:text-yellow-400' :
                    'bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-400'
                  }`}>
                    {comp.threat_level} Threat
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" /> {comp.price_estimate}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">No direct competitors found in the vector database.</p>
        )}
      </div>

    </div>
  );
}
