'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface PremiumPaywallProps {
  isOpen: boolean;
  onClose: () => void;
}

const comparisonRows = [
  { label: 'Premier noeud par section', free: true, premium: true },
  { label: 'Toutes les lecons', free: false, premium: true },
  { label: 'Suivi de progression', free: false, premium: true },
  { label: 'Acces hors-ligne', free: false, premium: true },
];

export default function PremiumPaywall({ isOpen, onClose }: PremiumPaywallProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />

          {/* Modal card */}
          <motion.div
            className="relative z-10 w-full max-w-md rounded-xl bg-surface-card p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-surface-warm text-text-muted hover:text-foreground transition-colors"
              aria-label="Fermer"
            >
              ✕
            </button>

            {/* Title */}
            <div className="text-center mb-6">
              <span className="text-3xl">👑</span>
              <h2 className="mt-2 text-xl font-bold text-foreground">
                Debloquer QuranLab Premium
              </h2>
            </div>

            {/* Comparison table */}
            <div className="rounded-lg border border-border overflow-hidden mb-6">
              {/* Header */}
              <div className="grid grid-cols-3 bg-surface-warm">
                <div className="p-3 text-xs font-semibold text-text-muted" />
                <div className="p-3 text-center text-xs font-semibold text-text-secondary">
                  Gratuit
                </div>
                <div className="p-3 text-center text-xs font-semibold text-premium-light">
                  Premium
                </div>
              </div>

              {/* Rows */}
              {comparisonRows.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 ${
                    i < comparisonRows.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="p-3 text-xs text-text-secondary flex items-center">
                    {row.label}
                  </div>
                  <div className="p-3 flex items-center justify-center text-base">
                    {row.free ? (
                      <span className="text-correct">✅</span>
                    ) : (
                      <span className="text-incorrect">❌</span>
                    )}
                  </div>
                  <div className="p-3 flex items-center justify-center text-base">
                    <span className="text-correct">✅</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-premium py-3.5 text-sm font-semibold text-white active:opacity-90 transition-opacity"
            >
              Commencer l&apos;essai gratuit
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
