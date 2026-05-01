import { useState, useEffect } from "react";
import {
  Users, LineChart, ArrowDownToLine, Menu, X, Search,
  CheckSquare, XSquare, Eye, Clock, Plus, ArrowLeft,
  ChevronRight, ShieldAlert, DollarSign, TrendingUp,
  History, Wallet, Mail, Phone, User2, Calendar,
  BadgeCheck, Trash2, Timer, Settings, ArrowUpFromLine
} from "lucide-react";
import { db, User, PendingDeposit, Trade, PendingWithdrawal } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";

const getUserName = (u: User) => u.firstName ? `${u.firstName} ${u.lastName || ''}`.trim() : (u.email ? u.email.split('@')[0] : 'User');

const TOP_STOCKS = [
  "AAPL (Apple Inc.)", "MSFT (Microsoft)", "GOOGL (Alphabet)", "AMZN (Amazon)", "NVDA (NVIDIA)", "META (Meta Platforms)", "TSLA (Tesla)", "BRK.B (Berkshire Hathaway)", "UNH (UnitedHealth)", "JNJ (Johnson & Johnson)", "JPM (JPMorgan Chase)", "V (Visa)", "PG (Procter & Gamble)", "XOM (Exxon Mobil)", "HD (Home Depot)", "MA (Mastercard)", "CVX (Chevron)", "PEP (PepsiCo)", "ABBV (AbbVie)", "MRK (Merck)", "KO (Coca-Cola)", "AVGO (Broadcom)", "PFE (Pfizer)", "TMO (Thermo Fisher Scientific)", "COST (Costco)", "CSCO (Cisco)", "MCD (McDonald's)", "ABT (Abbott Laboratories)", "CRM (Salesforce)", "DHR (Danaher)", "ACN (Accenture)", "LIN (Linde)", "NKE (Nike)", "ADBE (Adobe)", "WMT (Walmart)", "TXN (Texas Instruments)", "VZ (Verizon)", "PM (Philip Morris)", "NEE (NextEra Energy)", "RTX (Raytheon Technologies)", "HON (Honeywell)", "INTC (Intel)", "QCOM (Qualcomm)", "AMD (Advanced Micro Devices)", "INTU (Intuit)", "IBM (International Business Machines)", "UNP (Union Pacific)", "LOW (Lowe's)", "CAT (Caterpillar)", "BA (Boeing)", "GS (Goldman Sachs)", "SPGI (S&P Global)", "ELV (Elevance Health)", "CVS (CVS Health)", "PLD (Prologis)", "BLK (BlackRock)", "MDT (Medtronic)", "DE (Deere & Company)", "AXP (American Express)", "SYK (Stryker)", "AMT (American Tower)", "ISRG (Intuitive Surgical)", "LMT (Lockheed Martin)", "GE (General Electric)", "T (AT&T)", "NOW (ServiceNow)", "MDLZ (Mondelez)", "CB (Chubb)", "ZTS (Zoetis)", "BKNG (Booking Holdings)", "ADI (Analog Devices)", "C (Citigroup)", "MO (Altria)", "GILD (Gilead Sciences)", "MMC (Marsh & McLennan)", "SO (Southern Company)", "VRTX (Vertex Pharmaceuticals)", "TJX (TJX Companies)", "REGN (Regeneron Pharmaceuticals)", "BSX (Boston Scientific)", "DUK (Duke Energy)", "PGR (Progressive)", "BDX (Becton Dickinson)", "EOG (EOG Resources)", "CME (CME Group)", "WM (Waste Management)", "NOC (Northrop Grumman)", "AON (Aon)", "CSX (CSX Corporation)", "SCHW (Charles Schwab)", "SLB (Schlumberger)", "MCO (Moody's)", "SNPS (Synopsys)", "CDNS (Cadence Design Systems)", "ORLY (O'Reilly Automotive)", "KLA (KLA Corporation)", "MAR (Marriott International)", "PANW (Palo Alto Networks)",
  "ATVI (Activision Blizzard)", "CHTR (Charter Communications)", "AEP (American Electric Power)", "SBUX (Starbucks)", "FIS (Fidelity National)", "EW (Edwards Lifesciences)", "ROP (Roper Technologies)", "ICE (Intercontinental Exchange)", "ILMN (Illumina)", "DXCM (DexCom)", "KDP (Keurig Dr Pepper)", "NXPI (NXP Semiconductors)", "MRNA (Moderna)", "MNST (Monster Beverage)", "PCAR (PACCAR)", "CTAS (Cintas)", "PAYX (Paychex)", "WBA (Walgreens Boots Alliance)", "ALGN (Align Technology)", "LRCX (Lam Research)", "KMB (Kimberly-Clark)", "EXC (Exelon)", "BIIB (Biogen)", "KMI (Kinder Morgan)", "O (Realty Income)", "VRSK (Verisk Analytics)", "AZO (AutoZone)", "VLO (Valero Energy)", "DLTR (Dollar Tree)", "AFL (Aflac)", "WMB (Williams Companies)", "MCHP (Microchip Technology)", "IDXX (IDEXX Laboratories)", "TRV (Travelers Companies)", "WFC (Wells Fargo)", "MS (Morgan Stanley)", "BAC (Bank of America)", "PYPL (PayPal)", "TGT (Target)", "F (Ford)", "GM (General Motors)", "NFLX (Netflix)", "DIS (Walt Disney)", "CMCSA (Comcast)", "TFC (Truist Financial)", "PNC (PNC Financial Services)", "COF (Capital One)", "UBER (Uber Technologies)", "LYFT (Lyft)", "SNOW (Snowflake)", "CRWD (CrowdStrike)", "PLTR (Palantir Technologies)", "ROKU (Roku)", "SQ (Block)", "SHOP (Shopify)", "ZM (Zoom)", "DASH (DoorDash)", "ABNB (Airbnb)"
];

