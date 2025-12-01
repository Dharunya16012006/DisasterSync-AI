import React from 'react';
import { AgentState } from '../types';

interface AgentStatusProps {
  agentState: AgentState;
}

export const AgentStatus: React.FC<AgentStatusProps> = ({ agentState }) => {
  const agents = [
    { id: 'EMS_ANALYZER', label: 'EMS ANALYZER', color: 'bg-red-500' },
    { id: 'CITIZEN_ANALYZER', label: 'CITIZEN ANALYZER', color: 'bg-blue-500' },
    { id: 'LOGISTICS_AGENT', label: 'LOGISTICS AGENT', color: 'bg-yellow-500' },
    { id: 'COMMUNICATION_AGENT', label: 'COMMS AGENT', color: 'bg-green-500' },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 mb-4 p-2 bg-slate-900 rounded-lg border border-slate-700">
      {agents.map((agent) => {
        const isActive = agentState.isThinking; // In a real deeper sim, we could toggle specific agents
        // For visual flair, we animate them all slightly when "thinking" or highlight specific ones based on text parsing in a more complex app
        
        return (
          <div key={agent.id} className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'animate-pulse ' + agent.color : 'bg-slate-700'}`}></div>
            <span className={`text-xs font-mono ${isActive ? 'text-white' : 'text-slate-500'}`}>{agent.label}</span>
          </div>
        );
      })}
    </div>
  );
};