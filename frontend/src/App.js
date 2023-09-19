import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"; // import de la libreria para el ruteo de la pagina
import { InicioSesion } from './pages/InicioSesion/InicioSesion';
import { RegistroEstudiante } from './pages/RegistroEstudiante/RegistroEstudiante';
import { RegistroOrganizacion } from './pages/RegistroOrganizacion/RegistroOrganizacion';
import { Administracion } from './pages/Admin/Admin';
import { CrearEvento } from './pages/CrearEvento/CrearEvento';
import { AgregarMaterial } from './pages/AgregarMaterial/AgregarMaterial';
import { VerMaterial } from './pages/VerMaterial/VerMaterial';
import { Main } from './pages/Main/Main';
import { HistorialEvento } from './pages/HistorialEventos/HistorialEvento';
import { MisEventos } from './pages/MisEventos/MisEventos';
import { BuscarEventos } from './pages/BuscarEventos/BuscarEventos';


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
          <Route path="/admin" element={<Administracion />} />
          <Route path="/registroEstudiante" element={<RegistroEstudiante />} />
          <Route path="/registroOrganizacion" element={<RegistroOrganizacion />} />
          {/* RUTAS PARA LOS ESTUDIANTES */}
          <Route path="/main" element={<Main  isOrganizador={false}/>} />
          <Route path="/ver-material" element={<VerMaterial />} />
          <Route path="/historial-eventos" element={<HistorialEvento />} />
          <Route path="/buscarEvento" element={<BuscarEventos isOrganizador={false}/>}/>
          <Route path="/foro" element={<Main isOrganizador={false}/>}/>
          {/* RUTAS PARA LOS ORGANIZADORES */}
          <Route path="/org/main" element={<Main isOrganizador={true}/>} />
          <Route path="/org/buscarEvento" element={<BuscarEventos isOrganizador={true}/>}/>
          <Route path="/org/foro" element={<Main isOrganizador={true}/>}/>
          <Route path="/crear-evento" element={<CrearEvento />} />
          <Route path="/misEventos" element={<MisEventos />} />
          <Route path="/agregarMaterial" element={<AgregarMaterial />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
// foro de discusion
// busqueda de eventos
export default App;
