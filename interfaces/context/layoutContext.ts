import { AlertTypes } from "../frontend/alerts";

export type LayoutContextProps = {
  gridView: Grid;
  alert: boolean;
  alertMessage: string;
  alertType: AlertTypes | null;
  activateAlert: (type: AlertTypes, arg: string) => void;
};

interface Grid {
  isGrid: boolean;
  setIsGrid: (arg: boolean) => void;
}
