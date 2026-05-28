# AGENTS.md

## Product

Voice AI Interview Coach is a SaaS interview practice platform that turns a job description into a role-specific mock interview with AI-driven feedback.

## Purpose of this file

This file gives coding agents and contributors the working product context, layout rules, route structure, and UI behavior expectations for the current application. Use it as the default implementation guide before making layout, navigation, onboarding, billing, upgrade, interview, or reporting changes.

## Core product experience

The product helps users:

- Paste a job description.
- Generate a role-specific mock interview.
- Practice with a voice-first AI experience.
- Receive structured feedback and score-based reporting.
- Review history, reports, billing, and plan management inside a quiet SaaS shell.

## Tech stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- lucide-react
- recharts
- next-themes for theme handling

## Design direction

The shell direction is inspired by a Claude-like interface:

- Quiet sidebar
- Very light transparent top bar
- Minimal chrome
- Soft borders
- Muted navigation
- Subtle active state
- No heavy dashboard or admin feel

### Visual rules

- Prefer `bg-background`, `border-border`, `text-foreground`, `text-muted-foreground`, and `bg-muted` tokens.
- Avoid heavy gradients, loud shadows, glossy cards, and overly decorative admin-dashboard patterns.
- Active states should feel calm and precise, not bright or attention-seeking.
- Use rounded corners consistently, with soft borders and low visual noise.
- Keep dense controls out of the header unless truly necessary.

## Current UI architecture

### App shell

- Uses a fixed two-column layout.
- Left side is a collapsible sidebar.
- Right side contains a transparent top bar and scrollable page content.
- Resizable layout support was removed to keep the shell simpler and more stable.

### Sidebar state

- Sidebar collapse state is controlled through `src/components/layout/SidebarContext.tsx`.
- Components consuming this state include:
  - `AppSidebar`
  - `AppHeader`
  - `SidebarAccountMenu`
- `toggleSidebar()` is triggered from the header button.

### Sidebar navigation

Sidebar navigation is config-driven from:

- `src/config/navigation.ts`

Current groups:

- Platform
  - Dashboard
  - New Interview
  - Reports
  - History
  - Upgrade
- Workspace
  - Billing
  - Settings

### Sidebar behavior

- Expanded width: `260px`
- Collapsed width: `76px`
- On collapsed state:
  - Icons remain visible.
  - Labels are hidden.
  - Tooltips can be added later if needed.
- The active route should use a minimal visual treatment:
  - Subtle accent background
  - Foreground text
  - No heavy shadows or loud borders

### Sidebar account area

- Footer contains `SidebarAccountMenu`.
- Users can click the name or avatar area to open a popover.
- Popover includes account actions such as:
  - Profile
  - Settings
  - Billing
  - Logout

### Header

- Header is intentionally minimal and mostly transparent.
- Left side contains the sidebar collapse trigger.
- Right side contains a lightweight plan badge and upgrade CTA.
- Header should avoid dense controls.

## Settings dialog

Settings is opened as a dialog instead of navigating to a standalone page.

### Dialog state

- Controlled through `src/components/layout/SettingsDialogContext.tsx`.
- `openSettings()` can be triggered from:
  - Sidebar Settings item
  - Account popover

### Settings dialog content

Current dialog sections should include:

- Appearance
  - Light theme
  - Dark theme
  - System theme
- Account
  - User info
  - Email report delivery toggle
  - Product updates toggle
- Workspace
  - Billing shortcut
  - Notification preferences

### Theme handling

- Theme switching is intended to use `next-themes`.

## Main layout files

- `src/components/layout/AppShell.tsx`
- `src/components/layout/AppSidebar.tsx`
- `src/components/layout/AppHeader.tsx`
- `src/components/layout/SidebarAccountMenu.tsx`
- `src/components/layout/SidebarContext.tsx`
- `src/components/layout/SettingsDialog.tsx`
- `src/components/layout/SettingsDialogContext.tsx`
- `src/config/navigation.ts`

## Route organization

The app uses App Router route groups for organization and layout ownership.

### Important rule

Route groups such as `(app)` and `(platform)` do not affect the final URL path. They only affect file organization and which layout tree owns a page.

### Current route locations

These pages now live in the `(platform)` group:

- `src/app/(platform)/upgrade/page.tsx`
- `src/app/(platform)/reports/page.tsx`
- `src/app/(platform)/reports/[id]/page.tsx`

Their public URLs remain:

- `/upgrade`
- `/reports`
- `/reports/[id]`

### Avoid route conflicts

Do not keep duplicate pages at the same URL under different route groups. For example, do not keep both of these at the same time:

- `src/app/(app)/reports/page.tsx`
- `src/app/(platform)/reports/page.tsx`

That creates conflicting `/reports` routes.

## Layout ownership guidance

### Pages that should render inside the main AppShell

These should use the shell with sidebar and header visible:

- Dashboard pages
- Reports list and report detail pages
- Billing
- Upgrade
- History
- Most standard product pages

### Pages that should avoid the main AppShell

These should use a separate layout or route-group override for focus and immersion:

- Onboarding
- Live interview session screens
- Any full-screen guided flow that should hide sidebar chrome