// --- Admin Gate ---
function AdminGate({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Ramsey@2026") {
      setIsAuthenticated(true);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (isAuthenticated) return <>{children}</>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans text-gray-900">
      <div className="w-full max-w-md bg-white rounded-[24px] p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-[#0073B9]/5 -z-0"></div>

        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
            <img src="https://www.google.com/s2/favicons?domain=ramseysolutions.com&sz=128" alt="Ramsey" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-2xl font-black text-[#0073B9]">Admin Portal</h1>
          <p className="text-sm text-gray-500 font-medium mt-2">Restricted Access Area</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Admin Passcode</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              autoFocus
              placeholder="Enter passcode..."
              className={`w-full bg-gray-50 border ${error ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-[#0073B9]"} rounded-xl p-4 focus:outline-none focus:ring-2 font-bold transition-all`}
            />
            {error && <p className="text-red-500 text-xs font-bold mt-2">Invalid credentials. Access denied.</p>}
          </div>
          <button type="submit" className="w-full py-4 bg-[#0073B9] hover:bg-blue-700 text-white rounded-xl transition-all font-black shadow-lg shadow-[#0073B9]/20 hover:-translate-y-1">
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}

// --- Users Section ---
function UsersSection({ users }: { users: User[] }) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="font-sans text-gray-900">
      
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
           <h2 className="text-lg font-black text-[#0073B9] flex items-center gap-2">
             <Users className="w-5 h-5" /> Registered Users
           </h2>
           <span className="bg-[#0073B9]/10 text-[#0073B9] px-3 py-1 rounded-full text-xs font-bold">{users.length} Users</span>
        </div>
        <div className="divide-y divide-gray-50">
          {users.map(user => (
            <div 
              key={user.id} 
              onClick={() => setSelectedUser(user)}
              className="p-4 md:p-6 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0073B9] to-blue-400 p-0.5 shadow-sm">
                  <div className="w-full h-full bg-white rounded-full border-2 border-white overflow-hidden flex items-center justify-center">
                    {user.profilePicture ? (
                      <img src={user.profilePicture} alt={getUserName(user)} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-black text-[#0073B9]">{getUserName(user).charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-[#0073B9] transition-colors">{getUserName(user)}</h3>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-lg text-gray-900">${user.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                <p className="text-[10px] font-bold text-[#0073B9] uppercase tracking-wider">Buying Power</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Drawer */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex justify-end">
           <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setSelectedUser(null)} />
           <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col font-sans animate-in slide-in-from-right duration-300">
             
             {/* Drawer Header */}
             <div className="p-4 md:p-8 pb-4 md:pb-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
               <div className="flex items-center gap-4">
                 <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0073B9] to-blue-400 p-1 shadow-md">
                   <div className="w-full h-full bg-white rounded-full border-[3px] border-white overflow-hidden flex items-center justify-center">
                     {selectedUser.profilePicture ? (
                       <img src={selectedUser.profilePicture} alt={getUserName(selectedUser)} className="w-full h-full object-cover" />
                     ) : (
                       <span className="text-2xl font-black text-[#0073B9]">{getUserName(selectedUser).charAt(0).toUpperCase()}</span>
                     )}
                   </div>
                 </div>
                 <div>
                   <h3 className="font-black text-xl text-gray-900">{getUserName(selectedUser)}</h3>
                   <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-50 text-green-600 text-[10px] font-bold uppercase mt-1">
                     <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Active
                   </span>
                 </div>
               </div>
               <button onClick={() => setSelectedUser(null)} className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full transition-colors">
                 <X className="w-5 h-5" />
               </button>
             </div>

             <div className="p-4 md:p-8 flex-1 overflow-y-auto space-y-6 md:space-y-8 bg-white">
               
               {/* Financial Overview */}
               <div>
                 <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Financial Overview</h4>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                     <p className="text-xs text-gray-500 mb-1">Cash Balance</p>
                     <p className="font-black text-[#0073B9] text-xl">${selectedUser.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                   </div>
                   <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                     <p className="text-xs text-gray-500 mb-1">Crypto Assets</p>
                     <p className="font-black text-gray-900 text-lg">{selectedUser.cryptoBalance.btc} BTC</p>
                     <p className="font-bold text-gray-500 text-sm">{selectedUser.cryptoBalance.eth} ETH</p>
                   </div>
                 </div>
               </div>

               {/* Registration Information */}
               <div>
                 <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Registration Information</h4>
                 <div className="space-y-3">
                   <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
                     <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#0073B9]">
                       <Mail className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</p>
                       <p className="font-medium text-gray-900">{selectedUser.email}</p>
                     </div>
                   </div>
                   
                   <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
                     <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#0073B9]">
                       <Phone className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone Number</p>
                       <p className="font-medium text-gray-900">{selectedUser.phone || "Not provided"}</p>
                     </div>
                   </div>

                   <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
                     <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#0073B9]">
                       <User2 className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Account Type</p>
                       <p className="font-medium text-gray-900">{selectedUser.accountType || "Standard"}</p>
                     </div>
                   </div>
                   
                   <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
                     <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#0073B9]">
                       <Calendar className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date of Birth</p>
                       <p className="font-medium text-gray-900">{selectedUser.dob || "Not provided"}</p>
                     </div>
                   </div>

                   <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
                     <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#0073B9]">
                       <BadgeCheck className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Social Security (SSN)</p>
                       <p className="font-medium text-gray-900">{selectedUser.ssn || "Not provided"}</p>
                     </div>
                   </div>
                   
                   <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Residential Address</p>
                     <p className="font-medium text-gray-900 text-sm">{selectedUser.address || "Not provided"}</p>
                   </div>
                 </div>
               </div>

             </div>
           </div>
        </div>
      )}
    </div>
  );
}

// --- Trading Section ---
function TradingSection({ users }: { users: User[] }) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<"open" | "closed">("open");
  const [trades, setTrades] = useState<Trade[]>([]);
  const [tradeModal, setTradeModal] = useState(false);
  const [closeTradeModal, setCloseTradeModal] = useState<Trade | null>(null);
  
  // Place Trade Form State
  const [newTrade, setNewTrade] = useState<Partial<Trade>>({
    assetTicker: "AAPL",
    positionType: "LONG",
    strategy: "Day Trading",
    amountUsd: 1000,
    leverage: 10,
    durationMinutes: 60,
    minDispProfit: 0,
    maxDispProfit: 0,
    profitOverride: 0,
  });

  const loadTrades = async () => {
    if (selectedUser) {
      const userTrades = await db.getTrades(selectedUser.id);
      setTrades(userTrades);
    }
  };

  useEffect(() => {
    loadTrades();
    const interval = setInterval(loadTrades, 5000);
    return () => clearInterval(interval);
  }, [selectedUser]);

  const handleExecuteTrade = async () => {
    if (selectedUser) {
      let ticker = newTrade.assetTicker || "AAPL";
      if (ticker.includes(' ')) {
        ticker = ticker.split(' ')[0];
      }

      await db.placeTrade(selectedUser.id, {
        ...newTrade,
        assetTicker: ticker,
        entryPrice: 150 + Math.random() * 5,
      } as Trade);
      setTradeModal(false);
      await loadTrades();
    }
  };

  const handleSettleTrade = async (tradeId: string) => {
    const finalProfit = closeTradeModal?.profitOverride || (closeTradeModal?.amountUsd ? (closeTradeModal.amountUsd * 0.05) : 45); 
    await db.closeTrade(tradeId, finalProfit);
    setCloseTradeModal(null);
    await loadTrades();
  };

  const formatTime = (ms: number) => {
    const totalSecs = Math.max(0, Math.floor(ms / 1000));
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Calculate Expected Profit for Summary
  const calculateExpectedProfit = () => {
    if (newTrade.profitOverride && newTrade.profitOverride > 0) {
      return { label: "Fixed Profit", value: `$${newTrade.profitOverride.toFixed(2)}`, color: "text-green-600" };
    }
    if (newTrade.minDispProfit || newTrade.maxDispProfit) {
      return { label: "Estimated Range", value: `$${(newTrade.minDispProfit || 0).toFixed(2)} - $${(newTrade.maxDispProfit || 0).toFixed(2)}`, color: "text-[#0073B9]" };
    }
    const est = (newTrade.amountUsd || 0) * 0.05;
    return { label: "Estimated Return (5%)", value: `$${est.toFixed(2)}`, color: "text-gray-600" };
  };

  const profitSummary = calculateExpectedProfit();

  if (!selectedUser) {
    return (
      <div className="font-sans text-gray-900">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-[#0073B9]">Manage Trading Activity</h2>
          <p className="text-gray-500 font-medium">Select a user to view and manage their positions</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {users.map(u => (
            <button 
              key={u.id}
              onClick={() => setSelectedUser(u)}
              className="p-6 md:p-8 bg-white rounded-[24px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#0073B9]/20 transition-all text-left flex items-center justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#0073B9]/5 rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-full bg-[#0073B9]/10 flex items-center justify-center font-black text-[#0073B9] text-xl overflow-hidden border-2 border-white shadow-sm">
                  {u.profilePicture ? (
                    <img src={u.profilePicture} alt={getUserName(u)} className="w-full h-full object-cover" />
                  ) : (
                    getUserName(u).charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <p className="font-black text-gray-900 text-lg group-hover:text-[#0073B9] transition-colors">{getUserName(u)}</p>
                  <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-wider">User ID: {u.id.substring(0, 8)}...</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-[#0073B9] group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  const filteredTrades = trades.filter(t => t.status === activeTab);

  return (
    <div className="font-sans text-gray-900">
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
        <div className="flex items-center gap-4 md:gap-6">
          <button onClick={() => setSelectedUser(null)} className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full border border-gray-100 bg-white flex items-center justify-center text-gray-400 hover:text-[#0073B9] hover:border-[#0073B9]/30 transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
               <h2 className="text-xl md:text-2xl font-black text-gray-900">{getUserName(selectedUser)}</h2>
               <span className="px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-wider border border-green-100">Live Engine</span>
            </div>
            <p className="text-xs md:text-sm text-gray-500 font-medium mt-1">Viewing trade history and active positions</p>
          </div>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm w-full md:w-auto overflow-x-auto hide-scrollbar">
          <button 
            className={`flex-1 md:flex-none px-4 md:px-6 py-2.5 text-[10px] md:text-xs font-black uppercase tracking-wider rounded-lg md:rounded-xl transition-all whitespace-nowrap ${activeTab === 'open' ? 'bg-[#0073B9] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
            onClick={() => setActiveTab("open")}
          >
            Active Positions
          </button>
          <button 
            className={`flex-1 md:flex-none px-4 md:px-6 py-2.5 text-[10px] md:text-xs font-black uppercase tracking-wider rounded-lg md:rounded-xl transition-all whitespace-nowrap ${activeTab === 'closed' ? 'bg-[#0073B9] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
            onClick={() => setActiveTab("closed")}
          >
            History
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTrades.length === 0 ? (
          <div className="bg-white rounded-[24px] border border-gray-100 border-dashed p-16 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <LineChart className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-400 font-bold text-lg">No {activeTab} positions found</p>
            <p className="text-gray-300 text-sm mt-1">Execute a new trade to see it here</p>
          </div>
        ) : (
          filteredTrades.map(trade => (
            <div key={trade.id} className="bg-white rounded-[24px] border border-gray-100 p-4 md:p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex flex-col items-center justify-center font-black text-[10px] shadow-sm ${trade.positionType === 'LONG' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                    <TrendingUp className={`w-5 h-5 md:w-6 md:h-6 mb-1 ${trade.positionType === 'SHORT' ? 'rotate-180' : ''}`} />
                    {trade.positionType}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                       <p className="font-black text-lg md:text-xl text-gray-900">{trade.assetTicker}</p>
                       <span className="px-2 py-0.5 rounded bg-gray-50 text-gray-400 text-[10px] font-black border border-gray-100">{trade.leverage}x</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-bold mt-1">
                       <span>ENTRY: <span className="text-gray-600">${trade.entryPrice.toFixed(2)}</span></span>
                       <span className="text-gray-200">|</span>
                       <span className="hidden sm:inline">STRATEGY: <span className="text-gray-600">{trade.strategy}</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8 mt-2 md:mt-0 pt-3 md:pt-0 border-t border-gray-50 md:border-0">
                  <div className="text-left md:text-right">
                    <p className={`font-black text-xl md:text-2xl tracking-tight ${trade.status === 'open' ? 'text-green-500' : (trade.finalProfit! >= 0 ? 'text-green-500' : 'text-red-500')}`}>
                      {trade.status === 'open' ? '+$45.00' : `${trade.finalProfit! >= 0 ? '+' : '-'}$${Math.abs(trade.finalProfit!).toFixed(2)}`}
                    </p>
                    {trade.status === 'open' ? (
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-black uppercase tracking-wider mt-1 md:justify-end">
                        <Clock className="w-3 h-3" />
                        Expires: {formatTime(trade.expiresAt - Date.now())}
                      </div>
                    ) : (
                      <p className="text-[10px] text-gray-300 font-black uppercase tracking-wider mt-1">Closed at {new Date(trade.closedAt!).toLocaleTimeString()}</p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {trade.status === 'open' && (
                      <button 
                        onClick={() => setCloseTradeModal(trade)}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-red-100 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-sm group"
                      >
                        <X className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                      </button>
                    )}
                    <button 
                      onClick={async () => { if (confirm('Delete this trade record?')) { await db.deleteTrade(trade.id); await loadTrades(); } }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-gray-100 bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all flex items-center justify-center shadow-sm"
                    >
                      <History className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setTradeModal(true)}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0073B9] text-white shadow-2xl shadow-[#0073B9]/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group z-40"
      >
        <Plus className="w-8 h-8 md:w-10 md:h-10 group-hover:rotate-90 transition-transform" />
      </button>

      {/* Place Trade Modal */}
      {tradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 font-sans text-gray-900">
          <div className="bg-white rounded-[32px] p-6 md:p-10 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-start md:items-center mb-6 md:mb-8">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-gray-900">Execute New Trade</h3>
                <p className="text-xs md:text-sm text-gray-400 font-medium">Configuring market position for {getUserName(selectedUser)}</p>
              </div>
              <button onClick={() => setTradeModal(false)} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"><X className="w-5 h-5 md:w-6 md:h-6" /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Position Direction</label>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setNewTrade({ ...newTrade, positionType: 'LONG' })}
                    className={`flex-1 py-4 rounded-2xl border-2 font-black flex items-center justify-center gap-3 transition-all tracking-wider ${newTrade.positionType === 'LONG' ? 'border-green-500 bg-green-50 text-green-600 shadow-lg shadow-green-500/20 scale-[1.02]' : 'border-gray-100 bg-white text-gray-400 hover:border-green-200'}`}
                  >
                    <TrendingUp className="w-5 h-5" /> LONG
                  </button>
                  <button 
                    onClick={() => setNewTrade({ ...newTrade, positionType: 'SHORT' })}
                    className={`flex-1 py-4 rounded-2xl border-2 font-black flex items-center justify-center gap-3 transition-all tracking-wider ${newTrade.positionType === 'SHORT' ? 'border-red-500 bg-red-50 text-red-600 shadow-lg shadow-red-500/20 scale-[1.02]' : 'border-gray-100 bg-white text-gray-400 hover:border-red-200'}`}
                  >
                    <TrendingUp className="w-5 h-5 rotate-180" /> SHORT
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Asset Symbol</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#0073B9]">
                    <Search className="w-4 h-4" />
                  </div>
                  <input 
                    type="text"
                    list="stock-tickers"
                    value={newTrade.assetTicker}
                    placeholder="e.g. AAPL"
                    onChange={(e) => setNewTrade({ ...newTrade, assetTicker: e.target.value })}
                    className="w-full pl-16 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 font-black text-lg focus:bg-white focus:border-[#0073B9]/30 focus:ring-4 focus:ring-[#0073B9]/10 transition-all uppercase placeholder:text-gray-300"
                  />
                </div>
                <datalist id="stock-tickers">
                  {TOP_STOCKS.map(stock => (
                    <option key={stock} value={stock} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Strategy</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#0073B9]">
                    <LineChart className="w-4 h-4" />
                  </div>
                  <select 
                    value={newTrade.strategy}
                    onChange={(e) => setNewTrade({ ...newTrade, strategy: e.target.value })}
                    className="w-full pl-16 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 font-black text-lg focus:bg-white focus:border-[#0073B9]/30 focus:ring-4 focus:ring-[#0073B9]/10 transition-all appearance-none"
                  >
                    <option value="Simon Ree">Simon Ree</option>
                    <option value="Scalping">Scalping</option>
                    <option value="Swing">Swing</option>
                    <option value="Day Trading">Day Trading</option>
                    <option value="Position">Position</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Duration (Minutes)</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#0073B9]">
                    <Timer className="w-4 h-4" />
                  </div>
                  <input 
                    type="number"
                    min="1"
                    value={newTrade.durationMinutes}
                    onChange={(e) => setNewTrade({ ...newTrade, durationMinutes: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="w-full pl-16 pr-16 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 font-black text-lg focus:bg-white focus:border-[#0073B9]/30 focus:ring-4 focus:ring-[#0073B9]/10 transition-all" 
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">MIN</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Investment (USD)</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0073B9] rounded-xl flex items-center justify-center shadow-md shadow-[#0073B9]/30 text-white">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <input 
                    type="number" 
                    value={newTrade.amountUsd}
                    onChange={(e) => setNewTrade({ ...newTrade, amountUsd: parseFloat(e.target.value) })}
                    className="w-full pl-16 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-[#0073B9] font-black text-lg focus:bg-white focus:border-[#0073B9]/30 focus:ring-4 focus:ring-[#0073B9]/10 transition-all" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Leverage</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#0073B9]">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <input 
                    type="number" 
                    value={newTrade.leverage}
                    onChange={(e) => setNewTrade({ ...newTrade, leverage: parseInt(e.target.value) })}
                    className="w-full pl-16 pr-12 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 font-black text-lg focus:bg-white focus:border-[#0073B9]/30 focus:ring-4 focus:ring-[#0073B9]/10 transition-all" 
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">X</span>
                </div>
              </div>

              <div className="md:col-span-2 space-y-6 pt-4 border-t border-gray-50 mt-2">
                <div className="flex items-center gap-2 text-[#0073B9]">
                   <ShieldAlert className="w-4 h-4" />
                   <h4 className="text-[10px] font-black uppercase tracking-[2px]">Admin Controls & Overrides</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Min Profit</label>
                    <input 
                      type="number" 
                      value={newTrade.minDispProfit}
                      onChange={(e) => setNewTrade({ ...newTrade, minDispProfit: parseFloat(e.target.value) })}
                      className="w-full bg-transparent border-none p-0 text-gray-900 font-bold focus:ring-0 text-sm" 
                    />
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Max Profit</label>
                    <input 
                      type="number" 
                      value={newTrade.maxDispProfit}
                      onChange={(e) => setNewTrade({ ...newTrade, maxDispProfit: parseFloat(e.target.value) })}
                      className="w-full bg-transparent border-none p-0 text-gray-900 font-bold focus:ring-0 text-sm" 
                    />
                  </div>
                  <div className="bg-[#0073B9]/5 rounded-2xl p-4 border border-[#0073B9]/10">
                    <label className="block text-[10px] font-black text-[#0073B9] uppercase mb-2">Exact Override</label>
                    <input 
                      type="number" 
                      value={newTrade.profitOverride}
                      onChange={(e) => setNewTrade({ ...newTrade, profitOverride: parseFloat(e.target.value) })}
                      className="w-full bg-transparent border-none p-0 text-[#0073B9] font-black focus:ring-0 text-sm" 
                    />
                  </div>
                </div>
              </div>

              {/* Profit Summary Section */}
              <div className="md:col-span-2 bg-[#0073B9] rounded-3xl p-6 text-white shadow-xl shadow-[#0073B9]/20 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{profitSummary.label}</p>
                  <p className="text-3xl font-black">{profitSummary.value}</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                   <DollarSign className="w-8 h-8" />
                </div>
              </div>

            </div>

            <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4 mt-8 md:mt-10">
              <button onClick={() => setTradeModal(false)} className="w-full md:flex-1 py-4 md:py-5 bg-gray-50 text-gray-400 font-black rounded-2xl hover:bg-gray-100 transition-all uppercase tracking-widest text-sm">
                Cancel
              </button>
              <button onClick={handleExecuteTrade} className="w-full md:flex-2 py-4 md:py-5 bg-[#0073B9] text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-[#0073B9]/20 flex items-center justify-center gap-3 uppercase tracking-widest md:px-12 text-sm">
                Execute Trade
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Close & Settle Modal */}
      {closeTradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 font-sans text-gray-900">
          <div className="bg-white rounded-[32px] p-10 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
               <ShieldAlert className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-black text-center mb-2">Confirm Termination</h3>
            <p className="text-gray-500 text-center font-medium mb-8 leading-relaxed">
              Are you sure you want to force close the position for <span className="text-gray-900 font-black">{closeTradeModal.assetTicker}</span>? This settlement is final.
            </p>
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 flex justify-between items-center border border-gray-100">
              <span className="text-xs font-black uppercase tracking-wider text-gray-400">Final Settlement:</span>
              <span className="text-2xl font-black text-green-600">+$45.00</span>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setCloseTradeModal(null)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black transition-colors uppercase tracking-widest">
                Cancel
              </button>
              <button onClick={() => handleSettleTrade(closeTradeModal.id)} className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 uppercase tracking-widest">
                Settle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// --- Deposits Section ---
function DepositsSection() {
  const [deposits, setDeposits] = useState<PendingDeposit[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

  useEffect(() => {
    const loadDeposits = async () => {
      const deps = await db.getAllPendingDeposits();
      setDeposits(deps);
    };
    loadDeposits();
  }, []);

  const handleApprove = async (id: string, userId: string, amount: number) => {
    await db.acceptPendingDeposit(id, 0); 
    const user = await db.getUser(userId);
    if (user) {
      await db.updateUser(userId, { balance: user.balance + amount });
    }
    const deps = await db.getAllPendingDeposits();
    setDeposits(deps);
  };

  const handleReject = async (id: string) => {
    const reason = prompt("Enter rejection reason:");
    if (reason !== null) {
      await db.rejectPendingDeposit(id, reason);
      const deps = await db.getAllPendingDeposits();
      setDeposits(deps);
    }
  };

  return (
    <div className="font-sans text-gray-900">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-[#0073B9]">Deposit Approvals</h2>
        <p className="text-gray-500 font-medium">Manage and authorize incoming fund transfers</p>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
        {deposits.length === 0 ? (
          <div className="p-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <ArrowDownToLine className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-400 font-bold text-lg">No pending deposits</p>
            <p className="text-gray-300 text-sm mt-1">All transactions have been processed</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
             {deposits.map(dep => (
                <div key={dep.id} className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 hover:bg-gray-50/50 transition-colors">
                   <div className="flex justify-between md:justify-start items-center md:w-1/3">
                      <div>
                        <p className="font-bold text-sm text-gray-900">{dep.id.substring(0, 12)}...</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{new Date(dep.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`md:hidden px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        dep.status === "pending" ? "bg-yellow-50 text-yellow-600 border-yellow-100" :
                        dep.status === "approved" ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"
                      }`}>
                        {dep.status}
                      </span>
                   </div>
                   
                   <div className="md:w-1/4">
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest md:hidden mb-1">Amount</p>
                     <p className="font-black text-xl md:text-lg text-[#0073B9]">${dep.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                   </div>
                   
                   <div className="hidden md:block md:w-1/4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        dep.status === "pending" ? "bg-yellow-50 text-yellow-600 border-yellow-100" :
                        dep.status === "approved" ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"
                      }`}>
                        {dep.status}
                      </span>
                   </div>
                   
                   <div className="flex justify-start md:justify-end gap-2 md:w-auto pt-4 md:pt-0 border-t border-gray-50 md:border-0 mt-2 md:mt-0">
                     <button 
                       onClick={() => setSelectedReceipt(dep.receiptDataUrl)}
                       className="flex-1 md:flex-none h-10 md:w-10 rounded-xl bg-gray-50 text-gray-400 hover:bg-[#0073B9]/10 hover:text-[#0073B9] transition-all flex items-center justify-center shadow-sm"
                       title="View Receipt"
                     >
                       <Eye className="w-5 h-5" />
                     </button>
                     {dep.status === "pending" && (
                       <>
                         <button 
                           onClick={() => handleApprove(dep.id, dep.userId, dep.amount)}
                           className="flex-1 md:flex-none h-10 md:w-10 rounded-xl bg-green-50 text-green-600 hover:bg-green-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
                           title="Approve"
                         >
                           <CheckSquare className="w-5 h-5" />
                         </button>
                         <button 
                           onClick={() => handleReject(dep.id)}
                           className="flex-1 md:flex-none h-10 md:w-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
                           title="Reject"
                         >
                           <XSquare className="w-5 h-5" />
                         </button>
                       </>
                     )}
                   </div>
                </div>
             ))}
          </div>
        )}
      </div>

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4" onClick={() => setSelectedReceipt(null)}>
          <div className="bg-white rounded-[32px] p-8 max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl relative animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-gray-900">Transaction Receipt</h3>
              <button onClick={() => setSelectedReceipt(null)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="rounded-2xl border border-gray-100 overflow-hidden bg-gray-50">
              {selectedReceipt.startsWith("data:application/pdf") ? (
                <iframe src={selectedReceipt} className="w-full h-[600px] border-0" />
              ) : (
                <img src={selectedReceipt} alt="Receipt" className="max-w-full h-auto mx-auto" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Withdrawals Section ---
function WithdrawalsSection() {
  const [withdrawals, setWithdrawals] = useState<PendingWithdrawal[]>([]);

  useEffect(() => {
    const loadWithdrawals = async () => {
      const withs = await db.getAllPendingWithdrawals();
      setWithdrawals(withs);
    };
    loadWithdrawals();
  }, []);

  const handleApprove = async (id: string) => {
    await db.acceptPendingWithdrawal(id);
    const withs = await db.getAllPendingWithdrawals();
    setWithdrawals(withs);
  };

  const handleReject = async (id: string) => {
    const reason = prompt("Enter rejection reason:");
    if (reason !== null) {
      await db.rejectPendingWithdrawal(id, reason);
      const withs = await db.getAllPendingWithdrawals();
      setWithdrawals(withs);
    }
  };

  return (
    <div className="font-sans text-gray-900">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-[#0073B9]">Withdrawal Approvals</h2>
        <p className="text-gray-500 font-medium">Manage and authorize outgoing fund transfers</p>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
        {withdrawals.length === 0 ? (
          <div className="p-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <ArrowUpFromLine className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-400 font-bold text-lg">No pending withdrawals</p>
            <p className="text-gray-300 text-sm mt-1">All requests have been processed</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
             {withdrawals.map(dep => (
                <div key={dep.id} className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 hover:bg-gray-50/50 transition-colors">
                   <div className="flex justify-between md:justify-start items-center md:w-1/3">
                      <div>
                        <p className="font-bold text-sm text-gray-900">{dep.id.substring(0, 12)}...</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{new Date(dep.createdAt).toLocaleDateString()} - {dep.network}</p>
                      </div>
                      <span className={`md:hidden px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        dep.status === "pending" ? "bg-yellow-50 text-yellow-600 border-yellow-100" :
                        dep.status === "approved" ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"
                      }`}>
                        {dep.status}
                      </span>
                   </div>
                   
                   <div className="md:w-1/4">
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest md:hidden mb-1">Amount</p>
                     <p className="font-black text-xl md:text-lg text-[#0073B9]">${dep.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                     <p className="text-xs text-gray-500 font-mono mt-1 break-all bg-gray-100 px-2 py-1 rounded">{dep.walletAddress}</p>
                   </div>
                   
                   <div className="hidden md:block md:w-1/4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        dep.status === "pending" ? "bg-yellow-50 text-yellow-600 border-yellow-100" :
                        dep.status === "approved" ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"
                      }`}>
                        {dep.status}
                      </span>
                   </div>
                   
                   <div className="flex justify-start md:justify-end gap-2 md:w-auto pt-4 md:pt-0 border-t border-gray-50 md:border-0 mt-2 md:mt-0">
                     {dep.status === "pending" && (
                       <>
                         <button 
                           onClick={() => handleApprove(dep.id)}
                           className="flex-1 md:flex-none h-10 md:w-10 rounded-xl bg-green-50 text-green-600 hover:bg-green-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
                           title="Approve"
                         >
                           <CheckSquare className="w-5 h-5" />
                         </button>
                         <button 
                           onClick={() => handleReject(dep.id)}
                           className="flex-1 md:flex-none h-10 md:w-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
                           title="Reject"
                         >
                           <XSquare className="w-5 h-5" />
                         </button>
                       </>
                     )}
                   </div>
                </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- Settings Section ---
function SettingsSection() {
  const [bitcoinAddress, setBitcoinAddress] = useState("");
  const [ethereumAddress, setEthereumAddress] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await db.getAdminSettings();
      setBitcoinAddress(settings.depositAddresses.bitcoin);
      setEthereumAddress(settings.depositAddresses.ethereum);
    };
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.updateAdminSettings({
      depositAddresses: {
        bitcoin: bitcoinAddress,
        ethereum: ethereumAddress
      }
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="font-sans text-gray-900 max-w-3xl mx-auto">
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
           <h2 className="text-lg font-black text-[#0073B9] flex items-center gap-2">
             <Settings className="w-5 h-5" /> Platform Configuration
           </h2>
        </div>
        <form onSubmit={handleSave} className="p-6 md:p-8 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Crypto Deposit Addresses</h3>
            <p className="text-sm text-gray-500 mb-4">These addresses will be displayed to all users when they initiate a deposit. The QR code is automatically generated based on the address you provide.</p>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">Bitcoin (BTC) Network Address</label>
              <div className="relative">
                <Wallet className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#F7931A]" />
                <input 
                  type="text" 
                  value={bitcoinAddress}
                  onChange={(e) => setBitcoinAddress(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-800 font-mono text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0073B9] transition-all"
                  placeholder="e.g. bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">Ethereum (ETH) ERC-20 Address</label>
              <div className="relative">
                <Wallet className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#627EEA]" />
                <input 
                  type="text" 
                  value={ethereumAddress}
                  onChange={(e) => setEthereumAddress(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-800 font-mono text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0073B9] transition-all"
                  placeholder="e.g. 0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="pt-4 flex items-center gap-4">
            <button type="submit" className="px-8 py-3 bg-[#0073B9] hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md">
              Save Configuration
            </button>
            {saved && <span className="text-green-600 font-bold text-sm animate-pulse">Changes saved and broadcasted to users!</span>}
          </div>
        </form>
      </div>
    </div>
  );
}


// --- Main Layout ---
export default function AdminControlPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(typeof window !== 'undefined' ? window.innerWidth > 768 : true);
  const [activeSection, setActiveSection] = useState<"users" | "trading" | "deposits" | "withdrawals" | "settings">("trading");
  const [users, setUsers] = useState<User[]>([]);
  const { user: authUser } = useAuth();

  const loadData = async () => {
    const usersList = await db.getUsers();
    setUsers(usersList);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('db_updated', loadData);
    return () => window.removeEventListener('db_updated', loadData);
  }, []);

  return (
    <AdminGate>
      <div className="min-h-screen w-full font-sans flex flex-col md:flex-row overflow-hidden text-gray-900 bg-gray-50 bg-dots-pattern relative">
        <style dangerouslySetInnerHTML={{__html: `
          .bg-dots-pattern {
            background-image: radial-gradient(circle at 2px 2px, rgba(0, 115, 185, 0.08) 2px, transparent 0);
            background-size: 32px 32px;
          }
        `}} />
        
        {/* Large Decorative Circles */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0073B9]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0073B9]/5 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none z-0"></div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden" 
            onClick={() => setSidebarOpen(false)} 
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed md:relative top-0 left-0 h-screen z-50 md:z-10
          flex-shrink-0 border-r border-gray-100 bg-white/95 backdrop-blur-md transition-all duration-300 flex flex-col shadow-sm
          ${sidebarOpen ? "translate-x-0 w-72" : "-translate-x-full md:translate-x-0 w-20"}
        `}>
          <div className="p-6 flex items-center justify-between border-b border-gray-50 h-20">
            {sidebarOpen && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#0073B9] flex items-center justify-center shadow-md">
                  <ShieldAlert className="w-4 h-4 text-white" />
                </div>
                <span className="font-black text-lg text-[#0073B9]">Admin Control</span>
              </div>
            )}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-gray-400 hover:text-[#0073B9] hover:bg-gray-50 rounded-lg transition-colors ml-auto">
              <Menu className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="p-4 space-y-2 flex-1 overflow-y-auto mt-4">
            {[
              { id: "trading", label: "Trade Engine", icon: LineChart },
              { id: "users", label: "User Directory", icon: Users },
              { id: "deposits", label: "Deposits", icon: ArrowDownToLine },
              { id: "withdrawals", label: "Withdrawals", icon: ArrowUpFromLine },
              { id: "settings", label: "Platform Settings", icon: Settings },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id as any);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  activeSection === item.id 
                    ? "bg-[#0073B9] text-white shadow-lg shadow-[#0073B9]/20" 
                    : "bg-transparent text-gray-500 hover:text-[#0073B9] hover:bg-blue-50"
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${activeSection === item.id ? 'text-white' : 'text-gray-400'}`} />
                {sidebarOpen && <span className="font-bold text-sm">{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-gray-50 mt-auto">
             <a href="/dashboard" className="flex items-center gap-4 p-4 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-bold group">
               <ArrowLeft className="w-5 h-5 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
               {sidebarOpen && <span className="text-sm">Exit Admin</span>}
             </a>
          </div>
        </aside>

        <main className="flex-1 h-screen overflow-y-auto relative z-10 flex flex-col">
          <header className="border-b border-gray-100 px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-20 h-20 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0073B9] flex items-center justify-center shadow-md md:hidden">
                 <img src="https://www.google.com/s2/favicons?domain=ramseysolutions.com&sz=128" alt="Ramsey" className="w-6 h-6 object-contain" />
              </div>
              <h1 className="text-lg md:text-xl font-black text-[#0073B9] capitalize hidden md:block">
                {activeSection === 'trading' && 'Trade Engine'}
                {activeSection === 'users' && 'User Directory'}
                {activeSection === 'deposits' && 'Deposit Approvals'}
                {activeSection === 'withdrawals' && 'Withdrawal Approvals'}
                {activeSection === 'settings' && 'Platform Settings'}
              </h1>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <div className="relative hidden sm:block">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-800 font-medium text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-[#0073B9] focus:border-transparent transition-all w-48 md:w-64"
                />
              </div>
              <button onClick={() => setSidebarOpen(true)} className="p-2 text-[#0073B9] hover:bg-[#0073B9]/10 rounded-xl transition-all md:hidden ml-auto">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </header>

          <div className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              {activeSection === "users" && <UsersSection users={users} />}
              {activeSection === "trading" && <TradingSection users={users} />}
              {activeSection === "deposits" && <DepositsSection />}
              {activeSection === "withdrawals" && <WithdrawalsSection />}
              {activeSection === "settings" && <SettingsSection />}
            </div>
          </div>
        </main>
      </div>
    </AdminGate>
  );
}
