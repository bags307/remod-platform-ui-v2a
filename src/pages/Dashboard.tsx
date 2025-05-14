import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  LayoutDashboard,
  Bot,
  Database,
  Settings,
  Users,
  BarChart3,
  LogOut,
  Menu,
  Bell,
  Search,
  Plus
} from 'lucide-react';

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
          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg">
            <Bot size={16} />
            Agents
          </button>
          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg">
            <Database size={16} />
            Data Sources
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

          <div className="flex items-center gap-4">
            <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-800 relative">
              <Bell size={18} className="text-slate-400" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500" />
            </button>
            <div className="h-8 w-[1px] bg-slate-700/50" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-200">Sarah Anderson</p>
                <p className="text-xs text-slate-400">sarah@remodl.ai</p>
              </div>
              <img 
                src="https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2"
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-slate-700/50"
              />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
              <p className="text-slate-400">Welcome back, here's what's happening</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
              <Plus size={16} />
              New Agent
            </button>
          </div>

          {/* Placeholder Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-colors"
              >
                <div className="h-32 flex items-center justify-center text-slate-500">
                  Content coming soon
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}