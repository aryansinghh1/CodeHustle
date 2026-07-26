import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function MainLayout({ children }) {
  
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 180px)" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;