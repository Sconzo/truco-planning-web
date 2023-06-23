import {Box, FormControl} from "@mui/material";
import {Button, FormControlLabel, makeStyles, Switch, TextField} from "@material-ui/core";
import React, {useState} from "react";
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
    },
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

    const routeChange = () => {
        navigate("/poker");
    };
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
            const userId = await UserService.addParticipant(formData.userName, sessionId, formData.spectator);
            setUser(formData, userId);
            addUser(formData, userId)
            console.log(currentUser)
        }
        catch (error){
            console.log(error)
        }
    }

    const handleSubmit = (e: any) => {
        console.log(formData)
        e.preventDefault();
        routeChange();
        addParticipant()
    };

    return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >

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
                        value="end"
                        control={<Switch checked={checked} onChange={handleSwitch}
                                         color="secondary" />}
                        label="Espectador"
                        labelPlacement="end"
                        className={classes.textField}
                        onChange={handleSwitch}
                    />
                    <Button variant="contained" color="primary" onClick={($event) => handleSubmit($event)}>Entrar</Button>

                </FormControl>

            </Box>
    );
};

export default User;