import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"; // import de la libreria para el ruteo de la pagina
import { InicioSesion } from './pages/InicioSesion/InicioSesion';
import { RegistroEstudiante } from './pages/RegistroEstudiante/RegistroEstudiante';
import { RegistroOrganizacion } from './pages/RegistroOrganizacion.js/RegistroOrganizacion';

/*
  Les recomiendo leer la documentacion de la librería 'react-router-dom' para manejar las rutas,
  es bien sencillo
*/

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* 
            Aqui se definen todas las rutas que va a tener la pagina web
            como plantilla inicial de momento puse el inicio de sesion 
          */}
          <Route path="/" element={<InicioSesion />} /> 
          <Route path="/registroEstudiante" element={<RegistroEstudiante />} />
          <Route path="/registroOrganizacion" element={<RegistroOrganizacion />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
