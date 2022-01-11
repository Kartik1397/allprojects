import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../../components/Header";

const Profile:FC = () => {
    const {id} = useParams();
    const [profile,setProfile] = useState({});
    console.log(id);
    return (
        <>
             <Header />
             <div>Profile</div>
        </>
        
      
        
    );
}

export default Profile;
