import { FC, useEffect } from 'react';
import Header from "../../components/Header";
import API from "../../api/util";
import { AxiosResponse } from 'axios';

const Home:FC = () => {
    useEffect(() => {
        API.get('/')
            .then((res: AxiosResponse) => {
                console.log(res);
            });
    });
    console.log('HomePage');
    return (
        <Header />
    );
}

export default Home;
