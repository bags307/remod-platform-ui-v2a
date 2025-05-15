import React from 'react';
import { useEffect, useState } from 'react';
import { MoreVertical, ArrowUpRight, Users, Clock, Activity, Bot, UserCheck } from 'lucide-react';
import Avatar from 'react-avatar';
import { supabase } from '../lib/supabase';
import ApplicationCard from './ApplicationCard';

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

export default function ApplicationList({ viewMode }: ApplicationListProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data, error } = await supabase
          .from('applications')
          .select('*')
          .order('name');

        if (error) throw error;
        setApplications(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch applications');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

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

      {isLoading ? (
        <div className="p-8 text-center">
          <div className="h-8 w-8 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-400">Loading applications...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-sm text-slate-400">No applications found</p>
        </div>
      ) : (
        viewMode === 'list' ? (
          <div className="divide-y divide-slate-700/50">
          {applications.map((app) => (
          <div key={app.id} className="p-4 hover:bg-slate-700/20 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
                  {app.icon_url ? (
                    <img src={app.icon_url} alt={app.name} className="w-5 h-5 rounded" />
                  ) : (
                    <Avatar
                      name={app.name}
                      size="20"
                      round={true}
                      textSizeRatio={2}
                    />
                  )}
                  {app.name}
                  <button className="text-slate-400 hover:text-white transition-colors">
                    <ArrowUpRight size={14} />
                  </button>
                </h3>
                <p className="text-xs text-slate-400 mb-1">{app.description}</p>
                <p className="text-xs text-slate-500">{app.url}</p>
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

            <div className="grid grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Users size={14} />
                <span className="text-xs">{app.total_users.toLocaleString()} total users</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <UserCheck size={14} />
                <span className="text-xs">{app.count_active_users.toLocaleString()} active</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock size={14} />
                <span className="text-xs">v{app.version}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Activity size={14} />
                <span className="text-xs">{app.type}</span>
              </div>
            </div>
          </div>
          ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
            {applications.map((app) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        )
      )}
    </div>
  );
}