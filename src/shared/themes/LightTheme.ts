import { createTheme } from "@mui/material/styles";
import {cyan, grey, yellow} from "@mui/material/colors";

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: yellow[700],
            dark: yellow[800],
            light: yellow[500],
            contrastText: "#383737"
        },
        secondary: {
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: "#ffffff"
        },
        background:{
            paper: "#ffffff",
            default: "#f7f6f3"
        },
        action:{
            disabledBackground: grey[400],
            hover:yellow[600]
        },
        common:{
            black:"#000000",
            white:"#ffffff"
        }
    }
});
