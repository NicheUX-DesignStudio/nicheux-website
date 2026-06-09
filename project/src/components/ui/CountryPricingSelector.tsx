"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useCountryPricing } from "@/hooks/useCountryPricing";

// ── All major markets, grouped by region ────────────────────────────────────
export const COUNTRY_GROUPS = [
  {
    region: "UK & Ireland",
    countries: [
      { code: "GB", name: "United Kingdom", symbol: "£", flag: "🇬🇧" },
      { code: "IE", name: "Ireland",         symbol: "€", flag: "🇮🇪" },
    ],
  },
  {
    region: "Europe",
    countries: [
      { code: "DE", name: "Germany",         symbol: "€",   flag: "🇩🇪" },
      { code: "FR", name: "France",          symbol: "€",   flag: "🇫🇷" },
      { code: "NL", name: "Netherlands",     symbol: "€",   flag: "🇳🇱" },
      { code: "CH", name: "Switzerland",     symbol: "CHF", flag: "🇨🇭" },
      { code: "SE", name: "Sweden",          symbol: "kr",  flag: "🇸🇪" },
      { code: "NO", name: "Norway",          symbol: "kr",  flag: "🇳🇴" },
      { code: "DK", name: "Denmark",         symbol: "kr",  flag: "🇩🇰" },
      { code: "FI", name: "Finland",         symbol: "€",   flag: "🇫🇮" },
      { code: "BE", name: "Belgium",         symbol: "€",   flag: "🇧🇪" },
      { code: "AT", name: "Austria",         symbol: "€",   flag: "🇦🇹" },
      { code: "IT", name: "Italy",           symbol: "€",   flag: "🇮🇹" },
      { code: "ES", name: "Spain",           symbol: "€",   flag: "🇪🇸" },
      { code: "PT", name: "Portugal",        symbol: "€",   flag: "🇵🇹" },
      { code: "PL", name: "Poland",          symbol: "zł",  flag: "🇵🇱" },
      { code: "CZ", name: "Czech Republic",  symbol: "Kč",  flag: "🇨🇿" },
      { code: "HU", name: "Hungary",         symbol: "Ft",  flag: "🇭🇺" },
      { code: "RO", name: "Romania",         symbol: "lei", flag: "🇷🇴" },
      { code: "GR", name: "Greece",          symbol: "€",   flag: "🇬🇷" },
      { code: "LU", name: "Luxembourg",      symbol: "€",   flag: "🇱🇺" },
      { code: "EE", name: "Estonia",         symbol: "€",   flag: "🇪🇪" },
      { code: "LV", name: "Latvia",          symbol: "€",   flag: "🇱🇻" },
      { code: "LT", name: "Lithuania",       symbol: "€",   flag: "🇱🇹" },
      { code: "SK", name: "Slovakia",        symbol: "€",   flag: "🇸🇰" },
      { code: "HR", name: "Croatia",         symbol: "€",   flag: "🇭🇷" },
      { code: "SI", name: "Slovenia",        symbol: "€",   flag: "🇸🇮" },
    ],
  },
  {
    region: "Asia Pacific",
    countries: [
      { code: "IN", name: "India",           symbol: "₹",   flag: "🇮🇳" },
      { code: "MY", name: "Malaysia",        symbol: "RM",  flag: "🇲🇾" },
      { code: "SG", name: "Singapore",       symbol: "S$",  flag: "🇸🇬" },
      { code: "AU", name: "Australia",       symbol: "A$",  flag: "🇦🇺" },
      { code: "NZ", name: "New Zealand",     symbol: "NZ$", flag: "🇳🇿" },
      { code: "JP", name: "Japan",           symbol: "¥",   flag: "🇯🇵" },
      { code: "KR", name: "South Korea",     symbol: "₩",   flag: "🇰🇷" },
      { code: "HK", name: "Hong Kong",       symbol: "HK$", flag: "🇭🇰" },
      { code: "TW", name: "Taiwan",          symbol: "NT$", flag: "🇹🇼" },
      { code: "PH", name: "Philippines",     symbol: "₱",   flag: "🇵🇭" },
      { code: "ID", name: "Indonesia",       symbol: "Rp",  flag: "🇮🇩" },
      { code: "TH", name: "Thailand",        symbol: "฿",   flag: "🇹🇭" },
      { code: "VN", name: "Vietnam",         symbol: "₫",   flag: "🇻🇳" },
      { code: "BD", name: "Bangladesh",      symbol: "৳",   flag: "🇧🇩" },
      { code: "LK", name: "Sri Lanka",       symbol: "රු",  flag: "🇱🇰" },
      { code: "PK", name: "Pakistan",        symbol: "₨",   flag: "🇵🇰" },
      { code: "CN", name: "China",           symbol: "¥",   flag: "🇨🇳" },
      { code: "BN", name: "Brunei",          symbol: "B$",  flag: "🇧🇳" },
    ],
  },
  {
    region: "North America",
    countries: [
      { code: "US", name: "United States",   symbol: "$",   flag: "🇺🇸" },
      { code: "CA", name: "Canada",          symbol: "C$",  flag: "🇨🇦" },
      { code: "MX", name: "Mexico",          symbol: "$",   flag: "🇲🇽" },
    ],
  },
  {
    region: "Latin America",
    countries: [
      { code: "BR", name: "Brazil",          symbol: "R$",  flag: "🇧🇷" },
      { code: "AR", name: "Argentina",       symbol: "$",   flag: "🇦🇷" },
      { code: "CO", name: "Colombia",        symbol: "$",   flag: "🇨🇴" },
      { code: "CL", name: "Chile",           symbol: "$",   flag: "🇨🇱" },
      { code: "PE", name: "Peru",            symbol: "S/",  flag: "🇵🇪" },
      { code: "UY", name: "Uruguay",         symbol: "$",   flag: "🇺🇾" },
      { code: "EC", name: "Ecuador",         symbol: "$",   flag: "🇪🇨" },
      { code: "BO", name: "Bolivia",         symbol: "Bs.", flag: "🇧🇴" },
      { code: "PY", name: "Paraguay",        symbol: "₲",   flag: "🇵🇾" },
      { code: "VE", name: "Venezuela",       symbol: "Bs.", flag: "🇻🇪" },
    ],
  },
  {
    region: "Middle East",
    countries: [
      { code: "AE", name: "UAE",             symbol: "د.إ", flag: "🇦🇪" },
      { code: "SA", name: "Saudi Arabia",    symbol: "﷼",   flag: "🇸🇦" },
      { code: "QA", name: "Qatar",           symbol: "ر.ق", flag: "🇶🇦" },
      { code: "KW", name: "Kuwait",          symbol: "د.ك", flag: "🇰🇼" },
      { code: "BH", name: "Bahrain",         symbol: ".د.ب",flag: "🇧🇭" },
      { code: "OM", name: "Oman",            symbol: "ر.ع.",flag: "🇴🇲" },
      { code: "TR", name: "Turkey",          symbol: "₺",   flag: "🇹🇷" },
      { code: "IL", name: "Israel",          symbol: "₪",   flag: "🇮🇱" },
      { code: "JO", name: "Jordan",          symbol: "د.ا", flag: "🇯🇴" },
      { code: "EG", name: "Egypt",           symbol: "ج.م", flag: "🇪🇬" },
    ],
  },
  {
    region: "Africa",
    countries: [
      { code: "ZA", name: "South Africa",    symbol: "R",   flag: "🇿🇦" },
      { code: "NG", name: "Nigeria",         symbol: "₦",   flag: "🇳🇬" },
      { code: "KE", name: "Kenya",           symbol: "KSh", flag: "🇰🇪" },
      { code: "GH", name: "Ghana",           symbol: "GH₵", flag: "🇬🇭" },
      { code: "MA", name: "Morocco",         symbol: "د.م.",flag: "🇲🇦" },
      { code: "TZ", name: "Tanzania",        symbol: "TSh", flag: "🇹🇿" },
      { code: "ET", name: "Ethiopia",        symbol: "Br",  flag: "🇪🇹" },
      { code: "UG", name: "Uganda",          symbol: "USh", flag: "🇺🇬" },
      { code: "RW", name: "Rwanda",          symbol: "RF",  flag: "🇷🇼" },
    ],
  },
];

