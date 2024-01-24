import { createTheme } from "@mui/material/styles";
import {deepPurple, grey, yellow, blueGrey, indigo} from "@mui/material/colors";

export const DarkTheme = createTheme({
    palette: {
        primary: {
            main: deepPurple[200],
            dark: deepPurple[300],
            light: deepPurple[100],
            contrastText: "#ffffff"
        },
        secondary: {
            main: indigo[400],
            dark: indigo[400],
            light: indigo[400],
            contrastText: "#ffffff"
        },
        background:{
            paper: grey[900],
            default: grey[900]
        },
        action:{
            disabledBackground: grey[500],
            hover:yellow[800]
        }
    }
});
