import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  LayoutDashboard, Bot, Database, Settings, Users,
  BarChart3, LogOut, Menu, Search, Plus,
  Building2, Boxes, Activity, Shield, Server, ArrowUpRight
} from 'lucide-react';
import ApplicationList from '../components/ApplicationList';
import UserHeader from '../components/UserHeader';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
      return;
    }
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-700/50 bg-slate-900/95 backdrop-blur-sm">
        <div className="h-16 px-4 border-b border-slate-700/50 flex items-center">
          <img 
            src="https://data.remodl.ai/storage/v1/object/public/public//remodl-white.png" 
            alt="Remodl AI" 
            className="h-8"
          />
        </div>
        
        <nav className="p-4 space-y-1">
          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg">
            <LayoutDashboard size={16} />
            Dashboard
          </button>
          <button 
            onClick={() => navigate('/applications/dashboard')}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg"
          >
            <Building2 size={16} />
            Applications
          </button>
          <button 
            onClick={() => navigate('/studio')}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg"
          >
            <Bot size={16} />
            Agent Studio
          </button>
          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg">
            <Users size={16} />
            Team
          </button>
          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg">
            <BarChart3 size={16} />
            Analytics
          </button>
          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg">
            <Settings size={16} />
            Settings
          </button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-sm flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button className="lg:hidden h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-800">
              <Menu size={20} className="text-slate-400" />
            </button>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <UserHeader />
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-white">Platform Overview</h1>
              <p className="text-slate-400">Monitor and manage your entire platform</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors">
                <Shield size={16} />
                Security Audit
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
                <Server size={16} />
                System Status
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Applications', value: '24', icon: Boxes, change: '+3 this month', positive: true },
              { label: 'Active Organizations', value: '156', icon: Building2, change: '+12 this week', positive: true },
              { label: 'Total Users', value: '1,234', icon: Users, change: '+89 this month', positive: true },
              { label: 'System Load', value: '76%', icon: Activity, change: '-2% from yesterday', positive: false }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                    <stat.icon size={20} className="text-slate-300" />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    stat.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-1">{stat.value}</h3>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
          
          {/* Management Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ApplicationList />
            
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-white">System Health</h2>
                <button className="text-sm text-slate-400 hover:text-white transition-colors">View Details</button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'API Gateway', status: 'Operational', latency: '45ms', uptime: '99.9%' },
                  { name: 'Database Cluster', status: 'Operational', latency: '12ms', uptime: '100%' },
                  { name: 'MCP Servers', status: 'Degraded', latency: '156ms', uptime: '98.5%' }
                ].map((service, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 border border-slate-700/50">
                    <div>
                      <h3 className="text-sm font-medium text-white mb-1">{service.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        service.status === 'Operational' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {service.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-slate-300">{service.latency}</p>
                        <p className="text-xs text-slate-500">Latency</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-300">{service.uptime}</p>
                        <p className="text-xs text-slate-500">Uptime</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}