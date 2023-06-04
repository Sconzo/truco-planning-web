import {Box, Card, CardActionArea, CardContent, makeStyles} from '@material-ui/core';
import React, {useEffect, useState} from "react";
import {RoomInterface} from "../interfaces/RoomInterface";
// @ts-ignore
import coffee from "../images/coffee.png";
import useWebSocket from 'react-use-websocket';
import {UserInterface} from "../interfaces/UserInterface";
import {Environment} from "../utils/Environment";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        height: 'auto',
        color: 'black',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: "3px"
    },
    oneCard: {
        color: 'black',
        backgroundColor: 'white',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: '8px',
        width: "50px",
        margin: "5px"
    },
    selected: {
        backgroundColor: theme.palette.secondary.main,
        transition: 'background-color 0.3s ease-in-out'
    },
}));

interface HeaderProps {
    userName: string;
    roomName: string;
}

interface DeckProps {
    room: RoomInterface;
    user: UserInterface
    clear : boolean
}

const Deck = (props: DeckProps) => {
    const classes = useStyles();
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

    const [userList, setUserList] = React.useState([]);

    const {sendMessage} = useWebSocket(Environment.SERVER_URL);
    function tellServer(value: string) {
        const a = userList;
        const message = {
            userId: props.user.userId,
            vote: value,
            type: 'voted',
        };
        sendMessage(JSON.stringify(message));
    }

    const selectCard = (cardIndex: number) => {
        if (selectedCardIndex === cardIndex) {
            setSelectedCardIndex(null);
            tellServer("");
        } else {
            setSelectedCardIndex(cardIndex);
            if (cardIndex === -1) {
                tellServer("coffee")
            } else {
                tellServer(props.room.roomSystem.values[cardIndex]);
            }
        }
    };

    let cards = props.room.roomSystem.values;

    if (props.user.spectator) {
        return null;
    }
    useEffect(() => {
        setSelectedCardIndex(null);
    }, [props.clear]);
    return (
        <Box className={classes.root}>
            <span>{userList}</span>
            {cards.map((card, index) => (
                <Card className={`${classes.oneCard} ${selectedCardIndex === index ? classes.selected : ''}`}
                      key={index}>
                    <CardActionArea onClick={() => selectCard(index)}>
                        <CardContent>
                            {card}
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
            {props.room.roomSystem.coffee ?
                <Card className={`${classes.oneCard} ${selectedCardIndex === -1 ? classes.selected : ''}`} key={-1}>
                    <CardActionArea onClick={() => selectCard(-1)}>
                        <CardContent>
                            {<img src={coffee} alt="Coffee" style={{width: "14px", height: "14px"}}/>}
                        </CardContent>
                    </CardActionArea>
                </Card> : null}
        </Box>
    );
};

export default Deck;