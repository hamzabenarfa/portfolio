"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const toggleTheme = () => {
    // Use resolvedTheme for more reliable detection, fallback to theme
    const currentTheme = resolvedTheme || theme;
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };
  
  // Use resolvedTheme for more accurate theme detection
  const isDark = mounted && (resolvedTheme === 'dark' || (resolvedTheme === undefined && theme === 'dark'));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileNavClick = (elementId: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        const headerOffset = 120; // Account for sticky header height + margin
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };
  return (
    <>
      {/* Desktop Header */}
      <header
        className={`sticky top-4 z-40 mx-auto hidden w-full  flex-row items-center justify-between self-start rounded-xl  md:flex backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 max-w-3xl p-3`}
  
      >
        {/* Brand/Title */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
        >
          <Image 
            src="/avatar.jpeg"
            width={32} 
            height={32}
            alt="Hamza Benarfa"
            className="rounded-full aspect-square"
            priority
            quality={90}
          />
          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
             Benarfa Hamza
          </span>
        </Link>
        
        <div className="  hidden flex-1 flex-row items-center justify-center  space-x-2 text-sm font-medium text-muted-foreground transition duration-200 hover:text-foreground md:flex md:space-x-2">
          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("intro");
              if (element) {
                const headerOffset = 120; // Account for sticky header height + margin
                const elementPosition =
                  element.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                });
              }
            }}
          >
            <span className="relative z-20">About</span>
          </a>
          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("work");
              if (element) {
                const headerOffset = 120; // Account for sticky header height + margin
                const elementPosition =
                  element.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                });
              }
            }}
          >
            <span className="relative z-20">Experience</span>
          </a>
          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("projects");
              if (element) {
                const headerOffset = 120; // Account for sticky header height + margin
                const elementPosition =
                  element.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                });
              }
            }}
          >
            <span className="relative z-20">Projects</span>
          </a>
          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("connect");
              if (element) {
                const headerOffset = 120; // Account for sticky header height + margin
                const elementPosition =
                  element.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                });
              }
            }}
          >
            <span className="relative z-20">Contact</span>
          </a>
        </div>

        <button
          onClick={toggleTheme}
          className="cursor-pointer z-20 group p-3 rounded-lg transition-all duration-300"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <svg
              className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile Header */}
      <header className="sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg md:hidden px-4 py-3">
        {/* Mobile Brand/Title */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <Image 
            src="/avatar.jpeg"
            width={28} 
            height={28}
            alt="Hamza Benarfa"
            className="rounded-full aspect-square"
            priority
            quality={90}
          />
          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
            H. Benarfa
          </span>
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-background/50 border border-border/50 transition-colors hover:bg-background/80"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col items-center justify-center w-5 h-5 space-y-1">
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </button>
           <button
          onClick={toggleTheme}
          className="cursor-pointer z-20 group p-3 rounded-lg transition-all duration-300"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <svg
              className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-6">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left px-4 py-3 text-lg font-medium text-foreground hover:text-primary transition-colors rounded-lg hover:bg-background/50 flex items-center gap-3"
              >
                <Image 
                  src="/avatar.jpeg"
                  width={32} 
                  height={32}
                  alt="Hamza Benarfa"
                  className="rounded-full aspect-square"
                />
                <span>Home</span>
              </Link>
              <button
                onClick={() => handleMobileNavClick("intro")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                About
              </button>
              <button
                onClick={() => handleMobileNavClick("work")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Experience
              </button>
              <button
                onClick={() => handleMobileNavClick("projects")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Projects
              </button>
              <button
                onClick={() => handleMobileNavClick("connect")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Contact
              </button>
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
