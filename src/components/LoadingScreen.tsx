import {Box, CircularProgress, makeStyles} from "@material-ui/core";
import React from "react";


const useStyles = makeStyles((theme) => ({
    waiting:{
        margin: 0,
        height: "100vh",
        width: "100%",
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));
const PokerPage = () => {
    const classes = useStyles();
    return (
        <Box className={classes.waiting}>
            <CircularProgress/>
        </Box>
    );
}

export default PokerPage;