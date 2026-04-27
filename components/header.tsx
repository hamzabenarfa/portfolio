"use client";

export default function Header() {
  return (
    <nav className="nav">
      <a href="#top" className="nav-brand">
        <span className="nav-mark">H</span>
        <span>
          Benarfa<span style={{ opacity: 0.5 }}>/</span>Hamza
        </span>
      </a>

      <ul className="nav-links">
        <li><a href="#work">Work</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#process">Process</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="nav-status">
        <span className="dot" />
        Available · Tunis (GMT+1)
      </div>
    </nav>
  );
}
