import create from 'zustand'

import {RoomInterface} from "../interfaces/RoomInterface";
import {UserInterface} from "../interfaces/UserInterface";

type CurrentRoom = {
    room: RoomInterface,
    setRoom: (roomId: string, roomData: RoomInterface) => void,
    setRoomId: (roomId: string) => void,
    addUser: (user: UserInterface, userId : string) => void,
    setUserList: (userList: UserInterface[]) => void,
}

const useRoom = create<CurrentRoom>((set) => ({

    room: {
        roomName: "",
        roomId: "",
        sessionSystem: {
            id: 0,
            name: "",
            intValues: [],
            coffee: false
        },
        userList: []
    },

    addUser: (user: UserInterface, userId : string) => {
        const userWithId = {...user, userId};
        set((state) => ({
            room: {...state.room, userList: [...state.room.userList, userWithId]}
        }));
    },

    setRoom: (roomId: string, roomData: RoomInterface) => {
        set((state) => ({
            room: {
                ...roomData,
                roomId,
            },
        }));
    },
    setRoomId:(roomId: string)=>{
        set((state) => ({
            room: {
                ...state.room,
                roomId,
            },
        }));
    },


    setUserList: (userList: UserInterface[]) => {
        set((state) => ({room: {...state.room, userList: userList}}));
    },
}))

export default useRoom