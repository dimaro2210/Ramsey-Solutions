import { supabase } from './supabase';

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
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
  reject_reason?: string;
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
  id?: number;
  depositAddresses: {
    bitcoin: string;
    ethereum: string;
  };
}

// Convert from DB snake_case to TS camelCase
const mapUser = (dbUser: any): User => ({
  id: dbUser.id,
  firstName: dbUser.first_name,
  lastName: dbUser.last_name,
  email: dbUser.email,
  phone: dbUser.phone,
  accountType: dbUser.account_type,
  profilePicture: dbUser.profile_picture,
  ssn: dbUser.ssn,
  address: dbUser.address,
  dob: dbUser.dob,
  balance: parseFloat(dbUser.balance) || 0,
  cryptoBalance: {
    btc: parseFloat(dbUser.crypto_btc) || 0,
    eth: parseFloat(dbUser.crypto_eth) || 0,
  }
});

export const db = {
  async getUsers(): Promise<User[]> {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error(error);
      return [];
    }
    return data.map(mapUser);
  },

  async getUser(id: string): Promise<User | null> {
    if (!id) return null;
    const { data, error } = await supabase.from('users').select('*').eq('id', id).maybeSingle();
    if (error) {
      console.error(error);
      return null;
    }
    if (!data) return null;
    return mapUser(data);
  },

  async updateUser(userId: string, updates: Partial<User>) {
    const dbUpdates: any = {};
    if (updates.balance !== undefined) dbUpdates.balance = updates.balance;
    if (updates.cryptoBalance?.btc !== undefined) dbUpdates.crypto_btc = updates.cryptoBalance.btc;
    if (updates.cryptoBalance?.eth !== undefined) dbUpdates.crypto_eth = updates.cryptoBalance.eth;
    if (updates.firstName !== undefined) dbUpdates.first_name = updates.firstName;
    if (updates.lastName !== undefined) dbUpdates.last_name = updates.lastName;
    if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
    if (updates.profilePicture !== undefined) dbUpdates.profile_picture = updates.profilePicture;
    if (updates.address !== undefined) dbUpdates.address = updates.address;
    if (updates.ssn !== undefined) dbUpdates.ssn = updates.ssn;
    if (updates.dob !== undefined) dbUpdates.dob = updates.dob;
    if (updates.accountType !== undefined) dbUpdates.account_type = updates.accountType;
    
    const { error } = await supabase.from('users').update(dbUpdates).eq('id', userId);
    if (error) console.error(error);
    else window.dispatchEvent(new Event('db_updated'));
  },

  async updateCryptoBalance(userId: string, asset: "btc" | "eth", amount: number) {
    const user = await this.getUser(userId);
    if (!user) return;
    const updates = { cryptoBalance: { ...user.cryptoBalance, [asset]: user.cryptoBalance[asset] + amount } };
    await this.updateUser(userId, updates);
  },

  async getAdminSettings(): Promise<AdminSettings> {
    const { data, error } = await supabase.from('admin_settings').select('*').eq('id', 1).single();
    if (error || !data) return { depositAddresses: { bitcoin: '', ethereum: '' } };
    return {
      id: data.id,
      depositAddresses: {
        bitcoin: data.bitcoin_address,
        ethereum: data.ethereum_address
      }
    };
  },

  async updateAdminSettings(updates: Partial<AdminSettings>) {
    const dbUpdates: any = {};
    if (updates.depositAddresses?.bitcoin) dbUpdates.bitcoin_address = updates.depositAddresses.bitcoin;
    if (updates.depositAddresses?.ethereum) dbUpdates.ethereum_address = updates.depositAddresses.ethereum;
    const { error } = await supabase.from('admin_settings').update(dbUpdates).eq('id', 1);
    if (error) console.error(error);
    else window.dispatchEvent(new Event('db_updated'));
  },

  async getNotifications(userId: string): Promise<Notification[]> {
    const { data, error } = await supabase.from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) return [];
    return data.map((n: any) => ({
      id: n.id,
      userId: n.user_id,
      title: n.title,
      message: n.message,
      type: n.type,
      read: n.read,
      createdAt: new Date(n.created_at).getTime()
    }));
  },

  async addNotification(userId: string, title: string, message: string, type: "success" | "warning" | "info" = "info") {
    const { error } = await supabase.from('notifications').insert({
      user_id: userId,
      title,
      message,
      type,
      read: false
    });
    if (error) console.error(error);
    else window.dispatchEvent(new Event('db_updated'));
  },

  async markAllNotificationsRead(userId: string) {
    const { error } = await supabase.from('notifications').update({ read: true }).eq('user_id', userId).eq('read', false);
    if (error) console.error(error);
    else window.dispatchEvent(new Event('db_updated'));
  },

  async toggleNotificationRead(id: string, currentReadStatus: boolean) {
    const { error } = await supabase.from('notifications').update({ read: !currentReadStatus }).eq('id', id);
    if (error) console.error(error);
    else window.dispatchEvent(new Event('db_updated'));
  },

  async clearNotifications(userId: string) {
    const { error } = await supabase.from('notifications').delete().eq('user_id', userId);
    if (error) console.error(error);
    else window.dispatchEvent(new Event('db_updated'));
  },

  async getAllPendingDeposits(): Promise<PendingDeposit[]> {
    const { data, error } = await supabase.from('pending_deposits').select('*').order('created_at', { ascending: false });
    if (error) return [];
    return data.map((d: any) => ({
      id: d.id,
      userId: d.user_id,
      amount: parseFloat(d.amount),
      asset: d.asset,
      receiptDataUrl: d.receipt_data_url,
      status: d.status,
      reject_reason: d.reject_reason,
      createdAt: new Date(d.created_at).getTime()
    }));
  },

  async getPendingDeposits(userId: string): Promise<PendingDeposit[]> {
    const { data, error } = await supabase.from('pending_deposits').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) return [];
    return data.map((d: any) => ({
      id: d.id,
      userId: d.user_id,
      amount: parseFloat(d.amount),
      asset: d.asset,
      receiptDataUrl: d.receipt_data_url,
      status: d.status,
      reject_reason: d.reject_reason,
      createdAt: new Date(d.created_at).getTime()
    }));
  },

  async addPendingDeposit(userId: string, amount: number, asset: "bitcoin" | "ethereum", receiptDataUrl: string) {
    const { data, error } = await supabase.from('pending_deposits').insert({
      user_id: userId,
      amount,
      asset,
      receipt_data_url: receiptDataUrl,
      status: 'pending'
    }).select().single();
    if (error) console.error(error);
    else {
      await this.addNotification(userId, "Deposit Submitted", `Your deposit of $${amount} is pending verification.`, "info");
      window.dispatchEvent(new Event('db_updated'));
    }
    return data;
  },

  async acceptPendingDeposit(depositId: string, cryptoAmount: number) {
    const { data: deposit, error: fetchErr } = await supabase.from('pending_deposits').select('*').eq('id', depositId).single();
    if (fetchErr || !deposit) return false;

    const { error } = await supabase.from('pending_deposits').update({
      status: 'approved',
      processed_at: new Date().toISOString()
    }).eq('id', depositId);

    if (error) return false;

    const assetKey = deposit.asset === "bitcoin" ? "btc" : "eth";
    await this.updateCryptoBalance(deposit.user_id, assetKey, cryptoAmount);
    await this.addNotification(deposit.user_id, "Deposit Approved", `Your deposit of $${deposit.amount} has been approved and ${cryptoAmount.toFixed(4)} ${assetKey.toUpperCase()} credited.`, "success");
    
    window.dispatchEvent(new Event('db_updated'));
    return true;
  },

  async rejectPendingDeposit(depositId: string, reason: string) {
    const { data: deposit, error: fetchErr } = await supabase.from('pending_deposits').select('*').eq('id', depositId).single();
    if (fetchErr || !deposit) return false;

    const { error } = await supabase.from('pending_deposits').update({
      status: 'rejected',
      reject_reason: reason,
      processed_at: new Date().toISOString()
    }).eq('id', depositId);

    if (error) return false;

    await this.addNotification(deposit.user_id, "Deposit Rejected", `Your deposit of $${deposit.amount} was rejected. Reason: ${reason}`, "warning");
    window.dispatchEvent(new Event('db_updated'));
    return true;
  },

  async getAllTrades(): Promise<Trade[]> {
    const { data, error } = await supabase.from('trades').select('*').order('placed_at', { ascending: false });
    if (error) return [];
    return data.map((t: any) => ({
      id: t.id,
      userId: t.user_id,
      assetTicker: t.asset_ticker,
      positionType: t.position_type,
      strategy: t.strategy,
      amountUsd: parseFloat(t.amount_usd),
      leverage: parseFloat(t.leverage),
      entryPrice: parseFloat(t.entry_price),
      durationMinutes: parseFloat(t.duration_minutes),
      minDispProfit: t.min_disp_profit ? parseFloat(t.min_disp_profit) : undefined,
      maxDispProfit: t.max_disp_profit ? parseFloat(t.max_disp_profit) : undefined,
      profitOverride: t.profit_override ? parseFloat(t.profit_override) : undefined,
      status: t.status,
      finalProfit: t.final_profit ? parseFloat(t.final_profit) : undefined,
      placedAt: new Date(t.placed_at).getTime(),
      expiresAt: new Date(t.expires_at).getTime(),
      closedAt: t.closed_at ? new Date(t.closed_at).getTime() : undefined
    }));
  },

  async getTrades(userId: string): Promise<Trade[]> {
    const { data, error } = await supabase.from('trades').select('*').eq('user_id', userId).order('placed_at', { ascending: false });
    if (error) return [];
    return data.map((t: any) => ({
      id: t.id,
      userId: t.user_id,
      assetTicker: t.asset_ticker,
      positionType: t.position_type,
      strategy: t.strategy,
      amountUsd: parseFloat(t.amount_usd),
      leverage: parseFloat(t.leverage),
      entryPrice: parseFloat(t.entry_price),
      durationMinutes: parseFloat(t.duration_minutes),
      minDispProfit: t.min_disp_profit ? parseFloat(t.min_disp_profit) : undefined,
      maxDispProfit: t.max_disp_profit ? parseFloat(t.max_disp_profit) : undefined,
      profitOverride: t.profit_override ? parseFloat(t.profit_override) : undefined,
      status: t.status,
      finalProfit: t.final_profit ? parseFloat(t.final_profit) : undefined,
      placedAt: new Date(t.placed_at).getTime(),
      expiresAt: new Date(t.expires_at).getTime(),
      closedAt: t.closed_at ? new Date(t.closed_at).getTime() : undefined
    }));
  },

  async placeTrade(userId: string, tradeData: Partial<Trade>) {
    const expiresAt = new Date(Date.now() + (tradeData.durationMinutes || 60) * 60 * 1000);
    const { data, error } = await supabase.from('trades').insert({
      user_id: userId,
      asset_ticker: tradeData.assetTicker || "AAPL",
      position_type: tradeData.positionType || "LONG",
      strategy: tradeData.strategy || "Day Trading",
      amount_usd: tradeData.amountUsd || 0,
      leverage: tradeData.leverage || 1,
      entry_price: tradeData.entryPrice || 150,
      duration_minutes: tradeData.durationMinutes || 60,
      min_disp_profit: tradeData.minDispProfit,
      max_disp_profit: tradeData.maxDispProfit,
      profit_override: tradeData.profitOverride,
      status: 'open',
      expires_at: expiresAt.toISOString()
    }).select().single();
    if (error) console.error(error);
    else window.dispatchEvent(new Event('db_updated'));
    return data;
  },

  async closeTrade(tradeId: string, finalProfit: number) {
    const { data: trade, error: fetchErr } = await supabase.from('trades').select('*').eq('id', tradeId).single();
    if (fetchErr || !trade) return false;

    const { error } = await supabase.from('trades').update({
      status: 'closed',
      final_profit: finalProfit,
      closed_at: new Date().toISOString()
    }).eq('id', tradeId);
    
    if (error) return false;

    const user = await this.getUser(trade.user_id);
    if (user) {
      await this.updateUser(trade.user_id, { balance: user.balance + finalProfit });
    }

    await this.addNotification(trade.user_id, "Trade Closed", `Your trade for ${trade.asset_ticker} was closed with a profit of $${finalProfit.toFixed(2)}.`, "success");
    window.dispatchEvent(new Event('db_updated'));
    return true;
  },

  async deleteTrade(tradeId: string) {
    const { error } = await supabase.from('trades').delete().eq('id', tradeId);
    if (error) return false;
    window.dispatchEvent(new Event('db_updated'));
    return true;
  },

  async autoCloseExpiredTrades() {
    const { data: openTrades, error } = await supabase.from('trades').select('*').eq('status', 'open');
    if (error || !openTrades) return;

    const now = Date.now();
    let changed = false;

    for (const t of openTrades) {
      const expiresAt = new Date(t.expires_at).getTime();
      if (now >= expiresAt) {
        let profit = 0;
        if (t.profit_override) {
          profit = parseFloat(t.profit_override);
        } else {
          const baseReturn = (Math.random() * 0.08 + 0.02) * (t.position_type === 'LONG' ? 1 : 1);
          profit = parseFloat(t.amount_usd) * baseReturn * parseFloat(t.leverage);
          if (t.min_disp_profit && profit < parseFloat(t.min_disp_profit)) profit = parseFloat(t.min_disp_profit);
          if (t.max_disp_profit && profit > parseFloat(t.max_disp_profit)) profit = parseFloat(t.max_disp_profit);
        }
        
        profit = Math.round(profit * 100) / 100;

        await supabase.from('trades').update({
          status: 'closed',
          final_profit: profit,
          closed_at: t.expires_at // close it at the expiration time
        }).eq('id', t.id);

        const user = await this.getUser(t.user_id);
        if (user) {
          await this.updateUser(t.user_id, { balance: user.balance + profit });
        }

        await this.addNotification(t.user_id, "Trade Auto-Settled", `Your ${t.asset_ticker} position was automatically closed with a profit of $${profit.toFixed(2)}.`, "success");
        changed = true;
      }
    }

    if (changed) {
      window.dispatchEvent(new Event('db_updated'));
    }
  }
};
