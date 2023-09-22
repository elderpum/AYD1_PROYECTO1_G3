import { useState, useEffect } from 'react';
import { getUser } from '../helpers/getUser';


export const UseFetchUser = () => {
    const [user, setUser] = useState({
        dataUser: {}
    });

    useEffect(() => {

        getUser()
            .then(listData => {
                setUser({
                    dataUser: listData
                })
            });

    }, [user]);

    return user;
}
