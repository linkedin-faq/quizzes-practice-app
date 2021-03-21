import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { AppProvider } from 'contexts/app/reducer';
import { QuizProvider } from "contexts/quiz/reducer";

import { theme } from "theme";
// External CSS import here
import "styles/common.scss";

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <QuizProvider>
          <Component {...pageProps} />
        </QuizProvider>
      </AppProvider>
      
    </ThemeProvider>
  );
}

export default MyApp;
