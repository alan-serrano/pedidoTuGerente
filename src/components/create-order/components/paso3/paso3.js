import React from 'react'

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import styles from 'components/create-order/create-order-styles';
import { makeStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(styles);

function Paso3(props) {
  const classes = useStyles();

  const {
    selectedDate, setSelectedDate,
    paymentMethod, setPaymentMethod,
    paymentSecondaryMethod, setPaymentSecondaryMethod,
    switches, setSwitches
  } = props

  const paymentMethods = [
    {name: 'tarjeta', id: 0, acceptSecondary: true},
    {name: 'efectivo', id: 1, acceptSecondary: true},
    {name: 'cheque', id: 2, acceptSecondary: true},
    {name: 'transferencia', id: 3, acceptSecondary: true},
  ]
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const handleSwitchChange = (event) => {
    setSwitches({ ...switches, [event.target.name]: event.target.checked });
  };


  console.log(paymentMethod)

  return (
    <div className={classes.paso}>
      <Grid container spacing={2} style={{maxWidth: '1080px', margin: '0 auto'}} justify='center'>
        <Grid item xs={12} md={6} direction="column" style={{display: 'flex'}}>
          <FormControl className={classes.formControl}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="¿Cuándo entregarás el pedido?"
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                variant="outline"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={switches.delivered} onChange={handleSwitchChange} name="delivered" />}
                label="¿Ya fue entregado el pedido?"
              />
              {switches.delivered && <>
                <FormControlLabel
                  control={<Switch checked={switches.secondary} onChange={handleSwitchChange} name="secondary" />}
                  label="¿Método de pago secundario?"
                />
                <FormControlLabel
                  control={<Switch checked={switches.invoice} onChange={handleSwitchChange} name="invoice" />}
                  label="¿Deseas Facturarlo?"
                />
              </>}
            </FormGroup>
          </FormControl>
    
          {switches.invoice && <>
            <FormControl className={classes.formControl}>
              <TextField
                required
                id="facturaField"
                label="# Factura"
                placeholder="Escribe el número de la factura"
                variant="outlined"
                inputProps={{
                  type: 'number'
                }}
              />
            </FormControl>
          </>}
    
          <FormControl className={classes.formControl}>
            <TextField
              required
              id="sellerField"
              label="¿Quién es el vendedor?"
              placeholder="Escribe el nombre del vendedor"
              variant="outlined"
            />
          </FormControl>
    
          <FormControl className={classes.formControl}>
            <TextField
              id="commentField"
              label="Comentarios"
              placeholder="Comentarios"
              rows={4}
              multiline
              variant="outlined"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} direction="column" style={{display: 'flex'}}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="payment-method-label">¿Cuál es el método de pago?</InputLabel>
            <Select
              labelId="payment-method-label"
              id="payment-method"
              value={paymentMethod}
              onChange={(event)=> setPaymentMethod(event.target.value)}
              label="¿Cuál es el método de pago?"
            >
              {
                paymentMethods.map((method, index)=> (
                  <MenuItem value={index}>
                    {method.name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
          
          {switches.secondary && <>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="payment-secondary-method-label">¿Cuál es el método de pago secundario?</InputLabel>
              <Select
                labelId="payment-secondary-method-label"
                id="payment-secondary-method"
                value={paymentSecondaryMethod || ''}
                onChange={(event) => setPaymentSecondaryMethod(event.target.value)}
                label="¿Cuál es el método de pago secundario?"
              >
                {
                  paymentMethods.map((method, index) => {
                    let isDisabled = false;
                    if (paymentMethod === index) isDisabled = true;
                    return (
                      <MenuItem value={index} disabled={isDisabled}>
                        {method.name}
                      </MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <TextField
                required
                id="monto"
                label="Monto"
                placeholder="Monto Principal"
                variant="outlined"
                inputProps={{
                  type: 'number'
                }}
              />
            </FormControl>
            
            <FormControl className={classes.formControl}>
              <TextField
                required
                id="monto-secundario"
                label="Monto Secundario"
                placeholder="Monto Secundario"
                variant="outlined"
                inputProps={{
                  type: 'number'
                }}
              />
            </FormControl>
          </>}
        </Grid>
      </Grid>
    </div>
  )
}

export default Paso3
