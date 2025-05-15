import {createContext, useContext} from "react";

export const ThemeUpdateContext = createContext();

export const useThemeUpdate = () => useContext(ThemeUpdateContext);