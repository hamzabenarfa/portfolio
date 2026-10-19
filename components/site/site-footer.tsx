import { LocalTime } from "@/components/fx/local-time";

export function SiteFooter() {
  return (
    <footer className="site-footer-bar">
      <span>© 2026 Hamza Benarfa</span>
      <LocalTime />
      <a href="#top">Back to top</a>
    </footer>
  );
}
