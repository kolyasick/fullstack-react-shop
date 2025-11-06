import { useQuery } from "@tanstack/react-query";
import { useCartStore, useUserStore } from "../stores";
import { ACCESS_TOKEN_NAME } from "../constants/variables";
import { getProfile } from "../api/auth";
import { getCart } from "../api/cart";
import { useEffect } from "react";

export const useAuthInitialie = () => {
  const setCart = useCartStore((state) => state.setCart);

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setIsLoading = useUserStore((state) => state.setIsLoading);

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const token = localStorage.getItem(ACCESS_TOKEN_NAME);
      if (!token) throw new Error("No auth token");

      const { data } = await getProfile();
      return data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const cartQuery = useQuery({
    queryKey: ["cart", user?.uuid],
    queryFn: async () => {
      const { data } = await getCart(user!.uuid, false);
      return data;
    },
    enabled: !!user?.uuid,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (profileQuery.data) {
      setUser(profileQuery.data);
    }
  }, [profileQuery.data, setUser]);

  useEffect(() => {
    if (cartQuery.data) {
      setCart(cartQuery.data);
    }
  }, [cartQuery.data, setCart]);

  useEffect(() => {
    setIsLoading(profileQuery.isLoading || cartQuery.isLoading);
  }, [profileQuery.isLoading, cartQuery.isLoading, setIsLoading]);

  return {
    isLoading: profileQuery.isLoading || cartQuery.isLoading,
    isError: profileQuery.isError,
    user: profileQuery.data,
    cart: cartQuery.data,
  };
};
