import React from 'react';
import Services from 'services';
import styles from 'components/create-order/create-order-styles';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(styles);

function Paso1(props) {
  const classes = useStyles();
  const {
    clients, setClients,
    client, setClient,
    needEmail, setNeedEmail,
    email, setEmail
  } = props

  const handleSwitchChange = (event) => {
    setNeedEmail(event.target.checked);
  };

  React.useEffect(function getDataClients() {
    Services.getClients().then((res) => {
      setClients(res);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.paso} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <Container  maxWidth="xs" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <FormControl required className={classes.formControl}>
          <Autocomplete
            options={clients}
            id="controlled-demo"
            value = {client}
            getOptionLabel = {option => typeof option === 'string' ? option : option.clientName}
            onChange={(event, newValue) => {
              setClient(newValue);
            }}
            renderInput={(params) => {
              return <TextField {...params} label="¿A quién le venderás?" variant="outlined" margin="normal" />
            }}
          />
        </FormControl>
  
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={needEmail} onChange={handleSwitchChange} name="delivered" />}
              label="¿Desea enviar su pedido o factura o mail?"
            />
          </FormGroup>
        </FormControl>
        
        {needEmail &&
          <FormControl className={classes.formControl}>
            <TextField placeholder="Escribe el mail del cliente" value={email} variant="outlined"
              onChange={event => setEmail(event.target.value)}  
            />
          </FormControl>
        }
      </Container>
    </div>
  )
}

export default Paso1
