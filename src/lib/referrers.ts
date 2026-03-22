export const referrersList: Record<string, string> = {
  "t.co": "X (fka Twitter)",
  "t.me": "Telegram",
  "l.instagram.com": "Instagram",
  "l.facebook.com": "Facebook",
  "lnkd.in": "LinkedIn",
  "com.linkedin.android": "LinkedIn",
  "wa.me": "WhatsApp",
  "bit.ly": "Bitly",
  "tinyurl.com": "TinyURL",
  "ow.ly": "Hootsuite",
  "buff.ly": "Buffer",
};

export const referrerLogos: Record<string, string> = {
  "twitter": "/referrers/x (fka twitter).png",
  "instagram": "/referrers/instagram.png",
  "facebook": "/referrers/facebook.png",
  "linkedin": "/referrers/linkedin.png",
};

export function getReferrerName(referrer: string): string {
  // Check exact match first
  if (referrersList[referrer]) {
    return referrersList[referrer];
  }
  
  // Check if referrer contains any of the keys
  for (const [key, value] of Object.entries(referrersList)) {
    if (referrer.includes(key)) {
      return value;
    }
  }
  
  // Return original if no match found
  return referrer;
}

export function getReferrerLogo(referrer: string): string | null {
  const name = getReferrerName(referrer).toLowerCase().replace(/\s+/g, '');
  
  // Try to match by name
  for (const [key, logoPath] of Object.entries(referrerLogos)) {
    if (name.includes(key)) {
      return logoPath;
    }
  }
  
  // Try to match by original referrer
  for (const [domain, name] of Object.entries(referrersList)) {
    if (referrer.includes(domain)) {
      const logoKey = name.toLowerCase().replace(/\s+/g, '');
      if (referrerLogos[logoKey]) {
        return referrerLogos[logoKey];
      }
    }
  }
  
  return null;
}