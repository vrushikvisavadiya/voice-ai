"use client";

import * as React from "react";

type SettingsDialogContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openSettings: () => void;
  closeSettings: () => void;
};

const SettingsDialogContext = React.createContext<
  SettingsDialogContextType | undefined
>(undefined);

export function SettingsDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  const openSettings = React.useCallback(() => setOpen(true), []);
  const closeSettings = React.useCallback(() => setOpen(false), []);

  return (
    <SettingsDialogContext.Provider
      value={{ open, setOpen, openSettings, closeSettings }}
    >
      {children}
    </SettingsDialogContext.Provider>
  );
}

export function useSettingsDialog() {
  const context = React.useContext(SettingsDialogContext);

  if (!context) {
    throw new Error(
      "useSettingsDialog must be used within SettingsDialogProvider",
    );
  }

  return context;
}
