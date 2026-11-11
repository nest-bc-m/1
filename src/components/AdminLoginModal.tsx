import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ShieldAlert
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useLanguage } from '../context/LanguageContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const { login } = useAdminData();
  const { currentLanguage } = useLanguage();

  const [idOrEmail, setIdOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Security Rate Limiter (Brute-force protection)
  const [failedAttempts, setFailedAttempts] = useState<number>(() => {
    try {
      const saved = sessionStorage.getItem('nest_admin_failed_attempts');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [lockoutUntil, setLockoutUntil] = useState<number>(() => {
    try {
      const saved = sessionStorage.getItem('nest_admin_lockout_until');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [remainingLockSeconds, setRemainingLockSeconds] = useState(0);

  // Countdown effect for security lockout
  useEffect(() => {
    if (!lockoutUntil) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, Math.ceil((lockoutUntil - now) / 1000));
      setRemainingLockSeconds(diff);
      if (diff <= 0) {
        setLockoutUntil(0);
        sessionStorage.removeItem('nest_admin_lockout_until');
        sessionStorage.removeItem('nest_admin_failed_attempts');
        setFailedAttempts(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutUntil]);

  if (!isOpen) return null;

  const isLockedOut = remainingLockSeconds > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLockedOut) return;

    setError(null);
    setLoading(true);

    setTimeout(() => {
      const res = login(idOrEmail, password);
      setLoading(false);

      if (res.success) {
        // Reset security attempt counter
        sessionStorage.removeItem('nest_admin_failed_attempts');
        sessionStorage.removeItem('nest_admin_lockout_until');
        setFailedAttempts(0);
        onLoginSuccess();
        onClose();
      } else {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);
        sessionStorage.setItem('nest_admin_failed_attempts', String(nextAttempts));

        if (nextAttempts >= 5) {
          // Lock for 30 seconds
          const lockTime = Date.now() + 30000;
          setLockoutUntil(lockTime);
          sessionStorage.setItem('nest_admin_lockout_until', String(lockTime));
          setRemainingLockSeconds(30);
          setError(
            currentLanguage === 'kn'
              ? 'ಸುರಕ್ಷತಾ ಲಾಕ್‌ಔಟ್: 5 ಬಾರಿ ವಿಫಲ ಪ್ರಯತ್ನಗಳು. ದಯವಿಟ್ಟು 30 ಸೆಕೆಂಡುಗಳ ನಂತರ ಪ್ರಯತ್ನಿಸಿ.'
              : 'Security Lockout: 5 failed login attempts. Please wait 30 seconds before trying again.'
          );
        } else {
          setError(
            `${res.error || (currentLanguage === 'kn' ? 'ತಪ್ಪಾದ ರುಜುವಾತುಗಳು' : 'Invalid credentials')}. (${
              currentLanguage === 'kn' ? 'ಪ್ರಯತ್ನ' : 'Attempt'
            } ${nextAttempts} / 5)`
          );
        }
      }
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 font-sans">
      <div className="bg-[#112440] text-white rounded-3xl max-w-md w-full overflow-hidden border-2 border-[#D4AF37] shadow-2xl space-y-0 relative">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-[#1A365D] border-b border-[#D4AF37]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#112440] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] block">
                  NEST Mysore · Security Gateway
                </span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono border border-emerald-400/30">
                  SSL Encrypted
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                {currentLanguage === 'kn' ? 'ವೆಬ್‌ಸೈಟ್ ಆಡಳಿತ ಲಾಗಿನ್' : 'Administrative Portal Login'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#1A365D] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close login modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lockout Warning Banner if Active */}
        {isLockedOut && (
          <div className="p-4 bg-red-950/90 border-b border-red-500/60 text-red-200 text-xs flex items-center gap-2.5 animate-pulse">
            <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div>
              <span className="font-bold block">
                {currentLanguage === 'kn' ? 'ದರ-ಮಿತಿ ಲಾಕ್‌ಔಟ್ ಸಕ್ರಿಯವಾಗಿದೆ' : 'Rate-Limit Lockout Active'}
              </span>
              <span>
                {currentLanguage === 'kn'
                  ? `ಹಲವು ವಿಫಲ ಪ್ರಯತ್ನಗಳ ಕಾರಣ ತಾತ್ಕಾಲಿಕ ರಕ್ಷಣೆ. ಪುನಃ ಪ್ರಯತ್ನಿಸಲು: `
                  : `Temporary brute-force protection active. Unlock in `}
                <strong>{remainingLockSeconds}s</strong>
              </span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* ID / Username Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200 block">
              {currentLanguage === 'kn' ? 'ಅಡ್ಮಿನ್ ಇಮೇಲ್ / ಐಡಿ' : 'Administrator Email / ID'}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                autoComplete="username"
                disabled={isLockedOut}
                value={idOrEmail}
                onChange={(e) => setIdOrEmail(e.target.value)}
                placeholder={currentLanguage === 'kn' ? 'ಅಡ್ಮಿನ್ ಇಮೇಲ್ ನಮೂದಿಸಿ' : 'Enter Admin Email'}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0c182b] border border-white/20 focus:border-[#D4AF37] focus:outline-none text-white text-xs sm:text-sm disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200 block">
              {currentLanguage === 'kn' ? 'ಪಾಸ್‌ವರ್ಡ್' : 'Password'}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                disabled={isLockedOut}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={currentLanguage === 'kn' ? 'ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ' : 'Enter your password'}
                className="w-full px-4 py-2.5 pr-10 rounded-xl bg-[#0c182b] border border-white/20 focus:border-[#D4AF37] focus:outline-none text-white text-xs sm:text-sm disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || isLockedOut}
              className="w-full py-3 rounded-xl bg-[#D4AF37] hover:bg-white text-[#1A365D] font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>{currentLanguage === 'kn' ? 'ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...' : 'Authenticating Secure Session...'}</span>
              ) : isLockedOut ? (
                <span>Locked ({remainingLockSeconds}s)</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>{currentLanguage === 'kn' ? 'ಅಡ್ಮಿನ್ ಪೋರ್ಟಲ್ ಪ್ರವೇಶಿಸಿ' : 'Enter Admin Control Panel'}</span>
                </>
              )}
            </button>
          </div>

          {/* Secure Notice footer */}
          <div className="pt-2 text-center text-[10.5px] text-slate-400 border-t border-white/10">
            <span>Authorized IT Administrator Access Only · NEST Mysore</span>
          </div>
        </form>

      </div>
    </div>
  );
};
