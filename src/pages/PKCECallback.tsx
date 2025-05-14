import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

export default function PKCECallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the auth code from the URL
        const code = new URLSearchParams(window.location.search).get('code');
        if (!code) throw new Error('No code found in URL');

        // Exchange the code for a session
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) throw error;

        // Redirect to dashboard on success
        navigate('/dashboard');
      } catch (err) {
        console.error('Auth callback error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred during authentication');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500 text-sm max-w-md text-center">
          {error}
          <p className="text-slate-400 mt-2">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin mx-auto mb-4" />
        <p className="text-slate-400">Completing authentication...</p>
      </div>
    </div>
  );
}