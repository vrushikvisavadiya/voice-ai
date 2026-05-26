"use client";

import * as React from "react";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { StepWelcome } from "@/components/onboarding/StepWelcome";
import {
  StepGoal,
  type OnboardingGoal,
} from "@/components/onboarding/StepGoal";
import {
  StepTargetRole,
  type FocusArea,
} from "@/components/onboarding/StepTargetRole";
import { StepReady } from "@/components/onboarding/StepReady";

export default function OnboardingPage() {
  const [step, setStep] = React.useState(1);
  const [fullName, setFullName] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");
  const [goal, setGoal] = React.useState<OnboardingGoal | "">("");
  const [targetRole, setTargetRole] = React.useState("");
  const [targetCompany, setTargetCompany] = React.useState("");
  const [selectedFocusAreas, setSelectedFocusAreas] = React.useState<
    FocusArea[]
  >([]);

  function nextStep() {
    setStep((current) => Math.min(current + 1, 4));
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 1));
  }

  function toggleFocusArea(area: FocusArea) {
    setSelectedFocusAreas((current) =>
      current.includes(area)
        ? current.filter((item) => item !== area)
        : [...current, area],
    );
  }

  return (
    <OnboardingShell step={step} totalSteps={4}>
      {step === 1 ? (
        <StepWelcome
          fullName={fullName}
          jobTitle={jobTitle}
          onFullNameChange={setFullName}
          onJobTitleChange={setJobTitle}
          onNext={nextStep}
        />
      ) : null}

      {step === 2 ? (
        <StepGoal
          value={goal}
          onChange={setGoal}
          onBack={previousStep}
          onNext={nextStep}
        />
      ) : null}

      {step === 3 ? (
        <StepTargetRole
          targetRole={targetRole}
          targetCompany={targetCompany}
          selectedFocusAreas={selectedFocusAreas}
          onTargetRoleChange={setTargetRole}
          onTargetCompanyChange={setTargetCompany}
          onToggleFocusArea={toggleFocusArea}
          onBack={previousStep}
          onNext={nextStep}
        />
      ) : null}

      {step === 4 ? (
        <StepReady
          fullName={fullName}
          jobTitle={jobTitle}
          goal={goal}
          targetRole={targetRole}
          targetCompany={targetCompany}
          selectedFocusAreas={selectedFocusAreas}
          onBack={previousStep}
        />
      ) : null}
    </OnboardingShell>
  );
}
