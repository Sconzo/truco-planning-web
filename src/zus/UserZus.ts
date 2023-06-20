import create from 'zustand'

import {UserInterface} from "../interfaces/UserInterface";

type CurrentUser = {
    user : UserInterface,
    setUser:(user:UserInterface, userId:string) => void,
}

const useUser = create<CurrentUser>((set) => ({
    user:{
        userId:"",
        userName: "",
        spectator : false,
        vote : "",
        roomId:"",
    },

    setUser:(userIncome : UserInterface, userId:string)=>{
        set(state => ({
            user : {...userIncome, userId}
        }))
    },
}))

export default useUser