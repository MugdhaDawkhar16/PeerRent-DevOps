import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Search, ArrowUpRight, ShieldCheck, Sparkles, Clock3, PackageCheck, Camera, Bike, Drill, Music2, Laptop, Sofa, BookOpen, LayoutGrid } from "lucide-react";
import { getItems } from "../services/item.service";
import { getCategories } from "../services/category.service";
import ItemCard from "../components/ItemCard";
import CardSkeletonGrid from "../components/CardSkeletonGrid";
import EmptyState from "../components/EmptyState";

const categoryIcons = {
  electronics: Laptop,
  cameras: Camera,
  tools: Drill,
  sports: Bike,
  "musical instruments": Music2,
  books: BookOpen,
  furniture: Sofa,
};
const fallbackCategories = [
  { name: "Electronics", icon: "💻" }, { name: "Cameras", icon: "📷" },
  { name: "Tools", icon: "🛠️" }, { name: "Sports", icon: "🚲" },
  { name: "Musical Instruments", icon: "🎸" }, { name: "Books", icon: "📚" },
];

export default function Home() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(fallbackCategories);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All items");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const [itemsRes, categoriesRes] = await Promise.all([getItems(), getCategories()]);
        if (!isMounted) return;
        setItems(Array.isArray(itemsRes?.data?.items) ? itemsRes.data.items : []);
        if (Array.isArray(categoriesRes?.data) && categoriesRes.data.length) setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Failed to load homepage data:", err);
        if (isMounted) toast.error(err.response?.data?.message || "Couldn't load listings. Please try again.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, []);

  const filteredItems = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return items.filter((item) => {
      const matchesSearch = !keyword || [item.title, item.description, item.category?.name].some((value) => (value || "").toLowerCase().includes(keyword));
      const matchesCategory = activeCategory === "All items" || item.category?.name?.toLowerCase() === activeCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [items, search, activeCategory]);

  return (
    <div className="pr-home">
      <section className="pr-hero">
        <div className="pr-hero-copy">
          <div className="pr-eyebrow"><span className="pr-eyebrow-dot" /> THE BETTER WAY TO GET WHAT YOU NEED</div>
          <h1>Good things<br /><em>are meant to</em><br />be shared.</h1>
          <p className="pr-hero-description">Find the gear you need from people nearby. Rent less, explore more, and give great things another life.</p>
          <form className="pr-search-bar" onSubmit={(event) => { event.preventDefault(); document.getElementById("marketplace-listings")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>
            <Search size={21} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Try ‘camera’, ‘drill’, ‘camping gear’..." aria-label="Search rental items" />
            {search && <button type="button" className="pr-search-clear" onClick={() => setSearch("")}>Clear</button>}
            <button type="submit" className="pr-search-submit">Find it <ArrowUpRight size={17} /></button>
          </form>
          <div className="pr-hero-trust"><span><ShieldCheck size={16} /> Community-powered</span><span><Sparkles size={16} /> More value, less waste</span></div>
        </div>
        <div className="pr-hero-art" aria-label="Discover items available to rent">
          <div className="pr-art-orbit pr-orbit-one" /><div className="pr-art-orbit pr-orbit-two" />
          <div className="pr-art-sticker pr-sticker-top"><span>✳</span> SHARE THE GOOD STUFF</div>
          <div className="pr-art-card pr-art-card-main"><div className="pr-art-photo"><div className="pr-art-sun" /><div className="pr-art-camera"><span /></div><div className="pr-art-shadow" /></div><div className="pr-art-card-caption"><div><small>WEEKEND FAVOURITE</small><strong>Ready for your next adventure</strong></div><span className="pr-art-arrow"><ArrowUpRight size={20} /></span></div></div>
          <div className="pr-art-float pr-float-price"><span className="pr-float-icon"><PackageCheck size={19} /></span><div><small>Good things, nearby</small><strong>Pay only when you need it</strong></div></div>
          <div className="pr-art-float pr-float-time"><Clock3 size={17} /><span>Easy, flexible rentals</span></div>
          <div className="pr-art-spark pr-spark-one">✦</div><div className="pr-art-spark pr-spark-two">✳</div>
        </div>
      </section>

      <section className="pr-category-section" aria-label="Browse by category">
        <div className="pr-section-kicker">A LITTLE BIT OF EVERYTHING</div>
        <div className="pr-category-row">
          <button className={`pr-category-chip ${activeCategory === "All items" ? "is-active" : ""}`} onClick={() => setActiveCategory("All items")}><LayoutGrid size={18} /><span>Everything</span></button>
          {categories.map((category) => {
            const Icon = categoryIcons[(category.name || "").toLowerCase()] || PackageCheck;
            return <button key={category.id || category.name} className={`pr-category-chip ${activeCategory === category.name ? "is-active" : ""}`} onClick={() => setActiveCategory(category.name)}><Icon size={18} /><span>{category.name}</span></button>;
          })}
        </div>
      </section>

      <section id="marketplace-listings" className="pr-listings-section">
        <div className="pr-section-heading"><div><div className="pr-section-kicker">GOOD FINDS, GREAT PEOPLE</div><h2>{search || activeCategory !== "All items" ? "Your next find is here." : "Find your next favourite."}</h2><p>Useful things, shared by people in your community.</p></div><span className="pr-listing-count">{filteredItems.length} {filteredItems.length === 1 ? "listing" : "listings"}</span></div>
        {loading ? <CardSkeletonGrid /> : filteredItems.length === 0 ? <EmptyState icon="🔎" title="No matches just yet" description="Try a different search or browse all categories to see what's available." buttonText="Show everything" onButtonClick={() => { setSearch(""); setActiveCategory("All items"); }} /> : <div className="pr-items-grid">{filteredItems.map((item) => <ItemCard key={item.id} item={item} />)}</div>}
      </section>
      <section className="pr-bottom-banner"><div className="pr-banner-icon">✳</div><div><span>HAVE SOMETHING WORTH SHARING?</span><h2>Turn the things you own into something good.</h2><p>List your first item and let someone else put it to great use.</p></div><Link to="/create-item" className="pr-banner-cta">Start sharing <ArrowUpRight size={18} /></Link></section>
    </div>
  );
}
