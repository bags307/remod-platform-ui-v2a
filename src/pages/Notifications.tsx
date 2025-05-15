import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MessageSquare, AlertCircle, Server, CreditCard, Package, LayoutDashboard, Building2, Bot, Users, BarChart3, Settings, LogOut, Filter, Search, Star, Bookmark, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import UserHeader from '../components/UserHeader';
import { supabase } from '../lib/supabase';

/**
 * Database Schema Requirements:
 * 
 * Table: notifications
 * - id: uuid PRIMARY KEY DEFAULT gen_random_uuid()
 * - user_id: uuid REFERENCES auth.users(id)
 * - type: text NOT NULL CHECK (type IN ('system', 'application', 'user', 'billing', 'message'))
 * - title: text NOT NULL
 * - description: text NOT NULL
 * - context: jsonb -- For extended notification data
 * - read: boolean DEFAULT false
 * - starred: boolean DEFAULT false
 * - saved: boolean DEFAULT false
 * - created_at: timestamptz DEFAULT now()
 * - updated_at: timestamptz DEFAULT now()
 * 
 * Indexes:
 * - (user_id, created_at DESC) -- For efficient user notification retrieval
 * - (user_id, type) -- For filtering by type
 * - (user_id, read) -- For unread counts
 * 
 * RLS Policies:
 * - Users can only view their own notifications
 * - System role can create notifications for any user
 * - Users can update read/starred/saved status of their own notifications
 * 
 * API Endpoints Needed:
 * - GET /api/notifications - List notifications with filtering/pagination
 * - POST /api/notifications/mark-read - Mark notifications as read
 * - POST /api/notifications/star - Star/unstar notifications
 * - POST /api/notifications/save - Save/unsave notifications
 * - DELETE /api/notifications - Delete notifications
 * 
 * WebSocket Subscriptions:
 * - Real-time notification delivery
 * - Status updates (read/unread, starred, saved)
 */

interface Notification {
  id: string;
  type: 'system' | 'application' | 'user' | 'billing' | 'message';
  title: string;
  description: string;
  context?: {
    title: string;
    description: string;
    metadata?: Record<string, string>;
  };
  timestamp: Date;
  read: boolean;
  starred?: boolean;
  saved?: boolean;
}

/**
 * Implementation Notes:
 * 
 * 1. Database Integration:
 *    - Use Supabase real-time subscriptions for instant updates
 *    - Implement optimistic updates for better UX
 *    - Cache notifications locally for offline access
 * 
 * 2. State Management:
 *    - Track notification states (read/unread, starred, saved)
 *    - Maintain notification preferences per user
 *    - Handle pagination and infinite scroll
 * 
 * 3. Performance Considerations:
 *    - Implement virtual scrolling for large notification lists
 *    - Batch update operations (mark multiple as read)
 *    - Debounce search and filter operations
 * 
 * 4. Security:
 *    - Enforce RLS policies at database level
 *    - Validate notification types and content
 *    - Rate limit notification creation
 */

const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'system',
    title: 'System Maintenance',
    description: 'Scheduled maintenance will begin in 2 hours.',
    context: {
      title: 'System Maintenance Details',
      description: 'Regular system maintenance to improve platform performance and stability. Expected downtime: 30 minutes.',
      metadata: {
        'Start Time': '2:00 AM UTC',
        'Duration': '30 minutes',
        'Impact': 'Minimal - Read-only mode',
        'Services Affected': 'Database, API Gateway'
      }
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    starred: true,
    saved: false
  },
  {
    id: '2',
    type: 'application',
    title: 'Deployment Complete',
    description: 'ChatBot v2.0 has been successfully deployed.',
    context: {
      title: 'Deployment Information',
      description: 'New features include improved response accuracy, multilingual support, and enhanced memory management.',
      metadata: {
        'Version': 'v2.0.0',
        'Environment': 'Production',
        'Deployment ID': 'dep_abc123',
        'Changes': '15 files modified'
      }
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: false,
    starred: false,
    saved: true
  },
  {
    id: '3',
    type: 'billing',
    title: 'Payment Processed',
    description: 'Your subscription payment was successful.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true
  },
  {
    id: '4',
    type: 'message',
    title: 'New Message',
    description: 'Sarah shared a new document with you.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    read: true
  }
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'system':
      return <Server size={16} className="text-blue-400" />;
    case 'application':
      return <Package size={16} className="text-emerald-400" />;
    case 'user':
      return <AlertCircle size={16} className="text-amber-400" />;
    case 'billing':
      return <CreditCard size={16} className="text-purple-400" />;
    case 'message':
      return <MessageSquare size={16} className="text-rose-400" />;
    default:
      return <Bell size={16} className="text-slate-400" />;
  }
};

