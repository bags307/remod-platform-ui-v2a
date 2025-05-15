import React from 'react';
import { Bell, MessageSquare, AlertCircle, Server, CreditCard, Package, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface Notification {
  id: string;
  type: 'system' | 'application' | 'user' | 'billing' | 'message';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'system',
    title: 'System Maintenance',
    description: 'Scheduled maintenance will begin in 2 hours.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false
  },
  {
    id: '2',
    type: 'application',
    title: 'Deployment Complete',
    description: 'ChatBot v2.0 has been successfully deployed.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    read: false
  },
  {
    id: '3',
    type: 'billing',
    title: 'Payment Processed',
    description: 'Your subscription payment was successful.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true
  },
  {
    id: '4',
    type: 'message',
    title: 'New Message',
    description: 'Sarah shared a new document with you.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    read: true
  }
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'system':
      return <Server size={14} className="text-blue-400" />;
    case 'application':
      return <Package size={14} className="text-emerald-400" />;
    case 'user':
      return <AlertCircle size={14} className="text-amber-400" />;
    case 'billing':
      return <CreditCard size={14} className="text-purple-400" />;
    case 'message':
      return <MessageSquare size={14} className="text-rose-400" />;
    default:
      return <Bell size={14} className="text-slate-400" />;
  }
};

export default function NotificationsDropdown({ isOpen, onClose }: NotificationsDropdownProps) {
  if (!isOpen) return null;

  const unreadCount = SAMPLE_NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <>
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <div className="absolute right-0 top-full mt-2 w-96 bg-slate-800 rounded-lg shadow-xl border border-slate-700/50 z-50">
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-medium text-white">Notifications</h2>
            {unreadCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400">Stay updated with platform activities</p>
        </div>

        <div className="divide-y divide-slate-700/50 max-h-[480px] overflow-y-auto">
          {SAMPLE_NOTIFICATIONS.map((notification) => (
            <div 
              key={notification.id}
              className={`p-4 hover:bg-slate-700/20 transition-colors ${
                !notification.read ? 'bg-slate-700/10' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white mb-1">{notification.title}</p>
                  <p className="text-sm text-slate-400 mb-2">{notification.description}</p>
                  <p className="text-xs text-slate-500">
                    {format(notification.timestamp, 'MMM d, h:mm a')}
                  </p>
                </div>
                {!notification.read && (
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-slate-700/50">
          <button className="w-full text-sm text-slate-300 hover:text-white py-2 rounded-lg hover:bg-slate-700/50 transition-colors flex items-center justify-center gap-2">
            View All Notifications
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </>
  );
}