import {Box, Card, CardActionArea, CardContent, makeStyles} from '@material-ui/core';
import React, {useEffect, useState} from "react";
import {RoomInterface} from "../interfaces/RoomInterface";
// @ts-ignore
import coffee from "../images/coffee.png";
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

    const selectCard = (cardIndex: number) => {
        const userMatch = props.room.userList.find(obj => obj.userId === props.user.userId)
        if (selectedCardIndex === cardIndex) {
            setSelectedCardIndex(null);
            if(userMatch){
                userMatch.vote = "";
            }
        } else {
            setSelectedCardIndex(cardIndex);

            if(userMatch){
                if (cardIndex === -1) {
                    userMatch.vote = "-1";
                } else {
                    userMatch.vote =  cards[cardIndex];
                }
            }

        }
    };

    let cards = props.room.sessionSystem.values;


    useEffect(() => {
        setSelectedCardIndex(null);
    }, [props.clear]);

    if (props.user.spectator) {
        return null;
    }

    return (
        <Box className={classes.root}>
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
            {props.room.sessionSystem.coffee ?
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