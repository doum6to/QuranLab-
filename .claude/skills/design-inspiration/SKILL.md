---
name: design-inspiration
description: Reference visual design guidelines and inspiration images. Use this skill when creating or modifying any UI component, page, or layout to ensure design consistency with the target aesthetic. Always check the reference images in the references/images/ folder before designing.
---

# Design Inspiration - Visual Reference System

When creating or modifying any UI design in this project, ALWAYS reference the images in `references/images/` to ensure visual consistency.

## Target Aesthetic: Brilliant-Inspired Learning App

The design follows the aesthetic of **Brilliant.org** — a clean, minimal, and engaging educational app. Every UI element should feel polished, spacious, and purposeful.

## Design System

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#FFFFFF` | Main background |
| `bg-secondary` | `#F9FAFB` | Card backgrounds, subtle sections |
| `green-primary` | `#10B981` | Primary buttons, progress bars, success states |
| `green-hover` | `#059669` | Button hover states |
| `charcoal` | `#1F2937` | Secondary buttons, headings, strong text |
| `speech-bubble` | `#FEF9C3` | Conversational bubbles, highlights |
| `speech-border` | `#FDE047` | Speech bubble borders |
| `border-light` | `#E5E7EB` | Card borders, dividers |
| `text-primary` | `#111827` | Main body text |
| `text-secondary` | `#6B7280` | Subtitles, descriptions |
| `gold-accent` | `#D4AF37` | Islamic accent, special highlights |

### Typography
- **Headlines**: Bold serif font (Playfair Display). Large, impactful, black.
- **Body text**: Clean sans-serif (Inter). Gray for descriptions, black for content.
- **Arabic text**: Amiri or Scheherazade New font. Larger size (1.5-2x body), RTL direction.
- **Code/data snippets**: Monospace, colored syntax (as seen in level selection cards).

### Spacing & Layout
- **Generous whitespace**: Large padding (p-6 to p-10), wide margins.
- **Centered content**: Max-width container, content centered vertically and horizontally.
- **Mobile-first**: Design for phone screens first, scale up.
- **Vertical flow**: Content stacks vertically with clear hierarchy.

### Key Components (reference images)

#### 1. Hero/Landing Screen (`brilliant-onboarding-hero.png`)
- Giant bold serif text, stacked lines
- Decorative elements (graphs, code snippets, interactive widgets) overlapping the text
- Subtle, playful annotations
- Green CTA button at bottom, full-width rounded
- "Sign in" link below

#### 2. Conversational Progress Flow (`brilliant-learning-path.png`)
- Progress bar at top (green fill on gray track)
- Back arrow top-left
- Speech bubble (yellow background, subtle border) with friendly message
- Mascot/icon character (green diamond shape with face)
- Dark rounded "Continue" button at bottom

#### 3. Goal Selection (`brilliant-goal-selection.png`)
- Speech bubble asking a question from mascot
- List of selection cards, each with:
  - Icon/emoji on the left
  - Text label
  - Light gray background with subtle border
  - Full-width, stacked vertically
  - Rounded corners (rounded-xl)
- Disabled "Continue" button until selection made

#### 4. Social Proof / Illustration Screen (`brilliant-social-proof.png`)
- Floating illustration cards (tilted, overlapping)
- Mascot icon
- Bold headline centered
- Supportive subtitle text in gray
- Dark "Continue" button

#### 5. Level/Skill Selection Grid (`brilliant-level-selection.png`)
- 2x2 grid of cards
- Each card has:
  - Code snippet preview at top (colored syntax)
  - Bold level name
  - Description text below
  - Rounded corners, subtle shadow/border
- Speech bubble question from mascot at top

#### 6. Value Proposition Screen (`brilliant-value-prop.png`)
- Progress bar at top (50%+ filled)
- Mascot with 3D objects (gears, tools) — playful illustration
- Bold headline centered: "Learn 6x more effectively"
- Descriptive paragraph in gray below
- Dark rounded "Continue" button at bottom
- Lots of whitespace above and below illustration

#### 7. Schedule Selection (`brilliant-schedule-selection.png`)
- Mascot with speech bubble asking "How will learning fit into your day?"
- Selection cards with:
  - Emoji icon on left (sun, pizza, moon, screen)
  - **Bold label** + lighter description text on same line
  - Full-width, stacked vertically
  - Rounded corners, light gray background
