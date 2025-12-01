import React from 'react';
import { Dashboard } from './components/Dashboard';
import { ChatInterface } from './components/ChatInterface';

const App: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-200">
      <Dashboard />
      <ChatInterface />
    </div>
  );
};

export default App;