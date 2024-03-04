import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
      };
    case "ADMIN_SIGNIN":
      return { ...state, adminInfo: action.payload };
    case "ADMIN_SIGNOUT":
      return {
        ...state,
        userInfo: null,
      };
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    // eslint-disable-next-line react/prop-types
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
