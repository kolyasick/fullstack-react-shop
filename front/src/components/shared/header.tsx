import HeaderSearchInput from "./header-search-input";
import Account from "../icons/account";
import Cart from "../icons/cart";
import Logout from "../icons/logout";
import api from "../../axios/config";

import { useUserStore } from "../../stores/user";
import { ACCESS_TOKEN_NAME } from "../../constants/app";
import { useCartStore } from "../../stores/cart";

import { Link, useLocation, useNavigate } from "react-router";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser } = useUserStore();
  const { toggleCart, cart, setCart } = useCartStore();

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      setCart(null);
      localStorage.removeItem(ACCESS_TOKEN_NAME);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-gray-300 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🎧</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">E-Shop</h1>
          </Link>

          {pathname === "/" && <HeaderSearchInput />}

          <div className="flex items-center">
            <button
              onClick={() => toggleCart(true)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative"
            >
              <Cart className="w-7 h-7" />

              {cart?.items && cart?.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold min-w-5 h-5 flex items-center justify-center rounded-full px-1 transform scale-100 animate-ping-once">
                  {cart?.items.length}
                </span>
              )}
            </button>
            <div className="text-gray-600 hover:text-blue-600 transition-colors relative inline-flex justify-center items-center">
              {user ? (
                <button onClick={logout} className="">
                  <Logout className="w-7 h-7" />
                </button>
              ) : (
                <Link to={"/login"}>
                  <Account className="w-7 h-7" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
