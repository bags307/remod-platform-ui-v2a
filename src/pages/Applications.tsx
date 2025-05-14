import React from 'react';
import { Plus, Search, Filter, ArrowDownToLine, Grid2X2, List, Bot, Users, Activity, Server, Database, Code, Zap, Shield } from 'lucide-react';
import ApplicationList from '../components/ApplicationList';
import UserHeader from '../components/UserHeader';

export default function Applications() {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('list');
  const [selectedPeriod, setSelectedPeriod] = React.useState<'24h' | '7d' | '30d'>('7d');
  
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-900">
      {/* Header */}
      <header className="h-16 border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-lg font-medium text-white">Applications</h1>
            <p className="text-sm text-slate-400">Manage your platform applications</p>
          </div>
          <div className="h-5 w-[1px] bg-slate-700/50" />
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search applications..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <UserHeader />
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Dashboard Overview */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              { label: 'Total Applications', value: '24', icon: Bot, change: '+3', trend: 'up' },
              { label: 'Active Users', value: '1.2k', icon: Users, change: '+89', trend: 'up' },
              { label: 'System Load', value: '76%', icon: Server, change: '-2%', trend: 'down' },
              { label: 'Memory Usage', value: '82%', icon: Database, change: '+5%', trend: 'up' }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                    <stat.icon size={20} className="text-slate-300" />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    stat.trend === 'up' 
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-1">{stat.value}</h3>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* System Health */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                <Shield size={16} className="text-slate-400" />
                System Health
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'API Gateway', status: 'Operational', latency: '45ms' },
                  { name: 'Database Cluster', status: 'Operational', latency: '12ms' },
                  { name: 'Memory Store', status: 'Degraded', latency: '156ms' }
                ].map((service, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${
                        service.status === 'Operational' ? 'bg-emerald-400' : 'bg-amber-400'
                      }`} />
                      <span className="text-sm text-slate-200">{service.name}</span>
                    </div>
                    <span className="text-xs text-slate-400">{service.latency}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                <Activity size={16} className="text-slate-400" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  { action: 'New application deployed', time: '2 minutes ago' },
                  { action: 'Database backup completed', time: '15 minutes ago' },
                  { action: 'System update installed', time: '1 hour ago' }
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
                    <span className="text-sm text-slate-200">{activity.action}</span>
                    <span className="text-xs text-slate-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resource Usage */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                <Zap size={16} className="text-slate-400" />
                Resource Usage
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'CPU', usage: 76, color: 'bg-blue-500' },
                  { name: 'Memory', usage: 82, color: 'bg-purple-500' },
                  { name: 'Storage', usage: 45, color: 'bg-emerald-500' }
                ].map((resource, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-200">{resource.name}</span>
                      <span className="text-slate-400">{resource.usage}%</span>
                    </div>
                    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${resource.color} rounded-full`}
                        style={{ width: `${resource.usage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm transition-colors">
              <Filter size={16} />
              Filters
            </button>
            <div className="flex items-center bg-slate-800 rounded-lg p-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${
                  viewMode === 'grid' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Grid2X2 size={16} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${
                  viewMode === 'list' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors">
              <ArrowDownToLine size={16} />
              Import
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
              <Plus size={16} />
              New Application
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <ApplicationList />
        </div>
      </main>
    </div>
  );
}