export default function Notifications() {
  const navigate = useNavigate();
  const [expandedNotification, setExpandedNotification] = React.useState<string | null>(null);
  const [selectedType, setSelectedType] = React.useState<string>('all');
  const [notifications, setNotifications] = React.useState(NOTIFICATIONS);

  const handleAction = React.useCallback((id: string, action: 'star' | 'save' | 'dismiss') => {
    setNotifications(prev => prev.map(notification => {
      if (notification.id === id) {
        switch (action) {
          case 'star':
            return { ...notification, starred: !notification.starred };
          case 'save':
            return { ...notification, saved: !notification.saved };
          case 'dismiss':
            return { ...notification, read: true };
        }
      }
      return notification;
    }));
  }, []);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
      return;
    }
    navigate('/');
  };

  const filteredNotifications = selectedType === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === selectedType);

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
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg"
          >
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

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-sm flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-lg font-medium text-white">Notifications</h1>
              <p className="text-sm text-slate-400">View and manage your notifications</p>
            </div>
          </div>
          <UserHeader />
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search notifications..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm transition-colors">
                <Filter size={16} />
                Filters
              </button>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="system">System</option>
                <option value="application">Application</option>
                <option value="billing">Billing</option>
                <option value="message">Messages</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl divide-y divide-slate-700/50">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`hover:bg-slate-700/20 transition-colors ${
                  !notification.read ? 'bg-slate-700/10' : ''
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div
                      className="flex-1 min-w-0 cursor-pointer relative"
                      onClick={() => setExpandedNotification(
                        expandedNotification === notification.id ? null : notification.id
                      )}
                    > 
                      <p className="text-sm font-medium text-white mb-1">{notification.title}</p>
                      <p className="text-sm text-slate-400 mb-2">{notification.description}</p>
                      <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction(notification.id, 'star');
                            }}
                            className={`h-7 w-7 rounded-md flex items-center justify-center ${
                              notification.starred 
                                ? 'text-amber-400 bg-amber-500/10' 
                                : 'text-slate-400 hover:text-amber-400 hover:bg-slate-600/50'
                            }`}
                          >
                            <Star size={14} className={notification.starred ? 'fill-current' : ''} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction(notification.id, 'save');
                            }}
                            className={`h-7 w-7 rounded-md flex items-center justify-center ${
                              notification.saved
                                ? 'text-blue-400 bg-blue-500/10'
                                : 'text-slate-400 hover:text-blue-400 hover:bg-slate-600/50'
                            }`}
                          >
                            <Bookmark size={14} className={notification.saved ? 'fill-current' : ''} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction(notification.id, 'dismiss');
                            }}
                            className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-slate-600/50"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          {format(notification.timestamp, 'MMM d, h:mm a')}
                        </p>
                        {!notification.read && (
                          <div className="absolute right-0 top-[42px] h-2 w-2 rounded-full bg-blue-500" />
                        )}
                    </div>
                  </div>
                </div>
                
                {expandedNotification === notification.id && notification.context && (
                  <div className="px-4 pb-4 animate-expand-down">
                    <div className="bg-slate-700/30 rounded-lg p-4 shadow-lg border border-slate-600/30">
                      <h4 className="text-sm font-medium text-white mb-2">{notification.context.title}</h4>
                      <p className="text-sm text-slate-400 mb-4">{notification.context.description}</p>
                      {notification.context.metadata && (
                        <div className="space-y-2">
                          {Object.entries(notification.context.metadata).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-xs">
                              <span className="text-slate-400">{key}</span>
                              <span className="text-slate-300 font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}