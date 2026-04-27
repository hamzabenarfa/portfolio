const items = [
  "Next.js", "TypeScript", "React", "Node", "NestJS", "PostgreSQL",
  "TailwindCSS", "Zustand", "TanStack", "Konva.js", "React Native", "Docker",
];

function Track() {
  return (
    <span>
      {items.map((item, i) => (
        <span key={i}>
          <span>{item}</span>
          <span className="star">✦</span>
        </span>
      ))}
    </span>
  );
}

export function MarqueeTape() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        <Track />
        <Track />
      </div>
    </div>
  );
}
