import { useState, useEffect, useRef } from 'react';

interface Service {
  title: string;
  description: string;
  href?: string;
}

interface ServiceCategory {
  title: string;
  services: Service[];
}

interface Props {
  title: string;
  description: string;
  categories: ServiceCategory[];
}

const serviceIcons: { keywords: string[]; icon: React.ReactNode }[] = [
  {
    keywords: ['kitchen'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
      </svg>
    ),
  },
  {
    keywords: ['bathroom', 'bath'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
        <line x1="10" y1="5" x2="8" y2="7" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="7" y1="19" x2="7" y2="21" />
        <line x1="17" y1="19" x2="17" y2="21" />
      </svg>
    ),
  },
  {
    keywords: ['leak detection', 'leak repair', 'leak prevention', 'leak'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
        <path d="M9.5 15.5a3 3 0 0 0 4.5 2" />
      </svg>
    ),
  },
  {
    keywords: ['water heater', 'water heating'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
        <circle cx="12" cy="17" r="1" />
      </svg>
    ),
  },
  {
    keywords: ['drain', 'sewer', 'hydro jetting', 'jetting'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v3" /><path d="M18.5 5.5 16.4 7.6" /><path d="M21 12h-3" />
        <path d="M18.5 18.5 16.4 16.4" /><path d="M12 21v-3" />
        <path d="M5.5 18.5 7.6 16.4" /><path d="M3 12h3" /><path d="M5.5 5.5 7.6 7.6" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    keywords: ['gas', 'gas line', 'gas piping'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
  },
  {
    keywords: ['backflow', 'filtration', 'filter', 'purification', 'purif'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
      </svg>
    ),
  },
  {
    keywords: ['maintenance', 'preventative', 'appliance'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    keywords: ['pipe', 'repiping', 'repipe', 'sewer line', 'trenchless'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    keywords: ['building', 'commercial', 'green', 'eco'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" />
        <path d="M9 9v.01" /><path d="M9 12v.01" /><path d="M9 15v.01" />
      </svg>
    ),
  },
];

const fallbackIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

function getIconForService(title: string): React.ReactNode {
  const lower = title.toLowerCase();
  for (const entry of serviceIcons) {
    if (entry.keywords.some((kw) => lower.includes(kw))) return entry.icon;
  }
  return fallbackIcon;
}

export function ServicesSection({ title, description, categories }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeCategory = categories[activeTab];

  return (
    <section ref={sectionRef} className="py-20 md:py-28" style={{ background: 'var(--background)' }}>
      <div className="container mx-auto px-4">

        {/* Header — split layout */}
        <div className={`grid md:grid-cols-5 gap-8 mb-14 items-end transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="md:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-10 h-1 rounded-full" style={{ background: 'var(--brand-secondary)' }} />
              <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--brand-secondary)' }}>Our Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{title}</h2>
          </div>
          <div className="md:col-span-2">
            <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{description}</p>
          </div>
        </div>

        {/* Category tabs */}
        {categories.length > 1 && (
          <div className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className="px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300"
                style={{
                  background: activeTab === i ? 'var(--brand-secondary)' : 'var(--brand-tertiary)',
                  color: activeTab === i ? '#fff' : 'var(--foreground)',
                }}
              >
                {cat.title}
              </button>
            ))}
          </div>
        )}

        {/* Service cards — clean 4-col grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {activeCategory.services.map((service, i) => {
            const Tag = service.href ? 'a' : 'div';

            return (
              <Tag
                key={`${activeTab}-${i}`}
                {...(service.href ? { href: service.href } : {})}
                className={`svc-card group transition-all duration-500 ease-out ${
                  service.href ? 'cursor-pointer' : ''
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                {/* Top accent bar — visible on hover */}
                <div className="svc-card-accent" />

                <div className="svc-card-inner">
                  {/* Icon */}
                  <div className="svc-card-icon">
                    {getIconForService(service.title)}
                  </div>

                  <h3 className="svc-card-title">{service.title}</h3>
                  <p className="svc-card-desc">{service.description}</p>

                  {service.href && (
                    <div className="svc-card-arrow">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                  )}
                </div>
              </Tag>
            );
          })}
        </div>
      </div>

      <style>{`
        .svc-card {
          position: relative;
          border-radius: 1rem;
          background: var(--card);
          border: 1.5px solid var(--border);
          overflow: hidden;
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .svc-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px color-mix(in srgb, var(--brand-secondary) 12%, transparent);
          border-color: var(--brand-secondary);
        }

        /* Top accent bar */
        .svc-card-accent {
          height: 4px;
          background: var(--brand-secondary);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .svc-card:hover .svc-card-accent {
          transform: scaleX(1);
        }

        .svc-card-inner {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        /* Icon container */
        .svc-card-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          background: var(--brand-tertiary);
          color: var(--brand-secondary);
          transition: background 0.35s ease, color 0.35s ease;
        }
        .svc-card:hover .svc-card-icon {
          background: var(--brand-secondary);
          color: #fff;
        }

        .svc-card-title {
          font-weight: 700;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--foreground);
          transition: color 0.3s ease;
        }
        .svc-card:hover .svc-card-title {
          color: var(--brand-secondary);
        }

        .svc-card-desc {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--muted-foreground);
          flex: 1;
        }

        /* Arrow button */
        .svc-card-arrow {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1.25rem;
          background: var(--brand-tertiary);
          color: var(--brand-secondary);
          transition: background 0.35s ease, color 0.35s ease, transform 0.35s ease;
        }
        .svc-card:hover .svc-card-arrow {
          background: var(--brand-secondary);
          color: #fff;
          transform: translate(4px, -4px);
        }
      `}</style>
    </section>
  );
}

export default ServicesSection;
