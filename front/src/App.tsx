import { Outlet, useLocation } from "react-router";
import { useCartStore } from "./stores";
import { FilterProvider } from "./contexts/filters/use-filters.context";
import { Cart, Footer, Header, Hero } from "./components";

import { useAuthInitialie } from "./hooks";

const App = () => {
  useAuthInitialie();
  const isCartOpen = useCartStore((state) => state.isOpen);

  const { pathname } = useLocation();

  return (
    <FilterProvider>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        {pathname === "/" && <Hero />}
        <main className="container mx-auto px-4 py-8 flex-1">
          <Outlet />
          {isCartOpen && <Cart />}
        </main>
        <Footer />
      </div>
    </FilterProvider>
  );
};

export default App;
