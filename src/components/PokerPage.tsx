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
import pusher from "../shared/pusher/pusher";
import {UserService} from "../services/Users/userService";

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
        paddingRight: "30px",
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

    if (!localStorage.getItem('roomId')) {
        localStorage.setItem('roomId', room.roomId);
    }
    const roomId = localStorage.getItem('roomId');
    const getSessionData = async () => {
        try {
            if (roomId) {
                const sessionData = await SessionService.getSessionById(roomId);
                setSession(sessionData);
            }
        } catch (error) {
            console.error('Erro ao obter os dados da sessão:', error);
        }
    }

    const removePlayer = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if(roomId && userId){
                await UserService.removePlayer(userId, roomId);
            }

        } catch (error) {
            console.error('Erro ao obter os dados da sessão:', error);
        }
    }
    useEffect(() => {
        getSessionData();
        usePusher();
    }, []);

    const usePusher = () => {

        try {

            const channel = pusher.subscribe('session_' + room.roomId);

            channel.bind('user_created', (data: UserInterface[]) => {
                setUserList(data)
            });


            window.addEventListener('beforeunload', (event) => {
                // Lógica que você deseja executar antes de o usuário fechar a página

                // Por exemplo, exibir uma mensagem de despedida
                event.preventDefault();
                removePlayer();
            });
        } catch (error) {
            throw error;
        }
    }

    const clearSelection = () => {
        setClear(!clear);
    }

    return (
        <Grid direction="column" className={classes.root}>
            <Grid className={classes.header}>
                {<Header userName={user.userName} roomName={session.roomName}/>}
            </Grid>
            <List style={{position: "absolute"}}>
                {session.userList.map(((user: UserInterface) => (
                    <ListItem key={user.userId}>
                        <ListItemAvatar>
                            {user.vote ? (
                                <CheckCircleOutlineIcon style={{fill: "green"}}/>
                            ) : (
                                <PendingIcon/>
                            )}
                        </ListItemAvatar>
                        <ListItemText primary={user.userName}/>
                    </ListItem>
                )))}
            </List>
            <Grid className={classes.table}>
                {<PokerTable room={session} onClearSelection={() => clearSelection()}/>}
            </Grid>
            <Grid className={classes.pokerCards}>
                {<Deck room={session} user={user} clear={clear}/>}
            </Grid>
        </Grid>
    );
};

export default PokerPage;
