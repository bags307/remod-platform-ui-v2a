import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MessageSquare, AlertCircle, Server, CreditCard, Package, ArrowRight, Info, Star, Trash2, Bookmark } from 'lucide-react';
import { format } from 'date-fns';

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

function NotificationsDropdown({ isOpen, onClose }: NotificationsDropdownProps) {
  if (!isOpen) return null;
  
  const navigate = useNavigate();
  const [hoveredNotification, setHoveredNotification] = React.useState<string | null>(null);
  const [hoveredInfo, setHoveredInfo] = React.useState<string | null>(null);
  const [notifications, setNotifications] = React.useState(SAMPLE_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleViewAll = useCallback(() => {
    onClose();
    navigate('/notifications');
  }, [onClose, navigate]);

  const handleAction = useCallback((id: string, action: 'star' | 'save' | 'dismiss') => {
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

  return (
    <>
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <div className="absolute right-0 top-full mt-2 w-96 bg-slate-800 rounded-lg shadow-xl border border-slate-700/50 z-50">
        <div className="px-4 py-3 border-b border-slate-700/50">
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

        <div className="divide-y divide-slate-700/50">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`hover:bg-slate-700/20 transition-colors relative group ${
                !notification.read ? 'bg-slate-700/10' : ''
              }`}
            >
              <div className="p-4">
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
                    <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleAction(notification.id, 'star')}
                        className={`h-7 w-7 rounded-md flex items-center justify-center ${
                          notification.starred 
                            ? 'text-amber-400 bg-amber-500/10' 
                            : 'text-slate-400 hover:text-amber-400 hover:bg-slate-600/50'
                        }`}
                      >
                        <Star size={14} className={notification.starred ? 'fill-current' : ''} />
                      </button>
                      <button
                        onClick={() => handleAction(notification.id, 'save')}
                        className={`h-7 w-7 rounded-md flex items-center justify-center ${
                          notification.saved
                            ? 'text-blue-400 bg-blue-500/10'
                            : 'text-slate-400 hover:text-blue-400 hover:bg-slate-600/50'
                        }`}
                      >
                        <Bookmark size={14} className={notification.saved ? 'fill-current' : ''} />
                      </button>
                      <button
                        onClick={() => handleAction(notification.id, 'dismiss')}
                        className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-slate-600/50"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                  )}
                  {notification.context && (
                    <div className="relative group/info">
                      <button 
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 rounded-full hover:bg-slate-600/50 flex items-center justify-center"
                        onMouseEnter={() => setHoveredInfo(notification.id)}
                        onMouseLeave={() => setHoveredInfo(null)}
                      >
                        <Info size={14} className="text-slate-400" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {hoveredInfo === notification.id && notification.context && (
                <div 
                  className="px-4 pb-4 -mt-2 relative before:absolute before:inset-x-4 before:top-0 before:h-4 before:bg-gradient-to-b before:from-slate-800/20 before:to-transparent"
                  style={{ animation: 'expand-down 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards', overflow: 'hidden' }}
                >
                  <div className="bg-slate-700/30 rounded-lg p-4 shadow-lg relative border border-slate-600/30">
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

        <div className="p-3 border-t border-slate-700/50">
          <button 
            onClick={handleViewAll}
            className="w-full text-sm text-slate-300 hover:text-white py-2 rounded-lg hover:bg-slate-700/50 transition-colors flex items-center justify-center gap-2"
          >
            View All Notifications
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </>
  );
}

export default React.memo(NotificationsDropdown);