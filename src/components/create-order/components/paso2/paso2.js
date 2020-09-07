import React, {useEffect} from 'react';
import Services from 'services';
import styles from 'components/create-order/create-order-styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {MTableBody} from 'material-table';

import MaterialTable from 'material-table';
import {MTIcons, MTLocalization} from 'lib/material-table';

const useStyles = makeStyles(styles);

function Paso2(props) {
  const classes = useStyles();
  const {
    warehouses, setWarehouses,
    warehouse, setWarehouse,
    products, setProducts,
    columns, setColumns,
    data, setData,
    total, setTotal
  } = props;

  function summarize(data) {
    return data.reduce((acc, product)=>{
      acc = acc + product.total;
      return acc;
    }, 0)
  }

  useEffect(function gettingData() {
    Services.getProducts().then((products)=> setProducts(products));
    Services.getWarehouses().then((warehouses)=> setWarehouses(warehouses));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(function settingColumns() {
    setColumns([
      { title: 'Código', field: 'id', editable: 'never'},
      { title: 'Producto/Servicio', field: 'name',  
        editComponent: props => {
          const hashProductNamesToKey = products.reduce((acc, product, index) => {
            acc[product.name] = index;
            return acc;
          }, {});

          return (
            <FormControl required className={classes.formControl}>
            <Select
              displayEmpty
              value={hashProductNamesToKey[props.value] || ''}
              onChange={e => {
                const data = { 
                  ...props.rowData,
                  ...products[e.target.value],
                };

                data.total = Math.round((data.price * data.qty || 0) * 100) / 100;

                props.onRowDataChange(data);
                console.log(data);
              }}
              inputProps={{
                id: `${props.columnDef.name}-select`,
                'aria-label': 'Without label'
              }}
            >
              <MenuItem value="" disabled>
                Elige tu producto
              </MenuItem>
              {products.map((product, index) =>
                <MenuItem value={index} key={index}>{product.name}</MenuItem>
              )}
            </Select>
          </FormControl>
          )
        }
      },
      { title: 'Margen de ganancia', field: 'profitMargin', editable: 'never'},
      { title: 'Stock', field: 'stock', editable: 'never'},
      { title: 'UDM', field: 'udm', editable: 'never'},
      { title: 'Cantidad', field: 'qty', type: 'numeric',
        editComponent: props => {
          return (
            <FormControl required className={classes.formControlCantidad}>
              <TextField required type='number' value={props.value || ''} defaultValue="0"
                inputProps={{ min: "1" }}
                onChange={(e)=> {
                  const data = {
                    ...props.rowData,
                  }
                  data.qty = e.target.value;
                  data.total = Math.round((data.price * data.qty || 0) * 100) / 100;
                  
                  props.onRowDataChange(data);
                }}
              />
            </FormControl>
          )
        }  
      },
      { title: 'Precio', field: 'price', type: 'numeric', editable: 'never'},
      { title: 'Total', field: 'total', type: 'numeric', editable: 'never', initialEditValue: 0}
    ])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length])

  return (
    <div className={classes.paso} style={{marginLeft: '16px', marginRight: '16px'}}>
      
        <FormControl required className={classes.formControl}>
          <Autocomplete
            options={warehouses}
            id="warehouse"
            value={warehouse}
            getOptionLabel={option => typeof option === 'string' ? option : option.name}
            onChange={(event, newValue) => {
              setWarehouse(newValue);
            }}
            renderInput={(params) => {
              return <TextField {...params} label="¿A quién le venderás?" variant="outlined" margin="normal" />
            }}
          />
        </FormControl>
        <MaterialTable
          title="Elige los productos"
          icons={MTIcons}
          data={data}
          columns={columns}
          components={
            {
              Body: props => (<>
                <MTableBody
                  {...props}
                />

                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <p><strong style={{fontSize: '1.5em'}}>Total: {Math.round(total * 100)/100} Bs</strong></p>
                </div>
              </>),
            }
          }
          editable = {
            {
              onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const addedData = [...data, newData];

                    setTotal(summarize(addedData));
                    setData(addedData);
                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;

                    setTotal(summarize(dataUpdate));
                    setData([...dataUpdate]);

                    resolve();
                  }, 1000);
                }),
              onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setTotal(summarize(dataDelete));
                    setData([...dataDelete]);

                    resolve();
                  }, 1000);
                })
            }
          }
          localization={MTLocalization}
          options={{
            actionsColumnIndex: -1
          }}
          
        />
    </div>
  )
}

export default Paso2
