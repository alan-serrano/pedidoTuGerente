import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import useStyles from './home-styles';

function Home() {
    const classes = useStyles();
    const history = useHistory();

    function handleClick() {
        history.push('/pedido');
    }

    return (
        <div className={`home-view ${classes.root}`}>
            <Button variant="contained" color="primary" onClick={handleClick}>
                Ir a Vista de Pedido
            </Button>
        </div>
    )
}

export default Home;
