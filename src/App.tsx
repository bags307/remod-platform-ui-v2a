import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AgentStudio from './components/AgentStudio';
import Login from './pages/Login';
import Applications from './pages/Applications';
import PKCECallback from './pages/PKCECallback';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import { supabase } from './lib/supabase';
import { Settings, Bell, Undo2, Redo2, History, Save, Clock, Code } from 'lucide-react';
import { useFlowStore, useAuthStore, useUIStore } from './stores';
import { format } from 'date-fns'; 

function App() {
  const navigate = useNavigate();
  const [showHistory, setShowHistory] = useState(false);
  const [showCodeLog, setShowCodeLog] = useState(false);
  const [showAutosave, setShowAutosave] = useState(false);
  const { canUndo, canRedo, undo, redo, history, autosave, toggleAutosave } = useFlowStore();
  const { user, isLoading, error: authError, setUser, setLoading, setError } = useAuthStore();
  const { sidebarOpen } = useUIStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate('/login');
      }
      
      // Handle auth callback errors
      const hash = window.location.hash;
      if (hash && hash.includes('error')) {
        const params = new URLSearchParams(hash.substring(1));
        const error = params.get('error_description');
        setError(error);
        navigate('/login');
      }
      
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<PKCECallback />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/applications/dashboard" element={
        <ProtectedRoute>
          <Applications />
        </ProtectedRoute>
      } />
      <Route path="/studio" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-slate-900 text-white flex flex-col">
            <header className="border-b border-slate-700/50 px-6 py-3 flex items-center justify-between backdrop-blur-md bg-slate-900/90 z-10">
              <div className="flex items-center gap-3">
                <img 
                  src="https://data.remodl.ai/storage/v1/object/public/public//remodl-white.png" 
                  alt="Remodl AI" 
                  className="h-8"
                />
                <div className="h-5 w-[1px] bg-slate-700/50"></div>
                <h1 className="text-xl font-medium">Agent Studio</h1>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={undo}
                    disabled={!canUndo}
                    className={`h-8 w-8 rounded-md flex items-center justify-center transition-colors ${
                      canUndo ? 'hover:bg-slate-800 text-slate-200' : 'text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <Undo2 size={16} />
                  </button>
                  <button 
                    onClick={redo}
                    disabled={!canRedo}
                    className={`h-8 w-8 rounded-md flex items-center justify-center transition-colors ${
                      canRedo ? 'hover:bg-slate-800 text-slate-200' : 'text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <Redo2 size={16} />
                  </button>
                  <div className="h-4 w-[1px] bg-slate-700/50"></div>
                  <button 
                    onClick={() => setShowHistory(true)}
                    className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-slate-800 text-slate-200 transition-colors"
                  >
                    <History size={16} />
                  </button>
                  <button 
                    onClick={() => setShowCodeLog(true)}
                    className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-slate-800 text-slate-200 transition-colors"
                  >
                    <Code size={16} />
                  </button>
                  <button 
                    onClick={() => setShowAutosave(!showAutosave)}
                    className={`h-8 px-3 rounded-md flex items-center gap-2 transition-colors ${
                      autosave ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'hover:bg-slate-800 text-slate-200'
                    }`}
                  >
                    <Clock size={14} />
                    <span className="text-xs font-medium">Autosave</span>
                  </button>
                </div>
                
                <button className="px-3 py-1.5 rounded-full text-sm font-medium bg-blue-600 hover:bg-blue-500 transition-colors">
                  Deploy Agent
                </button>
                
                <div className="flex items-center gap-3">
                  <button className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors">
                    <Bell size={18} />
                  </button>
                  <button className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors">
                    <Settings size={18} />
                  </button>
                  <div className="relative group">
                    <img 
                      src="https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" 
                      alt="User"
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-slate-700/50 cursor-pointer"
                    />
                    <div className="absolute right-0 top-full mt-2 w-48 py-1 bg-slate-800 rounded-lg shadow-xl border border-slate-700/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="px-3 py-2 border-b border-slate-700/50">
                        <p className="text-sm font-medium">Sarah Anderson</p>
                        <p className="text-xs text-slate-400">sarah@remodl.ai</p>
                      </div>
                      <button className="w-full text-left px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700/50">
                        Settings
                      </button>
                      <button className="w-full text-left px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700/50">
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            
            <main className="flex-1 flex">
              <AgentStudio />
            </main>

            {/* History Panel */}
            {showHistory && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-end z-50">
                <div className="w-96 h-full bg-slate-900 border-l border-slate-700/50 shadow-xl">
                  <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
                    <h2 className="text-lg font-medium flex items-center gap-2">
                      <History size={18} />
                      Revision History
                    </h2>
                    <button 
                      onClick={() => setShowHistory(false)}
                      className="h-8 w-8 rounded-full hover:bg-slate-800 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                  <div className="p-4 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto">
                    {history.map((entry, index) => (
                      <div 
                        key={index}
                        className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-200">
                            {entry.action}
                          </span>
                          <span className="text-xs text-slate-400">
                            {format(entry.timestamp, 'MMM d, h:mm a')}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{entry.description}</p>
                        <button className="mt-2 px-2 py-1 text-xs text-slate-300 hover:text-slate-200 hover:bg-slate-700/50 rounded transition-colors">
                          Restore this version
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Code Log Panel */}
            {showCodeLog && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-end z-50">
                <div className="w-[600px] h-full bg-slate-900 border-l border-slate-700/50 shadow-xl">
                  <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
                    <h2 className="text-lg font-medium flex items-center gap-2">
                      <Code size={18} />
                      Real-time Code Log
                    </h2>
                    <button 
                      onClick={() => setShowCodeLog(false)}
                      className="h-8 w-8 rounded-full hover:bg-slate-800 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                  <div className="p-4 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto font-mono text-sm">
                    <p className="text-slate-400">No code logs available</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;