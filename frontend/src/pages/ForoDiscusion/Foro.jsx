import React from 'react';
import Button from '@mui/material/Button';
import { Sidebar } from '../../components/Sidebar';
import { Titulo } from '../../components/Titulo'
import { useNavigate } from 'react-router-dom';
import { CardForo } from './CardForo';
import { UseFetchForo } from './hooks/UseFetchForo';
// import { UseFetchUser } from './hooks/UseFetchUser';

import './css/foro.css';


// const listForo = [
//     {
//         id: 0,
//         titulo: 'Champions League',
//         descripcion: 'Fases de grupos',
//         categoria: 'Deportes',
//         comentarios: [
//             'Barca es el campeon',
//             'City con pep guardiola es el campeon',
//             'Liverpool no fue a la champions :(',
//             'El madrid es el mejor equipo de la historia',
//         ]
//     },
//     {
//         id: 1,
//         titulo: 'Inteligencia artificial',
//         descripcion: 'Es el futuro de hoy',
//         categoria: 'Tecnologia',
//         comentarios: [
//             'me asusta la ingeligencia artificial',
//             'chatbots son lo mejor',
//             'la inteligencia artificial es el futuro',
//             'hay que aprender inteligencia artificial',
//         ]
//     },
//     {
//         id: 2,
//         titulo: 'El metaverso',
//         descripcion: 'que es el metaverso?',
//         categoria: 'Tecnologia',
//         comentarios: [
//             'meta que?',
//             'metaverso es el futuro',
//             'el metaverso es el futuro de la tecnologia',
//         ]
//     },
// ]


export const Foro = ({ isOrganizador }) => {

    //Obtener lista de fotos
    const { dataForo } = UseFetchForo();
    console.log(dataForo);

    //Obtene usuario activo
    // const {dataUser} = UseFetchUser();


    const navigate = useNavigate();

    //Funcion para redireccionar a la pagina de crear foro.
    const onCreateForo = () => {
        navigate('/crearFoto', {
            replace: true, //No dejar que la persona regrese a la pagina anterior.
        });
    }

    return (
        <>
            <div className="body-foro">

                <Sidebar isOrganizador={isOrganizador} opcionActiva={'foro'} />

                <div className="foro-container">

                    <Titulo titulo={'Foros de Discusión'} />

                    <div className='d-flex justify-content-start mb-4'>
                        <Button onClick={onCreateForo} variant="contained" size="small"> Crear Foro </Button>
                    </div>

                    {/* {
                        listForo.map((foro) => (
                            <CardForo key={foro.id} foro={foro}  />
                        ))
                    } */}

                    {
                        dataForo.map((foro) => (
                            <CardForo key={foro.id} foro={foro} usuario={"elder"} />
                        ))
                    }

                </div>

            </div>
        </>
    )
}
