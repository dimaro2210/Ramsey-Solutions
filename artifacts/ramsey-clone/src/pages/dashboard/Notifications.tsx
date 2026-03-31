import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  TrendingUp,
  TrendingDown,
  ArrowDownToLine,
  ArrowUpFromLine,
  Shield,
  Gift,
  Newspaper,
  CheckCheck,
  Trash2,
} from "lucide-react";

interface Notification {
  id: string;
  type: "trade" | "deposit" | "withdraw" | "security" | "promo" | "news" | "price";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: "n1", type: "trade", title: "Buy Order Completed", message: "Your buy order for 0.05 BTC at $67,432.18 has been filled.", time: "10 minutes ago", read: false },
  { id: "n2", type: "price", title: "Price Alert: Bitcoin", message: "BTC has risen above $67,000. Current price: $67,432.18", time: "25 minutes ago", read: false },
  { id: "n3", type: "deposit", title: "Deposit Confirmed", message: "Your bank transfer of $5,000.00 has been credited to your account.", time: "1 hour ago", read: false },
  { id: "n4", type: "security", title: "New Login Detected", message: "A new login was detected from Chrome on Windows. If this wasn't you, please secure your account.", time: "2 hours ago", read: false },
  { id: "n5", type: "news", title: "Market Update", message: "S&P 500 hits new all-time high as tech stocks rally. Read the full analysis.", time: "3 hours ago", read: true },
  { id: "n6", type: "trade", title: "Sell Order Completed", message: "Your sell order for 2.0 ETH at $3,521.44 has been filled. Total: $7,042.88", time: "5 hours ago", read: true },
  { id: "n7", type: "promo", title: "Refer & Earn", message: "Invite friends and earn $50 for each referral who opens an account and deposits.", time: "1 day ago", read: true },
  { id: "n8", type: "withdraw", title: "Withdrawal Processed", message: "Your withdrawal of $2,500.00 to bank account ending in 4521 has been processed.", time: "1 day ago", read: true },
  { id: "n9", type: "price", title: "Price Alert: NVIDIA", message: "NVDA has risen 2.6% today. Current price: $875.28", time: "2 days ago", read: true },
  { id: "n10", type: "security", title: "Password Changed", message: "Your account password was successfully changed.", time: "3 days ago", read: true },
];

const iconMap: Record<string, { icon: typeof Bell; bg: string; color: string }> = {
  trade: { icon: TrendingUp, bg: "bg-green-50", color: "text-green-500" },
  deposit: { icon: ArrowDownToLine, bg: "bg-blue-50", color: "text-blue-500" },
  withdraw: { icon: ArrowUpFromLine, bg: "bg-orange-50", color: "text-orange-500" },
  security: { icon: Shield, bg: "bg-red-50", color: "text-red-500" },
  promo: { icon: Gift, bg: "bg-purple-50", color: "text-purple-500" },
  news: { icon: Newspaper, bg: "bg-gray-50", color: "text-gray-500" },
  price: { icon: TrendingDown, bg: "bg-yellow-50", color: "text-yellow-600" },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.05 } },
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filtered = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-3xl mx-auto pb-8">
      <motion.div {...fadeUp} className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#003561]">Notifications</h1>
          <p className="text-gray-500 text-sm mt-1">
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "You're all caught up"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#0073B9] hover:bg-blue-50 rounded-lg transition-colors">
              <CheckCheck className="w-3.5 h-3.5" /> Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button onClick={clearAll} className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 className="w-3.5 h-3.5" /> Clear all
            </button>
          )}
        </div>
      </motion.div>

      <motion.div {...fadeUp} className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === "all" ? "bg-[#003561] text-white" : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-200"}`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === "unread" ? "bg-[#003561] text-white" : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-200"}`}
        >
          Unread ({unreadCount})
        </button>
      </motion.div>

      {filtered.length === 0 ? (
        <motion.div {...fadeUp} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-sm p-12 text-center">
          <Bell className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No notifications</p>
          <p className="text-gray-400 text-sm mt-1">
            {filter === "unread" ? "All notifications have been read" : "You don't have any notifications yet"}
          </p>
        </motion.div>
      ) : (
        <motion.div variants={stagger} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden divide-y divide-gray-50">
          {filtered.map((n) => {
            const iconInfo = iconMap[n.type] || iconMap.news;
            const Icon = iconInfo.icon;
            return (
              <motion.div
                key={n.id}
                variants={fadeUp}
                onClick={() => markRead(n.id)}
                className={`px-5 py-4 flex items-start gap-3 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-transparent transition-all duration-200 cursor-pointer group ${!n.read ? "bg-blue-50/20" : ""}`}
              >
                <div className={`w-10 h-10 rounded-xl ${iconInfo.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Icon className={`w-5 h-5 ${iconInfo.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={`text-sm font-medium ${!n.read ? "text-[#003561]" : "text-gray-600"}`}>
                        {!n.read && <span className="inline-block w-2 h-2 bg-[#0073B9] rounded-full mr-2 relative -top-px" />}
                        {n.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">{n.message}</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-red-400 transition-all flex-shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-300 mt-1.5">{n.time}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}
