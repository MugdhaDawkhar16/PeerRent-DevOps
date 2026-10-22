import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { forgotPassword } from "../services/auth.service";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error("Email is required.");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const res = await forgotPassword(trimmedEmail);

      toast.success(
        res?.data?.message ||
          "Password reset link sent."
      );

      setEmail("");
    } catch (err) {
      console.error(
        "Forgot password failed:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pr-simple-auth">
      <div className="pr-simple-auth-card">
        <span className="pr-brand-mark">p</span>
        <h1>Forgot your password?</h1>
        <p>No stress. Share the email address connected to your PeerRent account and we’ll send you a reset link.</p>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Enter your email address" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} required />
          <button type="submit" disabled={loading}>{loading ? "Sending reset link…" : "Send reset link"}<ArrowRight size={17} /></button>
        </form>
        <Link to="/login">Back to log in</Link>
      </div>
    </div>
  );
}