import create from 'zustand'

import {UserInterface} from "../interfaces/UserInterface";

type CurrentUser = {
    user : UserInterface,
    setUser:(user:UserInterface) => void,
}

const useUser = create<CurrentUser>((set) => ({
    user:{
        userId:"",
        userName: "",
        spectator : false,
        vote : ""
    },

    setUser:(userIncome : UserInterface)=>{
        set(state => ({user : userIncome}))
    },
}))

export default useUser