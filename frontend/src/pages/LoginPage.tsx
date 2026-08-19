import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const mono = { fontFamily: "'IBM Plex Mono', 'Courier New', monospace" };

const LoginPage: React.FC = () => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError('EMAIL AND PASSWORD REQUIRED.');
      return;
    }

    await login(email.trim().toLowerCase(), password);
  };

  const displayError = (localError || error)?.toUpperCase();

  return (
    <div
      className="min-h-screen text-[#cdd6f4] antialiased flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(180deg, #181825 0%, #11111b 100%)',
        backgroundImage: 'radial-gradient(circle, #26263a 1px, transparent 1px), linear-gradient(180deg, #181825 0%, #11111b 100%)',
        backgroundSize: '22px 22px, 100% 100%',
      }}
    >
      <div className="w-full max-w-sm bg-[#1e1e2e] text-[#cdd6f4] rounded-xl border border-[#313244] shadow-2xl overflow-hidden font-sans">
        {/* Titlebar */}
        <div className="bg-[#181825] px-4 py-3 flex items-center border-b border-[#313244]">
          <div className="flex space-x-2">
            <span className="w-3 h-3 rounded-full inline-block bg-[#f38ba8]" />
            <span className="w-3 h-3 rounded-full inline-block bg-[#fab387]" />
            <span className="w-3 h-3 rounded-full inline-block bg-[#a6e3a1]" />
          </div>
        </div>

        <div className="p-6">
          <h1 className="text-lg font-bold m-0 text-[#cdd6f4]">Student Sign-In</h1>
          <p className="text-[#6c7086] text-[12px] mt-1 mb-6 font-mono">
            Enter credentials to access registry.
          </p>

          {displayError && (
            <div className="mb-4 px-4 py-3 bg-[rgba(243,139,168,0.1)] border border-[rgba(243,139,168,0.3)] text-[#f38ba8] text-xs rounded-lg flex justify-between items-center font-mono">
              <span>[error] {displayError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-[11px] text-[#6c7086] uppercase tracking-wide mb-1 font-mono">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email ..."
                className="w-full px-3 py-2 bg-[#11111b] border border-[#313244] rounded-lg text-[#cdd6f4] text-xs focus:outline-none focus:border-[#45475a] disabled:opacity-50"
                style={mono}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[11px] text-[#6c7086] uppercase tracking-wide mb-1 font-mono">
                Password *
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-[#11111b] border border-[#313244] rounded-lg text-[#cdd6f4] text-xs focus:outline-none focus:border-[#45475a] disabled:opacity-50"
                style={mono}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 bg-[#313244] hover:bg-[#45475a] text-[#a6e3a1] font-bold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer disabled:opacity-50 border border-[#45475a]"
              style={mono}
            >
              {loading ? 'Verifying…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
