import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { register } from "../services/auth.service";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;
    if (!form.name.trim() || !form.email.trim() || !form.password) { toast.error("Please fill in all fields."); return; }
    try {
      setLoading(true);
      await register({ ...form, name: form.name.trim(), email: form.email.trim() });
      toast.success("Your account is ready! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed.");
    } finally { setLoading(false); }
  };

  return <div className="pr-auth-layout pr-auth-register">
    <aside className="pr-auth-aside"><div className="pr-auth-aside-pattern" /><div className="pr-auth-aside-content"><span className="pr-auth-overline"><Sparkles size={15} /> MAKE ROOM FOR MORE</span><h2>Access more.<br /><em>Waste less.</em><br />Live bigger.</h2><p>Join a community where great things get used more, and owning less feels like having more.</p><div className="pr-auth-benefits"><span>✳ Find useful things nearby</span><span>✳ Earn from things you own</span><span>✳ Keep good stuff in circulation</span></div></div><div className="pr-auth-aside-footer">PEERRENT · A BETTER WAY TO BORROW</div></aside>
    <section className="pr-auth-panel"><div className="pr-auth-mobile-brand"><span className="pr-brand-mark">p</span> peer<span>rent</span></div><div className="pr-auth-form-wrap"><div className="pr-auth-step">YOUR COMMUNITY STARTS HERE <span>01 / 02</span></div><h1>Make yourself at home.</h1><p className="pr-auth-subtitle">Create your account. The good stuff awaits.</p>
      <form onSubmit={handleSubmit} className="pr-auth-form">
        <label htmlFor="register-name">Your name</label><div className="pr-input-with-icon"><UserRound size={18} /><input id="register-name" name="name" placeholder="What should we call you?" autoComplete="name" value={form.name} onChange={handleChange} disabled={loading} required /></div>
        <label htmlFor="register-email">Email address</label><div className="pr-input-with-icon"><Mail size={18} /><input id="register-email" type="email" name="email" placeholder="you@example.com" autoComplete="email" value={form.email} onChange={handleChange} disabled={loading} required /></div>
        <label htmlFor="register-password">Create a password</label><div className="pr-input-with-icon"><LockKeyhole size={18} /><input id="register-password" type={showPassword ? "text" : "password"} name="password" placeholder="Choose a secure password" autoComplete="new-password" value={form.password} onChange={handleChange} disabled={loading} required minLength={6} /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
        <button type="submit" disabled={loading} className="pr-auth-submit">{loading ? "Creating your account…" : "Create my account"}<ArrowRight size={18} /></button>
      </form><p className="pr-auth-switch">Already part of the community? <Link to="/login">Log in <ArrowRight size={15} /></Link></p><div className="pr-auth-privacy"><LockKeyhole size={14} /> Your account details stay private and secure.</div></div></section>
  </div>;
}
