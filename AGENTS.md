## Product

Voice AI Interview Coach is a SaaS interview practice platform that turns a job description into a role-specific mock interview with AI-driven feedback.

## Current UI Architecture

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
- Workspace
  - Upgrade
  - Billing
  - Settings

### Sidebar behavior

- Expanded width: `260px`
- Collapsed width: `76px`
- On collapsed state:
  - icons remain visible
  - labels are hidden
  - tooltips can be added later if needed
- The active route should use a minimal visual treatment:
  - subtle accent background
  - foreground text
  - no heavy shadows or loud borders

### Sidebar account area

- Footer contains `SidebarAccountMenu`.
- User can click the name/avatar area to open a popover.
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

## Design direction

The shell direction is inspired by a Claude-like interface:

- quiet sidebar
- very light transparent top bar
- minimal chrome
- soft borders
- muted navigation
- subtle active state
- no heavy dashboard/admin feel

## Notes for future work

- Add tooltip support for collapsed sidebar icons.
- Add active route highlighting using `usePathname()`.
- Add mobile sidebar as sheet/drawer.
- Replace placeholder recents with real session history.
- Connect account and billing actions to real user/session data.
