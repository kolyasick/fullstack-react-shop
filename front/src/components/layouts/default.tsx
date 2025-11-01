import { Outlet, useLocation } from "react-router";

import Header from "../shared/header";
import Footer from "../shared/footer";
import Hero from "../shared/hero";
import { FilterProvider } from "../../contexts/use-filters";

const DefaultLayout = () => {
  const { pathname } = useLocation();

  return (
    <FilterProvider>
      <div className="min-h-screen bg-gray-300 flex flex-col">
        <Header />
        {pathname === "/" && <Hero />}
        <main className="container mx-auto px-4 py-8 flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </FilterProvider>
  );
};

export default DefaultLayout;
