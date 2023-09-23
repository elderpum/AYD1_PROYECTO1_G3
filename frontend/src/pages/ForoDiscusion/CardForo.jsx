import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { TextField, Button } from '@mui/material';
import { ListItem } from '@mui/material';
import { setComments } from './helpers/setComment';



export const CardForo = ({ foro}) => {

    const [comment, setComment] = useState('');

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    }

    const handleSubmint = (e) => {
        e.preventDefault(); //Evita que se recargue la pagina.

        // foro.comentarios.push(comment);
        // console.log(foro);

        //Mandar comentario al backend.
        setComments(comment, foro.id)

        setComment('');
    }

    return (
        <Card sx={{ maxWidth: '100%', marginTop: 5, backgroundColor: '#FBFEFF' }}>

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {foro.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {foro.descripcion}
                </Typography>
                <Typography variant="body3" color="text.secondary">
                    Categoria : {foro.categoria}
                </Typography>
            </CardContent>

            <CardActions>

                <Accordion sx={{ width: '100%' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">

                        <Typography>Comentarios</Typography>

                    </AccordionSummary>

                    {
                        foro.comentarios.map((comment, index) => (
                            <React.Fragment key={index}>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary="Correo electronico"
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {comment.correoUsuario}
                                                </Typography>
                                                {comment.nombreUsuario} — "{comment.comentario}"
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                {index !== foro.comentarios.length - 1 && <Divider variant="inset" component="li" />}
                            </React.Fragment>
                        ))
                    }

                    <ListItem >
                        <form onSubmit={handleSubmint}>
                            <div>
                                <TextField sx={{ width: 920 }} required label="Escribe tu comentario" value={comment} onChange={handleCommentChange} variant="filled" />
                                <Button sx={{ marginTop: 2, marginLeft: 2, height: '4ch', width: '12ch', }} type="submit" variant="contained">Comentar</Button>
                            </div>
                        </form>
                    </ListItem>

                </Accordion>
            </CardActions>
        </Card>
    )
}
