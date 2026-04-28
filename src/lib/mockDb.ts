export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  accountType?: string;
  profilePicture?: string;
  ssn?: string;
  address?: string;
  dob?: string;
  balance: number;
  cryptoBalance: {
    btc: number;
    eth: number;
  };
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info";
  createdAt: number;
  read: boolean;
}

export interface PendingDeposit {
  id: string;
  userId: string;
  amount: number;
  asset: "bitcoin" | "ethereum";
  receiptDataUrl: string; // base64
  status: "pending" | "approved" | "rejected";
  createdAt: number;
}

export interface Trade {
  id: string;
  userId: string;
  assetTicker: string;
  positionType: "LONG" | "SHORT";
  strategy: string;
  amountUsd: number;
  leverage: number;
  entryPrice: number;
  durationMinutes: number;
  minDispProfit?: number;
  maxDispProfit?: number;
  profitOverride?: number;
  status: "open" | "closed";
  placedAt: number;
  expiresAt: number;
  finalProfit?: number;
  closedAt?: number;
}

export interface AdminSettings {
  depositAddresses: {
    bitcoin: string;
    ethereum: string;
  };
}

const DEFAULT_USER: User = {
  id: "user_123",
  name: "David",
  email: "david@example.com",
  phone: "(555) 123-4567",
  accountType: "Individual Trading",
  ssn: "***-**-1234",
  address: "123 Main St, New York, NY 10001",
  dob: "1990-01-01",
  balance: 12450.0,
  cryptoBalance: {
    btc: 0.15,
    eth: 4.2,
  },
};

const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  depositAddresses: {
    bitcoin: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    ethereum: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18",
  }
};

