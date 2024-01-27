import {Navigate, Route, Routes} from 'react-router-dom';
import CreateRoomForm from "../components/CreateRoomForm";
import Layout from "../components/Layout";
import PokerPage from "../components/PokerPage";
import User from "../components/User";
import React from "react";

export const AppRoutes = () => {


    return (

        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<CreateRoomForm/>}/>
                <Route path="/:sessionId/user" element={<User/>}/>
                <Route path="/poker" element={<PokerPage/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Route>
        </Routes>
    )
}
