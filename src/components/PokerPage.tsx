import React, {useEffect, useState} from 'react';
import {Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, makeStyles} from '@material-ui/core';
import Header from "./Header";
import PokerTable from "./PokerTable";
import Deck from "./Deck";
import useRoom from "../zus/RoomZus";
import useUser from "../zus/UserZus";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingIcon from '@mui/icons-material/Pending';
import {Environment} from "../utils/Environment";
import {UserInterface} from "../interfaces/UserInterface";
import {SessionService} from "../services/Sessions/sessionService";
import {RoomInterface, roomObject} from "../interfaces/RoomInterface";
import Pusher from "pusher-js";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 0,
        height: "100vh",
    },
    header: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.contrastText,
        height: "15%",
        flexGrow: 1,
        width: "100%",
    },
    table: {
        color: theme.palette.primary.contrastText,
        height: "65%",
        flexGrow: 1,
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight:"30px",
    },
    pokerCards: {
        color: theme.palette.secondary.contrastText,
        height: "20%",
        flexGrow: 1,
        width: "100%",
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
}));

const PokerPage = () => {

    const room = useRoom((state) => state.room);
    const user = useUser((state) => state.user);
    const [clear, setClear] = useState(false);

    const classes = useStyles();

    const [session, setSession] = useState<RoomInterface>(roomObject);
    const setUserList = (userList: UserInterface[]) => {
        setSession(prevSession => ({
            ...prevSession,
            userList: userList,
        }));
    };
    const getSessionData = async () => {
        try {
            const sessionData = await SessionService.getSessionById(room.roomId);
            setSession(sessionData);
        } catch (error) {
            console.error('Erro ao obter os dados da sessão:', error);
        }
    }
    useEffect(() => {
        getSessionData();
        usePusher();
    }, []);

    const usePusher = () =>{
        const pusherKey = "5918ae5c8a1c68cce96d"
        const pusherCluster = "sa1"

        if (!pusherKey || !pusherCluster) {
            console.error('As variáveis de ambiente REACT_APP_KEY e REACT_APP_CLUSTER devem estar definidas.');
            throw new Error('Variáveis de ambiente REACT_APP_KEY e REACT_APP_CLUSTER não estão definidas.');

        }

        try{
            const pusher = new Pusher(pusherKey, {
                cluster: pusherCluster,
                forceTLS: true,
            });

            const channel = pusher.subscribe('session_' + room.roomId);

            channel.bind('user_created', (data: UserInterface[]) => {
                setUserList(data)
            });
        }
        catch (error){
            throw error;
        }
    }

    const clearSelection = () => {
        setClear(!clear);
    }

    return (
            <Grid  direction="column" className={classes.root}>
                <Grid  className={classes.header}>
                    {<Header userName={user.userName} roomName={session.roomName}/>}
                </Grid>
                <List style={{position:"absolute"}}>
                    {session.userList.map(((user : UserInterface) => (
                            <ListItem key={user.userId}>
                                <ListItemAvatar>
                                    {user.vote ? (
                                        <CheckCircleOutlineIcon style={{ fill: "green" }} />
                                    ) : (
                                        <PendingIcon />
                                    )}
                                </ListItemAvatar>
                                <ListItemText primary={user.userName} />
                            </ListItem>
                    )))}
                </List>
                <Grid  className={classes.table}>
                    {<PokerTable onClearSelection={()=>clearSelection()}/>}
                </Grid>
                <Grid  className={classes.pokerCards}>
                    {<Deck room={session} user={user} clear={clear}/>}
                </Grid>
            </Grid>
    );
};

export default PokerPage;
