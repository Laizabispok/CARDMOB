import React,{ createContext, useContext, useState, ReactNode} from "react";
import {Appearance, ColorSchemeName } from "react-native";


// Definir tema.
const lightTheme = {
    colors: {
        background: '#FFFFFF',
        text: '#333333',
        primary: '#0066CC',
    },
    spacing: (value: number) =>value * 8,
};

const darkTheme = {
    colors: {
        background: '#000000',
        text: '#F0F0F0',
        primary: '#3399FF',
    },

  spacing: (value: number) => value * 8,

}
    type Theme = typeof lightTheme;

    interface ThemeContextProps {
        theme: Theme;
        toggleTheme: () => void; 
    }

    const ThemeContext = createContext<ThemeContextProps>({
        theme: lightTheme,
        toggleTheme: () => {},
        }
    );

    export const ThemeProvider = ({ children } : { children: ReactNode }) => {
        const ColorScheme = Appearance.getColorScheme();
        const [mode, setMode] = useState<ColorSchemeName>(ColorScheme || 'light');

        const toggleTheme = () => {
            setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
        };

        const theme = mode === 'light' ? lightTheme : darkTheme;

        return (
            <ThemeContext.Provider value={{ theme, toggleTheme}}>
                {children}
            </ThemeContext.Provider>
         );
    };

    export const useTheme = () => useContext(ThemeContext);