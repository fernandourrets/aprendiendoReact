import { Outlet } from "react-router-dom";
import Hero from "../landing/Hero";
import Footer from "../common/footer";

export default function PublicLayout() {
  return (
    <div className="dark bg-luxury min-h-screen text-[#f0ede8]">
      <Hero />
      <Outlet />
      <Footer />
    </div>
  );
}