import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadSettings, saveSettings } from '../utils/storage';

export interface Settings {
  animationsReduced: boolean;
  hapticsEnabled: boolean;
  localizeEstimates: boolean;
  playInBackground: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => Promise<void>;
  loading: boolean;
}

const defaultSettings: Settings = {
  animationsReduced: false,
  hapticsEnabled: true,
  localizeEstimates: true,
  playInBackground: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const storedSettings = await loadSettings();
      setSettings({ ...defaultSettings, ...storedSettings });
      setLoading(false);
    })();
  }, []);

  const updateSetting = async <K extends keyof Settings>(key: K, value: Settings[K]) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};
