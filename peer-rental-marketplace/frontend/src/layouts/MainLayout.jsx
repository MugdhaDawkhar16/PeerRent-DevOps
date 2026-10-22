import { Link } from "react-router-dom";
import { ArrowUpRight, Heart, Leaf } from "lucide-react";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="pr-app-shell">
      <Navbar />
      <main className="pr-main mx-auto max-w-7xl px-6 py-8">{children}</main>
      <footer className="pr-footer"><div className="pr-footer-inner"><Link to="/" className="pr-footer-brand"><span className="pr-brand-mark">p</span> peerrent</Link><p><Leaf size={15} /> Better things happen when we share.</p><div><Link to="/">Explore</Link><Link to="/register">Join the community <ArrowUpRight size={14} /></Link><Link to="/wishlist"><Heart size={14} /> Wishlist</Link></div><small>© {new Date().getFullYear()} PeerRent. Made for sharing.</small></div></footer>
    </div>
  );
}
