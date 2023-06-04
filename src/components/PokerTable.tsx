import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {Button} from "@material-ui/core";
import useUser from "../zus/UserZus";
import useRoom from "../zus/RoomZus";
import React, {useState} from "react";
import {Enviroment} from "../utils/Enviroment";

const useStyles = makeStyles((theme) => ({
    table: {
        backgroundColor: theme.palette.secondary.light,
        borderRadius: theme.shape.borderRadius,
        height: "20vh",
        width: "40vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        margin: "auto",
        marginBottom: "2rem",
    },
    player: {
        position: "absolute",
        width: "3rem",
        height: "3rem",
        backgroundColor: "#FFFFFF",
        borderRadius: theme.shape.borderRadius,
    },
    button:{
        backgroundColor: theme.palette.secondary.main,
    },
    player1: {
        top: "calc(50% - 1.5rem)",
        left: "-2rem",
    },
    player2: {
        top: "-2rem",
        left: "calc(50% - 1.5rem)",
    },
    player3: {
        top: "calc(50% - 1.5rem)",
        right: "-2rem",
    },
    player4: {
        bottom: "-2rem",
        left: "calc(50% - 1.5rem)",
    },
    score:{
        color:"black",
        marginTop:"40px",
        fontSize:"30px",
        padding:"8px",
        backgroundColor:theme.palette.primary.main,
        borderRadius: '8px',
    }
}));

type PokerTableProps = {
    onClearSelection: () => void
}

const PokerTable = ({onClearSelection}: PokerTableProps) => {
    const classes = useStyles();
    const room = useRoom((state) => state.room);
    const [mean, setMean] = useState(0);


    const cardsReveal = () => {

        let sum = 0;
        let count = 0;
        room.userList.forEach(user => {
            if (user.vote && user.vote !== 'coffee') {
                sum = sum + parseInt(user.vote);
                count = count + 1.0;
            }
        });
        if(count > 0){
            let div = sum/count;
            setMean(div);
        }
    }

    const newRound = () => {
        setMean(0);
        room.userList.forEach(user => {
            user.vote = "";
        });
        onClearSelection();
    }

    return (
        <Grid container direction="column" alignItems="center">

            <Box className={classes.table}>
                {mean == 0 ?
                    <Button onClick={() => cardsReveal()} className={classes.button}>Revelar</Button> :
                    <Button onClick={() => newRound()} className={classes.button}>Nova Rodada</Button>
                }
                <Box className={classes.player + " " + classes.player1} />
                <Box className={classes.player + " " + classes.player2} />
                <Box className={classes.player + " " + classes.player3} />
                <Box className={classes.player + " " + classes.player4} />
            </Box>
            {mean == 0 ? null :
                <Box className={classes.score}>
                    <span>{mean}</span>
                </Box>
            }
        </Grid>
    );
};
export default PokerTable;