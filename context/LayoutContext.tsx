import { createContext, useState } from "react";

import { ContextProviderProps } from "../interfaces/context/contextProvider";
import { LayoutContextProps } from "../interfaces/context/layoutContext";
import { AlertTypes } from "../interfaces/frontend/alerts";

export const LayoutContext = createContext({} as LayoutContextProps);

export const LayoutProvider = ({ children }: ContextProviderProps) => {
  const [isGrid, setIsGrid] = useState<boolean>(true);
  const [alert, setAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<AlertTypes | null>(null);

  const activateAlert = (type: AlertTypes, message: string) => {
    setAlert(true);
    setAlertMessage(message);
    type === AlertTypes.ERROR
      ? setAlertType(AlertTypes.ERROR)
      : setAlertType(AlertTypes.SUCCESS);
    setTimeout(() => {
      setAlert(false);
      setAlertMessage("");
      setAlertType(null);
    }, 4000);
  };

  return (
    <LayoutContext.Provider
      value={{
        alert,
        alertType,
        alertMessage,
        activateAlert,
        gridView: { isGrid, setIsGrid },
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
