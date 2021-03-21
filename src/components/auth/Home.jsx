import React, { useState, useEffect, Fragment } from 'react';
import MaterialTable from '@material-table/core';
import axios from 'axios';

function Home(){

    const [data, setData] = useState([]);
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);

    const columns = [
        { 
            title: 'Concepto',
            field: 'concept',
            cellStyle: { textAlign: 'left', fontWeight: 'bold', width: '40%' }, 
            headerStyle: { textAlign: 'left' }            
        },
        { title: 'Monto ($)', field: 'amount' },    
        { title: 'Fecha', field: 'date' },
        { 
            title: 'Tipo', 
            field: 'type.name'
        }
    ];    

    const getTransactions = async() => {
        await axios.get('http://localhost:3000/api/transaction/all/last/1')
        .then(response => {
            setData(response.data);             
        }).catch(error => {
            console.log(error);
        })        
    }

    const getSumIncome = async() => {
        await axios.get('http://localhost:3000/api/transaction/income/sum/1')
        .then(response => {            
            response.data[0].total_amount ? setIncome(response.data[0].total_amount) : setIncome(0);
        }).catch(error => {                 
            console.log(error);
        })        
    }

    const getSumExpenses = async() => {
        await axios.get('http://localhost:3000/api/transaction/expenses/sum/1')
        .then(response => {
            response.data[0].total_amount ? setExpenses(response.data[0].total_amount) : setExpenses(0);
        }).catch(error => {            
            console.log(error);
        })        
    }

    useEffect(() => {        
        getTransactions(); 
        getSumIncome();
        getSumExpenses();              
    }, [])

    return(
        <Fragment>
            <div className="col-md-10 pt-5">            
                <div class="row">
                    <div class="col-lg-4 col-12">                        
                        <div class="small-box-footer">
                            <div class="small-box bg-success">
                                <div class="inner">
                                    <h3>$ {income}</h3>
                                    <p className="font-weight-bold">INGRESO</p>
                                </div>
                                <div class="icon">
                                    <i className="fa fa-arrow-down"/>                                    
                                </div>
                            </div>
                        </div>
                    </div>                    
                    <div class="col-lg-4 col-12">                        
                        <div to="" class="small-box-footer">
                            <div class="small-box bg-danger">
                                <div class="inner">
                                    <h3>$ {expenses}</h3>                            
                                    <p className="font-weight-bold">EGRESO</p>
                                </div>
                                <div class="icon">
                                    <i className="fa fa-arrow-up"/>
                                </div>                                                                                                
                            </div>
                        </div>
                    </div>                    
                    <div class="col-lg-4 col-12">                        
                        <div to="" class="small-box-footer">
                            <div class="small-box bg-info">
                                <div class="inner">
                                    <h3>$ {income - expenses}</h3>
                                    <p className="font-weight-bold">BALANCE</p>
                                </div>
                                <div class="icon">                                    
                                    <i class="fas fa-cash-register"></i>
                                </div>                                                                                            
                            </div>
                        </div>
                    </div>                                        
                </div>             
                <div className="mb-5">
                    <MaterialTable                                
                        columns={columns}    
                        data={data}                    
                        rowsPerPageOptions={[10]}  
                        title="ÚLTIMOS 10 REGISTROS"                          
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
                            paging: true,
                            pageSize: 10,    
                            pageSizeOptions: [10],  
                            emptyRowsWhenPaging: false,                                                        
                            paginationPosition: false
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
                            body: {
                                emptyDataSourceMessage: 'No hay información'                               
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

export default Home;