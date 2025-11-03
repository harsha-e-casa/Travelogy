"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import "./style.css";

interface Header1Props {
  isMobileMenu?: boolean;
  handleMobileMenu?: () => void;
  isSidebar?: boolean;
  handleSidebar?: () => void;
  isLogin?: boolean;
  handleLogin?: () => void;
  isCorporateLogin?: boolean;
  handleCorporateLogin?: () => void;
  isRegister?: boolean;
  handleRegister?: () => void;
}

export default function Header1(props: Header1Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      setAuthToken(token);
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

  useEffect(() => {
    const handleClickOutside = () => setAdminDropdownOpen(false);
    if (adminDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [adminDropdownOpen]);

  const handleLogout = async () => {
    try {
      // Call the Next.js API route to clear the cookie
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // credentials: "include", // ensures cookies are sent with request
      });
      
      localStorage.removeItem("authToken");

      if (res.ok) {
        console.log("Logout successful");
        // Optional: show a message or redirect
        window.location.href = "/login";
      } else {
        console.error("Logout failed", await res.text());
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header className="responsive-header">
      <div className="header-container">
        <div className="main-header">
          <div className="header-content">
            {/* Logo */}
            <div className="header-logo">
              <Link className="d-flex" href="/">
                <img
                  className="logo-img"
                  alt="Travelogy"
                  src="https://travelogy.digilogy.co/Travelogy%20logoNew.png"
                />
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <div className="header-mobile-menu">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`mobile-menu-btn ${
                  mobileMenuOpen ? "active" : ""
                }`}
                aria-label="Toggle mobile menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="nav-main-menu">
              <ul className="main-menu">
                <li
                  className={
                    pathname === "/home" || pathname === "/" ? "active" : ""
                  }
                >
                  <Link href="/home">Home</Link>
                </li>
                <li className={pathname === "/flights" ? "active" : ""}>
                  <Link href="/flights">Flights</Link>
                </li>
                <li className={pathname === "/hotels" ? "active" : ""}>
                  <Link href="/hotels">Hotel</Link>
                </li>
                <li className={pathname === "/holiday" ? "active" : ""}>
                  <Link href="/holiday">Holiday Package</Link>
                </li>
                <li className={pathname === "/visa" ? "active" : ""}>
                  <Link href="/visa">Visa</Link>
                </li>
                <li className={pathname === "/travelInsurance" ? "active" : ""}>
                  <Link href="/travelInsurance">Travel Insurance</Link>
                </li>
                <li className={pathname === "/contact-us" ? "active" : ""}>
                  <Link href="/contact-us">Contact</Link>
                </li>

                {authToken && (
                  <li className={`dropdown ${pathname.startsWith('/profile') && pathname.startsWith('/dashboard') && pathname.startsWith('/user-create') ? 'active' : ''}`}>
                    <button
                      className="dropdown-toggle"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAdminDropdownOpen(!adminDropdownOpen);
                      }}
                    >
                      Admin
                    </button>
                    <ul
                      className={`dropdown-menu ${
                        adminDropdownOpen ? "show" : "" 
                      }`}
                    >
                      <li className={`${pathname === "/profile" ? "active" : ""}`}>
                        <Link href="/profile">Profile</Link>
                      </li>
                      {isVisible && (
                        <>
                          <li className={`${pathname === "/dashboard" ? "active" : ""}`}>
                            <Link href="/dashboard">Dashboard</Link>
                          </li>
                          <li className={`${pathname === "/user-create" ? "active" : ""}`}>
                            <Link href="/user-create">Vendor Creation</Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </li>
                )}
                {authToken ? (
                  <li>
                    <button className="btn-logout" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <button
                      className="btn-logout"
                      onClick={() => (window.location.href = "/login")}
                    >
                      Login
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={`nav-mobile-menu ${mobileMenuOpen ? "show" : ""}`}>
        <ul className="mobile-menu">
          <li>
            <Link href="/home" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/flights" onClick={() => setMobileMenuOpen(false)}>
              Flights
            </Link>
          </li>
          <li>
            <Link href="/hotels" onClick={() => setMobileMenuOpen(false)}>
              Hotel
            </Link>
          </li>
          <li>
            <Link href="/holiday" onClick={() => setMobileMenuOpen(false)}>
              Holiday Package
            </Link>
          </li>
          <li>
            <Link href="/visa" onClick={() => setMobileMenuOpen(false)}>
              Visa
            </Link>
          </li>
          <li>
            <Link
              href="/travelInsurance"
              onClick={() => setMobileMenuOpen(false)}
            >
              Travel Insurance
            </Link>
          </li>
          <li>
            <Link href="/contact-us" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
          </li>

          {authToken && (
            <>
              <li>
                <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                  Profile
                </Link>
              </li>
              {isVisible && (
                <>
                  <li>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/user-create"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Vendor Creation
                    </Link>
                  </li>
                </>
              )}
            </>
          )}

          {authToken ? (
            <li>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <li>
              <button
                className="btn-logout"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
