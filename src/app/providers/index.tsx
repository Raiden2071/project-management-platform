import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { SWRConfig } from 'swr';
import { enUS } from 'date-fns/locale';
import { store } from '../../shared/lib/store';
import '../../shared/config/i18n';

// Material UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// SWR
const swrConfig = {
  fetcher: (url: string) => fetch(url).then(res => res.json()),
  revalidateOnFocus: false,
  shouldRetryOnError: false,
};

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
          <SWRConfig value={swrConfig}>
            <CssBaseline />
            {children}
          </SWRConfig>
        </LocalizationProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}; 