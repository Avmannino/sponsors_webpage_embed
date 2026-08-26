import "./App.css";
import { sponsors } from "./sponsors";

function SponsorCard({ sponsor, index }) {
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
    >
      <img
        className="sponsor-logo"
        src={`${import.meta.env.BASE_URL}sponsors/${sponsor.logo}`}
        alt={`${sponsor.name} logo`}
        loading="eager"
        decoding="async"
      />

      <span className="sponsor-name">{sponsor.name}</span>
    </a>
  );
}

export default function App() {
  return (
    <main className="sponsors-page">
      <header className="sponsors-header">
        <h1>Thank you to our sponsors and partners!</h1>
      </header>

      <div className="sponsors-grid">
        {sponsors.map((sponsor, i) => (
          <SponsorCard key={`${sponsor.name}-${sponsor.logo}`} sponsor={sponsor} index={i} />
        ))}
      </div>
    </main>
  );
}
