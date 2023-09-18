import React from 'react';
import styled from 'styled-components';

import {Sidebar} from '../../components/Sidebar'

import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css'

export function Main(props) {
    return (
        <Container>
            <Sidebar/>
        </Container>
    )
}

const Container = styled.div`
display: flex;
`