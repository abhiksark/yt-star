import type { Country } from "./types";

export const countryNames: Record<string, string> = {
  'US': 'United States',
  'GB': 'United Kingdom',
  'IN': 'India',
  'CA': 'Canada',
  'AU': 'Australia',
  'DE': 'Germany',
  'FR': 'France',
  'ES': 'Spain',
  'IT': 'Italy',
  'NL': 'Netherlands',
  'SE': 'Sweden',
  'NO': 'Norway',
  'DK': 'Denmark',
  'FI': 'Finland',
  'IE': 'Ireland',
  'BR': 'Brazil',
  'JP': 'Japan',
  'CN': 'China',
  'KR': 'South Korea',
  'SG': 'Singapore',
  'MY': 'Malaysia',
  'NZ': 'New Zealand',
  'ZA': 'South Africa',
  'IL': 'Israel',
  'AE': 'United Arab Emirates',
  'PK': 'Pakistan',
  'BD': 'Bangladesh',
  'LK': 'Sri Lanka',
  'NP': 'Nepal',
  'ID': 'Indonesia',
  'PH': 'Philippines',
  'TH': 'Thailand',
  'VN': 'Vietnam',
};

export function getCountryName(code: string): string {
  if (!code) return 'Unknown';
  const normalizedCode = code.toUpperCase().trim();
  return countryNames[normalizedCode] || code;
}

export function getCountrySlug(code: string): string {
  if (!code) return 'unknown';
  const normalizedCode = code.toUpperCase().trim();
  const name = countryNames[normalizedCode];
  if (!name) return 'unknown';
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export function getCountryFromSlug(slug: string): string | undefined {
  if (!slug) return undefined;
  const normalizedSlug = slug.toLowerCase().trim();
  
  // Find the country code by matching the slug against normalized country names
  for (const [code, name] of Object.entries(countryNames)) {
    if (name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === normalizedSlug) {
      return code;
    }
  }
  
  return undefined;
}

export function getCountryBySlug(slug: string): { code: string; name: string } | undefined {
  const countryCode = getCountryFromSlug(slug);
  if (!countryCode) return undefined;
  
  return {
    code: countryCode,
    name: countryNames[countryCode],
  };
}

export function isValidCountryCode(code: string): boolean {
  if (!code) return false;
  const normalizedCode = code.toUpperCase().trim();
  return normalizedCode in countryNames;
}