const ALL_COUNTRIES = COUNTRY_GROUPS.flatMap(g => g.countries);

// ── Component ─────────────────────────────────────────────────────────────────
export default function CountryPricingSelector() {
  const { userCountry, setCountry, isLoading } = useCountryPricing();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const selected = ALL_COUNTRIES.find(c => c.code === userCountry) ?? ALL_COUNTRIES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = search.trim()
    ? ALL_COUNTRIES.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.symbol.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  return (
    <div
      ref={ref}
      style={{ position: "fixed", top: 88, right: 20, zIndex: 500, fontFamily: "'Source Sans Pro', sans-serif" }}
    >
      {/* Trigger */}
      <button
        onClick={() => { setOpen(o => !o); setSearch(""); }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "7px 12px",
          background: "rgba(10,10,10,0.85)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 6,
          cursor: "pointer",
          color: "#fff",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.04em",
          whiteSpace: "nowrap",
        }}
      >
        <Globe size={13} style={{ color: "#EBC773", flexShrink: 0 }} />
        <span>{isLoading ? "Detecting…" : `${selected.flag} ${selected.symbol}`}</span>
        <ChevronDown
          size={12}
          style={{
            color: "rgba(255,255,255,0.5)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            width: 260,
            maxHeight: 400,
            background: "rgba(10,10,10,0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Search */}
          <div style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <input
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search country…"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 4,
                padding: "6px 10px",
                color: "#fff",
                fontSize: 12,
                outline: "none",
                fontFamily: "'Source Sans Pro', sans-serif",
              }}
            />
          </div>

          {/* List */}
          <div style={{ overflowY: "auto", flex: 1 }}>
            {filtered ? (
              <div style={{ padding: "4px 0" }}>
                {filtered.length === 0 ? (
                  <div style={{ padding: "12px 16px", fontSize: 12, color: "rgba(255,255,255,0.35)", textAlign: "center" }}>
                    No country found
                  </div>
                ) : (
                  filtered.map(c => (
                    <CountryOption
                      key={c.code}
                      country={c}
                      selected={c.code === userCountry}
                      onSelect={() => { setCountry(c.code); setOpen(false); }}
                    />
                  ))
                )}
              </div>
            ) : (
              COUNTRY_GROUPS.map(group => (
                <div key={group.region}>
                  <div style={{
                    padding: "8px 14px 4px",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "#EBC773",
                    borderTop: "1px solid rgba(255,255,255,0.04)",
                  }}>
                    {group.region}
                  </div>
                  {group.countries.map(c => (
                    <CountryOption
                      key={c.code}
                      country={c}
                      selected={c.code === userCountry}
                      onSelect={() => { setCountry(c.code); setOpen(false); }}
                    />
                  ))}
                </div>
              ))
            )}
          </div>

          {/* Footer note */}
          <div style={{
            padding: "8px 14px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            fontSize: 10,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.06em",
          }}>
            Prices shown in your local currency
          </div>
        </div>
      )}
    </div>
  );
}

function CountryOption({
  country,
  selected,
  onSelect,
}: {
  country: { code: string; name: string; symbol: string; flag: string };
  selected: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "7px 14px",
        background: selected ? "rgba(235,199,115,0.08)" : hovered ? "rgba(255,255,255,0.04)" : "transparent",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        transition: "background 0.15s ease",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 14, lineHeight: 1 }}>{country.flag}</span>
        <span style={{
          fontSize: 12,
          color: selected ? "#EBC773" : "rgba(255,255,255,0.75)",
          fontFamily: "'Source Sans Pro', sans-serif",
          fontWeight: selected ? 600 : 400,
        }}>
          {country.name}
        </span>
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{
          fontSize: 11,
          color: selected ? "#EBC773" : "rgba(255,255,255,0.35)",
          fontFamily: "'Source Sans Pro', sans-serif",
          letterSpacing: "0.03em",
        }}>
          {country.symbol}
        </span>
        {selected && <Check size={11} style={{ color: "#EBC773" }} />}
      </span>
    </button>
  );
}
