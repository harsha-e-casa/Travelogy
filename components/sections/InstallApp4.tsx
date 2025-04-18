import Link from "next/link"

export default function InstallApp4() {
    return (
        <>

            <section className="section-box box-install-app box-install-app-3 background-body">
                <div className="container">
                    <div className="block-install-apps background-3">
                        <div className="row align-items-center">
                            <div className="col-lg-6 mb-40 wow fadeInUp"><span className="btn btn-tag-white">Install APP  Get
                                discount code</span>
                                <h2 className="title-why neutral-1000">Discover Seamless Travel with Travelogy</h2>
                                <p className="text-xl-medium neutral-500">Embark on a journey like never before with Travelogy –
                                    your ultimate travel companion.</p>
                                <div className="download-apps"> <Link href="#"><img  src="/assets/imgs/template/googleplay.png" alt="Travelogy" /></Link><Link href="#"><img  src="/assets/imgs/template/appstore.png" alt="Travelogy" /></Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
