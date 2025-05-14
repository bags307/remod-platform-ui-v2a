import React from 'react';
import { MoreVertical, ArrowUpRight, Users, Clock, Activity } from 'lucide-react';

interface Application {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'maintenance' | 'offline';
  users: number;
  lastDeployed: string;
  load: string;
  agents: number;
}

const applications: Application[] = [
  {
    id: '1',
    name: 'RemodlConstruct',
    description: 'Construction Project Management & Analysis',
    status: 'active',
    users: 1256,
    lastDeployed: '2h ago',
    load: '82%',
    agents: 12
  },
  {
    id: '2',
    name: 'RemodlLogistics',
    description: 'Supply Chain Optimization Platform',
    status: 'maintenance',
    users: 892,
    lastDeployed: '1d ago',
    load: '45%',
    agents: 8
  },
  {
    id: '3',
    name: 'RemodlPharma',
    description: 'Pharmaceutical Research Assistant',
    status: 'active',
    users: 445,
    lastDeployed: '5h ago',
    load: '67%',
    agents: 15
  }
];

export default function ApplicationList() {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-white">Applications</h2>
          <button className="text-sm text-slate-400 hover:text-white transition-colors">
            View All
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <input 
                type="text"
                placeholder="Search applications..."
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
            New Application
          </button>
        </div>
      </div>

      <div className="divide-y divide-slate-700/50">
        {applications.map((app) => (
          <div key={app.id} className="p-4 hover:bg-slate-700/20 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
                  {app.name}
                  <button className="text-slate-400 hover:text-white transition-colors">
                    <ArrowUpRight size={14} />
                  </button>
                </h3>
                <p className="text-xs text-slate-400">{app.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  app.status === 'active' 
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : app.status === 'maintenance'
                    ? 'bg-amber-500/10 text-amber-400'
                    : 'bg-rose-500/10 text-rose-400'
                }`}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
                <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors">
                  <MoreVertical size={14} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Users size={14} />
                <span className="text-xs">{app.users} users</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock size={14} />
                <span className="text-xs">Updated {app.lastDeployed}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Activity size={14} />
                <span className="text-xs">Load: {app.load}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Bot size={14} />
                <span className="text-xs">{app.agents} agents</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}