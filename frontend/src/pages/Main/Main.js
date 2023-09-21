import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/black_logo.png'

import {Sidebar} from '../../components/Sidebar'

import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css'

export function Main({isOrganizador}) {
    return (
        <Container>
            <Sidebar isOrganizador={true} opcionActiva={"inicio"}/>
            <BodyContent>
                <TitleContainer>
                    <h1> Bienvenido a </h1>
                    <img src={logo} alt=''/>
                </TitleContainer>
            </BodyContent>
        </Container>
    )
}

const TitleContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
min-height: 100%;
color: #04BFBF;

& img {
    max-width: 700px;
}
`
const BodyContent = styled.div`
flex: 0.8;
bottom: 0;
padding-left: 75px;
padding-right: 75px;
`

const Container = styled.div`
display: flex;
`
