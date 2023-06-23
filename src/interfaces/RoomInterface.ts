import {SystemInterface} from "./SystemInterface";
import {UserInterface} from "./UserInterface";

export interface RoomInterface {
    roomName: string;
    roomId: string;
    sessionSystem: SystemInterface;
    userList: UserInterface[];
}

export const roomObject : RoomInterface = {
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