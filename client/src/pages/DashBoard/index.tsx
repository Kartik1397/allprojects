import { FC } from 'react';
import Header from "../../components/Header";
import BasicTabs from '../../components/tabs';




const DashBoard:FC = () => {

    return (
        <div>
            <Header/>
            <BasicTabs/>
        </div>
    );
}

export default DashBoard;