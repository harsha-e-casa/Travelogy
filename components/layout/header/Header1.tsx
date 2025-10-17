"use client";
import React, { useEffect, useState } from "react";
import CurrencyDropdown from "@/components/elements/CurrencyDropdown";
import LanguageDropdown from "@/components/elements/LanguageDropdown";
import dynamic from "next/dynamic";
import Link from "next/link";
import "./style.css";
import { jwtDecode } from "jwt-decode";

export default function Header1({
  handleLogin,
  handleCorporateLogin,
  handleMobileMenu,
  handleRegister,
  handleSidebar,
}: any) {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setIsVisible(false);
        return;
      }
      const decoded = jwtDecode<{ travelogy_admin?: boolean | number }>(token);
      setIsVisible(!!decoded?.travelogy_admin);
    } catch {
      setIsVisible(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="responsive-header">
        <div className="header-container">
          <div className="header-content">
            <div className="header-logo">
              <Link href="/">
                <img
                  className="logo-img"
                  alt="Travelogy"
                  src="https://travelogy.digilogy.co/Travelogy%20logoNew.png"
                />
              </Link>
            </div>

            <button 
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
              <ul className="main-menu">
                <li><Link href="/home">Home</Link></li>
                <li><Link href="/flights">Flights</Link></li>
                <li><Link href="/hotels">Hotel</Link></li>
                <li><Link href="/holiday">Holiday Package</Link></li>
                <li><Link href="/visa">Visa</Link></li>
                <li><Link href="/travelInsurance">Travel Insurance</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/profile">Profile</Link></li>
                {isVisible && (
                  <>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                    <li><Link href="/user-create">Vendor Creation</Link></li>
                  </>
                )}
                <li>
                  <button className="btn-logout" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
