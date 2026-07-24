import MainLayout from "../../layouts/MainLayout";

import Hero from "../../components/home/Hero";
import Stats from "../../components/home/Stats";
import TrustedBy from "../../components/home/TrustedBy";
import WhyChoose from "../../components/home/WhyChoose";
import CTA from "../../components/home/CTA";

function Home() {
  return (
    <MainLayout>
      <Hero />

      <TrustedBy />

      <Stats />

      <WhyChoose />

      <CTA />
    </MainLayout>
  );
}

export default Home;