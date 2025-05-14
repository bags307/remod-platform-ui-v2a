import React from 'react';
import { Plus, Search, Filter, ArrowDownToLine, Grid2X2, List } from 'lucide-react';
import ApplicationList from '../components/ApplicationList';
import UserHeader from '../components/UserHeader';

export default function Applications() {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('list');
  
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-900">
      {/* Header */}
      <header className="h-16 border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-medium text-white">Applications</h1>
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