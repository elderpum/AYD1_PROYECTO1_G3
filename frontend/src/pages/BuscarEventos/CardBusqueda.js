import React, {useState} from 'react';
import styled from 'styled-components';

import {Grid} from '@mui/material';

export function CardBusqueda({evento}) {
    return (
        <Card>
            buNEAS
        </Card>
    );
}

const Card = styled.div`
display: flex;
padding: 20px;
margin-top: 30px;
transition: 0.3s ease-in-out;

border-radius: 9px 9px 9px 9px;
-moz-border-radius: 9px 9px 9px 9px;
-webkit-border-radius: 9px 9px 9px 9px;
border: 2px solid #e4e4e4;

&:hover {
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.51);
    -webkit-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.51);
    -moz-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.51);
}
`