import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

// Dummy user data (in a real app, this would come from a backend)
const dummyUsers = {
  pupil: { password: 'pupil123', role: 'pupil' },
  teacher: { password: 'teacher123', role: 'teacher' },
  student: { password: 'student123', role: 'pupil' }, // Added student user
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user will be { username: string, role: 'teacher' | 'pupil' } or null
  const [error, setError] = useState(null); // State for login errors

  const login = (username, password) => {
    setError(null); // Clear previous errors
    console.log('Login attempt:', { username, password }); // Add this line for debugging
    const userData = dummyUsers[username];

    if (userData && userData.password === password) {
      console.log('Login successful for:', username); // Add this line
      const loggedInUser = { username, role: userData.role };
      setUser(loggedInUser);
      return loggedInUser; // Return the user object on success
    } else {
      console.log('Login failed for:', username); // Add this line
      setError('Invalid username or password.');
      setUser(null);
      return null; // Return null on failure
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    // navigate('/login'); // Navigation should be handled in the component calling logout
  };

  // Dummy signup function (replace with actual API call)
  const signup = (username, password, role) => {
    console.log(`Signup attempt: User: ${username}, Role: ${role}`);
    // In a real app:
    // 1. Check if username exists
    // 2. Call API to register user
    // 3. Handle success/error
    // For now, just log and maybe add to dummyUsers if needed for testing
    if (!dummyUsers[username]) {
      dummyUsers[username] = { password, role };
      console.log('Dummy user added:', username);
      return true; // Simulate successful signup
    } else {
      console.log('Username already exists.');
      return false; // Simulate failed signup (username taken)
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
