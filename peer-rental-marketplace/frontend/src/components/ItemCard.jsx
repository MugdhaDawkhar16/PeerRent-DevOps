import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Heart, ArrowUpRight, Tag } from "lucide-react";
import { useWishlist } from "../context/useWishlist";
import ImageWithFallback from "./ImageWithFallback";

export default function ItemCard({ item }) {
  const { wishlistIds, toggleWishlist } = useWishlist();
  const isWishlisted = wishlistIds.includes(item.id);

  const handleWishlist = async () => {
    try {
      await toggleWishlist(item.id);
      toast.success(isWishlisted ? "Removed from wishlist" : "Saved to wishlist");
    } catch (err) {
      toast.error(err.response?.data?.message || "Wishlist operation failed.");
    }
  };

  return (
    <article className="pr-item-card">
      <Link to={`/items/${item.id}`} className="pr-item-image-link" aria-label={`View ${item.title}`}>
        <div className="pr-item-image">
          <ImageWithFallback src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" fallbackIcon={item.category?.icon || "📦"} />
          <span className="pr-image-category">{item.category?.name || "For rent"}</span>
        </div>
      </Link>
      <button onClick={handleWishlist} className={`pr-save-button ${isWishlisted ? "is-saved" : ""}`} aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}>
        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
      </button>
      <div className="pr-item-card-body">
        <div className="pr-item-card-heading">
          <Link to={`/items/${item.id}`}><h3>{item.title}</h3></Link>
          <div className="pr-item-price"><strong>₹{Number(item.dailyRate || 0).toLocaleString("en-IN")}</strong><span>/ day</span></div>
        </div>
        <p className="pr-item-description">{item.description || "A great find, ready for its next adventure."}</p>
        <div className="pr-item-card-footer">
          <span className="pr-item-meta"><Tag size={14} /> {item.category?.name || "Flexible rental"}</span>
          <Link to={`/items/${item.id}`} className="pr-card-arrow" aria-label={`See details for ${item.title}`}><ArrowUpRight size={18} /></Link>
        </div>
      </div>
    </article>
  );
}
