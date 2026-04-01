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

### Course Detail with Exercise Levels (Lesson Map Inside Course)
- `brilliant-course-levels-orange.png` — Orange-themed course detail: course icon top-center, course title "Exploring Data Visually" in bold serif, gray description, stats "29 Lessons / 243 Exercises", rounded "LEVEL 1" card with orange border showing level name "Bar Charts and Pie Charts", below the level card: vertical exercise nodes connected in a path. First exercise node "Reading Bar Charts" with orange ring (in-progress), next nodes grayed out (locked). When tapped: bottom sheet popup with exercise title + "Jump here" button full-width.
- `brilliant-course-levels-blue-completed.png` — Blue-themed course detail "Functions": same layout but blue accent. Exercise node "Seeing Solutions" completed (blue filled ring with checkmark), next node "Graphing Solutions" active (blue ring + green badge), locked nodes below in gray. Bottom sheet: exercise title + "Practice" blue button + replay icon. Shows scroll chevron (v arrow) button on the left.
- `brilliant-course-levels-blue-active.png` — Blue course, scrolled down: "LEVEL 1" card at top with blue border, completed node "Seeing Solutions" (blue + check), active node "Graphing Solutions" (blue ring + green badge icon on top), bottom sheet with "Start" blue button full-width. Locked nodes "Revealing Patterns" below grayed out.
- `brilliant-course-levels-blue-overview.png` — Blue course, full overview: large satellite dish illustration, title "Functions", description, stats, LEVEL 1 card, first exercise node "Seeing Solutions" with green badge, scroll down chevron. Clean spacious layout.
- `brilliant-home-course-card.png` — Home dashboard: streak badge top-right, course title "Functions" in bold serif, "LEVEL 1" label, large illustration carousel with dots, below: white rounded card with exercise list ("Warm up" with checkmark, "Graphing Solutions" with gray ring), blue "Start" button full-width, bottom tab bar (Home/Courses/You).

**KEY PATTERN FOR EXERCISE LEVELS**: Each lesson/level contains 3-5 exercise nodes arranged vertically with connecting rings. Exercise node = 3D-style concentric circle/ring (colored when active/complete, gray when locked). Exercise name displayed to the right of the ring. Tapping a node opens a bottom sheet with exercise name + action button. Completed = colored ring + checkmark inside. Active = colored ring + badge/icon floating on top. Locked = gray flat rings.

---

## Detailed Screen Reference Catalog (Mobbin Screenshots)

The following 45 screens were captured from Brilliant.org's mobile app and serve as the primary visual reference for QuranLab's UI/UX design. They are organized by user flow.

### A. Splash & Onboarding Flow (Screens 32-35, 37, 40)

#### A1. Splash Screen
- Logo "Brilliant" centered in bold sans-serif black text
- Pure white background, no other elements
- Minimal, clean launch screen

#### A2. Onboarding Hero — "Learn by doing"
- Giant bold serif text stacked: "Learn", "by", "doing"
- Decorative elements overlapping text: graph with orange dots, code snippets ("while learning", "if doing", "keep growing"), blue curve with dot
- Subtitle in gray: "Interactive problem solving that's effective and fun. Get smarter in 15 minutes a day."
- Green CTA button "Continue" (full-width, rounded-xl)
- "Sign in" link below

#### A3. Learning Path Intro
- Progress bar at top (green fill, ~5%)
- Back arrow top-left
- Mascot (green diamond with face) centered
- Yellow speech bubble: "Let's build a learning path just for you."
- Dark rounded "Continue" button at bottom
- Generous whitespace

#### A4. Goal Selection — Empty State
- Mascot + yellow speech bubble: "What's your top goal?"
- 6 selection cards stacked vertically:
  - Each card: emoji icon left + text label
  - Options: Professional growth, Staying sharp, Excelling in school, Helping my child learn, Helping my students learn, Something else
  - Light gray background, subtle border, rounded-xl
- "Continue" button disabled (light gray)

#### A5. Goal Selection — Selected State
- "Excelling in school" selected: **light blue/purple background** + **blue border**
- Mascot changes expression, speech bubble: "Smart move. Future you approves."
- "Continue" button becomes active (dark charcoal)
- Non-selected cards remain gray

