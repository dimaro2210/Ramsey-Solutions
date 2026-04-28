import { useState, useEffect } from 'react';

interface CryptoPrices {
  bitcoin: { usd: number };
  ethereum: { usd: number };
}

export function useCryptoPrices() {
  const [prices, setPrices] = useState<CryptoPrices | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchPrices = async () => {
      try {
        setLoading(true);
        // Fallback realistic prices in case of API rate limit
        const fallback = {
          bitcoin: { usd: 63250.0 },
          ethereum: { usd: 3450.0 }
        };

        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
        if (!res.ok) {
          throw new Error('Rate limited or network error');
        }
        const data = await res.json();
        
        // Sometimes CoinGecko returns empty if rate limited but HTTP 200
        if (!data.bitcoin || !data.ethereum) {
          throw new Error('Invalid data payload');
        }

        if (mounted) {
          setPrices(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          console.warn('Using fallback crypto prices due to API issue:', err);
          setPrices({
            bitcoin: { usd: 63250.0 },
            ethereum: { usd: 3450.0 }
          });
          setError('Using fallback data');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPrices();
    
    // Refresh every 60 seconds
    const interval = setInterval(fetchPrices, 60000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { prices, loading, error };
}
