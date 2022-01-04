import { createContext, useContext, useEffect, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import API from './api/util';
import Logout from './components/Logout';
import Home from './pages/Home';
import AppRoutes from './routes';


export interface Props {
    user:any;
    isAuthenticated:boolean
  }
export const AuthContext = createContext({});
export const initialState = {
    isAuthenticated: false,
    user: null,
    
  };
export const reducer = (state:any, action: { type: any; payload: { user:any; }; }) => {
    switch (action.type) {
      case "LOGIN":
        // localStorage.setItem("user", JSON.stringify(action.payload.user));
        // localStorage.setItem("token", JSON.stringify(action.payload.token));

        return {
          ...state,
          isAuthenticated:true,
          user: action.payload.user,
       
        };
      case "LOGOUT":{
        localStorage.clear();
        return {
          ...state,
          isAuthenticated:false,
          user: null
        };
    }
      default:
        return state;
    }
  };

const App = () => {
    // const { user } = useContext(Auth);
    const [state, dispatch] =useReducer(reducer, initialState);
    
  useEffect( () => {

    async function fetchData() {
        
        const res = await API.get("/auth/me");
        console.log(res.data.user);
        const user = res.data.user;
        // console.log(call);
        // const res= call.then((r: any): any => r.data.user);
        // const user:userState =(await res).data.user;
        if('user' in res.data){
            if(await user){
                dispatch({
                  type: 'LOGIN',
                  payload:res.data
                })
              }
        }
   

      }
      fetchData();
  
  }, [])
    return (
        <>
        {/* <BrowserRouter>
            <AppRoutes />
        </BrowserRouter> */}
        <AuthContext.Provider
      value={{
        ...state || null,
        dispatch
      }}
    >
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
      
 
    </AuthContext.Provider>
        </>
    );
};

export default App;
