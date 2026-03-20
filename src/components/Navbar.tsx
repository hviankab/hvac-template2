import * as React from "react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Menu, ChevronDown, ChevronRight, Phone, MapPin, Mail,
  Facebook, Twitter, Youtube, Instagram,
  Settings, DollarSign,
  Snowflake, Flame, Wind, Building, AlertCircle,
} from "lucide-react"
import { utilityNavItems, mainNavItems, quickActions, type MegaMenuItem } from "@/config/navigation"
import { siteConfig } from "@/config/site"

/* ─── Top utility bar ─── */
function UtilityBar() {
  return (
    <div className="hidden lg:block text-white text-sm" style={{backgroundColor: "#341C1C"}}>
      <div className="container mx-auto px-6 flex items-center justify-between h-12">
        {/* Left: social icons */}
        <div className="flex items-center gap-4">
          <a href={siteConfig.social.facebook || "#"} aria-label="Facebook" className="hover:text-brand-secondary transition-colors"><Facebook className="w-5 h-5" /></a>
          <a href={siteConfig.social.twitter || "#"} aria-label="Twitter" className="hover:text-brand-secondary transition-colors"><Twitter className="w-5 h-5" /></a>
          <a href={siteConfig.social.youtube || "#"} aria-label="YouTube" className="hover:text-brand-secondary transition-colors"><Youtube className="w-5 h-5" /></a>
          <a href={siteConfig.social.instagram || "#"} aria-label="Instagram" className="hover:text-brand-secondary transition-colors"><Instagram className="w-5 h-5" /></a>
        </div>
        {/* Right: location + email */}
        <div className="flex items-center gap-8">
          <span className="flex items-center gap-2 text-white/80">
            <MapPin className="w-4 h-4 text-brand-secondary flex-shrink-0" />
            {siteConfig.location.fullAddress}
          </span>
          <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 text-white/80 hover:text-brand-secondary transition-colors">
            <Mail className="w-4 h-4 text-brand-secondary flex-shrink-0" />
            {siteConfig.contact.email}
          </a>
        </div>
      </div>
    </div>
  )
}

