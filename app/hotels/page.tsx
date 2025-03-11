import FilterSearch from "@/components/sections/FilterSearch"
import Layout from "@/components/layout/Layout"
import BannerHome3 from "@/components/sections/BannerHome3"
import Banner from "@/components/sections/Banner"
import HowItWork1 from "@/components/sections/HowItWork1"
import OurFeatured2 from "@/components/sections/OurFeatured2" 

import SlideBanner1 from "@/components/sections/SlideBanner1"
import Testimonials3 from "@/components/sections/Testimonials3"


export default function Home4() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>  
                {/*<BannerHome3 />*/}
                {/*<Logos1 />*/}
                {/*<PopularDestinations4 />*/}
                {/*<OurFeatured2 />*/}
                <Banner />
                {/*<SlideBanner1 />*/}
                <HowItWork1 />
                <Testimonials3 />
            </Layout>
        </>
    )
}