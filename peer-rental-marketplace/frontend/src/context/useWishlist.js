import { useContext } from "react";
import { WishlistContext } from "./wishlist-context";

export function useWishlist() {
  return useContext(WishlistContext);
}
