import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
    isLoading: true,
  });

  const login = (user) => {
    dispatch({ type: 'LOGIN', payload: user });
    localStorage.setItem('user', JSON.stringify(user.email));
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
