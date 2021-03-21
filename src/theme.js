import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[500],
    },
    secondary: {
      main: green[500],
    },
  },
});