import {
    Box,
    Button, Card, CardActionArea, CardContent,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    Grid, makeStyles, TextField,
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {RoomInterface} from "../interfaces/RoomInterface";
import {SystemInterface} from "../interfaces/SystemInterface";
import {SessionService} from "../services/Sessions/sessionService";
import {CustomSystemResponse} from "../dtos/CustomSystemResponse";
import {useNavigate} from "react-router-dom";
import useRoom from "../zus/RoomZus";
import {CustomSystemRequest} from "../dtos/CustomSystemRequest";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 15,
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500,
        border: "white"
    },
    input: {
        color: 'white'
    },
    oneCard: {
        color: 'black',
        backgroundColor: theme.palette.secondary.main,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        width: "40px",
        margin: "5px",
        "&:hover": {
            backgroundColor: 'red',
        },
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    cardContent: {
        display: "flex", alignItems: "center", justifyContent: "center"
    },
}));

type CreateCustomDeckProps = {
    openModal : boolean
    onCloseModal: () => void;
    formData : RoomInterface;
}
const CreateCustomDeck = (props: CreateCustomDeckProps) => {


    const classes = useStyles();

    const [deckList, updateDeckList] = useState<number[]>([])
    const [inputValue, setInputValue] = useState('');
    const [deckName, setDeckName] = useState('');
    const [sessionName, setSessionName] = useState('');
    const [cardValue, setCardValue] = useState(0)
    const [disableAddButton, setDisableAddButton] = useState(true)
    const [disableSaveButton, setDisableSaveButton] = useState(true)


    const addValueToDeck = () => {
        if(!deckList.includes(cardValue)){
            const updatedDeck = [...deckList, cardValue];
            updatedDeck.sort((a, b) => a - b);
            updateDeckList(updatedDeck);
        }
        setInputValue('')
    }

    let customSystemResponse : CustomSystemResponse;
    const handleSaveButton = async () => {
        props.onCloseModal();
        const deckObject : CustomSystemRequest = {
            sessionName : sessionName,
            votingSystemRequest : {
                name : deckName,
                values : [...deckList],
            }
        }

        customSystemResponse = await SessionService.createSessionCustomDeck(deckObject)
        localStorage.setItem('roomId', customSystemResponse.sessionId);
        routeChange();
        updateDeckList([]);
    }

    let navigate = useNavigate();
    const routeChange = () => {
        navigate("/" + customSystemResponse.sessionId + "/user");
    };

    const handleCancelButton = () => {
        props.onCloseModal();
        //props.resetDeckDropdown();
        updateDeckList([]);
    }

    const removeCard = (index: number) => {
        const temp = [...deckList]
        temp.splice(index,1)
        updateDeckList(temp)
    }

    const updateCardValue = (e: any) => {
        const numberValue = parseInt(e.target.value, 10);
        if(numberValue > 0 || e.target.value == '') {
            setInputValue(e.target.value);
            setCardValue(numberValue)
        }
    }

    const updateDeckName = (e: any) => {
        setDeckName(e.target.value)
    }
    const updateSessionName = (e: any) => {
        setSessionName(e.target.value)
    }

    useEffect(() => {
        if(inputValue){
            setDisableAddButton(false)
        }
        else{
            setDisableAddButton(true)
        }
    },[inputValue])

    useEffect(() => {
        if(deckList.length >= 3 && deckName){
            setDisableSaveButton(false)
        }
        else{
            setDisableSaveButton(true)
        }
    }, [deckList, deckName])

    return (
        <div>

            <Grid item xs={4}>
                <Dialog open={props.openModal}>
                    <DialogTitle>Jogue com um deck personalizado</DialogTitle>
                    <DialogContent>
                        <FormControl>
                            <TextField
                                id="outlined-basic"
                                label="Nome da Sala"
                                onChange={updateSessionName}
                                variant="filled"
                                className={classes.textField}
                                name="sessionName"
                                value={sessionName}
                            />

                            <TextField
                                id="outlined-basic"
                                label="Nome do Deck"
                                onChange={updateDeckName}
                                variant="filled"
                                className={classes.textField}
                                name="deckName"
                            />

                            <TextField
                                label="Valor"
                                type={"number"}
                                value={inputValue}
                                onChange={updateCardValue}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            />
                            <Button
                                color="primary"
                                onClick={addValueToDeck}
                                disabled={disableAddButton}
                            >
                                Adicionar
                            </Button>


                        </FormControl>

                        <div className={classes.cardContainer}>
                            {deckList.map((card, index) => (

                                <Card className={`${classes.oneCard}`} key={index}>
                                    <CardActionArea onClick={() => removeCard(index)}>
                                        <CardContent className={classes.cardContent}>
                                            {card}
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </div>


                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={handleCancelButton}
                        >
                            Cancelar
                        </Button>

                        <Button
                            color="primary"
                            disabled={disableSaveButton}
                            onClick={handleSaveButton}
                        >
                            Criar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </div>
    )
}

export default CreateCustomDeck;
