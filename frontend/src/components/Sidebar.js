import React from 'react';
import Logo from '../assets/logo.png';

import { MdHomeFilled, MdLogout, MdOutlineEventAvailable, MdForum, MdContentPasteSearch } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi";
import { styled } from 'styled-components';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';

export function Sidebar({ isAdmin }) {
  return (
    <Container>
      <div className='menu_options'>
        <div className='logo'>
          <img src={Logo} alt='soundstream' />
        </div>
        <ul className='ul_sidebar'>
          <li className='option d-flex align-items-center activo'>
            <MdHomeFilled />
            <span>Inicio</span>
          </li>
          <li className='option d-flex align-items-center'>
            <MdContentPasteSearch />
            <span>Buscar Eventos</span>
          </li>
          <li className='option d-flex align-items-center'>
            <HiDocumentDuplicate />
            <span>Material Educativo</span>
          </li>
          <li className='option d-flex align-items-center'>
            <MdForum />
            <span>Foros de Discusión</span>
          </li>
          <li className='option d-flex align-items-center'>
            <MdOutlineEventAvailable />
            <span>Historial de Eventos</span>
          </li>
          <li className='option d-flex align-items-center cerrar'>
            <MdLogout />
            <span>Cerrar Sesión</span>
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
background-color: #303840;
color: #b3b3b3;
min-width: 240px;
-webkit-box-shadow: 4px 5px 20px -7px rgba(0,0,0,0.65);
-moz-box-shadow: 4px 5px 20px -7px rgba(0,0,0,0.65);
box-shadow: 4px 5px 20px -7px rgba(0,0,0,0.65);
`