import { ArrowUpRight } from "lucide-react";
import { LocalTime } from "@/components/fx/local-time";

export function Footer() {
  return (
    <footer className="site-footer support-footer">
      <div className="footer-bar">
        <a href="#top" className="footer-signature">HB<span>·</span></a>
        <span className="footer-copyright">© 2026 Hamza Benarfa</span>
        <span className="footer-time"><LocalTime /></span>
        <a href="#top" className="footer-top">Back to top <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
