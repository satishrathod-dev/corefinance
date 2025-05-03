"use client";

import { createContext, useContext, useEffect, useState } from "react";

const defaultSettings = {
  avatar: "",
  fullName: "Satish Rathod",
  email: "satish.rathod@example.com",
  phone: "+1 (555) 123-4567",
  timezone: "utc+5.5",
  language: "en",
  currency: "usd",
  dateFormat: "mm-dd-yyyy",
  fontSize: 16,
  theme: "system",
  layout: "default",
  notifications: {
    email: true,
    push: true,
    sms: false,
    accountActivity: true,
    newFeatures: true,
    marketing: false,
    frequency: "real-time",
    quietHoursStart: "22:00",
    quietHoursEnd: "07:00",
  },
  privacy: {
    analyticsSharing: true,
    personalizedAds: false,
    visibility: "public",
    dataRetention: "1-year",
  },
};

const SettingsContext = createContext(undefined);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("userSettings");
      if (savedSettings) {
        return JSON.parse(savedSettings);
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateNotificationSettings = (notificationSettings) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, ...notificationSettings },
    }));
  };

  const updatePrivacySettings = (privacySettings) => {
    setSettings((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, ...privacySettings },
    }));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        updateNotificationSettings,
        updatePrivacySettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
