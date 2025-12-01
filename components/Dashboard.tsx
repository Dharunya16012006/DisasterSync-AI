import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MOCK_911_DATA } from '../mockData';

// Aggregate mock data for the chart
const dataMap = MOCK_911_DATA.reduce((acc, curr) => {
  const type = curr.title_p;
  acc[type] = (acc[type] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const chartData = Object.keys(dataMap).map(key => ({
  name: key,
  count: dataMap[key]
}));

const COLORS = {
  EMS: '#ef4444',     // Red
  Fire: '#f97316',    // Orange
  Traffic: '#eab308', // Yellow
};

export const Dashboard: React.FC = () => {
  return (
    <div className="h-full flex flex-col p-4 bg-slate-900 border-r border-slate-700 overflow-y-auto w-full md:w-1/3 lg:w-1/4 hidden md:flex">
      <h2 className="text-xl font-bold mb-4 text-emergency-red tracking-widest border-b border-slate-700 pb-2">
        LIVE OPS
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        <div className="bg-slate-800 p-3 rounded border border-slate-600">
          <div className="text-xs text-slate-400">ACTIVE CALLS</div>
          <div className="text-2xl font-mono font-bold text-white">{MOCK_911_DATA.length}</div>
        </div>
        <div className="bg-slate-800 p-3 rounded border border-slate-600">
          <div className="text-xs text-slate-400">CITIZEN RPTS</div>
          <div className="text-2xl font-mono font-bold text-blue-400">5</div>
        </div>
        <div className="bg-slate-800 p-3 rounded border border-slate-600">
          <div className="text-xs text-slate-400">CRITICAL ZIP</div>
          <div className="text-xl font-mono font-bold text-red-500 animate-pulse">19034</div>
        </div>
        <div className="bg-slate-800 p-3 rounded border border-slate-600">
          <div className="text-xs text-slate-400">UNITS AVAIL</div>
          <div className="text-xl font-mono font-bold text-green-500">4/12</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-slate-800 p-2 rounded border border-slate-600 mb-6 h-48">
        <h3 className="text-xs font-mono text-slate-400 mb-2">INCIDENT TYPE DISTRIBUTION</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 10}} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{backgroundColor: '#1e293b', border: '1px solid #475569'}}
              itemStyle={{color: '#fff'}}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#8884d8'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Live Feed List */}
      <div className="flex-1 overflow-hidden flex flex-col">
         <h3 className="text-xs font-mono text-slate-400 mb-2">INCOMING DATA STREAM</h3>
         <div className="flex-1 overflow-y-auto space-y-2 pr-1 font-mono text-xs">
            {MOCK_911_DATA.map((call, idx) => (
              <div key={idx} className="bg-slate-800/50 p-2 border-l-2 border-slate-600 hover:border-emergency-red transition-colors cursor-default">
                <div className="flex justify-between text-slate-500">
                  <span>{call.timeStamp.split(' ')[1]}</span>
                  <span className={call.title_p === 'EMS' ? 'text-red-400' : 'text-yellow-400'}>{call.title_p}</span>
                </div>
                <div className="text-slate-300 truncate">{call.title}</div>
                <div className="text-slate-500">{call.zip}</div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};