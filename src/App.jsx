import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageFrame from './components/PageFrame.jsx';
import DashboardSection from './components/DashboardSection.jsx';
import LoginForm from './forms/LoginForm.jsx';
import SignupForm from './forms/SignupForm.jsx';
import { getDashboard, loginUser, logoutUser, signupUser, deleteAccountUser } from './api/taskApi.js';
import HeroSection from './components/HeroSection.jsx';

function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [profile, setProfile] = useState(null);
  const [authMessage, setAuthMessage] = useState('');

  useEffect(() => {
    const verifySession = async () => {
      try {
        const data = await getDashboard();
        const userData = data?.user || data || null;
        setProfile(userData);
        setIsAuthenticated(Boolean(userData));
      } catch (error) {
        setAuthMessage(error.message || '');
        setIsAuthenticated(false);
        setProfile(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    verifySession();
  }, []);

  const handleLogin = async ({ email, password }) => {
    try {
      setAuthMessage('');
      await loginUser({ email, password });
      const data = await getDashboard();
      const userData = data?.user || data || null;
      setProfile(userData);
      setIsAuthenticated(Boolean(userData));
      if (!userData) {
        setAuthMessage('Login succeeded but no profile was returned.');
      }
    } catch (error) {
      setAuthMessage(error.message || 'Login failed');
    }
  };

  const handleSignup = async ({ name, email, password }) => {
    try {
      setAuthMessage('');
      await signupUser({ name, email, password });
      const data = await getDashboard();
      const userData = data?.user || data || null;
      setProfile(userData);
      setIsAuthenticated(Boolean(userData));
      if (!userData) {
        setAuthMessage('Signup succeeded but no profile was returned.');
      }
    } catch (error) {
      setAuthMessage(error.message || 'Signup failed');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // Ignore and clear local UI state
    }

    setIsAuthenticated(false);
    setProfile(null);
  };

  const handleDeleteAccount = async ({ password }) => {
    try {
      await deleteAccountUser({ password });
      setIsAuthenticated(false);
      setProfile(null);
    } catch (error) {
      setAuthMessage(error.message || 'Delete account failed');
    }
  };

  if (isCheckingAuth) {
    return (
      <PageFrame profile={profile} onLogout={handleLogout} onDeleteAccount={handleDeleteAccount}>
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-20 text-slate-600">
          Checking session...
        </div>
      </PageFrame>
    );
  }

  return (
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <PageFrame profile={profile} onLogout={handleLogout} onDeleteAccount={handleDeleteAccount}>
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
                  <HeroSection />
                </div>
              </PageFrame>
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <PageFrame profile={profile} onLogout={handleLogout} onDeleteAccount={handleDeleteAccount}>
                <div className="mx-auto flex max-w-7xl justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
                  <LoginForm onSubmit={handleLogin} authMessage={authMessage} />
                </div>
              </PageFrame>
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <PageFrame profile={profile} onLogout={handleLogout} onDeleteAccount={handleDeleteAccount}>
                <div className="mx-auto flex max-w-7xl justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
                  <SignupForm onSubmit={handleSignup} authMessage={authMessage} />
                </div>
              </PageFrame>
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PageFrame profile={profile} onLogout={handleLogout} onDeleteAccount={handleDeleteAccount}>
                <DashboardSection />
              </PageFrame>
            </ProtectedRoute>
          }
        />
      </Routes>
  );
}

export default App;