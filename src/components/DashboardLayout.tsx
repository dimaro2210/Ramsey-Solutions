import { ReactNode, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { fetchLiveStocks, fetchMarketNews, type Asset, type NewsItem } from "@/data/marketData";
import {
  Bell,
  Home,
  ArrowDownToLine,
  ArrowUpFromLine,
  History,
  Settings,
  User,
  LogOut,
  PlusSquare,
  Menu,
  X,
  LineChart,
  Search,
  Activity,
  TrendingUp,
  Zap,
  Newspaper,
  ChevronRight,
  ChevronLeft,
  ShieldAlert,
  MessageCircle,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Live Trading", href: "/dashboard/live-trading", icon: LineChart },
  { label: "Deposit", href: "/dashboard/deposit", icon: ArrowDownToLine },
  { label: "Withdraw", href: "/dashboard/withdraw", icon: ArrowUpFromLine },
  { label: "History", href: "/dashboard/history", icon: History },
];


export default function DashboardLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [marketData, setMarketData] = useState<Asset[]>([]);

  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stocks = await fetchLiveStocks();
        setMarketData(stocks.slice(0, 5));
        
        const latestNews = await fetchMarketNews();
        setNews(latestNews);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[100dvh] bg-[#D9DEEC] flex items-center justify-center p-0 lg:p-6 font-sans">
      
      {/* Main Container */}
      <div className="w-full max-w-[1500px] h-full bg-white rounded-none lg:rounded-[40px] shadow-2xl flex overflow-hidden relative border border-gray-100">
        
        {/* Mobile Menu Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar - COMPACT OR EXPANDED ON MOBILE */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 bg-[#0073B9] text-white transition-all duration-300 transform
          lg:relative lg:translate-x-0 flex flex-col overflow-hidden
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          ${isMobileExpanded ? "w-64" : "w-20"} lg:w-20
        `}>
          {/* Logo Section */}
          <div className={`py-6 flex w-full transition-all ${isMobileExpanded ? "px-6 justify-start" : "justify-center"}`}>
            <Link to="/" className="group relative flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xl shadow-black/5 overflow-hidden group-hover:scale-110 transition-transform border border-gray-100 flex-shrink-0">
                <img 
                  src="https://www.google.com/s2/favicons?domain=ramseysolutions.com&sz=128" 
                  alt="Ramsey" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className={`font-black text-xl text-white transition-opacity duration-300 lg:hidden ${isMobileExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`}>Ramsey</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className={`flex-1 py-4 space-y-2 overflow-y-auto overflow-x-hidden w-full flex flex-col ${isMobileExpanded ? "px-4" : "px-2 items-center lg:items-center"}`}>
            {sidebarLinks.map((link) => {
              const isActive = location.pathname === link.href;
              const Icon = link.icon;
              
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  title={!isMobileExpanded ? link.label : undefined}
                  className={`
                    relative rounded-xl transition-all duration-200 group flex items-center
                    ${isMobileExpanded ? "p-4 gap-4 w-full" : "p-3.5 justify-center"}
                    ${isActive 
                      ? "bg-white/10 text-white" 
                      : "text-white/30 hover:bg-white/5 hover:text-white"
                    }
                  `}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon className={`transition-transform group-hover:scale-110 flex-shrink-0 ${isActive ? "text-white" : "text-white/30"} lg:w-5 lg:h-5 w-6 h-6`} />
                  <span className={`font-bold text-sm whitespace-nowrap transition-opacity duration-300 lg:hidden ${isMobileExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`}>{link.label}</span>
                  {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-[#FCD214]" />}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className={`py-6 flex flex-col w-full border-t border-white/5 ${isMobileExpanded ? "px-4 gap-2" : "items-center gap-3 lg:items-center"}`}>
            {/* Support / Live Chat Button */}
            <button
              onClick={() => {
                const api = (window as any).Tawk_API;
                if (api && typeof api.toggle === 'function') {
                  api.toggle();
                }
              }}
              title={!isMobileExpanded ? "Live Support" : undefined}
              className={`relative rounded-xl transition-all duration-200 group flex items-center text-white/30 hover:text-white hover:bg-white/5 ${isMobileExpanded ? "w-full p-4 gap-4" : "w-12 h-12 justify-center"}`}
            >
              <div className="relative flex-shrink-0">
                <MessageCircle className="lg:w-5 lg:h-5 w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0073B9] animate-pulse" />
              </div>
              <span className={`font-bold text-sm whitespace-nowrap transition-opacity duration-300 lg:hidden ${isMobileExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`}>Live Support</span>
            </button>

            <button 
              onClick={logout}
              title={!isMobileExpanded ? "Logout" : undefined}
              className={`rounded-xl text-white/30 hover:text-white hover:bg-white/5 transition-all flex items-center ${isMobileExpanded ? "w-full p-4 gap-4" : "w-12 h-12 justify-center"}`}
            >
              <LogOut className="lg:w-5 lg:h-5 w-6 h-6 flex-shrink-0" />
              <span className={`font-bold text-sm whitespace-nowrap transition-opacity duration-300 lg:hidden ${isMobileExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`}>Logout</span>
            </button>
            <button 
              onClick={() => setIsMobileExpanded(!isMobileExpanded)}
              className={`lg:hidden rounded-xl text-white/30 hover:text-white hover:bg-white/5 transition-all flex items-center ${isMobileExpanded ? "w-full p-4 gap-4 bg-white/5" : "w-12 h-12 justify-center"}`}
            >
              {isMobileExpanded ? <ChevronLeft className="w-6 h-6 flex-shrink-0" /> : <ChevronRight className="w-6 h-6 flex-shrink-0" />}
              <span className={`font-bold text-sm whitespace-nowrap transition-opacity duration-300 ${isMobileExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`}>Collapse Menu</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-white relative h-full overflow-hidden">
          
          {/* Header Bar */}
          <div className="h-20 px-8 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
            {/* Mobile Menu Toggle */}
            <button className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6 text-[#0073B9]" />
            </button>

            {/* Page Title */}
            <div className="flex-1 lg:flex-none flex items-center justify-center lg:justify-start">
              <h1 className="text-xl font-black text-[#0073B9]">Ramsey Solutions</h1>
            </div>

            {/* Center Spacer */}
            <div className="hidden lg:flex items-center flex-1 justify-center">
              {/* Search removed */}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
               {/* Notification Bell */}
               <Link to="/dashboard/notifications" className="relative p-2.5 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                  <Bell className="w-5 h-5 text-[#0073B9]" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[#E64B40] border-2 border-white rounded-full"></span>
               </Link>

               {/* Profile Picture — clickable */}
               <Link to="/dashboard/profile" className="w-10 h-10 rounded-full bg-[#0073B9] flex items-center justify-center overflow-hidden shadow-md hover:scale-105 transition-transform border-2 border-white">
                  {user?.profilePicture ? (
                    <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-bold text-sm">{user?.firstName?.[0]}</span>
                  )}
               </Link>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pb-24 lg:p-10 scroll-smooth bg-gray-50/20">
            {children}
          </div>
        </main>

        {/* Right Sidebar - Matching Reference Layout */}
        <aside className="hidden xl:flex w-[300px] flex-col bg-white border-l border-gray-100 h-full flex-shrink-0">

           {/* Top Half — Market Movers (no header) */}
           <div className="flex-1 flex flex-col min-h-0 border-b border-gray-100">
             <div className="flex-1 px-6 pt-6 pb-4 space-y-1 overflow-y-auto hide-scrollbar">
               {marketData.map((asset) => (
                 <div key={asset.symbol} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0 group cursor-pointer hover:bg-gray-50/50 -mx-2 px-2 rounded-xl transition-all">
                   <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                     {asset.icon && asset.icon.startsWith('http') ? (
                       <img src={asset.icon} alt={asset.symbol} className="w-6 h-6 object-contain" />
                     ) : (
                       <span className="font-black text-[#0073B9] text-xs">{asset.symbol[0]}</span>
                     )}
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-xs font-bold text-[#0073B9] truncate">{asset.name}</p>
                     <p className="text-[9px] text-gray-400 font-medium">
                       {asset.change >= 0 ? "Price Rising" : "Price Falling"}
                     </p>
                   </div>
                   <div className={`text-[10px] font-black px-2 py-1 rounded-lg ${asset.change >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                     {asset.change >= 0 ? '+' : ''}{asset.changePercent.toFixed(1)}%
                   </div>
                 </div>
               ))}
             </div>
           </div>

           {/* Bottom Half — Live News */}
           <div className="flex-1 flex flex-col min-h-0">
             <div className="px-6 pt-6 pb-3 flex items-center justify-between flex-shrink-0">
               <h3 className="text-xs font-black text-[#0073B9] flex items-center gap-2">
                 <Newspaper className="w-3.5 h-3.5 text-gray-400" />
                 Latest Headlines
               </h3>
               <div className="flex items-center gap-1.5">
                 <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                 <span className="text-[9px] font-bold text-green-500">LIVE</span>
               </div>
             </div>
             <div className="flex-1 px-6 pb-6 space-y-3 overflow-y-auto hide-scrollbar">
               {news.length > 0 ? news.map((n: NewsItem) => {
                 const diffMs = Date.now() - n.timestamp;
                 const diffMins = Math.floor(diffMs / 60000);
                 const timeAgoStr = diffMins < 1 ? 'Just now' : diffMins < 60 ? `${diffMins}m` : diffMins < 1440 ? `${Math.floor(diffMins/60)}h` : `${Math.floor(diffMins/1440)}d`;
                 return (
                   <a key={n.id} href={n.url} target="_blank" rel="noopener noreferrer" className="block group cursor-pointer">
                     <p className="text-[11px] font-medium text-[#0073B9] leading-snug group-hover:text-[#005a94] transition-colors">{n.title}</p>
                     <div className="flex items-center gap-1.5 mt-0.5">
                       <p className="text-[9px] text-gray-400 font-bold">{timeAgoStr} ago</p>
                       <span className="text-gray-200">•</span>
                       <p className="text-[9px] text-gray-400 font-bold">{n.source}</p>
                     </div>
                   </a>
                 );
               }) : [1,2,3].map((i) => (
                 <div key={i} className="animate-pulse">
                   <div className="h-3 bg-gray-100 rounded w-full mb-1"></div>
                   <div className="h-2 bg-gray-50 rounded w-1/3"></div>
                 </div>
               ))}
             </div>
           </div>
        </aside>

      </div>
    </div>
  );
}

