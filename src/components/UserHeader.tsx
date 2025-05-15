import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { supabase } from '../lib/supabase';
import UserDropdown from './UserDropdown';
import { useAuthStore } from '../stores';
import Avatar from 'react-avatar';

interface UserProfile {
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export default function UserHeader() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Get user profile data from metadata
    const metadata = user.user_metadata || {};
    setProfile({
      email: user.email || '',
      full_name: metadata.full_name,
      avatar_url: metadata.avatar_url
    });
  }, [user]);

  if (!profile) return null;

  return (
    <div className="flex items-center gap-4">
      <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-800 relative">
        <Bell size={18} className="text-slate-400" />
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500" />
      </button>
      <div className="h-8 w-[1px] bg-slate-700/50" />
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-slate-200 cursor-pointer" onClick={() => setIsDropdownOpen(true)}>
            {profile.full_name || profile.email.split('@')[0]}
          </p>
          <p className="text-xs text-slate-400">{profile.email}</p>
        </div>
        <div className="relative">
          <button onClick={() => setIsDropdownOpen(true)}>
            {profile.avatar_url ? (
              <img 
                src={profile.avatar_url}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-slate-700/50"
              />
            ) : (
              <Avatar
                name={profile.full_name || profile.email}
                size="32"
                round={true}
                textSizeRatio={2}
              />
            )}
          </button>
          <UserDropdown
            isOpen={isDropdownOpen}
            onClose={() => setIsDropdownOpen(false)}
            email={profile.email}
            fullName={profile.full_name}
          />
        </div>
      </div>
    </div>
  );
}