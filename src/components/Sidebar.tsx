import React from 'react';
import { 
  CircuitBoard, 
  Database, 
  MessageSquare, 
  Cpu, 
  Zap, 
  BarChart, 
  ArrowDownToLine,
  Filter,
  Search,
  Code,
  Network,
  Bot,
  Play,
  Share2
} from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="h-full w-64 border-r border-slate-700/50 bg-slate-900 flex flex-col">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search components..." 
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-200"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2">
          <h2 className="flex items-center text-xs font-medium text-slate-400 uppercase tracking-wider">
            <Filter size={12} className="mr-1.5" />
            Components
          </h2>
        </div>
        
        <div className="px-3 py-2">
          <h3 className="text-xs font-medium text-slate-300 px-2 mb-1.5">Core</h3>
          <div className="space-y-1">
            {[
              { icon: <Play size={16} />, label: 'Start Node', count: 1 },
              { icon: <Bot size={16} />, label: 'Agent Types', count: 12 },
              { icon: <Cpu size={16} />, label: 'LLM Workers', count: 4 },
              { icon: <Network size={16} />, label: 'MCP Servers', count: 6 }
            ].map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-slate-800 transition-colors text-sm text-slate-200 group"
              >
                <div className="flex items-center">
                  <span className="h-6 w-6 rounded flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors">
                    {item.icon}
                  </span>
                  <span className="ml-2">{item.label}</span>
                </div>
                <span className="text-xs bg-slate-800 group-hover:bg-slate-700 px-1.5 py-0.5 rounded text-slate-400 transition-colors">
                  {item.count}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="px-3 py-2">
          <h3 className="text-xs font-medium text-slate-300 px-2 mb-1.5">Memory & Storage</h3>
          <div className="space-y-1">
            {[
              { icon: <Database size={16} />, label: 'Vector Stores', count: 5 },
              { icon: <Share2 size={16} />, label: 'Graph Memory', count: 3 },
              { icon: <MessageSquare size={16} />, label: 'Message Stores', count: 2 }
            ].map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-slate-800 transition-colors text-sm text-slate-200 group"
              >
                <div className="flex items-center">
                  <span className="h-6 w-6 rounded flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors">
                    {item.icon}
                  </span>
                  <span className="ml-2">{item.label}</span>
                </div>
                <span className="text-xs bg-slate-800 group-hover:bg-slate-700 px-1.5 py-0.5 rounded text-slate-400 transition-colors">
                  {item.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="px-3 py-2">
          <h3 className="text-xs font-medium text-slate-300 px-2 mb-1.5">Extensions</h3>
          <div className="space-y-1">
            {[
              { icon: <Zap size={16} />, label: 'Tools', count: 12 },
              { icon: <Code size={16} />, label: 'Function Calls', count: 7 },
              { icon: <BarChart size={16} />, label: 'Analytics', count: 4 }
            ].map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-slate-800 transition-colors text-sm text-slate-200 group"
              >
                <div className="flex items-center">
                  <span className="h-6 w-6 rounded flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors">
                    {item.icon}
                  </span>
                  <span className="ml-2">{item.label}</span>
                </div>
                <span className="text-xs bg-slate-800 group-hover:bg-slate-700 px-1.5 py-0.5 rounded text-slate-400 transition-colors">
                  {item.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-700/50">
        <button className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-sm text-slate-200 font-medium">
          <ArrowDownToLine size={16} />
          Import Template
        </button>
      </div>
    </div>
  );
};

export default Sidebar;