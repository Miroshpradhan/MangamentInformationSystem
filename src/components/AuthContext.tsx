import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

type AuthContextType = {
  isLoggedIn: boolean;
  municipalityId: string | null;
  municipalityCode: string | null; // Add municipalityCode here
  role: string | null;
  login: (token: string, municipalityCode: string) => void; // Keep both parameters for direct setting
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [municipalityId, setMunicipalityId] = useState<string | null>(null);
  const [municipalityCode, setMunicipalityCode] = useState<string | null>(null); // Manage municipalityCode
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const municipalityCode = localStorage.getItem('municipalityCode'); // Fetch municipalityCode from local storage
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode<{ role: string; municipalityId: string }>(token);
      console.log(decodedToken);
      console.log("User role: ",role);
      setMunicipalityId(decodedToken.municipalityId); 
      setRole(decodedToken.role);
    }
    setMunicipalityCode(municipalityCode); // Set municipalityCode from local storage
  }, []);

  // Login function to set token and municipality code
  const login = (token: string, municipalityCode: string) => {

    localStorage.setItem('token', token);
    localStorage.setItem('municipalityCode', municipalityCode);
    const decodedToken = jwtDecode<{ role: string; municipalityId: string }>(token);
    console.log(decodedToken); // Debugging to ensure the token is being decoded correctly

    setIsLoggedIn(true);
    setMunicipalityCode(municipalityCode);
    setMunicipalityId(decodedToken.municipalityId);
    setRole(decodedToken.role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('municipalityCode'); // Clear municipalityCode from local storage
    setIsLoggedIn(false);
    setMunicipalityId(null);
    setMunicipalityCode(null); // Reset municipalityCode state
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, municipalityId, municipalityCode, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default AuthContext;
