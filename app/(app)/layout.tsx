'use client';

import { usePathname } from 'next/navigation';
import BottomNav from '@/components/BottomNav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLessonPage = pathname.startsWith('/lesson/');

  return (
    <>
      <main className={isLessonPage ? '' : 'pb-16'}>{children}</main>
      {!isLessonPage && <BottomNav />}
    </>
  );
}
