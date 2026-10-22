import { useCallback, useEffect, useState } from "react";
import { WishlistContext } from "./wishlist-context";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlist.service";

export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState([]);

  const loadWishlist = useCallback(async () => {
    try {
      const res = await getWishlist();
      setWishlistIds(res.data.map((item) => item.itemId));
    } catch (error) {
      console.error("Wishlist not loaded", error);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadWishlist();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadWishlist]);

  const toggleWishlist = async (itemId) => {
    if (wishlistIds.includes(itemId)) {
      await removeFromWishlist(itemId);
      setWishlistIds((prev) => prev.filter((id) => id !== itemId));
    } else {
      await addToWishlist(itemId);
      setWishlistIds((prev) => [...prev, itemId]);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleWishlist, loadWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
