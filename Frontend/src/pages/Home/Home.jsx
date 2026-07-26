import MainLayout from "../../layouts/MainLayout";

import Hero from "../../components/home/Hero";
import TrustedBy from "../../components/home/TrustedBy";
import Stats from "../../components/home/Stats";
import WhyChoose from "../../components/home/WhyChoose";
import CTA from "../../components/home/CTA";

function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col" style={{ gap: 16 }}>
        <Hero />
        <TrustedBy />
        <Stats />
        <WhyChoose />
        <CTA />
      </div>
    </MainLayout>
  );
}

export default Home;