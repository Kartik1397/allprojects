import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Profile from '../pages/Profile';
import ProjectLink from "../pages/Project";
import Home from '../pages/Home';

const AppRoutes:FC = () => {
    return (
        <Routes >
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/project/:id" element={<ProjectLink/>}/>
        </Routes>
    );
}

export default AppRoutes;