/* ─── Services mega dropdown ─── */
function ServicesDropdown({ isActive, onHover, onLeave }: { isActive: boolean; onHover: () => void; onLeave: () => void }) {
  const [activeItem, setActiveItem] = React.useState<string | null>(null)
  const btnRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (btnRef.current) {
      btnRef.current.style.backgroundColor = ''
      btnRef.current.style.color = ''
    }
  }, [isActive])

  return (
    <div className="relative flex items-center" onMouseEnter={onHover} onMouseLeave={onLeave}>
      <button
        ref={btnRef}
        className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-base font-medium whitespace-nowrap transition-all nav-services-btn ${
          isActive ? "bg-[#A9E5BB] text-gray-900 shadow-sm" : "text-gray-900"
        }`}
        onMouseEnter={e => { if (!isActive) { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = '#A9E5BB'; el.style.color = '#1a1a1a'; }}}
        onMouseLeave={e => { if (!isActive) { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = ''; el.style.color = ''; }}}
      >
        Services
        <ChevronDown className={`h-3 w-3 transition-transform ${isActive ? "rotate-180" : ""}`} />
      </button>
      {isActive && (
        <div className="absolute top-full left-0 pt-3 z-[90] flex">
          {/* Parent list */}
          <div className="bg-white shadow-lg border border-gray-100 rounded-xl overflow-hidden min-w-[240px]">
            {mainNavItems.map((item, i) => (
              <div
                key={item.href}
                className={`flex items-center justify-between px-5 py-3 text-sm cursor-pointer transition-colors ${
                  activeItem === item.href ? "bg-gray-50 text-brand-secondary" : "text-gray-700 hover:bg-gray-50 hover:text-brand-secondary"
                } ${i !== 0 ? "border-t border-gray-100" : ""}`}
                onMouseEnter={() => setActiveItem(item.href)}
              >
                <a href={item.href} className="flex-1">{item.title}</a>
                {item.categories[0]?.items.length > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
          {/* Children panel */}
          {activeItem && (() => {
            const active = mainNavItems.find(i => i.href === activeItem)
            if (!active) return null
            const items = active.categories.flatMap(c => c.items)
            return (
              <div className="bg-white shadow-lg border border-gray-100 rounded-xl overflow-hidden min-w-[220px] ml-1">
                {items.map((child, i) => (
                  <a
                    key={child.href}
                    href={child.href}
                    className={`block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-secondary transition-colors nav-dropdown-item ${i !== 0 ? "border-t border-gray-100" : ""}`}
                  >
                    {child.title}
                  </a>
                ))}
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}


/* ─── Service Areas dropdown ─── */
function ServiceAreasDropdown({ isActive, onHover, onLeave }: { isActive: boolean; onHover: () => void; onLeave: () => void }) {
  const areas = [
    { title: "Santa Monica", href: "/santa-monica" },
    { title: "Pasadena", href: "/pasadena" },
    { title: "Glendale", href: "/glendale" },
  ]
  const btnRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (btnRef.current) {
      btnRef.current.style.backgroundColor = ''
      btnRef.current.style.color = ''
    }
  }, [isActive])

  return (
    <div className="relative flex items-center" onMouseEnter={onHover} onMouseLeave={onLeave}>
      <button
        ref={btnRef}
        className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all nav-areas-btn ${
          isActive ? "bg-[#A9E5BB] text-gray-900 shadow-sm" : "text-gray-900"
        }`}
        onMouseEnter={e => { if (!isActive) { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = '#A9E5BB'; el.style.color = '#1a1a1a'; }}}
        onMouseLeave={e => { if (!isActive) { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = ''; el.style.color = ''; }}}
      >
        Service Areas
        <ChevronDown className={`h-3 w-3 transition-transform ${isActive ? "rotate-180" : ""}`} />
      </button>
      {isActive && (
        <div className="absolute top-full left-0 pt-3 z-[90]">
          <div className="bg-white shadow-lg border border-gray-100 rounded-xl overflow-hidden min-w-[200px]">
            {areas.map((area, i) => (
              <a
                key={area.href}
                href={area.href}
                className={`block px-5 py-3 text-sm text-gray-700 nav-dropdown-item hover:bg-gray-50 hover:text-brand-secondary transition-colors ${i !== 0 ? "border-t border-gray-100" : ""}`}
              >
                {area.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
function NavLink({ title, href }: { title: string; href: string }) {
  return (
    <a
      href={href}
      className="px-4 py-1.5 rounded-full text-base font-medium whitespace-nowrap text-gray-900 transition-all nav-pill-link"
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = '#A9E5BB'; el.style.color = '#1a1a1a'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = ''; el.style.color = ''; }}    >
      {title}
    </a>
  )
}

/* ─── Main Navbar ─── */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [servicesOpen, setServicesOpen] = React.useState(false)
  const [areasOpen, setAreasOpen] = React.useState(false)
  const areasCloseTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleAreasHover = () => {
    if (areasCloseTimer.current) clearTimeout(areasCloseTimer.current)
    setAreasOpen(true)
  }
  const handleAreasLeave = () => {
    areasCloseTimer.current = setTimeout(() => setAreasOpen(false), 150)
  }

  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleServicesHover = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setServicesOpen(true)
  }
  const handleServicesLeave = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150)
  }

  return (
    <header className="sticky top-0 z-[100] w-full" style={{ "--navbar-height": "108px" } as React.CSSProperties}>
      <style>{`
        .nav-highlight-btn:hover { background-color: #A9E5BB !important; color: #1a1a1a !important; }
        .nav-pill-link:hover { background-color: #A9E5BB !important; color: #1a1a1a !important; }
        .nav-services-btn:hover, .nav-areas-btn:hover { color: #1a1a1a !important; }
        .nav-services-btn:hover *, .nav-areas-btn:hover * { color: #1a1a1a !important; }
        .nav-dropdown-item:hover { color: #1a1a1a !important; }
        .nav-dropdown-item:hover * { color: #1a1a1a !important; }
      `}</style>      {/* Row 1: Utility bar */}
      <UtilityBar />

      {/* Row 2: Main nav */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex h-16 items-center justify-between gap-4">

            {/* Logo */}
            <a href="/" className="flex items-center flex-shrink-0" aria-label={`${siteConfig.business.name} - Home`}>
              <img src={siteConfig.logo.src} alt={siteConfig.logo.alt} className="h-16 object-contain" height={64} decoding="async" loading="eager" />
            </a>

            {/* Center pill nav */}
            <nav className="hidden lg:flex items-center bg-gray-100/80 rounded-full px-2 py-1.5 gap-0.5">
              <NavLink title="Home" href="/" />
              <NavLink title="About Us" href="/about" />
              <ServicesDropdown isActive={servicesOpen} onHover={handleServicesHover} onLeave={handleServicesLeave} />
              <a href="/maintenance-plan" className="px-4 py-1.5 rounded-full text-base font-semibold whitespace-nowrap transition-all bg-[#F7B32B] text-black hover:bg-[#A9E5BB]" style={{ color: 'black' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'black'; e.currentTarget.style.backgroundColor = '#A9E5BB'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'black'; e.currentTarget.style.backgroundColor = '#F7B32B'; }}>
                Maintenance
              </a>
              <a href="/financing" className="px-4 py-1.5 rounded-full text-base font-semibold whitespace-nowrap transition-all bg-[#F7B32B] text-black hover:bg-[#A9E5BB]" style={{ color: 'black' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'black'; e.currentTarget.style.backgroundColor = '#A9E5BB'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'black'; e.currentTarget.style.backgroundColor = '#F7B32B'; }}>
                Financing
              </a>
              <ServiceAreasDropdown isActive={areasOpen} onHover={handleAreasHover} onLeave={handleAreasLeave} />
              <NavLink title="Contact Us" href="/contact" />
            </nav>

            {/* Right: phone circle + CTA */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="w-10 h-10 rounded-full border-2 border-brand-secondary flex items-center justify-center text-brand-secondary hover:bg-brand-secondary hover:text-white transition-all"
                aria-label="Call us"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href="/contact"
                className="flex items-center gap-2 bg-brand-secondary text-gray-900 px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap nav-highlight-btn"
              >
                Get a Quote
              </a>
            </div>

            {/* Mobile logo + hamburger */}
            <a href="/" className="flex lg:hidden items-center flex-shrink-0">
              <img src={siteConfig.logo.src} alt={siteConfig.logo.alt} className="h-9 object-contain" height={36} decoding="async" loading="eager" />
            </a>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden ml-auto">
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] p-0 flex flex-col overflow-hidden">
                <SheetHeader className="sr-only"><SheetTitle>Menu</SheetTitle></SheetHeader>
                <div className="flex-1 overflow-y-auto">
                  <MobileNav onClose={() => setMobileOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

/* ─── Mobile navigation ─── */
function MobileNav({ onClose }: { onClose: () => void }) {
  const [servicesOpen, setServicesOpen] = React.useState(false)

  const mainLinks = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Contact Us", href: "/contact" },
    { title: "Careers", href: "/careers" },
  ]

  const serviceAreas = [
    { title: "Santa Monica", href: "/santa-monica" },
    { title: "Pasadena", href: "/pasadena" },
    { title: "Glendale", href: "/glendale" },
  ]

  const [areasOpen, setAreasOpen] = React.useState(false)

  return (
    <div className="flex flex-col">
      {/* Phone CTA */}
      <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center justify-center gap-2 bg-brand-secondary text-gray-900 p-4 hover:bg-brand-highlight hover:text-white transition-colors">
        <Phone className="h-5 w-5" />
        <span className="font-semibold text-lg">{siteConfig.contact.phoneFormatted}</span>
      </a>

      {/* Location + email */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex flex-col gap-1.5 text-sm text-gray-600">
        <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-brand-secondary" />{siteConfig.location.fullAddress}</span>
        <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-brand-secondary"><Mail className="w-4 h-4 text-brand-secondary" />{siteConfig.contact.email}</a>
      </div>

      {/* Nav links */}
      <div className="p-4">
        {mainLinks.map((link) => (
          <a key={link.href} href={link.href} className="block py-3 font-medium text-gray-800 hover:text-brand-secondary border-b border-gray-100 last:border-b-0" onClick={onClose}>
            {link.title}
          </a>
        ))}

        {/* Services accordion */}
        <div className="border-b border-gray-100">
          <button onClick={() => setServicesOpen(!servicesOpen)} className="flex items-center justify-between w-full py-3 font-medium text-gray-800">
            Services
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
          </button>
          {servicesOpen && (
            <div className="pb-3 pl-4">
              {mainNavItems.map((item) => (
                <a key={item.href} href={item.href} className="block py-2 text-sm text-gray-600 hover:text-brand-secondary" onClick={onClose}>
                  {item.title}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Service Areas accordion */}
        <div className="border-b border-gray-100">
          <button onClick={() => setAreasOpen(!areasOpen)} className="flex items-center justify-between w-full py-3 font-medium text-gray-800">
            Service Areas
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${areasOpen ? "rotate-180" : ""}`} />
          </button>
          {areasOpen && (
            <div className="pb-3 pl-4">
              {serviceAreas.map((area) => (
                <a key={area.href} href={area.href} className="block py-2 text-sm text-gray-600 hover:text-brand-secondary" onClick={onClose}>
                  {area.title}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Get Started CTA */}
      <div className="p-4 border-t border-gray-200 flex flex-col gap-3">
        <div className="flex gap-3">
          <a href="/maintenance-plan" className="flex-1 flex items-center justify-center text-gray-900 px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-highlight hover:text-white transition-all" onClick={onClose}>
            Maintenance
          </a>
          <a href="/financing" className="flex-1 flex items-center justify-center text-gray-900 px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-highlight hover:text-white transition-all" onClick={onClose}>
            Financing
          </a>
        </div>
        <a href="/contact" className="flex items-center justify-center bg-brand-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-highlight transition-all w-full" onClick={onClose}>
          Get Started
        </a>
      </div>
    </div>
  )
}
