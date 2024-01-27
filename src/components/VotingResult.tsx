import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, List, ListItem, ListItemAvatar, ListItemText,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {RoomInterface} from "../interfaces/RoomInterface";
import {UserInterface} from "../interfaces/UserInterface";
// @ts-ignore
import coffee from "../images/coffee.png";

const useStyles = makeStyles((theme) => ({
    score:{
        color:"black",
        textAlign:"center",
        fontSize:"30px",
        padding:"8px",
        backgroundColor:theme.palette.primary.light,
        borderRadius: '8px',
    },
    oneCard: {
        color: theme.palette.primary.contrastText,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.light,
        borderRadius: '4px',
        width: "21px",
        height: "26px",
        margin: "5px"
    },
    icon:{
        minWidth:'35px'
    },
    player:{
        color:theme.palette.primary.contrastText
    },
    title:{
        color:theme.palette.primary.contrastText
    }
}));

type VotingResultProps = {
    total:number;
    openModal : boolean;
    onClearSelection: () => void;
    session:RoomInterface;
}
const VotingResult = (props : VotingResultProps) => {
    const classes = useStyles();

    const [userList, setUserList] = useState<UserInterface[]>([]);

    useEffect(() => {
        if(!props.openModal){
            setUserList(props.session.userList);
        }
    }, [props.session.userList])

    return (
        <div>

            <Grid item xs={4} >
                <Dialog open={props.openModal}>
                    <DialogTitle className={classes.title}>Média da Rodada</DialogTitle>
                    <DialogContent>
                        <Box className={classes.score}>
                            <span>{
                                props.total !== -1
                                    ?
                                    props.total
                                    :
                                    <img src={coffee} alt="Coffee" style={{width: "30px", height: "30px"}}/>}
                            </span>
                        </Box>
                    </DialogContent>
                    <List>
                        {userList.filter(user => !user.spectator).map(((user: UserInterface) => (
                            <ListItem key={user.userId}>
                                <ListItemAvatar className={classes.icon}>
                                    <span className={classes.oneCard}>{
                                        user.vote !== "-1"
                                            ?
                                            user.vote
                                            :
                                            <img src={coffee} alt="Coffee" style={{width: "14px", height: "14px"}}/>}
                                    </span>
                                </ListItemAvatar>
                                <ListItemText className={classes.player} primary={user.userName}/>
                            </ListItem>
                        )))}
                    </List>
                    <DialogActions>
                        <Button onClick={props.onClearSelection} color="primary">
                            Nova Rodada
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </div>
    )
}

export default VotingResult;