- Disabled "Continue" button until selection

#### 8. Selected State with Mascot Reaction (`brilliant-selected-state.png`)
- When user selects an option:
  - Selected card gets **light blue/purple background** with **blue border**
  - Mascot changes expression and says a witty reaction in speech bubble
  - "Continue" button becomes active (dark charcoal)
- Non-selected cards remain gray

#### 9. Auth / Sign Up Options (`brilliant-auth-screen.png`)
- Clean white background, very minimal
- Bold headline: "Sign up free to discover your learning path"
- Two social buttons side by side (Apple, Google) — rounded pill shape, light border
- "OR" divider line
- Dark charcoal "Continue with email" button, full-width
- "Existing user? **Sign in**" link at bottom

#### 10. Sign Up Form (`brilliant-signup-form.png`)
- Back arrow top-left (circle button)
- Clean form with:
  - Individual rounded input fields (Email, Password)
  - Two fields side by side (First name, Last name)
  - Single field (Age)
  - All inputs have light gray border, rounded-xl
- Disabled "Sign up" button (light gray when form incomplete)
- "Existing user? **Sign in**" link
- Terms and Privacy Policy text at bottom in gray

### Animation Guidelines
- **Page transitions**: Smooth fade-in or slide-up
- **Card interactions**: Subtle scale on hover (scale-105), border color change on selection
- **Progress bar**: Animated width transition
- **Staggered reveals**: Cards appear one by one with slight delay
- **Speech bubbles**: Fade in with slight upward motion

#### 11. Premium Comparison Table (`brilliant-premium-comparison.png`)
- Soft gradient background (peach/pink tones at top)
- Close (X) button top-right
- Bold headline with "Premium" in gradient purple/pink text
- Comparison table: Benefits | Free | Premium columns
- Premium column has **gradient border card** (blue-purple-orange-pink)
- Checkmarks (orange circle) for included, gray X for excluded
- Dark "Start my free week" button at bottom

#### 12. Trial Timeline (`brilliant-trial-timeline.png`)
- Vertical timeline with colored dots and connecting line (gradient)
- Each step: icon in circle + bold purple label + gray description
- Steps: "Today", "In 5 days", "In 7 days"
- Soft gradient background (warm peach/yellow at bottom)
- "Premium" in gradient text in headline
- Dark CTA button at bottom

#### 13. Premium Pricing Card (`brilliant-premium-pricing.png`)
- 3D illustration (key/lock with sparkles) centered
- "Premium" in gradient purple/pink text
- Pricing card with **gradient border** (blue to orange/pink)
- "7 DAYS FREE" badge (green, top-left of card)
- Mascot icon (green, top-right of card)
- Price details inside card: name, price/mo, total
- Fine print in gray below
- Dark CTA button

#### 14. Loading / Unlocking Screen (`brilliant-unlocking.png`)
- Centered 3D illustration (mascot + lock animation)
- Bold text below: "Unlocking all levels"
- Soft gradient background (warm tones at bottom)
- No buttons — transitional screen
- Clean, minimal, focused on the animation

#### 15. Loading Spinner (`brilliant-loading-spinner.png`)
- Centered circular progress indicator (donut spinner)
- Gold/yellow accent color on the spinner
- Gray track behind the spinner
- Bold serif text below: "Finding learning path recommendations based on your responses"
- Pure white background
- No buttons — loading state

### Design Principles
1. **Whitespace is king** — Never crowd elements. Let content breathe.
2. **One action per screen** — Each step has a clear, focused purpose.
3. **Conversational tone** — Use speech bubbles and friendly mascot to guide.
4. **Bold typography** — Headlines are large and impactful.
5. **Green = action** — Primary actions are always green.
6. **Cards for choices** — Options presented as tappable cards with icons.
7. **Progress visibility** — Always show how far the user has come.
8. **Gradient accents** — Use gradient borders/text for premium or special elements.
9. **Loading states matter** — Always show a beautiful loading/transition screen with meaningful text.
10. **Warm backgrounds** — Subtle warm gradients (peach, yellow) for premium/special screens.

