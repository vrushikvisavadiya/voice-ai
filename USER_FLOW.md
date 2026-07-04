# Voice AI Interview Coach - User Flow & Architecture

Welcome to the **Voice AI Interview Coach** repository. This document outlines the end-to-end user flow, from landing on the site to conducting a mock interview and viewing results, along with the key components and routes involved in each step.

---

## 1. Marketing & Public Pages
When a visitor arrives, they can browse the marketing site to learn about features and pricing:
*   **Home Page (`/`)**: Main entry point highlighting core value propositions and features.
    *   *Core Files*: [src/app/(marketing)/page.tsx](./src/app/(marketing)/page.tsx), [feature-grid-section.tsx](./src/components/marketing/home/feature-grid-section.tsx)
*   **Pricing Page (`/pricing`)**: Outlines features in each pricing plan tier.
    *   *Core Files*: [src/app/(marketing)/pricing/page.tsx](./src/app/(marketing)/pricing/page.tsx)

---

## 2. Authentication Flow
To use the application, candidates sign up and verify their email:
1.  **Sign Up (`/signup`)**: Users register using Full Name, Email, and Password.
    *   *Core Files*: [signup/page.tsx](./src/app/(auth)/signup/page.tsx), [SignupForm.tsx](./src/components/auth/SignupForm.tsx)
2.  **Verify Email (`/verify-otp`)**: Candidates input a 6-digit OTP code to verify their email address.
    *   *Core Files*: [verify-otp/page.tsx](./src/app/(auth)/verify-otp/page.tsx), [OtpVerificationForm.tsx](./src/components/auth/OtpVerificationForm.tsx)

---

## 3. Immersive Onboarding (`/onboarding`)
Once verified, the user enters a step-by-step onboarding flow to customize their profile and practice setup:
*   **Step 1 - Welcome**: Confirms name and current job title.
    *   *Component*: [StepWelcome.tsx](./src/components/onboarding/StepWelcome.tsx)
*   **Step 2 - Goal**: Selects the primary preparation goal.
    *   *Component*: [StepGoal.tsx](./src/components/onboarding/StepGoal.tsx)
*   **Step 3 - Target**: Sets target role, company, and focus areas (e.g., coding, system design, frontend, backend).
    *   *Component*: [StepTargetRole.tsx](./src/components/onboarding/StepTargetRole.tsx)
*   **Step 4 - Ready**: Summarizes details and lets the candidate navigate to the dashboard or start a mock session.
    *   *Component*: [StepReady.tsx](./src/components/onboarding/StepReady.tsx)

---

## 4. Main App Shell & Workspace
Once onboarded, standard pages are wrapped inside the App Shell layout (a two-column sidebar layout):
*   **Dashboard (`/dashboard`)**: The candidate central hub showing statistics, charts, insights, and recent session activity.
    *   *Core Files*: [dashboard/page.tsx](./src/app/(platform)/dashboard/page.tsx)
*   **Settings Dialog**: An in-app settings popup containing appearance (dark/light themes), account (email notifications), and workspace billing management settings.
    *   *Core Files*: [SettingsDialog.tsx](./src/components/layout/SettingsDialog.tsx), [SettingsDialogContext.tsx](./src/components/layout/SettingsDialogContext.tsx)

---

## 5. Mock Interview Setup (`/interview/new`)
When a candidate initiates a new practice session:
1.  **Job Description**: Candidate pastes a target job description. The app auto-detects the target role, company, and key skills required.
    *   *Component*: [JobDescriptionStep.tsx](./src/components/interview/JobDescriptionStep.tsx)
2.  **Configure Settings**: Candidate customizes interview settings, including difficulty (Easy/Medium/Hard), type (Technical/Behavioral/Mixed), question length, and focus areas.
    *   *Component*: [ConfigureStep.tsx](./src/components/interview/ConfigureStep.tsx)
3.  **Confirm**: Summary of configurations before launching the session.
    *   *Component*: [ConfirmStep.tsx](./src/components/interview/ConfirmStep.tsx)

---

## 6. Live Practice Session (`/interview/[id]/session`)
To maximize focus, the main dashboard sidebar is hidden during the interview:
*   **Voice-First Experience**: A microphone state visualizer guides the candidate through questions using AI speaking, listening, and processing states.
    *   *Core Files*: [session/page.tsx](./src/app/(app)/interview/[id]/session/page.tsx), [WaveformVisualizer.tsx](./src/components/interview/session/WaveformVisualizer.tsx)
*   **Live Transcript**: Collapsible side panel tracking questions and responses.

---

## 7. Report Generation & Grading
1.  **Analyzing Screen (`/interview/[id]/analyzing`)**: A loading/grading screen that simulates checking candidate's structural flow, clarity, and depth before outputting reports.
    *   *Core Files*: [analyzing/page.tsx](./src/app/(app)/interview/[id]/analyzing/page.tsx)
2.  **Results Screen (`/interview/[id]/results`)**: Instant grade metrics dashboard outlining:
    *   Readiness scores
    *   AI Recommendations & Hiring signals
    *   What went well & areas to improve
    *   Detailed question-by-question breakdown
    *   *Core Files*: [results/page.tsx](./src/app/(app)/interview/[id]/results/page.tsx)

---

## 8. Management Pages
*   **Reports List (`/reports`)**: Lists and filters all past practice reports.
    *   *Core Files*: [reports/page.tsx](./src/app/(platform)/reports/page.tsx)
*   **History (`/history`)**: Provides access to past interview history files and records.
*   **Billing (`/billing`)**: Displays invoices, usage limits, and subscription management metrics.
    *   *Core Files*: [billing/page.tsx](./src/app/(platform)/billing/page.tsx)
*   **Upgrade (`/upgrade`)**: Pricing tier checkout tables.
    *   *Core Files*: [upgrade/page.tsx](./src/app/(platform)/upgrade/page.tsx)
