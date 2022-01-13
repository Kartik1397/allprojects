import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../../components/Header";
import ProjectList from "../../components/ProjectList";

const Profile:FC = () => {
    const {id} = useParams();
    const [profile,setProfile] = useState({});
    console.log(id);
    return (
        <>
            <Header />
            <ProjectList isProfilePage />
        </>
    );
}

export default Profile;
