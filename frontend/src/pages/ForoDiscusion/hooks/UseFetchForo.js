import { useState, useEffect } from 'react';
import { getForo } from '../helpers/getForo';

export const UseFetchForo = () => {

    const [foro, setForo] = useState({
        dataForo: []
    });

    useEffect(() => {

        getForo()
        .then(listData => {
            setForo({
                dataForo: listData
            })
        });
    
    }, [foro]);

    return foro;
}
