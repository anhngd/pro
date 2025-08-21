import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { authApi } from '../services/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'CLEAR_ERROR' };

interface AuthContextType {
  state: AuthState;
  login: (idToken: string) => Promise<void>;
  tempLogin: () => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          const user = JSON.parse(savedUser);
          
          // If it's a demo token, don't call API
          if (token.startsWith('demo-token-')) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
          } else {
            // Verify token is still valid with API
            const response = await authApi.getCurrentUser();
            dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
          }
        } catch (error) {
          // Token is invalid, clear storage
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuth();
  }, []);

  const login = async (idToken: string): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await authApi.googleLogin(idToken);
      const { access_token, user } = response.data;
      
      // Store token and user in localStorage
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Login failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const tempLogin = async (): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Create a mock user for demo purposes
      const mockUser: User = {
        id: 1,
        email: 'anhnd@demo.com',
        full_name: 'Anh Nguyen (Demo)',
        avatar_url: '',
        role: UserRole.ADMIN,
        is_active: true,
        is_verified: true,
        created_at: new Date().toISOString(),
      };
      
      // Create a mock token
      const mockToken = 'demo-token-' + Date.now();
      
      // Store in localStorage
      localStorage.setItem('access_token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
    } catch (error: any) {
      const errorMessage = 'Demo login failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('access_token');
      
      // Only call API if not using demo token
      if (token && !token.startsWith('demo-token-')) {
        await authApi.logout();
      }
    } catch (error) {
      // Even if logout fails on server, clear local storage
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
    }
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: AuthContextType = {
    state,
    login,
    tempLogin,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};