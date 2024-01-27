import {Grid, makeStyles, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box} from '@material-ui/core';
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
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:10,
        marginBottom:40
    },
    button:{
        color: theme.palette.common.white,
        "&:disabled": {
            color: theme.palette.common.white,
        },
    },
    textValues:{
        color: theme.palette.primary.contrastText
    },
    modal:{
        borderStyle:'solid',
        borderColor:theme.palette.primary.main,
        borderWidth:2
    }
}));
interface HeaderProps {
    roomName: string;
}

const Invite = () => {
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
            <Grid item xs={1} className={classes.invite}>
                <Button className={classes.button} variant="contained" color="primary" onClick={($event) => handleOpen($event)}>CONVIDAR</Button>
                <Dialog open={open} onClose={handleClose} >
                    <Box className={classes.modal}>

                    <DialogTitle className={classes.textValues}>Link para acessar esta sala</DialogTitle>
                    <DialogContent className={classes.textValues}>
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
                    </Box>
                </Dialog>
            </Grid>
);
};

export default Invite;