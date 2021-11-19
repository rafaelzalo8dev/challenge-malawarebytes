import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router, } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import List from './containers/List';
import NotFoundPage from './containers/NotFoundPage';

function App() {

  const theme = createTheme({
    typography: {
      fontFamily: ['Avenir', 'Helvetica Neue', 'Arial'].join(','),
      useNextVariants: true,
    },
    palette: {
      primary: {
        main: '#000',
      },
      secondary: {
        main: '#E3F1DF',
      },
      success: {
        main: '#4caf50',
      },
      error: {
        main: '#f44336',
      },
      info: {
        main: '#2196f3',
      },
      warning: {
        main: '#ff9800',
      },
    },
  });

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <div>
          <Helmet
            titleTemplate="Challenge Malwarebytes"
            defaultTitle="Challenge Malwarebytes"
          >
            <meta
              name="description"
              content="Rafael Zavala"
            />
          </Helmet>
          <Router>
            <React.Fragment>
              <Switch>
                <Route
                  exact
                  path="/"
                  component={List}
                />
                <Route component={NotFoundPage} />
              </Switch>
            </React.Fragment>
          </Router>
        </div>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
