// src/hooks/useCountryDetection.ts
import { useState, useEffect, useCallback } from 'react';
import { getAllCountries, getCountryInfo } from '../utils/pricingService';

export interface CountryInfo {
  countryCode: string;
  countryName: string;
  currency: string;
  symbol: string;
}

// Type for ipapi.co response
interface IpApiResponse {
  country_code: string;
  country_name: string;
  currency?: string;
  currency_name?: string;
  timezone?: string;
  ip?: string;
  city?: string;
  region?: string;
}

// Cache country info to avoid repeated API calls
let cachedCountryInfo: CountryInfo | null = null;

export const useCountryDetection = () => {
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load from localStorage if available
  const loadFromStorage = useCallback((): CountryInfo | null => {
    try {
      const saved = localStorage.getItem('preferredCountry');
      if (saved) {
        const parsed = JSON.parse(saved) as CountryInfo;
        // Validate that this is a valid country code
        const allCountries = getAllCountries();
        const isValid = allCountries.some(c => c.code === parsed.countryCode);
        return isValid ? parsed : null;
      }
    } catch (err) {
      console.warn('Failed to load country from localStorage', err);
    }
    return null;
  }, []);

  // Save to localStorage
  const saveToStorage = useCallback((info: CountryInfo) => {
    try {
      localStorage.setItem('preferredCountry', JSON.stringify(info));
    } catch (err) {
      console.warn('Failed to save country to localStorage', err);
    }
  }, []);

  // Set a manual country (user override)
  const setManualCountry = useCallback((countryCode: string) => {
    try {
      const countryData = getCountryInfo(countryCode);
      const info: CountryInfo = {
        countryCode,
        countryName: countryData.countryName,
        currency: countryData.currency,
        symbol: countryData.symbol
      };
      setCountryInfo(info);
      saveToStorage(info);
      cachedCountryInfo = info;
    } catch (err) {
      console.error('Failed to set manual country:', err);
      setError('Invalid country code');
    }
  }, [saveToStorage]);

  // Fetch country from IP
  const fetchFromIp = useCallback(async (): Promise<CountryInfo | null> => {
    try {
      // Add timeout to avoid hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch('https://ipapi.co/json/', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: IpApiResponse = await response.json();
      
      if (data?.country_code) {
        // Use our pricing service to get proper country info
        const countryData = getCountryInfo(data.country_code);
        return {
          countryCode: data.country_code,
          countryName: countryData.countryName,
          currency: countryData.currency,
          symbol: countryData.symbol
        };
      }
      
      return null;
    } catch (err) {
      console.log('IP detection failed, will use fallback:', err);
      return null;
    }
  }, []);

  // Main detection logic
  const detectCountry = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Check cache first
      if (cachedCountryInfo) {
        setCountryInfo(cachedCountryInfo);
        setIsLoading(false);
        return;
      }

      // 2. Check localStorage (user preference)
      const stored = loadFromStorage();
      if (stored) {
        setCountryInfo(stored);
        cachedCountryInfo = stored;
        setIsLoading(false);
        return;
      }

      // 3. Try IP detection
      const ipInfo = await fetchFromIp();
      if (ipInfo) {
        setCountryInfo(ipInfo);
        saveToStorage(ipInfo);
        cachedCountryInfo = ipInfo;
        setIsLoading(false);
        return;
      }

      // 4. Use browser locale as fallback
      const browserLocale = navigator.language || 'en-GB';
      const localeCountry = browserLocale.split('-')[1]?.toUpperCase();
      
      if (localeCountry) {
        try {
          const countryData = getCountryInfo(localeCountry);
          const localeInfo: CountryInfo = {
            countryCode: localeCountry,
            countryName: countryData.countryName,
            currency: countryData.currency,
            symbol: countryData.symbol
          };
          setCountryInfo(localeInfo);
          cachedCountryInfo = localeInfo;
          setIsLoading(false);
          return;
        } catch (err) {
          // Locale country not in our list, continue to default
        }
      }

      // 5. Final fallback: UK
      const defaultInfo: CountryInfo = {
        countryCode: 'GB',
        countryName: 'United Kingdom',
        currency: 'GBP',
        symbol: '£'
      };
      setCountryInfo(defaultInfo);
      cachedCountryInfo = defaultInfo;

    } catch (err) {
      console.error('Country detection failed:', err);
      setError('Failed to detect country');
      
      // Fallback to UK
      const defaultInfo: CountryInfo = {
        countryCode: 'GB',
        countryName: 'United Kingdom',
        currency: 'GBP',
        symbol: '£'
      };
      setCountryInfo(defaultInfo);
      cachedCountryInfo = defaultInfo;
    } finally {
      setIsLoading(false);
    }
  }, [fetchFromIp, loadFromStorage, saveToStorage]);

  useEffect(() => {
    detectCountry();
  }, [detectCountry]);

  // Reset to auto-detection
  const resetToAutoDetect = useCallback(async () => {
    localStorage.removeItem('preferredCountry');
    cachedCountryInfo = null;
    await detectCountry();
  }, [detectCountry]);

  return {
    countryInfo,
    isLoading,
    error,
    setManualCountry,
    resetToAutoDetect
  };
};

// Helper hook for country selection UI
export const useCountrySelector = () => {
  const [countries, setCountries] = useState<Array<{
    code: string;
    name: string;
    currency: string;
    symbol: string;
    region?: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCountries = () => {
      try {
        const allCountries = getAllCountries();
        
        // Group by region for better UX
        const grouped = allCountries.sort((a, b) => {
          // Sort by region then name
          const regionOrder = ['Europe', 'North America', 'Asia', 'Middle East', 'Africa', 'South America', 'Oceania'];
          const getRegion = (code: string) => {
            // Simple region detection based on country code ranges
            if (code === 'GB' || code.startsWith('EU') || ['DE', 'FR', 'IT', 'ES'].includes(code)) return 'Europe';
            if (code === 'US' || code === 'CA' || code === 'MX') return 'North America';
            if (['AU', 'NZ'].includes(code)) return 'Oceania';
            if (['CN', 'JP', 'KR', 'IN'].includes(code)) return 'Asia';
            if (['AE', 'SA', 'QA'].includes(code)) return 'Middle East';
            if (['ZA', 'NG', 'KE'].includes(code)) return 'Africa';
            if (['BR', 'AR', 'CL'].includes(code)) return 'South America';
            return 'Other';
          };
          
          const regionA = getRegion(a.code);
          const regionB = getRegion(b.code);
          
          if (regionA !== regionB) {
            return regionOrder.indexOf(regionA) - regionOrder.indexOf(regionB);
          }
          
          return a.name.localeCompare(b.name);
        });
        
        setCountries(grouped);
      } catch (err) {
        console.error('Failed to load countries:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCountries();
  }, []);

  return {
    countries,
    isLoading
  };
};