## Feature-specific guidance

### Reports

Reports are a core review surface for interview outcomes.

Expected report experience:

- Reports list page with filters, sorting, search, pagination, and row actions
- Detailed single report page with summary, score trend, question breakdown, radar chart, and coaching notes
- Export affordances can be mocked first, then wired later

Current report paths:

- `src/app/(platform)/reports/page.tsx`
- `src/app/(platform)/reports/[id]/page.tsx`

### Upgrade

Upgrade is a pricing and conversion page that should still feel consistent with the shell.

Expected upgrade experience:

- Clear monthly or annual toggle
- Free, Pro, and Team plan comparison
- Pro plan highlighted as the most popular option
- FAQ below pricing cards
- Simple CTAs and quiet visuals

Current upgrade path:

- `src/app/(platform)/upgrade/page.tsx`

### Billing

Billing is an account-management page inside the shell.

Expected billing experience:

- Current plan summary
- Usage details
- Payment method display
- Invoice history table
- Protected destructive action for subscription cancellation

### Interview flows

Interview-related UX spans three different modes:

- Setup: job description paste plus interview configuration
- Session: immersive full-screen interview experience
- Results and reporting: post-session analysis and revisitable reports

For interview session screens:

- Avoid page-level scrolling where possible.
- Keep the main interview canvas fixed to the viewport.
- Transcript panels may scroll independently.
- Hide the main sidebar for immersion.

## Component and state conventions

### General implementation rules

- Use TypeScript with clear prop interfaces.
- Prefer small composable components over oversized page files.
- Keep mock data local until API contracts are ready.
- Use shadcn/ui primitives where they fit naturally.
- Use lucide-react for icons.
- Use Tailwind utilities only; avoid inline styles except when necessary for dynamic widths or chart geometry.

### State handling

- Local view state can stay in page-level `useState` when the scope is small.
- Shared shell state should live in context providers.
- Dialogs opened from multiple entry points should use shared context.
- Keep transient UI interactions predictable and low ceremony.

## Navigation expectations

- Navigation items should stay config-driven from `src/config/navigation.ts`.
- Keep sidebar grouping aligned with product structure.
- If route ownership changes, review navigation grouping so the mental model stays coherent.
- Active route styling should use `usePathname()`.

## Content and tone guidelines

- Write UI copy in a calm, product-focused tone.
- Avoid hype-heavy marketing language inside the app shell.
- Keep labels concise and specific.
- Prefer clear instructional copy over decorative slogans.

## Notes for future work

- Add tooltip support for collapsed sidebar icons.
- Add active route highlighting using `usePathname()`.
- Add mobile sidebar as sheet or drawer.
- Replace placeholder recents with real session history.
- Connect account and billing actions to real user and session data.
- Wire report export and payment flows to real back-end services.
- Add deeper personalization based on role, company, and interview goals.

## Working agreement for coding agents

Before changing shell or route behavior:

1. Check whether the page belongs inside the main AppShell or needs an immersive layout.
2. Verify whether the route currently lives in `(platform)`, `(app)`, or a standalone segment.
3. Confirm there is no duplicate route in another route group.
4. Preserve the quiet Claude-like shell aesthetic.
5. Prefer minimal UI chrome over feature-heavy controls.

When building new pages:

1. Match existing spacing, border, and muted color conventions.
2. Reuse shared layout and UI primitives where possible.
3. Keep cards quiet, with thin borders and minimal shadow.
4. Make mobile behavior graceful even if the primary layout is desktop-first.
5. Treat results, billing, reports, and upgrade pages as product surfaces, not generic admin dashboards.

## Auth pages

Auth pages should be added as a separate route group so they stay outside the main app shell and can use a focused layout.

Expected auth pages:

- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/signup/page.tsx`
- `src/app/(auth)/verify-otp/page.tsx`
- `src/app/(auth)/forgot-password/page.tsx`

### Auth layout guidance

- Use a dedicated `(auth)` route group.
- Keep auth screens visually lighter than the main shell.
- Avoid sidebar chrome on auth pages.
- Use centered card-based layouts with calm product copy.
- Keep the primary CTA obvious and reduce secondary actions.

### Auth flow notes

- Login and signup should feel simple and fast.
- OTP verification should support a clean 6-digit input flow.
- Password reset should be optional if the product uses email-first auth.
- Redirect authenticated users away from auth pages.

## Onboarding screen

Onboarding should be a separate immersive flow after auth and before the main app shell.

Expected onboarding page:

- `src/app/(auth)/onboarding/page.tsx`

### Onboarding layout guidance

- Use a full-screen or centered step-based experience.
- Keep it quiet and welcoming, not like a form-heavy setup wizard.
- Ask only essential questions to personalize the interview experience.
- Include clear progress feedback.
- Make skip/continue actions obvious and low friction.

### Suggested onboarding fields

- Preferred role
- Target company or company type
- Years of experience
- Interview goals
- Preferred interview style

### Onboarding behavior

- Show a short welcome step first.
- Keep each step focused on one intent.
- Support back and next navigation.
- Finish with a clear transition into the app shell or first interview setup.
