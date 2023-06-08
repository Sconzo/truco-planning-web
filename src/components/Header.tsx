import { Grid, makeStyles, Button } from '@material-ui/core';
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        height: 'auto',
    },
    playerName: {
        color:"black",
        paddingLeft:"30px"
    },
    roomName: {
        color:"black",
        flexGrow: 1,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    invite: {
        color:"black",
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight:"30px",
    },
}));
interface HeaderProps {
    userName: string;
    roomName: string;
}
const Header = ({ userName, roomName }:HeaderProps) => {
    const classes = useStyles();
    return (
        <Grid container  className={classes.root}>
            <Grid item xs={4} className={classes.playerName}>
                {<h3>{userName}</h3>}
            </Grid>
            <Grid item xs={4} className={classes.roomName}>
                {<h1>{roomName}</h1>}
            </Grid>
            <Grid item xs={4} className={classes.invite}>
                <Button variant="contained" color="primary" >INVITE</Button>
            </Grid>
        </Grid>
);
};

export default Header;