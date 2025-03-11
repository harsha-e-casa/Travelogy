'use client'
import CurrencyDropdown from '@/components/elements/CurrencyDropdown'
import LanguageDropdown from '@/components/elements/LanguageDropdown'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const ThemeSwitch = dynamic(() => import('@/components/elements/ThemeSwitch'), {
	ssr: false,
})

export default function Header1({ scroll, handleLogin, handleMobileMenu, handleRegister, handleSidebar }: any) {
	return (
		<>

			<header className={`header sticky-bar ${scroll ? "stick" : ""}`}>
				
				<div className="container-fluid background-body">
					<div className="main-header">
						<div className="header-left">
							<div className="header-logo"><Link className="d-flex" href="/"><img className="light-mode header_logo" alt="Travelogy" src="https://travelogy.digilogy.co/Travelogy%20logoNew.png" /><img className="dark-mode" alt="Travelogy" src="/assets/imgs/template/logo-w.svg" /></Link></div>
							<div className="header-nav">
								<nav className="nav-main-menu">
									<ul className="main-menu">
										<li className=""><Link className="active" href="/">Home</Link></li>
										{/*<li className=""><Link href="/about">Tours</Link></li>*/}
										<li className=""><Link href="/hotels">Hotel</Link></li>
										<li className=""><Link href="/flights">Flights</Link></li>
										<li className=""><Link href="javascript:void(0)">Themes</Link></li>
										{/*<li className=""><Link href="/index-grid">Blog</Link></li>*/}
										<li><Link href="/contact">Contact</Link></li>
									</ul>
								</nav>
							</div>
						</div>

						<div className="header-right">
							{/*<LanguageDropdown />*/}
							{/*<CurrencyDropdown />*/}
							<div className="d-none d-xxl-inline-block align-middle">
								<a className="btn btn-default btn-signin mr-10" onClick={handleLogin}>Signin</a>
								<ThemeSwitch />
							</div>
							{/*<div className="burger-icon-2 burger-icon-white" onClick={handleSidebar}>
								<img src="/assets/imgs/template/icons/menu.svg" alt="Travelogy" />
							</div>*/}
							<div className="burger-icon burger-icon-white" onClick={handleMobileMenu}>
								<span className="burger-icon-top" />
								<span className="burger-icon-mid" />
								<span className="burger-icon-bottom" />
							</div>
						</div>
					</div>
				</div>

			</header>
			
		</>
	)
}
