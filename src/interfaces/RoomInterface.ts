import {SystemInterface} from "./SystemInterface";
import {UserInterface} from "./UserInterface";

export interface RoomInterface {
    roomName: string;
    roomSystem: SystemInterface;
    userList: UserInterface[];
}