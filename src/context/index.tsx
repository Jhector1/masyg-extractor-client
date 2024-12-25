import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { AuthAction, User } from "../type";

// Define types
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}



// Initial State
const initialState: AuthState = {
  isAuthenticated:  false,//Boolean(localStorage.getItem("user") || sessionStorage.getItem("user")),
  user:  null //JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "null"),
};

// Reducer Function
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN": {
      //localStorage.setItem("user", JSON.stringify(action.payload));
      return { isAuthenticated: true, user: action.payload };
    }
    case "LOGOUT": {
      //localStorage.removeItem("user");
      return { isAuthenticated: false, user: null };
    }
    case "SUBSCRIBE": {
      const updatedUser = { ...action.payload, isSubscribed: true };
      //`localStorage.setItem("user", JSON.stringify(updatedUser));
      return { isAuthenticated: true, user: updatedUser };
    }
    case "UNSUBSCRIBE": {
      const updatedUser = { ...action.payload, isSubscribed: false };
      //`localStorage.setItem("user", JSON.stringify(updatedUser));
      return { isAuthenticated: true, user: updatedUser };
    }
    case "RESET": {
      return initialState;
    }
    default: {
      console.error(`Unhandled action type: `);
      return state;
    }
  }
}


// Create Context
interface AuthContextProps {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

// Custom Hook
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
