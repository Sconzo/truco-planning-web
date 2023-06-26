import create from 'zustand'

import {UserInterface} from "../interfaces/UserInterface";

type CurrentUser = {
    user : UserInterface,
    setUser:(userId:string, user:UserInterface) => void,
}

const useUser = create<CurrentUser>((set) => ({
    user:{
        userId:"",
        userName: "",
        spectator : false,
        vote : "",
        roomId:"",
    },

    setUser:(userId:string, userIncome : UserInterface)=>{
        set(state => ({
            user : {...userIncome, userId}
        }))
    },
}))

export default useUser