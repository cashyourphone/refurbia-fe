// styles/theme.ts
import { createTheme, ThemeOptions } from '@mui/material/styles';

interface CustomBreakpoints {
    customMd: number;
}

declare module '@mui/material/styles' {
    interface Breakpoints extends CustomBreakpoints { }
    interface BreakpointOverrides {
        customMd: true;
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main:'#6650a4'
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
            customMd: 768,
        },
    },
});

export default theme;
