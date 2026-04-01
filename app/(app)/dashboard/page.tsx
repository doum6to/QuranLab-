'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { allCourses } from '@/data/courses';
import PathMap from '@/components/PathMap';
import PremiumPaywall from '@/components/PremiumPaywall';

export default function DashboardPage() {
  const router = useRouter();
  const [showPaywall, setShowPaywall] = useState(false);

  const handleNodePress = (nodeId: string) => {
    router.push(`/lesson/${nodeId}`);
  };

  const handleLockedPremiumPress = () => {
    setShowPaywall(true);
  };

  return (
    <div className="min-h-dvh bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border-light">
        <div className="flex items-center justify-between px-5 py-3">
          <h1 className="text-xl font-bold text-foreground">QuranLab</h1>
          <div className="flex items-center gap-1 rounded-pill bg-surface-card px-3 py-1.5">
            <span className="text-base">⚡</span>
            <span className="text-sm font-semibold text-gold">0</span>
          </div>
        </div>
      </header>

      {/* Path map */}
      <div className="px-5 py-6">
        <PathMap
          courses={allCourses}
          onNodePress={handleNodePress}
          onLockedPremiumPress={handleLockedPremiumPress}
        />
      </div>

      {/* Premium paywall modal */}
      <PremiumPaywall
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
      />
    </div>
  );
}
