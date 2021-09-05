import React, { useState  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Button, CardContent, CardMedia, FormGroup } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(2),
      minWidth: 200,
      maxWidth: 200
    },
    button: {
        minWidth: 200,
        margin: theme.spacing(2)
    },
    card: {
        margin: 'auto',
        marginTop: '70px',
        maxWidth: 300
    },
    formGroup:{
       alignItems: 'center'
    },
    media: {
        height: 140,
    },
}));

function Home() {

    const [input, setInput] = useState('');
    const [select, setSelect] = useState('');
    

    const onSubmit = e => {
        e.preventDefault();

        console.log(e.target.value)
    } 

    const classes = useStyles();

    return (
        <Container maxWidth="md">
            <Grid>
                <Card className={classes.card}>
                    <CardContent>
                        <form onSubmit={onSubmit}>
                            <FormGroup className={classes.formGroup}>
                            <div>
                                <FormControl className={classes.formControl}>
                                    <TextField name="name"  value={input} onChange={e => setInput(e.target.value)} variant="standard" label="Your Name:" size="medium" required></TextField>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Select Room</InputLabel>
                                    <Select name="room" value={select} onChange={e => setSelect(e.target.value)} required>
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="js">JavaScript</MenuItem>
                                    <MenuItem value="react">React</MenuItem>
                                    <MenuItem value="ts">TypeScript</MenuItem>
                                    <MenuItem value="react-ts">React-TypeScript</MenuItem>
                                    <MenuItem value="node-express">Node (Express)</MenuItem>
                                    <MenuItem value="node-nest">Node (Nest)</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <Button type="submit" variant="contained" color="primary" className={classes.button}>JOIN ROOM</Button>
                            </div>
                            </FormGroup>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Container>
    )
}

export default Home
