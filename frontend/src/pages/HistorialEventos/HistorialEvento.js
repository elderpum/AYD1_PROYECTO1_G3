import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HistorialEvento.css";
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
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export function HistorialEvento() {
  const [rows, setRows] = useState([]);
  const ip = "localhost";
  const token = localStorage.getItem("auth");

  useEffect(() => {
    const url = `http://${ip}:3001/get-historial`;
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
            aux.push(createData(m.name, m.tipo, m.url));
          }
          setRows(aux);
        });
    };
    fetchData();
  }, []);

  function createData(name, fecha, tipo, formato, img) {
    return { name, fecha, tipo, formato, img };
  }

  // const rows = [
  //   createData("Frozen yoghurt", 159, 6.0, 159, 6.0),
  //   createData("Ice cream sandwich", 237, 9.0, 159, 6.0),
  //   createData("Eclair", 262, 16.0, 159, 6.0),
  // ];

  const ordenar = (event) => {
    console.log(event.target.checked)
    let aux = rows;
    aux.reverse();
    setRows(aux);
  }

  return (
    <Container>
      <ContainerContent>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item xs={6}>
            <h1>Historial de Eventos</h1>
          </Grid>
          <Grid item xs={2}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Ascendente"
                onChange={ordenar}
              />
            </FormGroup>
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
                    <TableCell>Nombre</TableCell>
                    <TableCell align="right">Fecha</TableCell>
                    <TableCell align="right">Tipo</TableCell>
                    <TableCell align="right">Formato</TableCell>
                    <TableCell align="right">Imagen</TableCell>
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
                      <TableCell align="right">{row.fecha}</TableCell>
                      <TableCell align="right">{row.tipo}</TableCell>
                      <TableCell align="right">{row.formato}</TableCell>
                      <TableCell align="right">
                        <img
                          src={row.img}
                          alt=""
                          width="90"
                          height="50"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </ContainerContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
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

const ContainerContent = styled.div`
  justify-content: center;
  height: 80%;
  min-height: 80%;
  width: 80%;
  min-width: 80%;
  background: white;
  margin-top: 4rem;
  border-radius: 0.5rem;
`;
