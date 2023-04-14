import Navbar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
