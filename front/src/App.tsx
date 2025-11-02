import { Outlet, useLocation } from "react-router";
import { useCartStore } from "./stores/cart";
import { FilterProvider } from "./contexts/use-filters";
import Header from "./components/shared/header";
import Hero from "./components/shared/hero";
import Footer from "./components/shared/footer";
import { useUserStore } from "./stores/user";
import { useEffect } from "react";
import api from "./axios/config";
import Cart from "./components/shared/cart/cart";

const App = () => {
  const { pathname } = useLocation();
  const { isOpen: isCartOpen, fetchCart } = useCartStore();
  const { setUser, setIsLoading } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem("e-shopToken");
    if (!token) {
      setIsLoading(false);
      return;
    }

    const getUserData = async () => {
      try {
        setIsLoading(true);
        const { data: userData } = await api.get("/profile", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
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
