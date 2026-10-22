import { NavLink, Link, useNavigate } from "react-router-dom";
import { Bell, Menu, X, Plus, LayoutDashboard, Heart, Package, CalendarDays, LogOut, ArrowUpRight } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { useNotifications } from "../context/useNotifications";
import NotificationDropdown from "./NotificationDropdown";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { token, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const notificationRef = useRef(null);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/login");
  };
  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) setShowNotifications(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }) => `pr-nav-link ${isActive ? "is-active" : ""}`;
  const mobileLinkClass = ({ isActive }) => `pr-mobile-link ${isActive ? "is-active" : ""}`;

  return (
    <header className="pr-header">
      <nav className="pr-nav" aria-label="Main navigation">
        <Link to="/" className="pr-brand" onClick={closeMobileMenu}>
          <span className="pr-brand-mark">p</span>
          <span>peer<span className="pr-brand-light">rent</span><small>SHARE MORE. OWN LESS.</small></span>
        </Link>

        <div className="pr-nav-center">
          <NavLink to="/" end className={navLinkClass}>Explore</NavLink>
          {token && <NavLink to="/my-items" className={navLinkClass}>My listings</NavLink>}
          {token && <NavLink to="/bookings" className={navLinkClass}>Bookings</NavLink>}
        </div>

        <div className="pr-nav-actions">
          {token ? (
            <>
              <div className="pr-notification-wrap" ref={notificationRef}>
                <button className="pr-icon-button" aria-label="Notifications" onClick={() => setShowNotifications((value) => !value)}>
                  <Bell size={19} />
                  {unreadCount > 0 && <span className="pr-notification-dot">{unreadCount > 99 ? "99+" : unreadCount}</span>}
                </button>
                {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}
              </div>
              <Link to="/wishlist" className="pr-icon-button pr-wishlist-nav" aria-label="Wishlist"><Heart size={19} /></Link>
              <Link to="/dashboard" className="pr-avatar-link" title="Dashboard"><LayoutDashboard size={17} /><span>My space</span></Link>
              <Link to="/create-item" className="pr-primary-button pr-list-button"><Plus size={17} /> List an item</Link>
              <button onClick={handleLogout} className="pr-logout-button" aria-label="Log out"><LogOut size={17} /></button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>Log in</NavLink>
              <Link to="/register" className="pr-primary-button">Get started <ArrowUpRight size={16} /></Link>
            </>
          )}
        </div>

        <button className="pr-menu-toggle" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} onClick={() => setMobileMenuOpen((open) => !open)}>
          {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="pr-mobile-menu">
          <NavLink to="/" end onClick={closeMobileMenu} className={mobileLinkClass}>Explore</NavLink>
          {token ? (
            <>
              <NavLink to="/create-item" onClick={closeMobileMenu} className={mobileLinkClass}><Plus size={17} /> List an item</NavLink>
              <NavLink to="/my-items" onClick={closeMobileMenu} className={mobileLinkClass}><Package size={17} /> My listings</NavLink>
              <NavLink to="/bookings" onClick={closeMobileMenu} className={mobileLinkClass}><CalendarDays size={17} /> Bookings</NavLink>
              <NavLink to="/wishlist" onClick={closeMobileMenu} className={mobileLinkClass}><Heart size={17} /> Wishlist</NavLink>
              <NavLink to="/notifications" onClick={closeMobileMenu} className={mobileLinkClass}><Bell size={17} /> Notifications {unreadCount > 0 && `(${unreadCount})`}</NavLink>
              <NavLink to="/dashboard" onClick={closeMobileMenu} className={mobileLinkClass}><LayoutDashboard size={17} /> Dashboard</NavLink>
              <button onClick={handleLogout} className="pr-mobile-logout"><LogOut size={17} /> Log out</button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={closeMobileMenu} className={mobileLinkClass}>Log in</NavLink>
              <NavLink to="/register" onClick={closeMobileMenu} className="pr-primary-button">Create your account <ArrowUpRight size={16} /></NavLink>
            </>
          )}
        </div>
      )}
    </header>
  );
}
