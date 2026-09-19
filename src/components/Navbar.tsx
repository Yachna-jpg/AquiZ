"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Intelligence", href: "/intelligence" },
    { name: "How It Works", href: "#" },
    { name: "Technology", href: "#" },
    { name: "About", href: "#" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary-bg border-b border-surface-border ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="font-semibold text-[17px] tracking-wide text-primary-text">
            OILTRACE
          </Link>
          <div className="h-4 w-px bg-surface-border hidden sm:block"></div>
          <span className="text-[11px] font-medium tracking-widest text-muted-text hidden sm:block uppercase">
            Maritime Intelligence
          </span>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13px] font-medium text-secondary-text hover:text-marine-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/intelligence"
            className="hidden sm:flex items-center gap-2 text-[13px] font-medium bg-navy text-white px-5 py-2.5 rounded hover:bg-marine-primary transition-colors"
          >
            Launch Dashboard <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            className="md:hidden text-primary-text p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-surface-border py-4 px-6 flex flex-col gap-4 shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[15px] font-medium text-secondary-text hover:text-marine-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/intelligence"
            className="flex items-center justify-center gap-2 text-[14px] font-medium bg-navy text-white px-5 py-3 mt-2 rounded hover:bg-marine-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Launch Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
