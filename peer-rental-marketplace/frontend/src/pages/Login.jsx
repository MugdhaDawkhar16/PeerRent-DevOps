import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { login as loginUser } from "../services/auth.service";
import { useAuth } from "../context/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;
    const email = form.email.trim();
    if (!email || !form.password) { toast.error("Email and password are required."); return; }
    try {
      setLoading(true);
      const res = await loginUser({ email, password: form.password });
      if (!res?.data?.token) throw new Error("Token not received.");
      login(res.data.token);
      toast.success("Welcome back!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err.response?.data?.message || err.message || "Login failed.");
    } finally { setLoading(false); }
  };

  return <div className="pr-auth-layout">
    <aside className="pr-auth-aside"><div className="pr-auth-aside-pattern" /><div className="pr-auth-aside-content"><span className="pr-auth-overline"><Sparkles size={15} /> GOOD TO SEE YOU AGAIN</span><h2>Your next<br /><em>good find</em><br />is waiting.</h2><p>Pick up where you left off. The things you need are closer than you think.</p><div className="pr-auth-aside-note"><span className="pr-auth-note-icon">✳</span><div><strong>Share more. Own less.</strong><small>A community that makes more possible.</small></div></div></div><div className="pr-auth-aside-footer">PEERRENT · A BETTER WAY TO BORROW</div></aside>
    <section className="pr-auth-panel"><div className="pr-auth-mobile-brand"><span className="pr-brand-mark">p</span> peer<span>rent</span></div><div className="pr-auth-form-wrap"><div className="pr-auth-step">WELCOME BACK <span>01 / 02</span></div><h1>Log in to your space.</h1><p className="pr-auth-subtitle">Your next great find is just around the corner.</p>
      <form onSubmit={handleSubmit} className="pr-auth-form">
        <label htmlFor="login-email">Email address</label><div className="pr-input-with-icon"><Mail size={18} /><input id="login-email" type="email" name="email" placeholder="you@example.com" autoComplete="email" value={form.email} onChange={handleChange} disabled={loading} required /></div>
        <div className="pr-label-row"><label htmlFor="login-password">Password</label><Link to="/forgot-password">Forgot password?</Link></div><div className="pr-input-with-icon"><LockKeyhole size={18} /><input id="login-password" type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password" autoComplete="current-password" value={form.password} onChange={handleChange} disabled={loading} required /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
        <button type="submit" disabled={loading} className="pr-auth-submit">{loading ? "Logging you in…" : "Continue to PeerRent"}<ArrowRight size={18} /></button>
      </form><p className="pr-auth-switch">New to PeerRent? <Link to="/register">Create an account <ArrowRight size={15} /></Link></p><div className="pr-auth-privacy"><LockKeyhole size={14} /> Your account details stay private and secure.</div></div></section>
  </div>;
}
