import React, {useEffect, useState} from 'react';
import {Button, Grid, List, ListItem, ListItemAvatar, ListItemText, makeStyles} from '@material-ui/core';
import Invite from "./Invite";
import PokerTable from "./PokerTable";
import Deck from "./Deck";
import useRoom from "../zus/RoomZus";
import useUser from "../zus/UserZus";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import {Environment} from "../utils/Environment";
import {UserInterface} from "../interfaces/UserInterface";
import {SessionService} from "../services/Sessions/sessionService";
import {RoomInterface, roomObject} from "../interfaces/RoomInterface";
import {UserService} from "../services/Users/userService";
import Pusher from "pusher-js";
import {v4 as uuidv4} from 'uuid';
import VotingResult from "./VotingResult";
import LoadingScreen from "./LoadingScreen";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 0,
        height: "100%",
        paddingTop: 50
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
        paddingTop:100,
        height: "20%",
        flexGrow: 1,
        width: "100%",
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon:{
        minWidth:'35px'
    },
    userName:{
        color: theme.palette.secondary.contrastText
    },
    symbol:{
        fill: 'red'
    }
}));

const pusherKey = "5918ae5c8a1c68cce96d"
const pusherCluster = "sa1"

if (!pusherKey || !pusherCluster) {
    console.error('As variáveis de ambiente REACT_APP_KEY e REACT_APP_CLUSTER devem estar definidas.');
    throw new Error('Variáveis de ambiente REACT_APP_KEY e REACT_APP_CLUSTER não estão definidas.');

}
const userIdFront = uuidv4();
localStorage.setItem("userIdFront",userIdFront);
console.log("USER ID REAL -> " + localStorage.getItem("userIdFront"))

const pusher = new Pusher(pusherKey, {
    cluster: pusherCluster,
    forceTLS: true,
    authEndpoint:Environment.SERVER_URL + '/pusher/auth',
    auth: {
        params: {
            id: userIdFront,
        },
    },
});


const PokerPage = () => {

    const [someoneDidntVoteYet, setSomeoneDidntVoteYet] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [total, setTotal] = useState(0);

    const room = useRoom((state) => state.room);
    const user = useUser((state) => state.user);
    const [clear, setClear] = useState(false);

    const classes = useStyles();

    const [session, setSession] = useState<RoomInterface>(roomObject);

    const [loading, setLoading] = useState(true);


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
                setLoading(false);
            }
        } catch (error) {
            console.error('Erro ao obter os dados da sessão:', error);
        }
    }


    useEffect(() => {
        getSessionData();
    }, []);


    const channel = pusher.subscribe('presence-session_' + room.roomId);

    channel.bind('pusher:subscription_succeeded', (data : any) => {
        console.log(data)
    });

    channel.bind('user_created', (data: UserInterface[]) => {
        setUserList(data)
    });

    channel.bind('vote_reveal', (data: number) => {
        setOpenModal(true)
        setTotal(data)
    });

    channel.bind('reset', (data: UserInterface[]) => {
        setUserList(data)
    });


    channel.bind("pusher:member_removed", (data : any) => {
        console.log(data)
        UserService.removePlayer(data.id, room.roomId);
        console.log("User leave", data.id, data.info);
    });

    const clearSelection = () => {
        SessionService.newRound(room.roomId)
        setClear(!clear);
        setOpenModal(false)
    }

    const votesReveal = (total : number) => {
        if(!someoneDidntVoteYet) {
            setOpenModal(true)
            setTotal(total)
            SessionService.votesReveal(total.toFixed(1), room.roomId);
        }
    }


    useEffect(() => {
        setSomeoneDidntVoteYet(
            session.userList.filter(user => !user.spectator).length === 0 ||
            session.userList.filter(user => !user.spectator).some((user) => user.vote === "")
        )

        if (session.userList.every((user) => user.vote === "")){
            setOpenModal(false)
            setClear(!clear);
        }
    },[session.userList])

    if (loading) {
        return <LoadingScreen/>;
    }

    return (
        <Grid direction="column" className={classes.root}>
            <Invite/>
            <List style={{position: "absolute"}}>
                {session.userList.map(((user: UserInterface) => (
                    <ListItem key={user.userId}>
                        <ListItemAvatar className={classes.icon}>
                            {user.vote ? (
                                <CheckCircleOutlineIcon style={{ color: 'green' }}/>
                            ) : (user.spectator ? (
                                <VisibilityIcon/>) : (
                                    <HourglassEmptyIcon className={classes.userName} />)
                            )}
                        </ListItemAvatar>
                        <ListItemText className={classes.userName} primary={user.userName}/>
                    </ListItem>
                )))}
            </List>
            <Grid className={classes.table}>
                {<PokerTable
                    room={session}
                    buttonDisabled={someoneDidntVoteYet}
                    onVotesReveal={(total) => votesReveal(total)}
                />}
            </Grid>
            <Grid className={classes.pokerCards}>
                {<Deck
                    room={session}
                    user={user}
                    clear={clear}
                />}
            </Grid>

            <VotingResult
                openModal={openModal}
                total={total}
                onClearSelection={() => clearSelection()}
                session={session}
            />

        </Grid>
    );
};

export default PokerPage;
