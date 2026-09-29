"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Bell,
  ChevronDown,
  User,
  Globe,
  Radio,
} from "lucide-react";

interface Props {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  rightPanelOpen: boolean;
  setRightPanelOpen: (v: boolean) => void;
}

const NAV_LINKS = [
  { label: "Dashboard", href: "/" },
  { label: "Intelligence", href: "/intelligence" },
  { label: "Analysis", href: "/analysis" },
  { label: "Reports", href: "/reports" },
];

const REGIONS = [
  "Bay of Bengal",
  "Arabian Sea",
  "Strait of Malacca",
  "South China Sea",
  "Persian Gulf",
];

export default function IntelligenceHeader({
  sidebarCollapsed,
  setSidebarCollapsed,
  rightPanelOpen,
  setRightPanelOpen,
}: Props) {
  const [regionOpen, setRegionOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("Bay of Bengal");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="h-13 flex items-center justify-between px-4 border-b border-[#DCE3E6] bg-white z-50 shrink-0">
      {/* LEFT: Sidebar toggle + Logo + Nav */}
      <div className="flex items-center gap-3">
        {/* Sidebar toggle */}
        <button
          id="btn-sidebar-toggle"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-1.5 rounded hover:bg-[#F4F6F5] text-[#647482] transition-colors"
          title={sidebarCollapsed ? "Open sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>

        <div className="h-5 w-px bg-[#DCE3E6]" />

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-[15px] font-semibold tracking-wide text-[#0B2235]">
            OILTRACE
          </span>
          <span className="hidden sm:block text-[10px] font-medium tracking-widest text-[#647482] uppercase">
            Maritime Intelligence
          </span>
        </Link>

        <div className="h-5 w-px bg-[#DCE3E6]" />

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/intelligence";
            return (
              <Link
                key={link.label}
                href={link.href}
                id={`nav-${link.label.toLowerCase()}`}
                className={`px-3 py-1.5 rounded text-[13px] font-medium transition-colors ${
                  isActive
                    ? "bg-[#F4F6F5] text-[#0B2235]"
                    : "text-[#647482] hover:text-[#0B2235] hover:bg-[#F4F6F5]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* RIGHT: Region + Live Feed + Notifications + User + Right panel toggle */}
      <div className="flex items-center gap-2">
        {/* Region selector */}
        <div className="relative hidden sm:block">
          <button
            id="btn-region-selector"
            onClick={() => setRegionOpen(!regionOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#DCE3E6] rounded text-[12px] font-medium text-[#647482] hover:text-[#0B2235] hover:border-[#2E6F9E] transition-colors"
          >
            <Globe size={13} />
            {selectedRegion}
            <ChevronDown size={12} className={`transition-transform ${regionOpen ? "rotate-180" : ""}`} />
          </button>
          {regionOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#DCE3E6] rounded shadow-sm z-50">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => { setSelectedRegion(r); setRegionOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-[13px] hover:bg-[#F4F6F5] transition-colors ${
                    r === selectedRegion ? "text-[#2E6F9E] font-medium" : "text-[#647482]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live feed indicator */}
        <div
          id="live-feed-indicator"
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 border border-[#DCE3E6] rounded cursor-default"
          title="Live AIS feed active"
        >
          <Radio size={12} className="text-[#527A68]" />
          <span className="text-[11px] font-semibold text-[#527A68] tracking-wide">LIVE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#527A68] animate-pulse" />
        </div>

        <div className="h-5 w-px bg-[#DCE3E6]" />

        {/* Notifications */}
        <div className="relative">
          <button
            id="btn-notifications"
            onClick={() => { setNotifOpen(!notifOpen); setUserMenuOpen(false); }}
            className="p-1.5 rounded hover:bg-[#F4F6F5] text-[#647482] relative transition-colors"
            title="Notifications"
          >
            <Bell size={15} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#C74732] rounded-full" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-1 w-72 bg-white border border-[#DCE3E6] rounded shadow-sm z-50">
              <div className="px-3 py-2 border-b border-[#DCE3E6]">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#647482]">
                  Notifications
                </span>
              </div>
              <div className="px-3 py-2.5 border-b border-[#F4F6F5] hover:bg-[#F4F6F5] cursor-pointer transition-colors">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C74732] mt-1.5 shrink-0" />
                  <div>
                    <p className="text-[12px] font-medium text-[#102A43]">New oil slick detected</p>
                    <p className="text-[11px] text-[#647482]">Bay of Bengal · 2m ago</p>
                  </div>
                </div>
              </div>
              <div className="px-3 py-2.5 hover:bg-[#F4F6F5] cursor-pointer transition-colors">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9822B] mt-1.5 shrink-0" />
                  <div>
                    <p className="text-[12px] font-medium text-[#102A43]">Vessel AIS anomaly</p>
                    <p className="text-[11px] text-[#647482]">MV Ocean Star · 14m ago</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            id="btn-user-menu"
            onClick={() => { setUserMenuOpen(!userMenuOpen); setNotifOpen(false); }}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-[#F4F6F5] text-[#647482] transition-colors"
            title="User menu"
          >
            <div className="w-6 h-6 rounded-full bg-[#0B2235] flex items-center justify-center">
              <User size={12} className="text-white" />
            </div>
            <ChevronDown size={12} className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
          </button>
          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-[#DCE3E6] rounded shadow-sm z-50">
              <div className="px-3 py-2 border-b border-[#DCE3E6]">
                <p className="text-[12px] font-medium text-[#102A43]">Analyst</p>
                <p className="text-[11px] text-[#647482]">Maritime Unit</p>
              </div>
              <button className="w-full text-left px-3 py-2 text-[13px] text-[#647482] hover:bg-[#F4F6F5] hover:text-[#0B2235] transition-colors">
                Settings
              </button>
              <button className="w-full text-left px-3 py-2 text-[13px] text-[#647482] hover:bg-[#F4F6F5] hover:text-[#0B2235] transition-colors">
                Sign out
              </button>
            </div>
          )}
        </div>

        <div className="h-5 w-px bg-[#DCE3E6]" />

        {/* Right panel toggle */}
        <button
          id="btn-right-panel-toggle"
          onClick={() => setRightPanelOpen(!rightPanelOpen)}
          className="p-1.5 rounded hover:bg-[#F4F6F5] text-[#647482] transition-colors"
          title={rightPanelOpen ? "Close panel" : "Open panel"}
        >
          {rightPanelOpen ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
        </button>
      </div>
    </header>
  );
}
