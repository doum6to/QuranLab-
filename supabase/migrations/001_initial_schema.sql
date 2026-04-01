-- QuranLab MVP - Initial Schema
-- Supabase + PostgreSQL

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE subscription_tier AS ENUM ('FREE', 'PREMIUM');
CREATE TYPE node_status AS ENUM ('LOCKED', 'UNLOCKED', 'COMPLETED');

-- ============================================================
-- 1. USER & MONETISATION
-- ============================================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  streak_count INT DEFAULT 0,
  total_xp INT DEFAULT 0,
  last_active TIMESTAMPTZ DEFAULT NOW(),
  subscription_tier subscription_tier DEFAULT 'FREE',
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- 2. ARCHITECTURE DU PARCOURS (Duolingo Style)
-- ============================================================

-- Course (ex: "Les Fondements - 0 à 50%")
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#10B981',
  icon TEXT,
  "order" INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Section (ex: "Pronoms & Négations") — belongs to a Course
CREATE TABLE sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  "order" INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Node (le niveau sur la map) — belongs to a Section
CREATE TABLE nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INT DEFAULT 0,
  x FLOAT DEFAULT 0.5,   -- coordonnee X pour le SVG path (0-1)
  y FLOAT DEFAULT 0,     -- coordonnee Y pour le SVG path
  is_free_preview BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lesson — linked to a Node (1:1)
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id UUID UNIQUE NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. CONTENU PEDAGOGIQUE (Brilliant Style)
-- ============================================================

-- InteractiveCard — JSONB polymorphe
CREATE TABLE interactive_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  card_type TEXT NOT NULL CHECK (card_type IN (
    'explanation',
    'contextual_qcm',
    'root_slider',
    'flashcard',
    'match',
    'fill_blank'
  )),
  "order" INT DEFAULT 0,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- VocabularyItem — dictionnaire global
CREATE TABLE vocabulary_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  arabic_word TEXT NOT NULL,
  transliteration TEXT,
  meaning_fr TEXT NOT NULL,
  category TEXT,           -- ex: 'pronoms', 'negations', 'noms_allah'
  part_of_speech TEXT,     -- ex: 'noun', 'verb', 'particle', 'adjective'
  root TEXT,               -- racine arabe (ex: 'ك ت ب')
  verb_form TEXT,          -- forme verbale (ex: 'II', 'IV', 'X')
  quranic_frequency INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 4. PROGRESSION
-- ============================================================

CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  node_id UUID NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  status node_status DEFAULT 'LOCKED',
  xp_earned INT DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, node_id)
);

-- ============================================================
-- 5. ROW LEVEL SECURITY
-- ============================================================

-- Profiles: users can only read/update their own
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- User progress: users can only manage their own
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own progress"
  ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE USING (auth.uid() = user_id);

-- Content tables: public read for authenticated users
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated read courses"
  ON courses FOR SELECT TO authenticated USING (true);

ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated read sections"
  ON sections FOR SELECT TO authenticated USING (true);

ALTER TABLE nodes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated read nodes"
  ON nodes FOR SELECT TO authenticated USING (true);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated read lessons"
  ON lessons FOR SELECT TO authenticated USING (true);

ALTER TABLE interactive_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated read cards"
  ON interactive_cards FOR SELECT TO authenticated USING (true);

ALTER TABLE vocabulary_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated read vocabulary"
  ON vocabulary_items FOR SELECT TO authenticated USING (true);

-- ============================================================
-- 6. INDEXES
-- ============================================================

CREATE INDEX idx_sections_course ON sections(course_id);
CREATE INDEX idx_nodes_section ON nodes(section_id);
CREATE INDEX idx_nodes_order ON nodes(section_id, order_index);
CREATE INDEX idx_lessons_node ON lessons(node_id);
CREATE INDEX idx_cards_lesson ON interactive_cards(lesson_id);
CREATE INDEX idx_cards_order ON interactive_cards(lesson_id, "order");
CREATE INDEX idx_vocabulary_category ON vocabulary_items(category);
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_node ON user_progress(user_id, node_id);
