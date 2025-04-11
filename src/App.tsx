import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { store } from './redux/store/store';
import './App.scss';
import './i18n';

import { Provider as ReduxProvider } from 'react-redux';
import { enUS } from 'date-fns/locale';
import { Layout } from './modules/layout/layout/ui/Layout';
import { Outlet } from 'react-router-dom';

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

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
          <CssBaseline />
          <Layout>
            <Outlet />
          </Layout>
        </LocalizationProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
