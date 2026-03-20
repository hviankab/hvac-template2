export interface NavItem {
  title: string
  href: string
  children?: NavItem[]
}

export interface ServiceCategory {
  title: string
  icon: string
  items: { title: string; href: string }[]
}

export interface MegaMenuItem {
  title: string
  href: string
  categories: ServiceCategory[]
}

// Utility links (top-right area)
export const utilityNavItems: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "About Us",
    href: "/about",
    children: [
      { title: "Specials and Offers", href: "/specials-and-offers" },
    ],
  },
  { title: "Contact Us", href: "/contact" },
  { title: "Careers", href: "/careers" },
  {
    title: "Service Areas",
    href: "#",
    children: [
      { title: "Santa Monica", href: "/santa-monica" },
      { title: "Pasadena", href: "/pasadena" },
      { title: "Glendale", href: "/glendale" },
    ],
  },
]

// Quick action items
export const quickActions = [
  { title: "Maintenance Plan", href: "/maintenance-plan", icon: "settings" },
  { title: "Financing", href: "/financing", icon: "dollar" },
]

// Primary service navigation with mega menu categories
export const mainNavItems: MegaMenuItem[] = [
  {
    title: "Air Conditioning Services",
    href: "/air-conditioning",
    categories: [
      {
        title: "AC Services",
        icon: "snowflake",
        items: [
          { title: "AC Repair", href: "/air-conditioning/ac-repair" },
          { title: "AC Installation and Replacement", href: "/air-conditioning/ac-installation-replacement" },
        ],
      },
    ],
  },
  {
    title: "Emergency HVAC",
    href: "/emergency",
    categories: [
      {
        title: "Emergency HVAC Services",
        icon: "alert",
        items: [
          { title: "24/7 AC Repairs", href: "/emergency/24-7-ac-repairs" },
          { title: "24/7 Emergency Repairs", href: "/emergency/24-7-emergency-repairs" },
        ],
      },
    ],
  },
  {
    title: "Commercial",
    href: "/commercial",
    categories: [
      {
        title: "Commercial HVAC Services",
        icon: "building",
        items: [
          { title: "HVAC Repair", href: "/commercial/hvac-repair" },
          { title: "HVAC Installation", href: "/commercial/hvac-installation" },
        ],
      },
    ],
  },
]
