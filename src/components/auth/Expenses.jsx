import React, { useState, useEffect, Fragment } from 'react';
import MaterialTable from '@material-table/core';
import axios from 'axios';
import Swal from 'sweetalert2';

function Expenses(){   
    const [data, setData] = useState([]);  
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const columns = [
        { 
            title: 'Concepto', 
            field: 'concept',                          
            cellStyle: { textAlign: 'left', fontWeight: 'bold', width: '40%' }, 
            headerStyle: { textAlign: 'left' }            
        },
        { title: 'Monto ($)', field: 'amount'},    
        { title: 'Fecha', field: 'date'}
    ];    

    const getTransactionsExpenses = async() => {
        await axios.get('http://localhost:3000/api/transaction/expenses/1')
        .then(response => {
            setData(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }    

    const deleteIncome = async(income) => {
        axios.delete(`http://localhost:3000/api/transaction/delete/${income.id}`)
        .then(response => {
            console.log(response.data); 
            getTransactionsExpenses();
            Toast.fire({
                icon: 'success',
                title: 'Registro eliminado'
            })                    
        }).catch(error => {
            console.log(error);     
            Toast.fire({
                icon: 'error',
                title: 'Error al eliminar registro'
            })                                   
        })        
    }

    useEffect(() => {
        getTransactionsExpenses();
    }, []);

    return(
        <Fragment>
            <div className="col-md-10">                                    
                <div className="mb-4">
                    <MaterialTable                                
                        columns = {columns}     
                        data = {data}  
                        editable={{                            
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataUpdate = [...data];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;
                                        setData([...dataUpdate]);                            
                                        resolve();
                                    }, 1000)
                                }),
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        deleteIncome(oldData);
                                        resolve();
                                    }, 1000)
                                })
                        }}                                 
                        title={
                            <button 
                                className="btn btn-sm btn-success font-weight-bold rounded-circle" 
                                title="Nuevo Egreso"   
                                data-toggle="modal" 
                                data-target="#modalNew"                             
                            >
                                <i class="fas fa-plus"></i>                                
                            </button>
                        }           
                        options={{
                            headerStyle: {
                                backgroundColor: '#fed136',
                                color: '#000',
                                textAlign: 'center',
                                fontWeight: 'bold'
                            },
                            cellStyle: {
                                textAlign: 'center'
                            },
                            actionsColumnIndex: -1
                        }}                                                                                         
                        localization={{                                                                                        
                            pagination: {
                                firstAriaLabel: 'Primera página',
                                firstTooltip: 'Primera página',
                                labelDisplayedRows: '{from}-{to} de {count}',
                                labelRowsPerPage: 'Filas por página:',
                                labelRowsSelect: 'filas',
                                lastAriaLabel: 'Ultima página',
                                lastTooltip: 'Ultima página',
                                nextAriaLabel: 'Pagina siguiente',
                                nextTooltip: 'Pagina siguiente',
                                previousAriaLabel: 'Pagina anterior',
                                previousTooltip: 'Pagina anterior',
                            },                            
                            header: {
                                actions: 'Acciones'
                            },
                            body: {
                                emptyDataSourceMessage: 'No hay información',   
                                editTooltip: 'Editar',
                                deleteTooltip: 'Eliminar',
                                editRow: {                                     
                                    deleteText: '¿Seguro desea eliminar el registro?',
                                    saveTooltip: 'Aceptar',
                                    cancelTooltip: 'Cancelar' 
                                }                                
                            },
                            toolbar: {                                                                
                                addRemoveColumns: 'Agregar o eliminar columnas',
                                exportAriaLabel: 'Exportar',
                                exportName: 'Exportar a CSV',
                                exportTitle: 'Exportar',
                                nRowsSelected: '{0} filas seleccionadas',
                                searchPlaceholder: 'Buscar',
                                searchTooltip: 'Buscar',
                                showColumnsAriaLabel: 'Mostrar columnas',
                                showColumnsTitle: 'Mostrar columnas',
                            },
                        }}          
                    />
                </div>   
            </div>    

            <div className="modal fade" id="modalNew" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-success">
                            <h5 className="modal-title" id="exampleModalLabel">Nuevo Egreso</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form method="PUT">
                                <div class="form-group">
                                    <label for="concept">Concepto</label>
                                    <input
                                        type="text"
                                        id="concept"
                                        class="form-control"                                        
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="amount">Monto ($)</label>
                                    <input                                        
                                        type="number" 
                                        min="0" 
                                        step=".01"
                                        id="amount"
                                        class="form-control"                                        
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="date">Fecha</label>
                                    <input
                                        type="date"
                                        id="date"
                                        class="form-control"                                        
                                    />
                                </div>
                                <button type="button" className="btn btn-primary">
                                    <i class="fas fa-cloud-upload-alt mr-2"></i>
                                    Guardar
                                </button>
                            </form>                            
                        </div>                        
                    </div>
                </div>
            </div>
            
        </Fragment>
    )
}

export default Expenses;