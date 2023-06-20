import {SystemInterface} from "./SystemInterface";
import {UserInterface} from "./UserInterface";

export interface RoomInterface {
    roomName: string;
    roomId: string;
    roomSystem: SystemInterface;
    userList: UserInterface[];
}