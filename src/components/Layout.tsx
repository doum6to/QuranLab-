import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  activeTab: 'home' | 'learn' | 'profile';
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      className={`w-6 h-6 ${active ? 'text-emerald-500' : 'text-gray-400'}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"
      />
    </svg>
  );
}

function LearnIcon({ active }: { active: boolean }) {
  return (
    <svg
      className={`w-6 h-6 ${active ? 'text-emerald-500' : 'text-gray-400'}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg
      className={`w-6 h-6 ${active ? 'text-emerald-500' : 'text-gray-400'}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

const tabs = [
  { key: 'home' as const, label: 'Home', Icon: HomeIcon },
  { key: 'learn' as const, label: 'Learn', Icon: LearnIcon },
  { key: 'profile' as const, label: 'Profile', Icon: ProfileIcon },
];

export default function Layout({ children, activeTab }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-white max-w-lg mx-auto relative">
      {/* Content area */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* Bottom tab navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="flex items-center justify-around h-16">
          {tabs.map(({ key, label, Icon }) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                className="flex flex-col items-center gap-0.5 px-4 py-2 cursor-pointer bg-transparent border-none"
              >
                <Icon active={isActive} />
                <span
                  className={`text-xs font-medium ${
                    isActive ? 'text-emerald-500' : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
