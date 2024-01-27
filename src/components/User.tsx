import {Box, FormControl} from "@mui/material";
import {Button, FormControlLabel, makeStyles, Switch, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {UserInterface} from "../interfaces/UserInterface";
import {useNavigate, useParams} from "react-router-dom";
import useUser from "../zus/UserZus";
import useRoom from "../zus/RoomZus";
import {UserService} from "../services/Users/userService";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 15,
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500,
        border: "white",
        '& .MuiInputBase-input': {
            color: theme.palette.primary.contrastText
        },
        color: theme.palette.primary.contrastText
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
        height:'100%',
        paddingTop:100
    },
    button: {
        color: theme.palette.common.white,
    }
}));

const initialFormData : UserInterface = {
    userId : "",
    userName: "",
    spectator : false,
    vote : "",
    roomId : "",
};
const User = () => {
    const classes = useStyles();
    const [formData, updateFormData] = useState(initialFormData);
    const setUser = useUser(((state) => state.setUser));
    const currentUser = useUser(((state) => state.user));
    const addUser = useRoom(((state) => state.addUser));
    const currentRoom = useRoom(((state) => state.room));
    const setRoomId = useRoom(((state) => state.setRoomId));
    const [checked, setChecked] = useState(false);
    let navigate = useNavigate();
    const [disableButton, setDisableButton] = useState(true)

    const userIdFront = localStorage.getItem("userIdFront");
    const routeChange = () => {
        navigate("/poker");
    };

    const url = window.location.pathname;
    const regex = /\/([0-9a-f-]+)\/user/;
    const match = url.match(regex);

    if (match) {
        const trecho = match[1]; // O trecho desejado estará em match[1]
        localStorage.setItem('roomId', trecho)
    }
    const handleChangeName = (e: any) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    let { sessionId } = useParams();


    const handleSwitch = (e: any) => {
        setChecked(e.target.checked)
        updateFormData({
            ...formData,
            spectator: e.target.checked,
        });
    };

    async function addParticipant() {
        try {
            if(sessionId===undefined){
                sessionId = currentRoom.roomId;
            }
            formData.roomId = sessionId;
            setRoomId(sessionId);

            if(userIdFront) {

                const userId = await UserService.addParticipant(formData.userName, sessionId, formData.spectator, userIdFront);
                setUser(userId, formData);
                localStorage.setItem("userId", userId)
                console.log("userId gerado no back -> ", userId);
            }
            else{
                throw new Error("User Id null")
            }
        }
        catch (error){
            console.log(error)
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        addParticipant()
        routeChange();
    };

    useEffect(()=>{
        if(formData.userName != ""){
            setDisableButton(false)
        }
        else {
            setDisableButton(true)
        }
    },[formData])

    return (
            <Box className={classes.root}>

                <FormControl >
                    <TextField
                        id="outlined-basic"
                        label="Nome do Usuário"
                        variant="filled"
                        className={classes.textField}
                        onChange={handleChangeName}
                        name="userName"
                    />
                    <FormControlLabel
                        color={'white'}
                        value="end"
                        control={<Switch checked={checked} onChange={handleSwitch}
                                         color="primary" />}
                        label="Espectador"
                        labelPlacement="end"
                        className={classes.textField}
                        onChange={handleSwitch}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={($event) => handleSubmit($event)}
                        disabled={disableButton}
                    >Entrar</Button>

                </FormControl>

            </Box>
    );
};

export default User;