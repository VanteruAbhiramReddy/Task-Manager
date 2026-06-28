import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm({ onSubmit, authMessage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    onSubmit?.({ email, password });
  };

  return (
    <form
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/80 max-w-md"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-950">Sign in</h2>
        <p className="text-sm text-slate-500">
          Enter your credentials to access your task workspace.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Email address
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            placeholder="you@example.com"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            placeholder="Enter password"
          />
        </label>
      </div>

      {error ? (
        <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>
      ) : null}
      {authMessage ? (
        <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{authMessage}</p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Continue
      </button>

      <p className="text-center text-sm text-slate-500">
        Don&apos;t have an account? <Link to="/signup" className="font-semibold text-slate-950">Sign up to get started.</Link>
      </p>
    </form>
  );
}
