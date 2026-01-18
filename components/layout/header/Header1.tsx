"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import "./style.css";
import { checkTokenExpiry } from "@/services/Utils";
import { performLogout } from "@/services/AuthService";
import { getData, postData } from "@/services/NetworkAdapter";


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
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const pathname = usePathname();


  useEffect(() => {
    const tokenValid = checkTokenExpiry();

    if (!tokenValid) localStorage.removeItem("authToken");
  }, []);

  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      setAuthToken(token);
      if (!token) {
        setIsVisible(false);
        return;
      }
      const decoded = jwtDecode<{ travelogy_admin?: boolean | number; id?: number; userId?: number }>(token);
      setIsVisible(!!decoded?.travelogy_admin);

      if (decoded?.id || decoded?.userId) {
        setCurrentUserId(decoded?.id || (decoded?.userId as number));
      }
    } catch {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (authToken) {
        try {
          const res: any = await postData(
            "/travelogy/flight/fetch-user",
            { phone: "", e_mail: "" },
            { Authorization: `Bearer ${authToken}` }
          );
          if (res?.userData) {
            if (res.userData.id) {
              setCurrentUserId(res.userData.id);
            }
            if (res.userData.wallet_balance !== undefined) {
              setWalletBalance(parseFloat(res.userData.wallet_balance));
            }
          }
        } catch (e) {
          console.error("Failed to fetch user info in header", e);
        }
      }
    };
    fetchUserData();
  }, [authToken]);

  useEffect(() => {
    const handleClickOutside = () => setAdminDropdownOpen(false);
    if (adminDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [adminDropdownOpen]);




  const handleLogout = async () => {
    await performLogout();
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
                className={`mobile-menu-btn ${mobileMenuOpen ? "active" : ""}`}
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

                {/* {!isVisible && authToken && (
                  <li className={pathname === "/profile" ? "active" : ""}>
                    <Link href="/profile">Profile</Link>
                  </li>
                )} */}
                {/* {!isVisible && authToken && (<li
                  className={`${pathname === "/wallet" ? "active" : ""
                    }`}
                >
                  <Link href="/wallet">
                    Wallet
                    {walletBalance !== null && (
                      <span className="wallet-balance-badge">
                        ₹{walletBalance.toLocaleString()}
                      </span>
                    )}
                  </Link>
                </li>)} */}

                {/* {isVisible && authToken && ( */}
                {authToken && (
                  <li
                    className={`dropdown ${pathname.startsWith("/profile") &&
                      pathname.startsWith("/dashboard") &&
                      pathname.startsWith("/user-create") &&
                      pathname.startsWith("/wallet")
                      ? "active"
                      : ""
                      }`}
                  >
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
                      className={`dropdown-menu ${adminDropdownOpen ? "show" : ""
                        }`}
                    >
                      {/* <li
                        className={`${pathname === "/profile" ? "active" : ""}`}
                      >
                        <Link href="/profile">Profile</Link>
                      </li> */}
                      <li
                        className={`${pathname === "/dashboard" ? "active" : ""
                          }`}
                      >
                        <Link href="/dashboard">Dashboard</Link>
                      </li>
                      {isVisible && (
                        <>
                          {/* <li
                            className={`${pathname === "/dashboard" ? "active" : ""
                              }`}
                          >
                            <Link href="/dashboard">Dashboard</Link>
                          </li> */}
                          <li
                            className={`${pathname === "/user-create" ? "active" : ""
                              }`}
                          >
                            <Link href="/user-create">Vendor Creation</Link>
                          </li>
                          {/* <li
                            className={`${pathname === "/wallet" ? "active" : ""
                              }`}
                          >
                            <Link href="/wallet">
                              Wallet
                              {walletBalance !== null && (
                                <span className="wallet-balance-badge">
                                  ₹{walletBalance.toLocaleString()}
                                </span>
                              )}
                            </Link>
                          </li> */}
                        </>
                      )}
                      <li
                        className={`${pathname === "/wallet" ? "active" : ""
                          }`}
                      >
                        <Link href="/wallet">
                          Wallet
                          {walletBalance !== null && (
                            <span className="wallet-balance-badge">
                              ₹{walletBalance.toLocaleString()}
                            </span>
                          )}
                        </Link>
                      </li>
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
              {/* <li>
                <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                  Profile
                </Link>
              </li> */}
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
                  href="/wallet"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Wallet</span>
                  {walletBalance !== null && (
                    <span className="wallet-balance-badge" style={{ margin: 0 }}>
                      ₹{walletBalance.toLocaleString()}
                    </span>
                  )}
                </Link>
              </li>
              {isVisible && (
                <>
                  {/* <li>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li> */}
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
