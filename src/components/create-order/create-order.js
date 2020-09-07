import React from 'react';
import './create-order.scss';
import { makeStyles } from '@material-ui/core';
import styles from './create-order-styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import Paso1 from './components/paso1';
import Paso2 from './components/paso2';
import Paso3 from './components/paso3';

const useStyles = makeStyles(styles)


function getSteps() {
  return ['Selecciona el cliente', 'Selecciona Producto', 'Facturación'];
}

function StepperComponent(props) {
  const classes = useStyles();
  const steps = getSteps();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Stepper activeStep={activeStep} style={{marginTop: '16px'}}>
          {steps.map((label) => 
            <Step key={label}>
              <StepLabel >{label}</StepLabel>
            </Step>
          )}
        </Stepper>
      </Container>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            { activeStep === 0 &&
              <Container maxWidth="md">
                <Paso1 {...props}/>
              </Container>
            }
            { activeStep === 1 &&
              <Paso2 {...props}/>
            }
            { activeStep === 2 &&
              <Paso3 {...props}/>
            }

            <AppBar className={classes.dialogFooter}>
              <Toolbar>
                <Container maxWidth="md" className={classes.dialogFooterContainer}>
                  <Button variant="contained" disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                    Atrás
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Registrar' : 'Siguiente'}
                  </Button>
                </Container>
              </Toolbar>
            </AppBar>
            
          </div>
        )}
      </div>
    </div>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Pedido() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // Step1 variables
  const [clients, setClients] = React.useState([]);
  const [client, setClient] = React.useState();

  const [needEmail, setNeedEmail] = React.useState(false);
  const [email, setEmail] = React.useState('');

  // Step2 variables
  const [warehouses, setWarehouses] = React.useState([]);
  const [warehouse, setWarehouse] = React.useState();
  const [products, setProducts] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  // Step3 variables
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [paymentMethod, setPaymentMethod] = React.useState();
  const [paymentSecondaryMethod, setPaymentSecondaryMethod] = React.useState();
  const [switches, setSwitches] = React.useState({
    delivered: true,
    secondary: false,
    invoice: false,
  });

  const shareData = {
    clients, setClients,
    client, setClient,
    needEmail, setNeedEmail,
    email, setEmail,
    warehouses, setWarehouses,
    warehouse, setWarehouse,
    products, setProducts,
    columns, setColumns,
    data, setData,
    total, setTotal,
    selectedDate, setSelectedDate,
    paymentMethod, setPaymentMethod,
    paymentSecondaryMethod, setPaymentSecondaryMethod,
    switches, setSwitches,
    
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        style={
          {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            flexDirection: 'column'
          }
        }
      >
        <Button variant="contained" color="primary" onClick={handleClickOpen} style={{marginBottom: '8px'}} >
          Nuevo Pedido
        </Button>
        
        <Button variant="contained" color="primary" onClick={handleClickOpen} >
          Home
        </Button>
      </div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Nuevo Pedido
            </Typography>
          </Toolbar>
        </AppBar>
        <StepperComponent {...shareData}/>
      </Dialog>
    </div>
  );
}

export default Pedido