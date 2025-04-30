import React, { createContext, useState, useContext, useEffect } from 'react'; // Added useEffect

const AuthContext = createContext(null);

// Dummy user data (in a real app, this would come from a backend)
const dummyUsers = {
  pupil: { password: 'pupil123', role: 'pupil' },
  teacher: { password: 'teacher123', role: 'teacher' },
  student: { password: 'student123', role: 'pupil' }, // Added student user
};

const USER_STORAGE_KEY = 'skillup_user'; // Key for localStorage

export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      localStorage.removeItem(USER_STORAGE_KEY); // Clear invalid data
      return null;
    }
  });
  const [error, setError] = useState(null); // State for login errors

  // Effect to update localStorage when user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const login = (username, password) => {
    setError(null); // Clear previous errors
    console.log('Login attempt:', { username, password });
    const userData = dummyUsers[username];

    if (userData && userData.password === password) {
      console.log('Login successful for:', username);
      const loggedInUser = { username, role: userData.role };
      setUser(loggedInUser); // Update state, which triggers useEffect to save to localStorage
      return loggedInUser; // Return the user object on success
    } else {
      console.log('Login failed for:', username);
      setError('Invalid username or password.');
      setUser(null); // Update state, which triggers useEffect to remove from localStorage
      return null; // Return null on failure
    }
  };

  const logout = () => {
    setUser(null); // Update state, which triggers useEffect to remove from localStorage
    setError(null);
    // Clear teacher-specific courses on logout as well
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('teacher_') && key.endsWith('_courses')) {
            localStorage.removeItem(key);
        }
    });
  };

  // Dummy signup function
  const signup = (username, password, role) => {
    // ... existing signup code ...
    console.log(`Signup attempt: User: ${username}, Role: ${role}`);
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
