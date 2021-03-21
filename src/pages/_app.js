import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

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
      <QuizProvider>
        <Component {...pageProps} />
      </QuizProvider>
    </ThemeProvider>
  );
}

export default MyApp;
