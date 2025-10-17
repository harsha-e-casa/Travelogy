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

  const authToken = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <>
      <header className={`z_99999 header sticky-bar`}>
        <div className="container-fluid background_body_overlay">
          <div className="main-header">
            <div className="header-left">
              <div className="header-logo">
                <Link className="d-flex" href="/">
                  <img
                    className="light-mode header_logo"
                    alt="Travelogy"
                    src="https://travelogy.digilogy.co/Travelogy%20logoNew.png"
                  />
                  <img
                    className="dark-mode"
                    alt="Travelogy"
                    src="/assets/imgs/template/logo-w.svg"
                  />
                </Link>
              </div>

              <div className="header-nav">
                <nav className="nav-main-menu">
                  <ul className="main-menu">
                    <li>
                      <Link href="/home">Home</Link>
                    </li>
                    <li>
                      <Link href="/flights">Flights</Link>
                    </li>
                    <li>
                      <Link href="/hotels">Hotel</Link>
                    </li>
                    <li>
                      <Link href="/holiday">Holiday Package</Link>
                    </li>
                    <li>
                      <Link href="/visa">Visa</Link>
                    </li>
                    <li>
                      <Link href="/travelInsurance">Travel Insurance</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                    <li>
                      <Link href="/profile">Profile</Link>
                    </li>
                    {isVisible && (
                      <>
                        <li>
                          <Link href="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                          <Link href="/user-create">Vendor Creation</Link>
                        </li>
                      </>
                    )}
                    {authToken && (
                      <li>
                        <button className="btn-logout" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    )}
                    {!authToken && (
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

            {/* right side actions (kept commented as in your code) */}
          </div>
        </div>
      </header>
    </>
  );
}