#### A6. Social Proof
- Floating illustration cards (tilted, overlapping): microscope, pie chart, code editor, mascot
- Bold headline centered: "You'll fit right in"
- Subtitle gray: "Millions of students use Brilliant to hone their problem-solving skills."
- Dark "Continue" button

#### A7. Level/Skill Selection Grid — Empty
- Mascot + speech bubble: "What's your programming comfort level?"
- 2x2 grid of cards, each with:
  - Colored code snippet at top (green/orange syntax)
  - Bold level name (Beginner, Novice, Intermediate, Advanced)
  - Description text below
  - Light gray bg, rounded corners, subtle border
- "Continue" disabled

#### A8. Level Selection — Selected State
- "Intermediate" selected: light blue bg + blue border
- Mascot reacts: "So we speak the same language(s). Cool."
- "Continue" active (dark)

#### A9. Value Proposition
- Progress bar ~50%
- Mascot with 3D gears/tools illustration
- Bold headline: "Learn 6x more effectively"
- Gray paragraph about interactive learning
- Dark "Continue" button

#### A10. Schedule Selection — Empty
- Mascot + speech bubble: "How will learning fit into your day?"
- 4 cards with emoji + bold label + description:
  - ☀️ Morning routine — during breakfast or my commute
  - 🍕 Quick break — during lunch or between activities
  - 🌙 Nightly ritual — after dinner or while in bed
  - 📺 Another time — in my day
- "Continue" disabled

#### A11. Schedule Selection — Selected State
- "Nightly ritual" selected (blue bg + blue border)
- Mascot changes expression (holding coffee cup), speech bubble: "Source code by starlight. Sounds dreamy."
- "Continue" active

#### A12. Notification Permission
- Mascot + speech bubble: "I'll remind you to learn so it becomes a long-term habit."
- iOS notification permission dialog centered
- Green arrow pointing up at "Allow" button
- Dark "Continue" button at bottom

#### A13. Testimonial / Social Proof
- Mascot on cyan/teal glowing platform
- Bold headline: "You're on your way!"
- 5 gold stars ⭐⭐⭐⭐⭐
- User review quote in gray italic
- Attribution: "— Joel M."
- Dark "Continue" button

#### A14. Auth / Sign Up Screen
- Clean white background
- Bold headline: "Sign up for free to discover your learning path"
- Two social buttons side by side (Apple logo, Google G) — rounded pill, light border
- "OR" divider line
- Dark charcoal "Continue with email" button, full-width
- "Existing user? **Sign in**" link at bottom

### B. Home Dashboard (Screens 1, 27-31)

#### B1. Home Dashboard — Blue Theme (Functions)
- Streak counter top-right (lightning icon + number in rounded pill)
- Course title "Functions" in bold serif
- "LEVEL 1" label in blue
- Large illustration carousel (satellite dish) with pagination dots
- White rounded card below with exercise list:
  - "Warm up" with 3D ring icon + mascot badge
  - "Graphing Solutions" (gray, locked)
- Blue "Start" button full-width
- Bottom tab bar: Home (active) | Courses | You

#### B2. Home Dashboard — Purple Theme (Thinking in Code) — Completed Lesson
- "Thinking in Code" title, "LEVEL 1" in purple
- Code/drag illustration (purple + yellow)
- Mascot message: "Nice work today!"
- "Writing Programs" with checkmark (completed, purple)
- Purple "Continue course" button
- Bottom tab bar

#### B3. Home Dashboard — Purple Theme — Next Lesson
- Same course, "Warm up" completed (checkmark)
- "Repeating Patterns" active with mascot badge on ring
- Purple "Start" button

#### B4. Home Dashboard — Orange Theme (Predicting with Probability)
- Crystal ball illustration (orange)
- "You're about to level up!" message
- "From Data to Probabilities" active with mascot badge
- Orange "Start" button

#### B5. Home Dashboard — Purple Recommended (Programming with Variables)
- "RECOMMENDED" badge (purple pill) above title
- 3D printer illustration (purple + yellow)
- "Writing Programs" active, "Using Variables" locked
- Purple "Start" button

### C. Course Detail & Lesson Map (Screens 2-5, 26)

