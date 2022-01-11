import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import DashBoard from '../pages/DashBoard';
import Profile from '../components/Profile';
import ProjectLink from "../pages/Project"
const AppRoutes:FC = () => {
    
    return (
        <Routes >
            <Route path="/dashboard" element={<DashBoard/>} />
            <Route path="/" element={<DashBoard/>}/>
            <Route path="/profile/:id" element={<Profile/>}/>
            <Route path="/project/:id" element={<ProjectLink/>}/>
        </Routes>
    );
}

export default AppRoutes;
