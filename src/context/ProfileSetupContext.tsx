import React, { createContext, useContext, ReactNode, useState } from 'react';

// Define the type for the context value
interface ProfileSetupContextType {
  formData: any; // Replace 'any' with your specific form data structure
  updateFormData: (data: any) => void; // Define the type for updating form data
}

// Create the context with a default value
const ProfileSetupContext = createContext<ProfileSetupContextType | undefined>(undefined);

// Provider component
export function ProfileSetupProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<any>({}); // Initialize with default form data

  const updateFormData = (newData: any) => {
    setFormData((prev: any) => ({ ...prev, ...newData }));
  };

  const value = { formData, updateFormData };

  return (
    <ProfileSetupContext.Provider value={value}>
      {children}
    </ProfileSetupContext.Provider>
  );
}

// Custom hook to use the context
export function useProfileSetupContext() {
  const context = useContext(ProfileSetupContext);
  if (context === undefined) {
    throw new Error('useProfileSetupContext must be used within a ProfileSetupProvider');
  }
  return context;
}