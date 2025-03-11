import Layout from "@/components/layout/Layout";
import FilterSearch from "@/components/flight";

export default function Home() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <FilterSearch />
      </Layout>
    </>
  );
}
