import create from 'zustand'

import {RoomInterface} from "../interfaces/RoomInterface";
import {UserInterface} from "../interfaces/UserInterface";

type CurrentRoom = {
    room : RoomInterface,
    setRoom: (roomId: string, roomData: RoomInterface) => void,
    addUser:(user:UserInterface) => void,
    setUserList:(userList:UserInterface[]) => void,
}

const useRoom = create<CurrentRoom>((set) => ({

    room:{
        roomName: "",
        roomId: "",
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

    setRoom: (roomId: string, roomData: RoomInterface) => {
        set((state) => ({
            room: {
                ...roomData,
                roomId,
            },
        }));
    },


    setUserList: (userList: UserInterface[]) => {
        set((state) => ({ room: { ...state.room, userList: userList } }));
    },
}))

export default useRoom