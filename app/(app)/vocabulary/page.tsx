'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { allVocabulary } from '@/data/vocabulary';
import ArabicText from '@/components/ui/ArabicText';

const categories = [
  { key: 'all', label: 'Tout' },
  { key: 'pronoms_demonstratifs', label: 'Pronoms' },
  { key: 'negations', label: 'Negations' },
  { key: 'interrogatifs', label: 'Questions' },
  { key: 'prepositions', label: 'Prepositions' },
  { key: 'particules', label: 'Particules' },
  { key: 'connecteurs', label: 'Connecteurs' },
  { key: 'noms_allah', label: 'Noms d\'Allah' },
  { key: 'adjectifs', label: 'Adjectifs' },
  { key: 'prophetes', label: 'Prophetes' },
  { key: 'signes', label: 'Signes' },
  { key: 'deen', label: 'Deen' },
  { key: 'foi', label: 'Foi' },
  { key: 'actes', label: 'Actes' },
  { key: 'dernier_jour', label: 'Dernier Jour' },
  { key: 'vie_presente', label: 'Vie Presente' },
  { key: 'proches', label: 'Proches' },
  { key: 'pluriels_irreguliers', label: 'Pluriels' },
  { key: 'forme_verbale', label: 'Verbes' },
];

export default function VocabularyPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return allVocabulary.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        !search ||
        item.arabicWord.includes(search) ||
        item.transliteration.toLowerCase().includes(search.toLowerCase()) ||
        item.meaningFr.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-dvh bg-background px-5 py-6">
      <h1 className="text-2xl font-bold text-foreground mb-4">Vocabulaire</h1>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher un mot..."
        className="mb-4 w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-text-muted focus:border-primary focus:outline-none"
      />

      {/* Category pills */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`shrink-0 rounded-pill px-3 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === cat.key
                ? 'bg-primary text-white'
                : 'bg-surface-card text-text-secondary'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-sm text-text-muted mb-3">
        {filtered.length} mot{filtered.length > 1 ? 's' : ''}
      </p>

      {/* Word list */}
      <div className="flex flex-col gap-2">
        {filtered.map((item) => (
          <motion.div
            key={item.id}
            layout
            onClick={() =>
              setExpandedId(expandedId === item.id ? null : item.id)
            }
            className="rounded-lg border border-border bg-surface-card p-3 cursor-pointer active:bg-surface-warm transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ArabicText
                  text={item.arabicWord}
                  size="md"
                  className="text-foreground"
                />
                <span className="text-sm text-text-secondary">
                  {item.meaningFr}
                </span>
              </div>
              <span className="text-xs text-text-muted">
                {expandedId === item.id ? '▲' : '▼'}
              </span>
            </div>

            <AnimatePresence>
              {expandedId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 border-t border-border pt-3 flex flex-col gap-1">
                    <p className="text-sm text-text-muted italic">
                      {item.transliteration}
                    </p>
                    {item.partOfSpeech && (
                      <p className="text-xs text-text-muted">
                        Type : {item.partOfSpeech}
                      </p>
                    )}
                    {item.root && (
                      <p className="text-xs text-text-muted">
                        Racine :{' '}
                        <span className="font-arabic text-gold">
                          {item.root}
                        </span>
                      </p>
                    )}
                    {item.verbForm && (
                      <p className="text-xs text-text-muted">
                        Forme : {item.verbForm}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-text-muted py-8">
            Aucun mot trouve.
          </p>
        )}
      </div>
    </div>
  );
}
