const items = [
  "MVP architecture",
  "SaaS dashboards",
  "Multi-role auth",
  "Admin systems",
  "Payments",
  "Cloud storage",
  "Custom editors",
  "PostgreSQL",
  "Docker deploys",
  "Technical handoff",
];

function Track() {
  return (
    <span>
      {items.map((item) => (
        <span key={item}>
          <span>{item}</span>
          <span className="star">✦</span>
        </span>
      ))}
    </span>
  );
}

export function MarqueeTape() {
  return (
    <div className="marquee" aria-label="Delivery capabilities">
      <div className="marquee-track">
        <Track />
        <Track />
      </div>
    </div>
  );
}
