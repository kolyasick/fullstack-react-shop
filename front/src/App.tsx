import { Outlet, useLocation } from "react-router";
import { useCartStore, useUserStore } from "./stores";
import { useEffect } from "react";
import { FilterProvider } from "./contexts/filters/use-filters.context";
import { Cart, Footer, Header, Hero } from "./components";
import { getProfile } from "./api/auth";

const App = () => {
  const { pathname } = useLocation();
  const { isOpen: isCartOpen, fetchCart } = useCartStore();
  const { setUser, setIsLoading } = useUserStore();

  useEffect(() => {
    const getUserData = async () => {
      try {
        setIsLoading(true);
        const { data: userData } = await getProfile();
        await fetchCart(userData.user.id);
        setUser(userData.user);
      } catch (error) {
        console.error("Auth error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getUserData();
  }, []);

  return (
    <FilterProvider>
      <div className="min-h-screen bg-gray-300 flex flex-col">
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
