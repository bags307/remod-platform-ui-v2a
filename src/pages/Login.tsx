import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, KeyRound, Loader2, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../stores';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, error, setError, setLoading, setUser } = useAuthStore();
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      setUser(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: import.meta.env.VITE_AUTH_ENDPOINT,
        },
      });

      if (error) throw error;
      setMagicLinkSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (magicLinkSent) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-slate-800 rounded-xl shadow-xl p-8 border border-slate-700/50">
            <div className="h-12 w-12 rounded-xl bg-blue-600/20 flex items-center justify-center mx-auto mb-6">
              <Mail className="h-6 w-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-3">Check your email</h2>
            <p className="text-slate-400 mb-6">
              We've sent a magic link to <span className="text-white">{email}</span>
            </p>
            <button
              onClick={() => setMagicLinkSent(false)}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Try another method
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img 
          src="https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Abstract" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/50" />
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-900">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img 
              src="https://data.remodl.ai/storage/v1/object/public/public//remodl-white.png" 
              alt="Remodl AI" 
              className="h-8 mb-8"
            />
            <h2 className="text-3xl font-bold text-white">Welcome back</h2>
            <p className="mt-2 text-lg text-slate-400">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className={`p-4 rounded-lg text-sm flex items-center gap-2 ${
                error.includes('Magic link sent') 
                  ? 'bg-blue-500/10 border border-blue-500/20 text-blue-500'
                  : 'bg-red-500/10 border border-red-500/20 text-red-500'
              }`}>
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 pl-10 pr-3 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 pl-10 pr-3 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={handleMagicLink}
                  className="font-medium text-blue-500 hover:text-blue-400"
                >
                  Use magic link
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center items-center gap-2 rounded-lg bg-blue-500 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in to your account'
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-slate-400">
            Not a member?{' '}
            <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
              Create your account
            </a>
          </p>

          <div className="mt-4 text-center text-xs text-slate-500">
            <p>
              By signing in, you agree to our{' '}
              <a href="#" className="text-slate-400 hover:text-slate-300">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-slate-400 hover:text-slate-300">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}