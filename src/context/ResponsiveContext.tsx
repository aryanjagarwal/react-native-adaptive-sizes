import React, { createContext, ReactNode, useContext } from 'react';
import { useResponsive } from '../hooks/useResponsive';

// Define the context type based on the return type of useResponsive
type ResponsiveContextType = ReturnType<typeof useResponsive>;

// Create the context
const ResponsiveContext = createContext<ResponsiveContextType | undefined>(
  undefined
);

// Provider component
interface ResponsiveProviderProps {
  children: ReactNode;
}

export const ResponsiveProvider: React.FC<ResponsiveProviderProps> = ({
  children,
}) => {
  const responsiveData = useResponsive();

  return (
    <ResponsiveContext.Provider value={responsiveData}>
      {children}
    </ResponsiveContext.Provider>
  );
};

// Custom hook to use the responsive context
export const useResponsiveContext = (): ResponsiveContextType => {
  const context = useContext(ResponsiveContext);

  if (context === undefined) {
    throw new Error(
      'useResponsiveContext must be used within a ResponsiveProvider'
    );
  }

  return context;
};

// Export the context for advanced use cases
export { ResponsiveContext };
export default ResponsiveProvider;
