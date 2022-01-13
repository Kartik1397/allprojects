import { FC } from 'react';
import Header from "../../components/Header";
import ProjectList from "../../components/ProjectList";

const Profile:FC = () => {
    return (
        <>
            <Header />
            <ProjectList isProfilePage />
        </>
    );
}

export default Profile;