export const mockDb = {
  // Initialization
  init() {
    if (!localStorage.getItem("mock_users")) {
      localStorage.setItem("mock_users", JSON.stringify([DEFAULT_USER]));
    }
    if (!localStorage.getItem("mock_notifications")) {
      localStorage.setItem("mock_notifications", JSON.stringify([]));
    }
    if (!localStorage.getItem("mock_deposits")) {
      localStorage.setItem("mock_deposits", JSON.stringify([]));
    }
    if (!localStorage.getItem("mock_trades")) {
      localStorage.setItem("mock_trades", JSON.stringify([]));
    }
    if (!localStorage.getItem("mock_admin_settings")) {
      localStorage.setItem("mock_admin_settings", JSON.stringify(DEFAULT_ADMIN_SETTINGS));
    }
  },

  // User Methods
  getUsers(): User[] {
    this.init();
    const users = localStorage.getItem("mock_users");
    return users ? JSON.parse(users) : [DEFAULT_USER];
  },

  getUser(): User {
    const users = this.getUsers();
    const authUserStr = localStorage.getItem("ramsey_user");
    if (authUserStr) {
      try {
        const authUser = JSON.parse(authUserStr);
        const user = users.find(u => u.id === authUser.id);
        if (user) return user;
      } catch (e) {
        console.error("Error parsing auth user", e);
      }
    }
    // Fallback to the first user (usually David) for demo purposes if not logged in
    return users[0] || DEFAULT_USER;
  },

  addUser(newUser: Partial<User>) {
    const users = this.getUsers();
    const user: User = {
      id: newUser.id || `user_${Date.now()}`,
      name: newUser.name || "New User",
      email: newUser.email || "",
      phone: newUser.phone || "",
      accountType: newUser.accountType || "Individual Trading",
      balance: newUser.balance || 0,
      cryptoBalance: newUser.cryptoBalance || { btc: 0, eth: 0 },
      ...newUser
    };
    users.push(user);
    localStorage.setItem("mock_users", JSON.stringify(users));
    window.dispatchEvent(new Event('mock_db_updated'));
    return user;
  },

  updateUser(userId: string, updates: Partial<User>) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      localStorage.setItem("mock_users", JSON.stringify(users));
      window.dispatchEvent(new Event('mock_db_updated'));
    }
  },

  updateCryptoBalance(userId: string, asset: "btc" | "eth", amount: number) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) return;
    
    const user = users[index];
    user.cryptoBalance = {
      ...user.cryptoBalance,
      [asset]: user.cryptoBalance[asset] + amount,
    };
    localStorage.setItem("mock_users", JSON.stringify(users));
    window.dispatchEvent(new Event('mock_db_updated'));
    return user;
  },

  // Admin Settings Methods
  getAdminSettings(): AdminSettings {
    this.init();
    const data = localStorage.getItem("mock_admin_settings");
    return data ? JSON.parse(data) : DEFAULT_ADMIN_SETTINGS;
  },

  updateAdminSettings(updates: Partial<AdminSettings>) {
    const settings = this.getAdminSettings();
    const updated = { ...settings, ...updates };
    localStorage.setItem("mock_admin_settings", JSON.stringify(updated));
    window.dispatchEvent(new Event('mock_db_updated'));
    return updated;
  },

  // Notification Methods
  getAllNotifications(): Notification[] {
    this.init();
    const data = localStorage.getItem("mock_notifications");
    return data ? JSON.parse(data) : [];
  },

  getNotifications(): Notification[] {
    const allNotifs = this.getAllNotifications();
    const currentUserId = this.getUser().id;
    return allNotifs.filter(n => n.userId === currentUserId);
  },

  addNotification(title: string, message: string, type: "success" | "warning" | "info" = "info") {
    const allNotifs = this.getAllNotifications();
    const newNotif: Notification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      userId: this.getUser().id,
      title,
      message,
      type,
      createdAt: Date.now(),
      read: false,
    };
    localStorage.setItem("mock_notifications", JSON.stringify([newNotif, ...allNotifs]));
    window.dispatchEvent(new Event('mock_db_updated'));
    return newNotif;
  },

  markAllNotificationsRead() {
    const allNotifs = this.getAllNotifications();
    const currentUserId = this.getUser().id;
    const updated = allNotifs.map(n => n.userId === currentUserId ? { ...n, read: true } : n);
    localStorage.setItem("mock_notifications", JSON.stringify(updated));
    window.dispatchEvent(new Event('mock_db_updated'));
  },

  toggleNotificationRead(id: string) {
    const allNotifs = this.getAllNotifications();
    const updated = allNotifs.map(n => n.id === id ? { ...n, read: !n.read } : n);
    localStorage.setItem("mock_notifications", JSON.stringify(updated));
    window.dispatchEvent(new Event('mock_db_updated'));
  },

  clearNotifications() {
    const allNotifs = this.getAllNotifications();
    const currentUserId = this.getUser().id;
    const filtered = allNotifs.filter(n => n.userId !== currentUserId);
    localStorage.setItem("mock_notifications", JSON.stringify(filtered));
    window.dispatchEvent(new Event('mock_db_updated'));
  },

  // Deposit Methods
  getAllPendingDeposits(): PendingDeposit[] {
    this.init();
    const data = localStorage.getItem("mock_deposits");
    return data ? JSON.parse(data) : [];
  },

  getPendingDeposits(): PendingDeposit[] {
    const allDeposits = this.getAllPendingDeposits();
    const currentUserId = this.getUser().id;
    return allDeposits.filter(d => d.userId === currentUserId);
  },

  addPendingDeposit(amount: number, asset: "bitcoin" | "ethereum", receiptDataUrl: string) {
    const deposits = this.getAllPendingDeposits();
    const newDeposit: PendingDeposit = {
      id: `DEP-${Date.now().toString(36).toUpperCase()}`,
      userId: this.getUser().id,
      amount,
      asset,
      receiptDataUrl,
      status: "pending",
      createdAt: Date.now(),
    };
    localStorage.setItem("mock_deposits", JSON.stringify([newDeposit, ...deposits]));
    this.addNotification("Deposit Submitted", `Your deposit of $${amount} is pending verification.`, "info");
    window.dispatchEvent(new Event('mock_db_updated'));
    return newDeposit;
  },

  acceptPendingDeposit(depositId: string, cryptoAmount: number) {
    const deposits = this.getAllPendingDeposits();
    const idx = deposits.findIndex(d => d.id === depositId);
    if (idx === -1) return false;

    deposits[idx].status = "approved";
    localStorage.setItem("mock_deposits", JSON.stringify(deposits));

    // Update user balance
    const assetKey = deposits[idx].asset === "bitcoin" ? "btc" : "eth";
    this.updateCryptoBalance(deposits[idx].userId, assetKey, cryptoAmount);

    this.addNotification("Deposit Approved", `Your deposit of $${deposits[idx].amount} has been approved and ${cryptoAmount.toFixed(4)} ${assetKey.toUpperCase()} credited.`, "success");
    window.dispatchEvent(new Event('mock_db_updated'));
    return true;
  },

  rejectPendingDeposit(depositId: string, reason: string) {
    const deposits = this.getAllPendingDeposits();
    const idx = deposits.findIndex(d => d.id === depositId);
    if (idx === -1) return false;

    deposits[idx].status = "rejected";
    localStorage.setItem("mock_deposits", JSON.stringify(deposits));

    this.addNotification("Deposit Rejected", `Your deposit of $${deposits[idx].amount} was rejected. Reason: ${reason}`, "warning");
    window.dispatchEvent(new Event('mock_db_updated'));
    return true;
  },

  // Trade Methods
  getAllTrades(): Trade[] {
    this.init();
    const data = localStorage.getItem("mock_trades");
    return data ? JSON.parse(data) : [];
  },

  getTrades(userId?: string): Trade[] {
    const allTrades = this.getAllTrades();
    const targetUserId = userId || this.getUser().id;
    return allTrades.filter(t => t.userId === targetUserId);
  },

  placeTrade(userId: string, tradeData: Partial<Trade>) {
    const allTrades = JSON.parse(localStorage.getItem("mock_trades") || "[]");
    const newTrade: Trade = {
      id: `TRD-${Date.now().toString(36).toUpperCase()}`,
      userId,
      assetTicker: tradeData.assetTicker || "AAPL",
      positionType: tradeData.positionType || "LONG",
      strategy: tradeData.strategy || "Day Trading",
      amountUsd: tradeData.amountUsd || 0,
      leverage: tradeData.leverage || 1,
      entryPrice: tradeData.entryPrice || 150,
      durationMinutes: tradeData.durationMinutes || 60,
      minDispProfit: tradeData.minDispProfit,
      maxDispProfit: tradeData.maxDispProfit,
      profitOverride: tradeData.profitOverride,
      status: "open",
      placedAt: Date.now(),
      expiresAt: Date.now() + (tradeData.durationMinutes || 60) * 60 * 1000,
    };
    localStorage.setItem("mock_trades", JSON.stringify([newTrade, ...allTrades]));
    window.dispatchEvent(new Event('mock_db_updated'));
    return newTrade;
  },

  closeTrade(tradeId: string, finalProfit: number) {
    const data = localStorage.getItem("mock_trades");
    const allTrades: Trade[] = data ? JSON.parse(data) : [];
    const idx = allTrades.findIndex(t => t.id === tradeId);
    if (idx === -1) return false;

    const trade = allTrades[idx];
    trade.status = "closed";
    trade.finalProfit = finalProfit;
    trade.closedAt = Date.now();

    localStorage.setItem("mock_trades", JSON.stringify(allTrades));
    
    // Update user balance with profit/loss
    const users = this.getUsers();
    const tradeOwner = users.find(u => u.id === trade.userId);
    if (tradeOwner) {
      this.updateUser(trade.userId, { balance: tradeOwner.balance + finalProfit });
    }

    this.addNotification("Trade Closed", `Your trade for ${trade.assetTicker} was closed with a profit of $${finalProfit.toFixed(2)}.`, "success");
    window.dispatchEvent(new Event('mock_db_updated'));
    return true;
  },

  deleteTrade(tradeId: string) {
    const data = localStorage.getItem("mock_trades");
    const allTrades: Trade[] = data ? JSON.parse(data) : [];
    const filtered = allTrades.filter(t => t.id !== tradeId);
    localStorage.setItem("mock_trades", JSON.stringify(filtered));
    window.dispatchEvent(new Event('mock_db_updated'));
    return true;
  },

  autoCloseExpiredTrades() {
    const data = localStorage.getItem("mock_trades");
    const allTrades: Trade[] = data ? JSON.parse(data) : [];
    const users = this.getUsers();
    const now = Date.now();
    let changed = false;

    allTrades.forEach(trade => {
      if (trade.status === "open" && now >= trade.expiresAt) {
        // Calculate final profit
        let profit = 0;
        if (trade.profitOverride) {
          profit = trade.profitOverride;
        } else {
          // Use a small random profit based on trade parameters
          const baseReturn = (Math.random() * 0.08 + 0.02) * (trade.positionType === 'LONG' ? 1 : 1);
          profit = trade.amountUsd * baseReturn * trade.leverage;
          if (trade.minDispProfit && profit < trade.minDispProfit) profit = trade.minDispProfit;
          if (trade.maxDispProfit && profit > trade.maxDispProfit) profit = trade.maxDispProfit;
        }

        trade.status = "closed";
        trade.finalProfit = Math.round(profit * 100) / 100;
        trade.closedAt = trade.expiresAt;

        // Update user balance
        // Update user balance for the trade owner
        const tradeOwner = users.find(u => u.id === trade.userId);
        if (tradeOwner) {
          this.updateUser(tradeOwner.id, { balance: tradeOwner.balance + trade.finalProfit });
        }

        this.addNotification("Trade Auto-Settled", `Your ${trade.assetTicker} position was automatically closed with a profit of $${trade.finalProfit.toFixed(2)}.`, "success");
        changed = true;
      }
    });

    if (changed) {
      localStorage.setItem("mock_trades", JSON.stringify(allTrades));
      window.dispatchEvent(new Event('mock_db_updated'));
    }
  }
};

