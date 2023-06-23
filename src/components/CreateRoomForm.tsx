import React, {useEffect, useState} from 'react';
import {Button, makeStyles, MenuItem, TextField, Box, FormControl} from '@material-ui/core';
import {useAppThemeContext} from "../contexts";
import {Basic, Custom, Fibonacci, Systems} from "../utils/System";
import {useNavigate} from "react-router-dom";
import useRoom from "../zus/RoomZus";
import {RoomInterface} from "../interfaces/RoomInterface";
import {SessionService} from "../services/Sessions/sessionService"
// @ts-ignore
import coffee from "../images/coffee.png"

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

const possibleSystems = [
    {
        value: Basic.id,
        label: (
            <>
                Padrão (1, 2, 4, 8, 16, <img src={coffee} alt="Coffee" style={{ width: "20px", height: "20px", paddingBottom:"7px", paddingLeft:"3px" }}/>)
            </>
        ),
    },
    {
        value: Fibonacci.id,
        label: (
            <>
                Fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, <img src={coffee} alt="Coffee" style={{ width: "20px", height: "20px", paddingBottom:"7px", paddingLeft:"3px" }}/>)
            </>
        ),
    },
    {
        value: Custom.id,
        label: "Criar novo sistema"
    }

];

const initialFormData : RoomInterface = {
    roomName: "",
    roomId: "",
    sessionSystem: {
        id : 0,
        name: "",
        values: [],
        coffee: false
    },
    userList:[],
};

const CreateRoomForm = () => {
    const [roomName, setRoomName] = useState('');
    const [votingSystem, setVotingSystem] = useState('');
    const [formData, updateFormData] = useState(initialFormData);
    const {toggleTheme} = useAppThemeContext()


    const setRoom = useRoom((state) => state.setRoom);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(formData)

        try {
            const sessionId = await SessionService.createSession(formData.roomName, formData.sessionSystem.id);
            setRoom(sessionId,formData);
            routeChange();
        } catch (error) {
            console.error('Ocorreu um erro:', error);
        }
    };

    let navigate = useNavigate();
    const routeChange = () => {
        navigate("/user");
    };

    const handleChangeName = (e: any) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleChangeSystem = (e: any) => {
        const system = Systems.filter(sys => sys.id == e.target.value)
        updateFormData({
            ...formData,
            [e.target.name]: system[0],
        });
    };

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
                        label="Select"
                        helperText="Selecione o sistema de votação"
                        className={classes.margin_bottom_40}
                        onChange={handleChangeSystem}
                        name="sessionSystem"
                    >
                        {possibleSystems.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="contained" color="primary" onClick={($event) => handleSubmit($event)}>Criar</Button>

                </FormControl>

            </Box>
    );
};

export default CreateRoomForm;

