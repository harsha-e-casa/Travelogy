import Link from "next/link";
export default function Footer1() {
  return (
    <>
      <footer className="footer">
      <div className="footer_overlay">
        <section className="section-box box-media background-body">
          <div className="container-media wow fadeInUp">
            {" "}
            <img  src="/assets/imgs/page/homepage5/media.png" alt="Travalogy" />
            <img  src="/assets/imgs/page/homepage5/media2.png" alt="Travalogy" />
            <img  src="/assets/imgs/page/homepage5/media3.png" alt="Travalogy" />
            <img  src="/assets/imgs/page/homepage5/media4.png" alt="Travalogy" />
            <img  src="/assets/imgs/page/homepage5/media5.png" alt="Travalogy" />
            <img  src="/assets/imgs/page/homepage5/media6.png" alt="Travalogy" />
            <img  src="/assets/imgs/page/homepage5/media7.png" alt="Travalogy" />
          </div>
        </section>
        <div className="container">
          <div className="footer-top">
            <div className="row align-items-center">
              <div className="col-md-4 text-center text-md-start">
                <Link className="d-inline-block" href="/">
                  <img 
                    alt="Travelogy"
                    className="header_logo"
                    src="https://travelogy.digilogy.co/Travelogy%20logoNew.png"
                  />
                </Link>
              </div>
              <div className="col-md-8 text-center text-md-end">
                <div className="d-flex align-items-center justify-content-center justify-content-md-end">
                  <p className="text-md-medium need-help">
                    Need help? Call us
                  </p>
                  <p className="heading-6 phone-support">
                    +91 95662 66061
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-lg-12 footer-1">
              <h6>Contact Us </h6>
              <div className="mt-20 mb-20">
                <div className="box-info-contact">
                  <p className="text-md neutral-400 icon-address">
                    Address: NPL Devi, 111, Lattice Brg Rd, Thiruvanmiyur,
                    Chennai, Tamil Nadu 600041
                  </p>
                  <p className="text-md neutral-400 icon-worktime">
                    Hours: 8:00 - 7:00, Mon - Fri
                  </p>
                  <p className="text-md neutral-400 icon-email">
                    info@casagrandtravelogy.co.in
                  </p>
                </div>
                <p className="text-lg-bold title-follow neutral-0">Follow us</p>
                <div className="box-socials-footer">
                  <Link className="icon-socials icon-instagram" href="#">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M13.4915 1.6665H6.50817C3.47484 1.6665 1.6665 3.47484 1.6665 6.50817V13.4832C1.6665 16.5248 3.47484 18.3332 6.50817 18.3332H13.4832C16.5165 18.3332 18.3248 16.5248 18.3248 13.4915V6.50817C18.3332 3.47484 16.5248 1.6665 13.4915 1.6665ZM9.99984 13.2332C8.2165 13.2332 6.7665 11.7832 6.7665 9.99984C6.7665 8.2165 8.2165 6.7665 9.99984 6.7665C11.7832 6.7665 13.2332 8.2165 13.2332 9.99984C13.2332 11.7832 11.7832 13.2332 9.99984 13.2332ZM14.9332 5.73317C14.8915 5.83317 14.8332 5.92484 14.7582 6.00817C14.6748 6.08317 14.5832 6.1415 14.4832 6.18317C14.3832 6.22484 14.2748 6.24984 14.1665 6.24984C13.9415 6.24984 13.7332 6.1665 13.5748 6.00817C13.4998 5.92484 13.4415 5.83317 13.3998 5.73317C13.3582 5.63317 13.3332 5.52484 13.3332 5.4165C13.3332 5.30817 13.3582 5.19984 13.3998 5.09984C13.4415 4.9915 13.4998 4.90817 13.5748 4.82484C13.7665 4.63317 14.0582 4.5415 14.3248 4.59984C14.3832 4.60817 14.4332 4.62484 14.4832 4.64984C14.5332 4.6665 14.5832 4.6915 14.6332 4.72484C14.6748 4.74984 14.7165 4.7915 14.7582 4.82484C14.8332 4.90817 14.8915 4.9915 14.9332 5.09984C14.9748 5.19984 14.9998 5.30817 14.9998 5.4165C14.9998 5.52484 14.9748 5.63317 14.9332 5.73317Z" />
                    </svg>
                  </Link>
                  <Link className="icon-socials icon-facebook" href="#">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18.3334 13.4915C18.3334 16.5248 16.5251 18.3332 13.4917 18.3332H12.5001C12.0417 18.3332 11.6667 17.9582 11.6667 17.4998V12.6915C11.6667 12.4665 11.8501 12.2748 12.0751 12.2748L13.5417 12.2498C13.6584 12.2415 13.7584 12.1582 13.7834 12.0415L14.0751 10.4498C14.1001 10.2998 13.9834 10.1582 13.8251 10.1582L12.0501 10.1832C11.8167 10.1832 11.6334 9.99985 11.6251 9.77485L11.5918 7.73317C11.5918 7.59984 11.7001 7.48318 11.8417 7.48318L13.8417 7.44984C13.9834 7.44984 14.0918 7.34152 14.0918 7.19985L14.0584 5.19983C14.0584 5.05816 13.9501 4.94984 13.8084 4.94984L11.5584 4.98318C10.1751 5.00818 9.07509 6.1415 9.10009 7.52484L9.14175 9.8165C9.15008 10.0498 8.96676 10.2332 8.73342 10.2415L7.73341 10.2582C7.59175 10.2582 7.48342 10.3665 7.48342 10.5082L7.50842 12.0915C7.50842 12.2332 7.61675 12.3415 7.75841 12.3415L8.75842 12.3248C8.99176 12.3248 9.17507 12.5082 9.18341 12.7332L9.2584 17.4832C9.26674 17.9498 8.89174 18.3332 8.42507 18.3332H6.50841C3.47508 18.3332 1.66675 16.5248 1.66675 13.4832V6.50817C1.66675 3.47484 3.47508 1.6665 6.50841 1.6665H13.4917C16.5251 1.6665 18.3334 3.47484 18.3334 6.50817V13.4915V13.4915Z" />
                    </svg>
                  </Link>
                  <Link className="icon-socials icon-twitter" href="#">
                    <svg width="18" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.82L4.99 21.75H1.68l7.73-8.83L1.254 2.25H8.55l4.713 6.23zm-1.161 17.52h1.833L7.54 4.126H5.574z"/>
                    </svg>
                  </Link>
                  <Link className="icon-socials icon-be" href="#">
                    <svg
                      width={21}
                      height={15}
                      viewBox="0 0 21 15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8.82393 10.736L13.9225 7.78881L8.82393 4.84165V10.736ZM20.1803 3.04389C20.308 3.50561 20.3964 4.12451 20.4554 4.91042C20.5242 5.69633 20.5536 6.37418 20.5536 6.96361L20.6126 7.78881C20.6126 9.94024 20.4554 11.5219 20.1803 12.5337C19.9347 13.4179 19.3649 13.9877 18.4808 14.2333C18.0191 14.361 17.1742 14.4494 15.8775 14.5083C14.6004 14.5771 13.4313 14.6066 12.3507 14.6066L10.7887 14.6655C6.67251 14.6655 4.10848 14.5083 3.09662 14.2333C2.21247 13.9877 1.64269 13.4179 1.39709 12.5337C1.26938 12.072 1.18097 11.4531 1.12203 10.6672C1.05326 9.8813 1.02379 9.20345 1.02379 8.61402L0.964844 7.78881C0.964844 5.63739 1.12203 4.05575 1.39709 3.04389C1.64269 2.15974 2.21247 1.58996 3.09662 1.34436C3.55834 1.21665 4.4032 1.12823 5.69995 1.06929C6.97705 1.00052 8.14609 0.971052 9.22671 0.971052L10.7887 0.912109C14.9049 0.912109 17.4689 1.06929 18.4808 1.34436C19.3649 1.58996 19.9347 2.15974 20.1803 3.04389Z" />
                    </svg>
                  </Link>
                  <Link className="icon-socials icon-be" href="#">
                    <svg width="18" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <path d="M2 8h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4zm6 6h3.8v1.7h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V20h-4v-7c0-1.7 0-3.9-2.4-3.9-2.4 0-2.7 1.8-2.7 3.8V20h-4z"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            {/* <div className="col-md-2 col-xs-6 footer-2">
              <h6 className="text-linear-3">Support</h6>
              <ul className="menu-footer">
                <li>
                  <Link href="#"> Help Center</Link>
                </li>
                <li>
                  <Link href="#">Live chat</Link>
                </li>
                <li>
                  <Link href="#">How it works</Link>
                </li>
                <li>
                  <Link href="#">Security</Link>
                </li>
                <li>
                  <Link href="#">Privacy</Link>
                </li>
                <li>
                  <Link href="#">Charges logs</Link>
                </li>
              </ul>
            </div> */}
             <div className="col-md-3 col-xs-6 footer-2">
              <h6 className="text-linear-3">Legal</h6>
              <ul className="menu-footer">
                <li>
                  <Link href="/terms-of-service">Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/cookies-policy">Cookies Policy</Link>
                </li>
                {/* <li>
                  <Link href="#">Data Processing</Link>
                </li>
                <li>
                  <Link href="#">Data Policy</Link>
                </li> */}
                <li>
                  <Link href="/refund-policy">Refund & Cancellation Policy</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-xs-6 footer-2">
              <h6 className="text-linear-3">Services</h6>
              <ul className="menu-footer">
                <li>
                  {/* <Link href="/tour-booking">Tour Booking</Link> */}
                  <Link href="/holiday">Tour Booking</Link>
                </li>
                <li>
                  {/* <Link href="/hotel-booking">Hotel Booking</Link> */}
                  <Link href="/hotels">Hotel Booking</Link>
                </li>
                <li>
                  <Link href="/flights">Flight Booking</Link>
                  {/* <Link href="/flight-booking">Flight Booking</Link> */}
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-xs-6 footer-2">
              <h6 className="text-linear-3">Company</h6>
              <ul className="menu-footer">
                <li>
                  <Link href="/about-us">About Us</Link>
                </li>
                <li>
                  <Link href="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom mt-20">
            <div className="row">
              <div className="col-md-6 text-md-start text-center mb-20">
                <p className="text-sm color-white">
                  © {new Date().getFullYear()} Developed and Designed By{" "}
                  <a href="https://digilogy.co/">Digilogy</a>. All rights
                  reserved.
                </p>
              </div>
              {/* <div className="col-md-6 text-md-end text-center mb-20">
                <ul className="menu-bottom-footer">
                  <li>
                    {" "}
                    <Link href="#">Terms</Link>
                  </li>
                  <li>
                    {" "}
                    <Link href="#">Privacy policy</Link>
                  </li>
                  <li>
                    <Link href="#">Legal notice</Link>
                  </li>
                  <li>
                    <Link href="#">Accessibility</Link>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
        </div>
      </footer>
    </>
  );

}
