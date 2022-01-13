import { createContext, useEffect, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import API from './api/util';
import AppRoutes from './routes';

export const AuthContext = createContext({});
export const initialState = {
  isAuthenticated: false,
  user: null,
};

export const reducer = (state: any, action: { type: any; payload: { user: any; }; }) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,

      };
    case "LOGOUT": {
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    }
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      const res = await API.get("/auth/me");
      const user = res.data.user;
      if ('user' in res.data) {
        if (await user) {
          dispatch({
            type: 'LOGIN',
            payload: res.data
          })
        }
      }
    }
    fetchData();
  }, [state?.isAuthenticated])
  return (
    <>
      <AuthContext.Provider value={{ state, dispatch }}>
        <BrowserRouter >
          <AppRoutes />
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
};

export default App;
