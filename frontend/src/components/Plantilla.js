import React from 'react';
import styled from 'styled-components';

import './Styles.css'

export function Head(props) {
    return (
        <Container>
            <h1 className='heads'> {props.titulo} </h1>
        </Container>
    )
}

const Container = styled.div`
display: flex;
color: white;
justify-content: space-between;
padding: 0px 50px;
margin-top: 15px;
margin-bottom: 15px;
`
