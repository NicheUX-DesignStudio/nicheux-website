// src/hooks/useCountryPricing.ts - CORRECTED VERSION
import { useState, useEffect } from 'react';
import { 
  getPriceRange, 
  getCountryInfo, 
  getAllCountries,
  getServiceById, // Import the missing function
  formatPrice // Import formatPrice from pricingService
} from '../utils/pricingService';

interface UseCountryPricingReturn {
  getServicePrice: (serviceName: string, isAnnual?: boolean) => string;
  getServiceStartsAtPrice: (serviceName: string, isAnnual?: boolean) => string;
  getServiceFullRange: (serviceName: string, isAnnual?: boolean) => string;
  countryInfo: any;
  isLoading: boolean;
  userCountry: string;
  setCountry: (countryCode: string) => void;
  availableCountries: any[];
}

export const useCountryPricing = (): UseCountryPricingReturn => {
  const [userCountry, setUserCountry] = useState<string>('GB');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [availableCountries, setAvailableCountries] = useState<any[]>([]);
  const [countryInfo, setCountryInfo] = useState<any>(null);

  // Load available countries
  useEffect(() => {
    try {
      const countries = getAllCountries();
      setAvailableCountries(countries);
    } catch (err) {
      console.error('Failed to load countries:', err);
      setAvailableCountries([]);
    }
  }, []);

  // Load country info
  useEffect(() => {
    if (userCountry) {
      try {
        const info = getCountryInfo(userCountry);
        setCountryInfo(info);
      } catch (err) {
        console.error('Failed to load country info:', err);
        setCountryInfo(null);
      }
    }
  }, [userCountry]);

  // Simple country detection
  useEffect(() => {
    const detectCountry = async () => {
      setIsLoading(true);
      
      try {
        // Check localStorage
        const savedCountry = localStorage.getItem('userCountry');
        if (savedCountry) {
          const countries = getAllCountries();
          const isValidCountry = countries.some(c => c.code === savedCountry);
          if (isValidCountry) {
            setUserCountry(savedCountry);
            setIsLoading(false);
            return;
          }
        }
        
        // Try IP detection
        try {
          const response = await fetch('https://ipapi.co/json/');
          if (response.ok) {
            const data = await response.json();
            if (data?.country_code) {
              const countryCode = data.country_code.toUpperCase();
              const countries = getAllCountries();
              const isValidCountry = countries.some(c => c.code === countryCode);
              if (isValidCountry) {
                setUserCountry(countryCode);
                localStorage.setItem('userCountry', countryCode);
              }
            }
          }
        } catch (ipError) {
          console.log('IP detection failed');
        }
      } catch (error) {
        console.error('Country detection failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    detectCountry();
  }, []);

  const getServiceKey = (serviceName: string): string => {
    // Simple mapping - expand as needed
    const serviceMap: Record<string, string> = {
      'Logo Design': 'Logo Design',
      'Hand-Built Website': 'Hand-Built Website',
      'Custom merchify Store': 'Custom merchify Store',
      'Social Media Starter Plan': 'Social Media Starter Plan',
      '30s Explainer Video': '30s Explainer Video',
      'Single Character Design': 'Single Character Design',
      // Add more mappings as needed
    };
    
    return serviceMap[serviceName.trim()] || serviceName;
  };

  // Main function - shows "Starts at" price
  const getServicePrice = (serviceName: string, isAnnual: boolean = false): string => {
    if (isLoading) return 'Loading...';
    
    const serviceKey = getServiceKey(serviceName);
    if (!serviceKey) return 'Price on request';
    
    try {
      return getPriceRange(serviceKey, userCountry, isAnnual);
    } catch (err) {
      console.error(`Failed to get price for ${serviceKey}:`, err);
      return 'Price on request';
    }
  };

  // Alias for getServicePrice (same function)
  const getServiceStartsAtPrice = getServicePrice;

  // Optional: Get full range if needed (for internal calculations)
  const getServiceFullRange = (serviceName: string, isAnnual: boolean = false): string => {
    if (isLoading) return 'Loading...';
    
    const serviceKey = getServiceKey(serviceName);
    if (!serviceKey) return 'Price on request';
    
    try {
      const pricing = getCountryInfo(userCountry);
      const service = getServiceById(serviceKey, userCountry);
      
      if (!service) return 'Price on request';
      if (service.pricingType === 'free') return 'Free';
      
      const applyDiscount = (price: number): number => isAnnual ? Math.round(price * 0.85) : price;
      const minPrice = applyDiscount(service.min);
      const maxPrice = service.max === service.min ? minPrice : applyDiscount(service.max);
      
      if (service.min === service.max) {
        return formatPrice(minPrice, pricing.currency, pricing.symbol, 'fixed');
      }
      
      return `${formatPrice(minPrice, pricing.currency, pricing.symbol, 'fixed')} - ${formatPrice(maxPrice, pricing.currency, pricing.symbol, 'fixed')}`;
    } catch (err) {
      console.error(`Failed to get full range for ${serviceKey}:`, err);
      return 'Price on request';
    }
  };

  const setCountry = (countryCode: string) => {
    const countries = getAllCountries();
    const isValidCountry = countries.some(c => c.code === countryCode);
    
    if (isValidCountry) {
      setUserCountry(countryCode);
      localStorage.setItem('userCountry', countryCode);
    } else {
      console.error(`Invalid country code: ${countryCode}`);
    }
  };

  return {
    getServicePrice, // Shows "Starts at £XXX"
    getServiceStartsAtPrice, // Same as above
    getServiceFullRange, // For internal use if needed
    countryInfo,
    isLoading,
    userCountry,
    setCountry,
    availableCountries
  };
};