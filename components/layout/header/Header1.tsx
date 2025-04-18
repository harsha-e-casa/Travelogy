"use client";
import React, { useState } from "react";
import CurrencyDropdown from "@/components/elements/CurrencyDropdown";
import LanguageDropdown from "@/components/elements/LanguageDropdown";
import dynamic from "next/dynamic";
import Link from "next/link";

// const ThemeSwitch = dynamic(() => import('@/components/elements/ThemeSwitch'), {
// 	ssr: false,
// })

export default function Header1({
  scroll,
  handleLogin,
  handleCorporateLogin,
  handleMobileMenu,
  handleRegister,
  handleSidebar,
}: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className={`z_99999 fixed header sticky-bar ${scroll ? "stick" : ""}`}
      >
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
                   
                    <li className="">
                      <Link href="/flights">Flights</Link>
                    </li>
                    <li className="">
                      <Link href="/hotels">Hotel</Link>
                    </li>
                    
                    <li className="">
                      <Link href="/holiday">Holiday</Link>
                    </li>
                   {/* <li className="">
                      <Link href="#">Themes</Link>
                    </li>*/}
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <div className="header-right">
              <div
                className="d-none d-xxl-inline-block align-middle"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <a
                  className="btn btn-default btn-signin mr-10 cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  <p className="text-sm font-bold">Signin/Signup</p>
                  {open && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                      <div className="py-1">
                        <button
                          onClick={handleCorporateLogin}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Corporate Login
                        </button>
                        <button
                          onClick={handleLogin}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          User Login
                        </button>
                        <button
                          onClick={handleLogin}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </a>
                {/* <ThemeSwitch /> */}
              </div>
              {/*<div className="burger-icon-2 burger-icon-white" onClick={handleSidebar}>
								<img  src="/assets/imgs/template/icons/menu.svg" alt="Travelogy" />
							</div>*/}
              <div
                className="burger-icon burger-icon-white"
                onClick={handleMobileMenu}
              >
                <span className="burger-icon-top" />
                <span className="burger-icon-mid" />
                <span className="burger-icon-bottom" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
