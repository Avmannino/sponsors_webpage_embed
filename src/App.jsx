import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { sponsors } from "./sponsors";

const CARDS_PER_PAGE_DESKTOP = 16;
const CARDS_PER_PAGE_MOBILE = 4;
const MOBILE_BREAKPOINT_PX = 700;
const SLIDE_INTERVAL_MS = 7000;

function useIsMobile(breakpointPx) {
  const query = `(max-width: ${breakpointPx}px)`;
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
}

function SponsorCard({ sponsor, index, onHoverChange }) {
  return (
    <a
      className="sponsor-card"
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${sponsor.name}`}
      style={{
        "--card-index": index,
        "--logo-size": sponsor.logoSize ?? "100%",
        "--logo-offset-y": sponsor.logoOffsetY ?? "-4%",
        ...(sponsor.logoAlign ? { "--logo-align": sponsor.logoAlign } : {}),
        ...(sponsor.color ? { "--card-bg": sponsor.color } : {}),
        ...(sponsor.cardPadding ? { "--card-padding": sponsor.cardPadding } : {}),
      }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <img
        className="sponsor-logo"
        src={`${import.meta.env.BASE_URL}sponsors/${sponsor.logo}`}
        alt={`${sponsor.name} logo`}
        loading={index < 8 ? "eager" : "lazy"}
        decoding="async"
      />

      <span className="sponsor-name">{sponsor.name}</span>
    </a>
  );
}

export default function App() {
  const isMobile = useIsMobile(MOBILE_BREAKPOINT_PX);
  const cardsPerPage = isMobile ? CARDS_PER_PAGE_MOBILE : CARDS_PER_PAGE_DESKTOP;

  const pages = useMemo(() => {
    const groups = [];
    for (let i = 0; i < sponsors.length; i += cardsPerPage) {
      groups.push(sponsors.slice(i, i + cardsPerPage));
    }
    return groups;
  }, [cardsPerPage]);

  const [page, setPage] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    setPage(0);
  }, [cardsPerPage]);

  useEffect(() => {
    if (pages.length <= 1) return;
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setPage((current) => (current + 1) % pages.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [pages.length]);

  return (
    <main className="sponsors-page">
      <header className="sponsors-header">
        <h1>Thank you to our sponsors and partners!</h1>
      </header>

      <div className="sponsors-carousel">
        <div
          className="sponsors-track"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((group, pageIndex) => (
            <section
              className="sponsors-slide"
              aria-label="Wings Arena sponsors"
              aria-hidden={pageIndex !== page}
              key={pageIndex}
            >
              <div className="sponsors-grid">
                {group.map((sponsor, i) => (
                  <SponsorCard
                    key={`${sponsor.name}-${sponsor.logo}`}
                    sponsor={sponsor}
                    index={pageIndex * cardsPerPage + i}
                    onHoverChange={(hovering) => {
                      pausedRef.current = hovering;
                    }}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}