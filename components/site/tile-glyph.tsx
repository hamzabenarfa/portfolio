/**
 * Tiny mosaics drawn as CSS grids: the brand mark and the service glyphs.
 * Each character in `pattern` is one tile; rows are separated by "/".
 *   b = Sidi blue, n = night, s = saffron, w = whitewash, r = bougainvillea, . = empty
 */
const TONES: Record<string, string> = {
  b: "var(--sidi)",
  n: "var(--night)",
  s: "var(--saffron)",
  w: "var(--glyph-wash, var(--wash))",
  r: "var(--bloom)",
};

export function TileGlyph({ pattern, className }: { pattern: string; className?: string }) {
  const rows = pattern.split("/");
  const cols = rows[0].length;
  return (
    <span
      className={`tile-glyph${className ? ` ${className}` : ""}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      aria-hidden="true"
    >
      {rows.join("").split("").map((tone, i) => (
        <i key={i} style={tone === "." ? { visibility: "hidden" } : { background: TONES[tone] }} />
      ))}
    </span>
  );
}

export const BRAND_MARK = "bs/nb";
