import { Link, useNavigate } from 'react-router-dom';

export default function PageFrame({ children, profile, onLogout, onDeleteAccount }) {
  const navigate = useNavigate();
  const initials = profile?.name
    ? profile.name
        .split(' ')
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
    : 'U';

  const handleDelete = async () => {
    const password = window.prompt('Enter your password to delete your account');
    if (!password) return;
    await onDeleteAccount({ password });
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-[32px] font-bold tracking-tight">Tasks</Link>

          <div className="flex items-center gap-3">
            {!profile ? (
              <>
                <Link to="/login" className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-950">
                  Login
                </Link>
                <Link to="/signup" className="rounded-md bg-slate-950 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-800">
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800">
                  {initials}
                </button>
                <div className="absolute right-0 top-12 z-30 hidden w-56 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/70 group-hover:block">
                  <p className="text-sm font-semibold text-slate-950">{profile.name || 'User'}</p>
                  <p className="mt-1 text-sm text-slate-600">{profile.email || ''}</p>
                  <div className="mt-4 space-y-2">
                    <button
                      type="button"
                      onClick={async () => {
                        await onLogout();
                        navigate('/');
                      }}
                      className="block w-full rounded-xl bg-slate-950 px-3 py-2 text-left text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                      Logout
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="block w-full rounded-xl border border-rose-200 px-3 py-2 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                    >
                      Delete account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-center px-4 text-sm text-slate-600 sm:px-6 lg:px-8">
          © 2026 Task Manager
        </div>
      </footer>
    </div>
  );
}
