// ===========================================
// SITE CONFIGURATION
// Update this file with client information
// All components will automatically use these values
// ===========================================

export const siteConfig = {
  // Business Information
  business: {
    name: "HVAC Template",
    fullName: "ABC Company Heating and Cooling",
    tagline: "Heating and Cooling",
    description: "Professional HVAC Services",
  },

  // Location
  location: {
    city: "New York",
    state: "SC",
    address: "3648 Rorance Road",
    fullAddress: "3648 Rorance Road, New York, SC 29170",
  },

  // Contact
  contact: {
    email: "dealer@domain.com",
    phone: "0123456789",
    phoneFormatted: "012-345-6789",
  },

  // Brand Colors (used in CSS variables)
  colors: {
    primary: "#000001",      // Most dominant - text, headers
    secondary: "#F7B32B",    // Semi dominant - buttons, highlights, accent
    tertiary: "#ece9f9",     // Subtle accent - muted backgrounds
    quaternary: "#faf9fe",   // Subtle accent - page background
    accent: "#2264ac",       // Secondary accent - darkish blue
    highlight: "#A9E5BB",    // Hover color for buttons
  },

  // Logo
  logo: {
    src: "/images/download (94).avif",
    alt: "HVAC Logo",
  },

  // Social Media (optional)
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  },

  // SEO
  seo: {
    siteName: "HVAC Template 2",
    defaultTitle: "Acme Inc. | Digital Marketing in Denver",
    defaultDescription: "Denver's trusted digital marketing agency. Indoor billboard ads, web design, PPC, social media & Connected TV. Free consultation!",
    keywords: "digital marketing Denver, local advertising Denver, indoor billboard advertising, website design Denver, PPC advertising, social media management, Connected TV advertising, OTT ads, geofencing, local SEO Denver",
    siteUrl: "https://acmeinc.com", // Update with actual domain
    ogImage: "https://acmeinc.com/og-image.jpg", // Update with actual OG image
    twitterHandle: "@acmeinc",
  },

  // Template Info
  template: {
    id: "8",
    name: "Progressive Section Layout",
  },
}

// Helper to get location-aware text
export function getLocationText(text: string): string {
  return text
    .replaceAll("{city}", siteConfig.location.city)
    .replaceAll("{state}", siteConfig.location.state)
    .replaceAll("{business}", siteConfig.business.name)
    .replaceAll("{fullName}", siteConfig.business.fullName)
}

// Process an array of strings through getLocationText
export function processLocationArray(arr: string[]): string[] {
  return arr.map(getLocationText)
}
