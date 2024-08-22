'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../styles/theme';

const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default ThemeProviderWrapper;
