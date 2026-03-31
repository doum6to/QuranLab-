import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { words, getWordsByCategory } from '../data/words';
import type { Word } from '../types';

type CategoryTab = 'all' | 'noun' | 'verb' | 'particle';

const TABS: { key: CategoryTab; label: string; description: string }[] = [
  { key: 'all', label: 'Tout', description: 'Tous les mots du vocabulaire coranique' },
  { key: 'noun', label: 'Noms', description: 'Noms, adjectifs et pronoms' },
  { key: 'verb', label: 'Verbes', description: 'Verbes et formes verbales' },
  { key: 'particle', label: 'Particules', description: 'Prépositions, particules et conjonctions' },
];

function categoryToFilter(tab: CategoryTab): Word['category'] | undefined {
  if (tab === 'all') return undefined;
  return tab as Word['category'];
}

function FrequencyBadge({ frequency }: { frequency: number }) {
  let label: string;
  let color: string;

  if (frequency >= 1000) {
    label = 'Très fréquent';
    color = 'bg-emerald-100 text-emerald-700';
  } else if (frequency >= 300) {
    label = 'Fréquent';
    color = 'bg-blue-100 text-blue-700';
  } else {
    label = 'Courant';
    color = 'bg-gray-100 text-gray-600';
  }

  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${color}`}>
      {label}
    </span>
  );
}

function LearnedCheckmark() {
  return (
    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
      <svg
        className="w-4 h-4 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  );
}

export default function WordList() {
  const { progress } = useProgress();
  const [activeTab, setActiveTab] = useState<CategoryTab>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const learnedIds = useMemo(
    () => new Set(Object.keys(progress.wordProgress).map(Number)),
    [progress.wordProgress]
  );

  const filteredWords = useMemo(() => {
    let result: Word[];

    if (activeTab === 'all') {
      result = words;
    } else if (activeTab === 'particle') {
      // Include particles and prepositions
      result = words.filter(
        (w) => w.category === 'particle' || w.category === 'preposition'
      );
    } else {
      result = getWordsByCategory(categoryToFilter(activeTab));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (w) =>
          w.arabic.includes(q) ||
          w.transliteration.toLowerCase().includes(q) ||
          w.meaningFr.toLowerCase().includes(q) ||
          w.meaningEn.toLowerCase().includes(q)
      );
    }

    // Sort by frequency descending
    return [...result].sort((a, b) => b.frequency - a.frequency);
  }, [activeTab, searchQuery]);

  const activeTabInfo = TABS.find((t) => t.key === activeTab)!;

  return (
    <div className="min-h-dvh flex flex-col bg-white pb-20">
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <h1 className="font-serif text-2xl font-bold text-gray-900">
          Vocabulaire
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {words.length} mots -{' '}
          {learnedIds.size} appris
        </p>
      </div>

      {/* Search bar */}
      <div className="px-6 py-3">
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Rechercher un mot..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="px-6 border-b border-gray-100">
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Section header */}
      <div className="px-6 py-3">
        <p className="text-sm text-gray-500">{activeTabInfo.description}</p>
      </div>

      {/* Word list */}
      <div className="px-6 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="space-y-2"
          >
            {filteredWords.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-1">Aucun mot trouvé</p>
                <p className="text-gray-400 text-sm">
                  Essaie un autre terme de recherche
                </p>
              </div>
            ) : (
              filteredWords.map((word, index) => (
                <motion.div
                  key={word.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.03, 0.3) }}
                  className="card flex items-center gap-4 p-4"
                >
                  {/* Arabic text */}
                  <div className="w-16 text-center shrink-0">
                    <p className="font-arabic text-2xl text-gray-900">
                      {word.arabic}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-10 bg-gray-200 shrink-0" />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {word.meaningFr}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {word.transliteration}
                      {word.rootLetters && ` - ${word.rootLetters}`}
                    </p>
                    <div className="mt-1.5">
                      <FrequencyBadge frequency={word.frequency} />
                    </div>
                  </div>

                  {/* Learned status */}
                  {learnedIds.has(word.id) && <LearnedCheckmark />}
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
