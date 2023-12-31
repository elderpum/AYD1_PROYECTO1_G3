import React from 'react';
import styled from 'styled-components';

import './Titulo.css'

export function Titulo(props) {
    return (
        <Container>
            <h2 className='heads'> {props.titulo} </h2>
        </Container>
    )
}

const Container = styled.div`
display: flex;
color: #04BFBF;
justify-content: space-between;
margin-top: 50px;
margin-bottom: 40px;
`