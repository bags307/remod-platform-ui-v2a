import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, User, LogOut, Building2, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  fullName?: string;
}

export default function UserDropdown({ isOpen, onClose, email, fullName }: UserDropdownProps) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
      return;
    }
    navigate('/login');
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <div className="absolute right-0 top-full mt-2 w-64 py-1 bg-slate-800 rounded-lg shadow-xl border border-slate-700/50 z-50">
        <div className="px-3 py-2 border-b border-slate-700/50">
          <p className="text-sm font-medium text-slate-200">{fullName || email.split('@')[0]}</p>
          <p className="text-xs text-slate-400">{email}</p>
        </div>
        
        <div className="py-1">
          <button className="w-full text-left px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700/50 flex items-center gap-2">
            <User size={14} />
            Account Settings
          </button>
          <button className="w-full text-left px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700/50 flex items-center gap-2">
            <Building2 size={14} />
            Organization
          </button>
          <button className="w-full text-left px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700/50 flex items-center gap-2">
            <Bell size={14} />
            Notifications
          </button>
          <button className="w-full text-left px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700/50 flex items-center gap-2">
            <Shield size={14} />
            Security
          </button>
          <button className="w-full text-left px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700/50 flex items-center gap-2">
            <Settings size={14} />
            Preferences
          </button>
        </div>

        <div className="border-t border-slate-700/50 py-1">
          <button 
            onClick={handleSignOut}
            className="w-full text-left px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}