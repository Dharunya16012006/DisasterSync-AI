import React, { useState, useEffect, useRef } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, AgentState } from '../types';
import { AgentStatus } from './AgentStatus';
import ReactMarkdown from 'react-markdown';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "🚨 **DISASTERSYNC ONLINE**\n\nSystems initialized. Kaggle Datasets Loaded (911 Calls + Disaster Messages).\n\nWaiting for command. Type **'dashboard'** for full situation report or **ask about specific zip codes** (e.g., 'Analyze 19034').",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [agentState, setAgentState] = useState<AgentState>({ isThinking: false, currentAgent: 'IDLE' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || agentState.isThinking) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setAgentState({ isThinking: true, currentAgent: 'IDLE' });

    try {
      const response = await sendMessageToGemini(userMsg.text);
      const modelMsg: ChatMessage = {
        role: 'model',
        text: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setAgentState({ isThinking: false, currentAgent: 'IDLE' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-900 h-full relative">
      {/* Header */}
      <div className="h-14 border-b border-slate-700 flex items-center px-6 justify-between bg-slate-900/95 backdrop-blur z-10">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
          <h1 className="font-bold text-lg tracking-wider text-slate-100">
            DISASTERSYNC <span className="text-emergency-red">AI</span>
          </h1>
        </div>
        <div className="text-xs font-mono text-slate-500">
          MULTI-AGENT KAGGLE CAPSTONE
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[90%] md:max-w-[80%] p-4 rounded-lg shadow-lg ${
                msg.role === 'user' 
                  ? 'bg-blue-900/30 border border-blue-700/50 text-blue-100 rounded-br-none' 
                  : 'bg-slate-800/80 border border-slate-700 text-slate-200 rounded-bl-none font-mono text-sm'
              }`}
            >
              {msg.role === 'model' && (
                <div className="text-xs text-emergency-red mb-2 font-bold tracking-widest opacity-75">
                  SYSTEM RESPONSE
                </div>
              )}
              <div className="prose prose-invert prose-sm max-w-none">
                 <ReactMarkdown 
                    components={{
                      strong: ({node, ...props}) => <span className="text-emergency-red font-bold" {...props} />,
                      h1: ({node, ...props}) => <h1 className="text-lg font-bold border-b border-slate-600 pb-1 mb-2" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-4 space-y-1 my-2" {...props} />,
                      li: ({node, ...props}) => <li className="text-slate-300" {...props} />,
                      code: ({node, ...props}) => <code className="bg-slate-900 px-1 py-0.5 rounded text-yellow-500" {...props} />
                    }}
                 >
                   {msg.text}
                 </ReactMarkdown>
              </div>
              <div className="text-[10px] text-slate-500 mt-2 text-right">
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        {agentState.isThinking && (
           <div className="flex justify-start">
             <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-lg rounded-bl-none flex items-center space-x-3">
               <div className="w-2 h-2 bg-emergency-red rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-emergency-red rounded-full animate-bounce delay-100"></div>
               <div className="w-2 h-2 bg-emergency-red rounded-full animate-bounce delay-200"></div>
               <span className="text-xs font-mono text-slate-400 ml-2">AGENTS COORDINATING...</span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900 border-t border-slate-700">
        <AgentStatus agentState={agentState} />
        <div className="flex items-end gap-2 bg-slate-800 border border-slate-600 rounded-lg p-2 focus-within:ring-1 focus-within:ring-agent-blue transition-all">
          <span className="text-slate-500 font-mono py-2 pl-2">{'>'}</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter command (e.g. 'Identify critical zones', 'Status of 19034')..."
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none resize-none py-2 px-2 h-10 max-h-32"
            disabled={agentState.isThinking}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || agentState.isThinking}
            className="p-2 bg-agent-blue hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-md text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
        <div className="text-[10px] text-slate-600 mt-2 text-center font-mono">
          SECURE CONNECTION | KAGGLE DATASET BRIDGE ACTIVE
        </div>
      </div>
    </div>
  );
};