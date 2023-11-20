import {Grid, makeStyles, Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import React, {useState} from "react";
import {Environment} from "../utils/Environment"

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding : 20,
        height: 'auto',
    },
    playerName: {
        color:"black",
        paddingLeft:"30px",
        display:"flex",
        alignItems:"center",
        fontSize:'18px',
        fontWeight:'bold',
    },
    roomName: {
        color: "#353535",
        flexGrow: 1,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:'28px',
        fontWeight:'bold',
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

    const [open, setOpen] = useState(false);

    const [copied, setCopied] = useState(false);

    const roomId = localStorage.getItem('roomId');

    const linkToCopy = Environment.CLIENT_URL + '/' + roomId + '/user';

    const handleOpen = (e:any) =>{
        setOpen(true);
    }

    const handleClose = (e:any) =>{
        setOpen(false);
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(linkToCopy)
            .then(() => {
                setCopied(true);
            })
            .catch((error) => {
                console.error('Erro ao copiar o link:', error);
            });
    };

    return (
        <Grid container  className={classes.root}>
            <Grid item xs={4} className={classes.playerName}>
                {<h3>{userName}</h3>}
            </Grid>
            <Grid item xs={4} className={classes.roomName}>
                {<h1>{roomName}</h1>}
            </Grid>
            <Grid item xs={4} className={classes.invite}>
                <Button variant="contained" color="primary" onClick={($event) => handleOpen($event)}>CONVIDAR</Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Link para acessar esta sala</DialogTitle>
                    <DialogContent>
                        <p>
                            <br />
                            {linkToCopy}
                        </p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCopy} color="primary">
                            Copiar Link
                        </Button>
                        {copied}
                        <Button onClick={handleClose} color="primary">
                            Fechar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid>
);
};

export default Header;