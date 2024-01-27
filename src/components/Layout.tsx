import {Box, Button, makeStyles, Switch} from "@material-ui/core";
import {Outlet} from "react-router-dom";
import React from "react";
import {useAppThemeContext} from "../contexts";
import truco from "../images/tru.png";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: 20,
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        display: "flex",
        paddingTop:20,
        paddingBottom:20,
        alignItems:"center"
    },
    logo: {
        flex:1,
        paddingLeft:20
    },
    title: {
        flex:1,
        textAlign:'center'
    },
    themeToggle: {
        flex:1,
        textAlign:'right',
        paddingRight:20
    },
    button: {
        "&:disabled": {
            backgroundColor: theme.palette.primary.main || 'red'
        }
    },
    dark: {
        color: "blue"
    },
    light: {
        color: "red"
    },
    playerName: {
        color: theme.palette.primary.light,
        paddingLeft: "30px",
        display: "flex",
        alignItems: "center",
        fontSize: '18px',
        fontWeight: 'bold',
    },
    titleName: {
        color: theme.palette.primary.dark,
        flexGrow: 1,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        fontWeight: 'bold',
    },
    invite: {
    },
}));

interface LayoutProps {
    userName: string;
    roomName: string;
}

const Layout = () => {
    const classes = useStyles();
    const {toggleTheme} = useAppThemeContext()
    const [checked, setChecked] = React.useState(false);


    const handleChange = () => {
        setChecked((prev) => !prev);
        toggleTheme();
    };

    return (
        <div>
            <div className={classes.header}>
                <div className={classes.logo}>
                    <img src={truco} alt="Coffee" style={{width: "50px", height: "50px"}}/>

                </div>
                <div className={classes.title}>
                    <h1 className={classes.titleName}>Truco Planning</h1>

                </div>


                <div className={classes.themeToggle} >
                    <Switch
                        color="primary"
                        checked={checked}
                        className={classes.button}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <Outlet/>
            <Box className={classes.root}>

            </Box>
        </div>
    )
}

export default Layout