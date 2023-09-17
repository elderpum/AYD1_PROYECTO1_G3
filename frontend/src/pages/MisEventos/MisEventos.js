import React from 'react';
import styled from 'styled-components';

import {Sidebar} from '../../components/Sidebar'

import 'bootstrap/dist/css/bootstrap.min.css';
import './MisEventos.css'

export function MisEventos(props) {
    return (
        <Container>
            <Sidebar/>
            <BodyContent>
                Mis Eventos
            </BodyContent>
        </Container>
    )
}

/*
visualizar eventos que el Organizador haya creado.
visualizar eventos que el Estudiante haya marcado.
boton para crear evento

mostrar la información que se haya cargado para el evento, es decir, la información
completa ya que es para poder tener absoluto control sobre el evento
*/

const BodyContent = styled.div`
flex: 0.8;
margin-bottom: 75px;
`

const Container = styled.div`
display: flex;
`
