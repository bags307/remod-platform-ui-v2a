import React from 'react';
import { MoreVertical, ArrowUpRight, Users, Clock, Activity, Bot } from 'lucide-react';
import Avatar from 'react-avatar';

interface Application {
  id: string;
  name: string;
  description: string;
  url: string;
  slug: string;
  icon_url: string | null;
  status: 'active' | 'maintenance' | 'offline';
  total_users: number;
  count_active_users: number;
  created_at: string;
  updated_at: string;
  version: string;
  type: string;
}

interface ApplicationCardProps {
  application: Application;
}

export default function ApplicationCard({ application: app }: ApplicationCardProps) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-700/20 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {app.icon_url ? (
            <img src={app.icon_url} alt={app.name} className="w-10 h-10 rounded-lg" />
          ) : (
            <Avatar
              name={app.name}
              size="40"
              round={false}
              textSizeRatio={2}
            />
          )}
          <div>
            <h3 className="text-base font-medium text-white mb-1 flex items-center gap-2">
              {app.name}
              <button className="text-slate-400 hover:text-white transition-colors">
                <ArrowUpRight size={14} />
              </button>
            </h3>
            <p className="text-sm text-slate-400">{app.url}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            app.status === 'active' 
              ? 'bg-emerald-500/10 text-emerald-400'
              : app.status === 'maintenance'
              ? 'bg-amber-500/10 text-amber-400'
              : 'bg-rose-500/10 text-rose-400'
          }`}>
            {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : 'Unknown'}
          </span>
          <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors">
            <MoreVertical size={14} />
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-300 mb-6">{app.description}</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-400">
            <Users size={14} />
            <span className="text-sm">{app.total_users.toLocaleString()} total users</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Clock size={14} />
            <span className="text-sm">v{app.version}</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-400">
            <Bot size={14} />
            <span className="text-sm">{app.count_active_users.toLocaleString()} active</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Activity size={14} />
            <span className="text-sm">{app.type}</span>
          </div>
        </div>
      </div>
    </div>
  );
}