## Reference Images

Check the following reference images in `references/images/` before designing any component:

### Onboarding Flow
- `brilliant-onboarding-hero.png` — Landing/hero screen with bold typography
- `brilliant-learning-path.png` — Progress flow with speech bubble and mascot
- `brilliant-goal-selection.png` — Goal selection with card list
- `brilliant-social-proof.png` — Social proof with floating illustrations
- `brilliant-level-selection.png` — Skill level grid selection

### Engagement & Value
- `brilliant-value-prop.png` — Value proposition with mascot and 3D illustration
- `brilliant-schedule-selection.png` — Schedule/time selection with emoji cards
- `brilliant-selected-state.png` — Selected state with mascot reaction (blue highlight)

### Auth & Registration
- `brilliant-auth-screen.png` — Sign up options (Apple, Google, Email)
- `brilliant-signup-form.png` — Clean registration form

### Premium & Monetization
- `brilliant-premium-comparison.png` — Free vs Premium comparison table
- `brilliant-trial-timeline.png` — Trial timeline with vertical steps
- `brilliant-premium-pricing.png` — Pricing card with gradient border

### Loading & Transitions
- `brilliant-unlocking.png` — Unlocking animation screen
- `brilliant-loading-spinner.png` — Circular spinner with status text

### Learning Path & Course Structure
- `brilliant-course-tree.png` — Learning path tree with connected nodes, recommended badge, purple theme

### Exercise / Quiz Gameplay
- `brilliant-exercise-empty.png` — Interactive exercise with empty drag-drop slots, instruction text, draggable blocks
- `brilliant-exercise-filled.png` — Exercise with blocks placed in slots, active "Check" button
- `brilliant-correct-answer.png` — Green success banner: "Correct! +15 XP", confetti emoji, "Why?" and green "Continue" buttons
- `brilliant-nice-work.png` — Transition screen with lightning animation, mascot speech bubble "Nice work", dark "Continue" button

### Gamification & Streaks
- `brilliant-streak-start.png` — "You started a streak!" with 3D lightning bolt, day tracker (M/T/W circles), yellow/green theme
- `brilliant-habit-goal.png` — "Build a long-term habit" with mascot, streak goal cards (3/7/14 day), selected state with blue bg, "Commit to my goal" dark button

### Lesson Map & Dashboard
- `brilliant-lesson-map.png` — Vertical lesson nodes with purple rings, completed (checkmark), current (mascot), locked (gray), "Streak extended!" yellow banner, level card with purple border, "Start" purple button, bottom popup card
- `brilliant-lesson-map-active.png` — Same map with mascot on active node, streak counter (1 lightning) top-right, course icon top-center
- `brilliant-home-dashboard.png` — Course title + "LEVEL 1" label, illustration carousel with dots, "Nice work today!" mascot message, completed lesson with checkmark, purple "Continue course" button, bottom tab bar (Home/Courses/You)

### Course Dashboard Variants (color-themed)
- `brilliant-dashboard-progress.png` — Day 2 streak, course with lesson list (completed checkmark + current with mascot), purple "Start" button, bottom tab bar
- `brilliant-dashboard-orange.png` — Orange theme (Probability), crystal ball illustration, "You're about to level up!", orange "Start" button
- `brilliant-dashboard-blue.png` — Blue theme (Functions), satellite dish illustration, blue "Start" button, bottom card with lesson list
- `brilliant-course-detail-blue.png` — Course detail: illustration, title, description, "45 Lessons / 333 Exercises" stats, level card with blue border, lesson map below
- `brilliant-lesson-map-blue.png` — Blue-themed lesson map with completed/active/locked nodes, mascot on active, blue "Start" button popup

**KEY PATTERN**: Each subject/course uses a distinct color theme throughout (buttons, borders, level cards, node rings). For QuranLab, use **emerald green** as the primary course color with **gold** accents for Islamic theme.

