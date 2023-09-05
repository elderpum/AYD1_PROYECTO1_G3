import React from 'react';
import Logo from '../assets/white_logo.png';

import { MdHomeFilled} from "react-icons/md";
import { styled } from 'styled-components';

import './Sidebar.css';

export function Sidebar({ isAdmin }) {
  return (
    <Container>
      <div className='menu_options'>
        <div className='logo'>
          <img src={Logo} alt='soundstream' />
        </div>
        <ul className='ul_sidebar'>
            <li className='option'>
                <div className='icon_option'>
                    <MdHomeFilled />
                </div>
                <span>Inicio</span>
            </li>
        </ul>
      </div>
    </Container >
  )
}

const Container = styled.div`
position: sticky;
top: 0;
flex: 0.2;
height: 100%;
min-height: 100vh;
background-color: black;
color: #b3b3b3;
min-width: 240px;
`