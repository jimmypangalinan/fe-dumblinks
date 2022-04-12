import { createContext, useReducer } from "react";

export const UserContextModal = createContext();

const initialState = {
  modal: false,
  show: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SHOW":
      return {
        modal: true,
        show: payload,
      };

    case "NOT_SHOW":
      return {
        modal: false,
        show: {},
      };
    default:
      throw new Error();
  }
};

export const UserContextModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContextModal.Provider value={[state, dispatch]}>
      {children}
    </UserContextModal.Provider>
  );
};