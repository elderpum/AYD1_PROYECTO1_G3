import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VerMaterial.css";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
} from "@mui/material";

export function VerMaterial() {
  const [rows, setRows] = useState([]);
  const [categoria, setCategoria] = useState("");
  const ip = "localhost";
  const token = localStorage.getItem("auth");

  useEffect(() => {
    const url = `http://${ip}:3001/get-materiales`;
    const fetchData = async () => {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((res) => {
          let aux = [];
          for (const m of res.materiales) {
            aux.push(createData(m.name, m.tipo, m.url))
          }
          setRows(aux);
        });
    };
    fetchData();
  }, []);

  function createData(name, tipo, url) {
    return { name, tipo, url };
  }

  // const rows = [
  //   createData("Frozen yoghurt", 159, 6.0),
  //   createData("Ice cream sandwich", 237, 9.0),
  //   createData("Eclair", 262, 16.0),
  //   createData("Frozen yoghurt", 159, 6.0),
  //   createData("Ice cream sandwich", 237, 9.0),
  //   createData("Eclair", 262, 16.0),
  //   createData("Frozen yoghurt", 159, 6.0),
  //   createData("Ice cream sandwich", 237, 9.0),
  //   createData("Eclair", 262, 16.0),
  //   createData("Frozen yoghurt", 159, 6.0),
  //   createData("Ice cream sandwich", 237, 9.0),
  //   createData("Eclair", 262, 16.0),
  //   createData("Frozen yoghurt", 159, 6.0),
  //   createData("Ice cream sandwich", 237, 9.0),
  //   createData("Eclair", 262, 16.0),
  //   createData("Frozen yoghurt", 159, 6.0),
  //   createData("Ice cream sandwich", 237, 9.0),
  //   createData("Eclair", 262, 16.0),
  // ];

  async function buscarCategoria() {
    const url = `http://${ip}:${process.env.BACKEND_PORT}/material-categoria`;
    const token = localStorage.getItem("auth");
    let data = { categoria: categoria };
    const fetchData = async () => {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((res) => {
          let aux = [];
          for (const m of res.materiales) {
            aux.push(createData(m.name, m.tipo, m.url))
          }
          setRows(aux);
        });
    };
    fetchData();
  }

  async function VerMaterial(url) {
    const newWindow = window.open(url, "_blank");
    if (newWindow) {
      newWindow.focus();
    } else {
      alert(
        "El bloqueo de ventanas emergentes está habilitado en su navegador. Habilite las ventanas emergentes para ver el contenido."
      );
    }
  }

  return (
    <Container>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item>
            <TextField
              id="standard-search"
              label="Buscar categoría"
              type="search"
              variant="standard"
              onChange={(newValue) => setCategoria(newValue.target.value)}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            />
          </Grid>
          <Grid item>
            <Button className="busc" variant="text" onClick={buscarCategoria}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3031/3031293.png"
                alt=""
                width="30"
                height="30"
              />
            </Button>
          </Grid>
        </Grid>
        <br />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre del documento</TableCell>
                    <TableCell align="right">Tipo de archivo</TableCell>
                    <TableCell align="right">Ver</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.tipo}</TableCell>
                      <TableCell align="right">
                        <Button variant="contained" onClick={() => VerMaterial(row.url)}>
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
    </Container>
  );
}

const Container = styled.div`
  justify-content: center;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  min-width: 100vh;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    30deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 29%,
    rgba(0, 212, 255, 1) 100%
  );
`;

// const ContainerContent = styled.div`
//   justify-content: center;
//   height: 80%;
//   min-height: 80%;
//   width: 80%;
//   min-width: 80%;
//   background: white;
//   margin-top: 4rem;
//   border-radius: 0.5rem;
// `;
