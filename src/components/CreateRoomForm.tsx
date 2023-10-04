import React, {useEffect, useState} from 'react';
import {Button, makeStyles, MenuItem, TextField, Box, FormControl} from '@material-ui/core';
import {useAppThemeContext} from "../contexts";
import {useNavigate} from "react-router-dom";
import useRoom from "../zus/RoomZus";
import {RoomInterface} from "../interfaces/RoomInterface";
import {SessionService} from "../services/Sessions/sessionService"
// @ts-ignore
import coffee from "../images/coffee.png"
import {SystemInterface} from "../interfaces/SystemInterface";
import CreateCustomDeck from "./CreateCustomDeck";
import {System, Systems} from "../utils/System";

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
    margin_bottom_40: {marginBottom: 40},
    selectedOption: {
        width: "20px",
        height: "20px",
    },
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height:'100vh',
    },

}));
interface deckInterface {
    id:number,
    label:string
}
const possibleSystems : deckInterface[] = [];

const initialFormData : RoomInterface = {
    roomName: "",
    roomId: "",
    sessionSystem: {
        id : 0,
        name: "",
        intValues: []
    },
    userList:[],
};

const deckList : SystemInterface[] = []; //= await SessionService.listAllDecks();

deckList.push(System.BASIC);
deckList.push(System.FIBONACCI);
deckList.forEach(deck => {
    possibleSystems.push({
        id : deck.id,
        label : deck.name + " (" + deck.intValues.join() + ")"
    })
});
possibleSystems.push({
    id : -1,
    label : "Usar deck personalizado"
})

const CreateRoomForm = () => {
    const [formData, updateFormData] = useState(initialFormData);
    const [openModal, updateOpenModal] = useState(false);
    const [systemChosen, setSystemChosen] = useState<null | number>(null);
    const [disableButton, setDisableButton] = useState(true)
    const {toggleTheme} = useAppThemeContext()


    const setRoom = useRoom((state) => state.setRoom);
    let sessionId = "";

    const onCloseModal = () => {
        updateOpenModal(false)
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            sessionId = await SessionService.createSession(formData.roomName, formData.sessionSystem.id);
            setRoom(sessionId,formData);
            localStorage.setItem('roomId', sessionId);
            routeChange();
        } catch (error) {
            console.error('Ocorreu um erro:', error);
        }
    };

    let navigate = useNavigate();
    const routeChange = () => {
        navigate("/" + sessionId + "/user");
    };

    const handleChangeName = (e: any) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleChangeSystem = (e: any) => {
        setSystemChosen(e.target.value)
        const system = deckList.find(sys => sys.id == e.target.value)

        if(system){
            updateFormData({
                ...formData,
                [e.target.name]: system,
            });
        }
        else{
            updateOpenModal(true)
        }
    };

    useEffect(()=>{
        if(formData.roomName != "" && formData.sessionSystem.id != 0){
            setDisableButton(false)
        }
        else {
            setDisableButton(true)
        }
    },[formData])

    const classes = useStyles();
    return (
            <Box
                className={classes.root}
            >

                <FormControl >
                    <TextField
                        id="outlined-basic"
                        label="Nome da Sala"
                        variant="filled"
                        className={classes.textField}
                        onChange={handleChangeName}
                        name="roomName"
                    />
                    <TextField
                        select
                        label="Deck"
                        helperText="Selecione o sistema de votação"
                        className={classes.margin_bottom_40}
                        onChange={handleChangeSystem}
                        name="sessionSystem"
                        value={systemChosen}
                    >
                        {possibleSystems.sort((a,b) => a.id - b.id).map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={($event) => handleSubmit($event)}
                        disabled = {disableButton}
                    >Criar</Button>

                </FormControl>

                <CreateCustomDeck
                    openModal={openModal}
                    onCloseModal={() => onCloseModal()}
                    formData={formData}
                ></CreateCustomDeck>
            </Box>
    );
};

export default CreateRoomForm;

