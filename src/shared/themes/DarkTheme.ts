import { createTheme } from "@mui/material/styles";
import {deepPurple, grey, yellow, blueGrey, indigo} from "@mui/material/colors";

export const DarkTheme = createTheme({
    palette: {
        primary: {
            main: indigo[400],
            dark: indigo[500],
            light: indigo[300],
            contrastText: "#f7f6f3"
        },
        secondary: {
            main: "#242526",
            dark: "#282828",
            light: "#3A3B3c",
            contrastText: "#f7f6f3"
        },
        background:{
            paper: "#000000",
            default: "#18191A"
        },
        action:{
            disabledBackground: grey[500],
            hover: indigo[500]
        },
        common:{
            black:"#000000",
            white:"#ffffff"
        }
    }
});
