import React, { useState, useEffect, Fragment } from 'react';
import MaterialTable from '@material-table/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import useAuth from '../../hooks/useAuth';
import { URL_TRANSACTION } from '../../utils/constants';

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
    { 
        title: 'Monto ($)', 
        field: 'amount'
    },    
    { 
        title: 'Fecha', 
        field: 'date',        
        render: rowData => moment.utc(rowData.date).format('DD/MM/YYYY')
    }
];

function Expenses(){   
    const [data, setData] = useState([]); 

    const { user } = useAuth();

    const [transaction, setTransaction] = useState({
        concept: null,
        amount: null,
        date: null,
        userId: user.id,
        typeId: 2
    });            

    const [errorConcept, setErrorConcept] = useState();
    const [errorAmount, setErrorAmount] = useState();
    const [errorDate, setErrorDate] = useState();             

    const getTransactionsExpenses = async() => {
        await axios.get(URL_TRANSACTION + `/expenses/${user.id}`)
        .then(response => {
            setData(response.data);            
        }).catch(error => {
            console.log(error);
        })
    }    

    const deleteIncome = async(income) => {
        axios.delete(URL_TRANSACTION + `/delete/${income.id}`)
        .then(response => {            
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

    const handleChange = (e) => {
        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault(); 
        
        setErrorConcept();
        setErrorAmount();
        setErrorDate();        

        await axios.post(URL_TRANSACTION, transaction)
        .then(response => {
            setTransaction({
                concept: null,
                amount: null,
                date: null,
                userId: user.id,
                typeId: 1
            })        
            getTransactionsExpenses();            
            clearTransaction();
            Toast.fire({
                icon: 'success',
                title: 'Registro guardado'
            })                                      
        }).catch(error => {                       
            let errorsBack = error.response.data.errors;    
            for(let i = 0; i < errorsBack.length; i++){                
                if(errorsBack[i].path === "concept"){                    
                    setErrorConcept(errorsBack[i].message);                                    
                }
                if(errorsBack[i].path === "amount"){
                    setErrorAmount(errorsBack[i].message);                    
                }
                if(errorsBack[i].path === "date"){
                    setErrorDate(errorsBack[i].message);                    
                }
            }            
        })
    }

    const updateTransaction = async(transactionUpdate) => {          
        await axios.put(URL_TRANSACTION+ `/update/${transactionUpdate.id}`, transactionUpdate)
        .then(response => {                        
            getTransactionsExpenses();            
            clearTransaction();
            Toast.fire({
                icon: 'success',
                title: 'Registro actualizado'
            })                                      
        }).catch(error => {            
            console.log(error.response.data.errors);                
        })
    }

    const clearTransaction = () => {
        let inputConcept = document.getElementById("concept");    
        let inputAmount = document.getElementById("amount");
        let inputDate = document.getElementById("date");

        inputConcept.value = '';
        inputAmount.value = '';
        inputDate.value = '';        
    }

    useEffect(() => {
        getTransactionsExpenses();
    }, []);

    return(
        <Fragment>
            <div className="col-md-10">                                    
                <div className="my-4">
                    <form className="mb-2" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="col-md-3">
                                <input
                                    type="text"
                                    id="concept"
                                    class={errorConcept ? "form-control is-invalid" : "form-control"}
                                    placeholder="Concepto"
                                    name="concept"                                       
                                    onBlur={handleChange}
                                />                                                                
                                <div className={errorConcept ? "invalid-feedback" : "d-none"}>
                                    {errorConcept}
                                </div>
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="text"                                     
                                    id="amount"
                                    class={errorAmount ? "form-control is-invalid" : "form-control"}
                                    placeholder="Monto ($)"
                                    name="amount"
                                    onBlur={handleChange}
                                />
                                <div className={errorAmount ? "invalid-feedback" : "d-none"}>
                                    {errorAmount}
                                </div>
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="date"
                                    id="date"
                                    class={errorDate ? "form-control is-invalid" : "form-control"}
                                    placeholder="Fecha"
                                    name="date"                                       
                                    onBlur={handleChange}
                                />
                                <div className={errorDate ? "invalid-feedback" : "d-none"}>
                                    {errorDate}
                                </div>
                            </div>
                            <div className="col-md-3">
                                <button type="submit" className="btn btn-success col-12">
                                    <i className="fas fa-cloud-upload-alt mr-2"></i>
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </form>
                    <MaterialTable                                
                        columns = {columns}     
                        data = {data}  
                        editable={{                            
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {                                                                                
                                        updateTransaction(newData);
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
                        title="EGRESOS"      
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
        </Fragment>
    )
}

export default Expenses;