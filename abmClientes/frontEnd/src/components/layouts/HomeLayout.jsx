import { Outlet } from "react-router-dom";

/**
 * Layout for public pages: home and login.
 * Minimal — just the dark background, no admin nav.
 */
export default function HomeLayout() {
  return (
    <div className="dark bg-luxury min-h-screen text-[#f0ede8]">
      <Outlet />
    </div>
  );
}
