import create from 'zustand'

import {RoomInterface} from "../interfaces/RoomInterface";
import {UserInterface} from "../interfaces/UserInterface";

type CurrentRoom = {
    room : RoomInterface,
    changeRoom:(session:RoomInterface) => void,
    addUser:(user:UserInterface) => void,
    setUserList:(userList:UserInterface[]) => void,
}

const useRoom = create<CurrentRoom>((set) => ({


    room:{
        roomName: "",
        roomSystem: {
            id : 0,
            name: "",
            values: [],
            coffee: false
        },
        userList:[]
    },

    addUser: (user: UserInterface) => {
        set((state) => ({ room: { ...state.room, userList: [...state.room.userList, user] } }));
    },

    changeRoom:(roomIncome : RoomInterface)=>{
        set(state => ({room : roomIncome}))
    },

    setUserList: (userList: UserInterface[]) => {
        set((state) => ({ room: { ...state.room, userList: userList } }));
    },
}))

export default useRoom