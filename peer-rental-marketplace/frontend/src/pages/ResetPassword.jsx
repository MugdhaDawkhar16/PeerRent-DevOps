import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/auth.service";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await resetPassword(
        token,
        password
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage(
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
        <h1>Choose a new password.</h1>
        <p>Make it something secure that you’ll remember. You’ll be redirected to log in after your password is updated.</p>
        <form onSubmit={handleSubmit}>
          <input type="password" placeholder="New password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} required minLength={6} />
          <input type="password" placeholder="Confirm new password" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading} required minLength={6} />
          <button type="submit" disabled={loading}>{loading ? "Updating password…" : "Update password"}<ArrowRight size={17} /></button>
        </form>
        {message && <p role="status" className="pr-reset-message">{message}</p>}
        <Link to="/login">Back to log in</Link>
      </div>
    </div>
  );
}