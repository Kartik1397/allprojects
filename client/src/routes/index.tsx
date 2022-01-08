import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import DashBoard from '../pages/DashBoard';

const AppRoutes:FC = () => {
    
    return (
        <Routes>
            <Route path="/dashboard" element={<DashBoard/>} />
            <Route path="/" element={<DashBoard/>}/>
        </Routes>
    );
}

export default AppRoutes;
