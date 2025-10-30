"use client";
import Layout from "@/components/layout/Layout";
import HomeContent from "./HomeContent";
import HomeDashboard from "@/components/sections/HomeDashboard";
import PopularDestinationsGrid from "@/components/sections/PopularDestinationsGrid";
import WhyChooseUs1 from "@/components/sections/WhyChooseUs1";
import Testimonials1 from "@/components/sections/Testimonials1";

export default function Home() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <HomeContent />
                <PopularDestinationsGrid />
                <HomeDashboard />
                <WhyChooseUs1 />
                {/* <Testimonials1 /> */}
            </Layout>
        </>
    );
}