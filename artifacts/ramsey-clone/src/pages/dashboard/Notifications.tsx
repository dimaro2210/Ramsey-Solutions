import { useState, useEffect, useCallback } from "react";
import { Bell, Clock, Trash2, Filter, TrendingUp, Info, Shield, CreditCard, ArrowDownToLine, AlertCircle } from "lucide-react";
import { db, Notification } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";

const typeStyles = {
  success: { bg: "bg-green-50", border: "border-green-100", color: "text-green-600", dot: "bg-green-500" },
  info: { bg: "bg-blue-50", border: "border-blue-100", color: "text-blue-600", dot: "bg-blue-500" },
  warning: { bg: "bg-amber-50", border: "border-amber-100", color: "text-amber-600", dot: "bg-amber-500" },
};

const iconMap: Record<string, any> = {
  TrendingUp, Info, Shield, CreditCard, ArrowDownToLine, AlertCircle, Bell
};

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function Notifications() {
  const { user: authUser } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const loadNotifications = useCallback(async () => {
    if (authUser?.id) {
      const notifs = await db.getNotifications(authUser.id);
      setNotifications(notifs);
    }
  }, [authUser?.id]);

  useEffect(() => {
    loadNotifications();
    window.addEventListener('db_updated', loadNotifications);
    return () => window.removeEventListener('db_updated', loadNotifications);
  }, [loadNotifications]);

  const filtered = filter === "unread" ? notifications.filter(n => !n.read) : notifications;
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = async () => {
    if (authUser?.id) await db.markAllNotificationsRead(authUser.id);
  };
  const clearAll = async () => {
    if (authUser?.id) await db.clearNotifications(authUser.id);
  };
  const toggleRead = async (id: string, currentStatus: boolean) => {
    await db.toggleNotificationRead(id, currentStatus);
  };

  return (
    <div className="max-w-3xl mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0073B9] flex items-center justify-center shadow-lg shadow-[#0073B9]/20 relative">
            <Bell className="w-6 h-6 text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#0073B9]">Notifications</h1>
            <p className="text-xs text-gray-400 font-medium">Stay updated with your portfolio activity</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={markAllRead} className="px-4 py-2 text-[10px] font-black text-[#0073B9] bg-[#0073B9]/5 rounded-xl hover:bg-[#0073B9]/10 transition-colors uppercase tracking-wider">
            Mark All Read
          </button>
          <button onClick={clearAll} className="px-4 py-2 text-[10px] font-black text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition-colors uppercase tracking-wider flex items-center gap-1.5">
            <Trash2 className="w-3 h-3" /> Clear
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filter === "all" ? "bg-[#0073B9] text-white shadow-lg" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filter === "unread" ? "bg-[#0073B9] text-white shadow-lg" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((notif) => {
          const style = typeStyles[notif.type] || typeStyles.info;
          const Icon = Bell; // Default to Bell since we don't store icons in DB yet
          return (
            <div
              key={notif.id}
              onClick={() => toggleRead(notif.id)}
              className={`relative p-5 rounded-[20px] border bg-white hover:shadow-lg transition-all cursor-pointer group ${
                !notif.read ? "border-[#0073B9]/20 shadow-md" : "border-gray-100"
              }`}
            >
              {/* Unread indicator */}
              {!notif.read && (
                <div className="absolute top-5 left-0 w-1 h-8 bg-[#0073B9] rounded-r-full"></div>
              )}

              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl ${style.bg} ${style.border} border flex-shrink-0 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${style.color}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className={`font-bold text-sm group-hover:text-[#0073B9] transition-colors ${!notif.read ? "text-[#0073B9]" : "text-gray-500"}`}>
                      {notif.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase flex-shrink-0">
                      <Clock className="w-3 h-3" />
                      {timeAgo(notif.createdAt)}
                    </div>
                  </div>
                  <p className={`text-xs leading-relaxed ${!notif.read ? "text-gray-600" : "text-gray-400"}`}>
                    {notif.message}
                  </p>
                </div>
              </div>

              {/* Type badge */}
              <div className="absolute top-5 right-5">
                {!notif.read && <div className={`w-2 h-2 rounded-full ${style.dot}`}></div>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6 border border-gray-100">
            <Bell className="w-10 h-10 text-gray-200" />
          </div>
          <h3 className="text-lg font-bold text-gray-300">All caught up!</h3>
          <p className="text-gray-400 text-sm mt-2">No {filter === "unread" ? "unread " : ""}notifications at the moment.</p>
        </div>
      )}
    </div>
  );
}

