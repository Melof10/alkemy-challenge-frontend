import React, { Fragment } from 'react';
import MaterialTable from '@material-table/core';
import { Link } from 'react-router-dom';

function Home(){

    const columns = [
        { 
            title: 'Concepto',             
            cellStyle: { textAlign: 'left', fontWeight: 'bold', width: '40%' }, 
            headerStyle: { textAlign: 'left' }            
        },
        { title: 'Monto'},    
        { title: 'Fecha'},
        { title: 'Tipo'}
    ];    

    return(
        <Fragment>
            <div className="col-md-10">            
                <div class="row">
                    <div class="col-lg-4 col-12">                        
                        <div class="small-box-footer">
                            <div class="small-box bg-success">
                                <div class="inner">
                                    <h3>$ 50000</h3>
                                    <p className="font-weight-bold">INGRESO</p>
                                </div>
                                <div class="icon">
                                    <i className="fa fa-arrow-down"/>                                    
                                </div>
                            </div>
                        </div>
                    </div>                    
                    <div class="col-lg-4 col-12">                        
                        <Link to="" class="small-box-footer">
                            <div class="small-box bg-danger">
                                <div class="inner">
                                    <h3>$ 34000</h3>                            
                                    <p className="font-weight-bold">EGRESO</p>
                                </div>
                                <div class="icon">
                                    <i className="fa fa-arrow-up"/>
                                </div>                                                                                                
                            </div>
                        </Link>
                    </div>                    
                    <div class="col-lg-4 col-12">                        
                        <Link to="" class="small-box-footer">
                            <div class="small-box bg-info">
                                <div class="inner">
                                    <h3>$ 16000</h3>
                                    <p className="font-weight-bold">BALANCE</p>
                                </div>
                                <div class="icon">                                    
                                    <i class="fas fa-cash-register"></i>
                                </div>                                                                                            
                            </div>
                        </Link>
                    </div>                                        
                </div>             
                <div className="mb-5">
                    <MaterialTable                                
                        columns = {columns}                                
                        title="ÚLTIMOS 10 REGISTROS"                          
                        options={{
                            headerStyle: {
                                backgroundColor: '#fed136',
                                color: '#FFF',
                                textAlign: 'center',
                                fontWeight: 'bold'
                            },
                            cellStyle: {
                                textAlign: 'center'
                            },
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