#### C1. Course Detail Overview — Blue (Functions)
- Chevron down top-left, streak counter top-right
- Course icon (satellite dish) centered
- Title "Functions" bold serif
- Description gray: "Supercharge your thinking with the language of algebra."
- Stats: "45 Lessons 🧩 333 Exercises"
- LEVEL 1 card with **blue border**: "Relationships and Points"
- First exercise node "Seeing Solutions" with green mascot badge on ring
- Scroll down chevron button bottom-left

#### C2. Lesson Map — Active Node with Bottom Sheet (Functions)
- Course icon small at top-center
- LEVEL 1 card with blue border
- "Seeing Solutions" completed (blue filled ring + checkmark)
- "Graphing Solutions" active (blue ring + green mascot badge floating)
- Locked nodes below ("Revealing Patterns") in gray
- **Bottom sheet popup**: exercise title bold + "Start" blue button full-width
- "Choosing Values" partially visible below

#### C3. Lesson Map — Completed Node with Practice (Functions)
- Same layout, "Seeing Solutions" completed
- Bottom sheet: "Seeing Solutions" title + "Practice" blue button + replay icon (⟳)
- Shows the completed + practice state pattern

#### C4. Course Detail — Orange Theme (Exploring Data Visually)
- Course icon (notebook/chart)
- Title "Exploring Data Visually", description
- Stats: "29 Lessons 🧩 243 Exercises"
- LEVEL 1 card with **orange border**: "Bar Charts and Pie Charts"
- First node "Reading Bar Charts" with orange ring (in-progress)
- Bottom sheet: "Reading Bar Charts" + "Jump here" button
- Warm peach gradient background at bottom

### D. Lesson Content Flow (Screens 7-9)

#### D1. Lesson Content — Title & Intro
- X close button top-left, progress bar (green ~25%), lightning icon top-right
- Bold serif title: "Seeing Solutions"
- Body text explaining equations
- Math notation inline: 2y + 5 = x + 5
- **Colored bar model diagrams**:
  - Top bar: purple (y, y) + blue (5) with bracket "2y + 5"
  - Bottom bar: orange (x) + blue (5) with bracket "x + 5"
- Dark "Continue" button at bottom

#### D2. Lesson Content — Animated Step-by-Step (Step 1)
- Progress bar advanced (~30%)
- Explanation text with **bold keywords**
- Bar models with **specific values** (y=1, x=2, constant=5)
- Pagination dots (3 steps) + prev/next play buttons
- Gray track showing full bar width
- Dark "Continue" button

#### D3. Lesson Content — Animated Step (Step 2)
- Same layout, values updated (y=2, x=4)
- Both prev/next buttons active (dark)
- Bar model proportions change dynamically

### E. Exercise Types (Screens 10-22)

#### E1. Table Selection — Empty
- Instruction text: "Select the table that represents the solutions..."
- Math equation: 2y + 5 = x + 5
- Two data tables side by side with x,y columns
- Both tables have gray border (unselected)
- "Start over" link (⟳ icon)
- "Check" button disabled (light gray)

#### E2. Table Selection — Selected
- Left table selected: **blue border** highlight
- "Check" button becomes active (dark charcoal)

#### E3. Table Selection — Correct Answer
- Correct table: **green/teal border** + green checkmark badge top-right
- Wrong table: grayed out (faded text, gray header)
- **Green banner bottom**: confetti emoji 🎊 + "**Correct!**" bold + "✨ +15 XP"
- Flag icon (report) right side
- "Why?" button (gray pill) + "Continue" button (green pill)

#### E4. Input Exercise — Empty
- Instruction: "Enter the value of y that makes this equation true when x = 10"
- Equation in math notation: 2y + 5 = x + 5
- Data table showing pattern (x: 2,4,6,8,10 / y: 1,2,3,4,?)
- Input field: "x = 10  y = [ ]" with empty rounded input box
- "Start over" link
- "Check" disabled

#### E5. Input Exercise — With Math Keyboard
- Same exercise, value "5" entered in input (blue border)
- **Custom math keyboard** at bottom:
  - Row 1: +, −, ×, ÷, =, ., (, ), √, □
  - Row 2: 1-9, 0
  - Row 3: undo, redo, ←, →, backspace
  - "Done" link top-right in blue

#### E6. Input Exercise — Filled (Keyboard Dismissed)
- Value "5" shown in input, keyboard closed
- "Check" button active (dark)

#### E7. Input Exercise — Correct
- Value "5" with **green border** + green checkmark badge
- Green banner: "Correct! +15 XP"
- "Why?" + "Continue" green buttons