### Course Detail & Lesson Content
- `brilliant-course-detail-orange.png` — Orange theme (Data), course illustration, description, stats (29 Lessons/243 Exercises), level card with orange border, "Jump here" button in popup
- `brilliant-lesson-content.png` — Lesson page: bold serif title, body text with math notation, colored bar model diagrams (purple/blue/orange), dark "Continue" button
- `brilliant-exercise-table-select.png` — Table selection exercise: instruction text, two table options side by side, selected table has green/teal border + checkmark, green "Correct! +15 XP" banner
- `brilliant-exercise-input.png` — Input exercise: equation + data table, fill-in-the-blank input with blue border, custom math keyboard at bottom, "Start over" link, dark "Check" button
- `brilliant-exercise-input-filled.png` — Same input exercise with answer filled in, "Check" button active (dark)

### More Exercise Types & Rewards
- `brilliant-exercise-mcq.png` — Multiple choice: question text + data table, rounded pill-shaped options (10, 100, "infinitely many"), dark border on each option
- `brilliant-exercise-slider.png` — Interactive slider exercise: bar model diagram, two sliders (orange for x, purple for y) with value labels, "Check" button
- `brilliant-lesson-complete.png` — "Lesson Complete!" celebration: mascot with glow, blue platform, "TOTAL XP 175" with sparkle icon, dark "Continue" button
- `brilliant-leaderboard.png` — "Welcome to Leagues!" with shield badge, ranked list (1-5) with colored avatars, XP scores, current user highlighted in green, "What are leagues?" link, dark "Continue" button
- `brilliant-streak-charge.png` — "You earned a Streak Charge!" with 3D battery illustration (yellow/green glow), description text, dark "Continue" button

### Feedback & Support
- `brilliant-ticket-empty.png` — "New ticket" form: dropdown (Ticket Type), textarea (Description), email field, purple "Submit" button, back/close buttons
- `brilliant-ticket-attachment-modal.png` — Bottom sheet modal "Add attachment": options list with icons (screenshot, record, gallery, browse), dark overlay
- `brilliant-exercise-mcq-grid.png` — 2x2 grid MCQ with bar diagram, selected answer (green border + checkmark), "Correct! +15 XP" green banner
- `brilliant-ticket-with-attachment.png` — Ticket form with screenshot thumbnail attached, X to remove, purple "Submit" button
- `brilliant-ticket-sent.png` — Green success banner at bottom: "Done. Your ticket was sent." with Shake branding

### More Course & Streak Views
- `brilliant-lesson-complete-orange.png` — Orange-themed "Lesson Complete!" with mascot on orange platform, "TOTAL XP 165"
- `brilliant-lesson-map-orange.png` — Orange-themed lesson map (Data Visually), completed/active/locked nodes, orange "Start" button
- `brilliant-streak-stats.png` — Streak card overlay: day circles (M-F), active days filled yellow-green, stats ("2 Max streak", "9 Lessons complete"), share button
- `brilliant-share-streak.png` — Share modal: streak card preview (mascot + lightning bolts + "2 day learning streak"), share options (Messages, Save Image, More)
- `brilliant-courses-browse.png` — Courses tab: horizontal category tabs (Math/CS/Data/Science) with icons, selected tab has blue underline, course list cards with illustrations + titles + progress bars, bottom tab bar with "Courses" active
- `brilliant-courses-cs.png` — CS tab (purple underline): "Programming & CS" section header with illustration, course cards list (Thinking in Code, Programming with Variables, Python, etc.)
- `brilliant-courses-science.png` — Science tab (yellow/gold underline): "Science" section with 3D sphere illustration, course cards (Scientific Thinking, Circuits, Digital Circuits, Kurzgesagt)
- `brilliant-profile-leagues.png` — "You" tab: avatar + name, locked leagues card with 3 lock badges (silver/gold/bronze), "150 of 175 XP earned" progress pill
- `brilliant-leaderboard-detail.png` — Hydrogen League: shield badge, "Top 15 advance", "6 days left", ranked list with colored avatars, current user highlighted green
- `brilliant-settings.png` — Settings page: clean list with icons (Account, Premium, Notifications, Sounds/Haptics toggles in green, About, Help, Report, Product Updates, Log out, Legal, version number)
- `brilliant-account.png` — Account detail: clean list (Name, Age, Email, Password with values + chevrons), divider, "Export your data" and "Deactivate or delete account" links
- `brilliant-change-password.png` — Change password form: labeled inputs with red asterisks (Current password, New password, New password again), yellow warning callout box, disabled "Change password" button
