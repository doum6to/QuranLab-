'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<{ email?: string; name?: string } | null>(
    null
  );
  const [stats, setStats] = useState({
    streakCount: 0,
    totalXp: 0,
    lastActive: '',
    subscriptionTier: 'FREE' as string,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        setLoading(false);
        return;
      }

      setUser({ email: authUser.email });

      const { data: profile } = await supabase
        .from('profiles')
        .select('name, streak_count, total_xp, last_active, subscription_tier')
        .eq('id', authUser.id)
        .single();

      if (profile) {
        setUser({ email: authUser.email, name: profile.name });
        setStats({
          streakCount: profile.streak_count ?? 0,
          totalXp: profile.total_xp ?? 0,
          lastActive: profile.last_active ?? '',
          subscriptionTier: profile.subscription_tier ?? 'FREE',
        });
      }
      setLoading(false);
    }

    loadProfile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background px-5 py-6">
      <h1 className="text-2xl font-bold text-foreground mb-6">Mon Profil</h1>

      {/* User info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-surface-card p-5 mb-6"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-2xl">
            👤
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">
              {user?.name || 'Apprenant'}
            </p>
            <p className="text-sm text-text-secondary">{user?.email || ''}</p>
            <span
              className={`mt-1 inline-block rounded-pill px-2 py-0.5 text-xs font-semibold ${
                stats.subscriptionTier === 'PREMIUM'
                  ? 'bg-premium/20 text-premium-light'
                  : 'bg-surface-warm text-text-muted'
              }`}
            >
              {stats.subscriptionTier === 'PREMIUM' ? '👑 Premium' : 'Gratuit'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl bg-surface-card p-4 text-center"
        >
          <p className="text-3xl font-bold text-primary">{stats.totalXp}</p>
          <p className="text-xs text-text-muted mt-1">XP Total</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl bg-surface-card p-4 text-center"
        >
          <p className="text-3xl font-bold text-gold">{stats.streakCount}</p>
          <p className="text-xs text-text-muted mt-1">Jours de suite</p>
        </motion.div>
      </div>

      {/* Subscription section */}
      {stats.subscriptionTier === 'FREE' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-premium/30 bg-premium/5 p-5 mb-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">👑</span>
            <h3 className="text-lg font-semibold text-premium-light">
              Passer a Premium
            </h3>
          </div>
          <p className="text-sm text-text-secondary mb-3">
            Debloquez toutes les lecons, le suivi de progression et l'acces
            hors-ligne.
          </p>
          <button className="w-full rounded-lg bg-premium py-3 text-sm font-semibold text-white active:opacity-90">
            Commencer l'essai gratuit
          </button>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <button
          onClick={handleLogout}
          className="w-full rounded-lg border border-border bg-surface py-3 text-sm font-medium text-text-secondary active:bg-surface-warm"
        >
          Se deconnecter
        </button>
      </motion.div>
    </div>
  );
}