#### E8. Multiple Choice (MCQ) — Pill Options
- Question: "What is the **total** number of solutions to this equation?"
- Data table above
- Rounded pill-shaped options stacked:
  - "10" — dark border
  - "100" — dark border
  - "There are infinitely many solutions." — dark border, wider
- No "Check" button (auto-submit on selection)

#### E9. Scrollable Data Table — Top
- Explanation: "Any pair of values where x is twice y is a solution — so there are infinitely many."
- Scrollable table with **vertical scrollbar** (dark handle on gray track)
- Table showing values from x=2, y=1 upward
- Text below: "Tables get cumbersome... Next we'll see a **graphical representation**"
- Dark "Continue" button

#### E10. Scrollable Data Table — Scrolled
- Same table scrolled to middle (x≈11000, y≈5500)
- Scrollbar handle in middle position
- Demonstrates the "infinite" feel of scrolling

#### E11. Slider Exercise — Initial State
- Instruction: "**Find a solution.** A solution is a pair of values for x and y..."
- Equation: 2x + 2 = y + 6
- Bar models: orange (x, x, 2) vs purple (y) + blue (6)
- **Two interactive sliders**:
  - x slider (orange handle): value label "1" in black pill, range 1-7
  - y slider (purple handle): value label "5" in black pill, range 1-7
- Bar model widths update with slider values
- "Check" disabled

#### E12. Slider Exercise — Adjusted
- Sliders moved: x=3, y=2
- Bar models widths reflect new values
- "Check" button active (dark)

#### E13. Slider Exercise — Correct
- Sliders locked (gray handles, no color)
- Progress dots advanced (2 of 3 green)
- Green banner: "Correct! +15 XP"
- "Why?" + "Continue" green buttons

### F. Rewards & Gamification (Screens 23-25)

#### F1. Lesson Complete
- White background, centered layout
- Mascot with **green glow** floating above 3D blue platform ring
- Checkmark visible on platform
- Bold serif: "Lesson Complete!"
- "TOTAL XP" label gray + "**175** ✨" large bold black
- Dark "Continue" button

#### F2. Streak Charge Earned
- 3D battery illustration (yellow/green glow, tilted)
- Bold serif: "You earned a Streak Charge!"
- Gray subtitle: "Charges save your streak if you miss a day"
- Dark "Continue" button
- Pure white background

#### F3. Leaderboard — Welcome to Leagues
- Shield badge illustration (orange) at top
- Decorative grid background (faint)
- Bold: "Welcome to Leagues!"
- "You just qualified for **Hydrogen League**!"
- "Keep earning XP to rise the ranks."
- "**6 days left**"
- Ranked list (1-5):
  - Rank badge (colored pill) + avatar circle (letter, colored) + name + XP
  - Current user row: **green background highlight**
- "What are leagues?" outlined button
- Dark "Continue" button

### G. Key Interaction Patterns

#### Selection States
- **Unselected**: light gray bg (#F9FAFB), subtle gray border (#E5E7EB), rounded-xl
- **Selected**: light blue/purple bg (#EFF6FF), blue border (#3B82F6), rounded-xl
- **Correct**: green border (#10B981), green checkmark badge top-right
- **Incorrect/Disabled**: gray text, faded appearance

#### Button States
- **Primary active**: dark charcoal (#1F2937), white text, rounded-xl, full-width
- **Primary disabled**: light gray (#E5E7EB), gray text, same shape
- **Success/Continue**: green (#10B981), white text
- **Course-themed**: matches course color (blue/purple/orange)

#### Progress Bar
- Green fill (#10B981) on gray track (#E5E7EB)
- Animated width transition
- Always visible at top during exercises/onboarding
- Sometimes shows section dots (green = completed, gray = remaining)

#### Bottom Sheet Pattern
- White card with rounded-t-xl, subtle shadow
- Exercise/lesson title bold centered
- Action button full-width (colored per course theme)
- Optional replay icon button (⟳)
- Slides up from bottom

#### Mascot Reactions
- Green diamond-shaped character with face
- Changes expression based on context (smiling, holding props like coffee cup)
- Always accompanied by yellow speech bubble with witty message
- Speech bubble: #FEF9C3 bg, #FDE047 border, rounded with tail pointing to mascot
