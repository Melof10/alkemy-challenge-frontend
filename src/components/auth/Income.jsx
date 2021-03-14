import React, { useState, Fragment } from 'react';
import MaterialTable from '@material-table/core';
import { Button, Modal } from 'react-bootstrap';

function Income(){
    const [showNew, setShowNew] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const handleCloseNew = () => setShowNew(false);
    const handleShowNew = () => setShowNew(true); 
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true); 

    const columns = [
        { 
            title: 'Concepto',   
            field: 'concepto',
            cellStyle: { textAlign: 'left', fontWeight: 'bold', width: '40%' }, 
            headerStyle: { textAlign: 'left' }            
        },
        { title: 'Monto', field: 'monto'},    
        { title: 'Fecha', field: 'fecha'}
    ];    

    const data = [
        {
            "concepto": "ventas de autos",
            "monto": "$500",
            "fecha": "18/03/21"            
        },
        {
            "concepto": "ventas de autos",
            "monto": "$500",
            "fecha": "18/03/21"            
        },
        {
            "concepto": "ventas de autos",
            "monto": "$500",
            "fecha": "18/03/21"            
        }
    ]

    return(
        <Fragment>
            <div className="col-md-10">                                    
                <div className="mb-4">
                    <MaterialTable                                
                        columns = {columns}
                        data = {data}                                
                        title={
                            <button 
                                className="btn btn-sm btn-success font-weight-bold rounded-circle" 
                                title="Nuevo Ingreso"
                                onClick={handleShowNew}
                            >
                                <i class="fas fa-plus"></i>                                
                            </button>
                        }    
                        actions={[
                            {
                                icon: 'edit',
                                toolTip: 'Editar ingreso',
                                onClick: () => handleShowUpdate()
                            },
                            {
                                icon: 'delete',
                                toolTip: 'Eliminar ingreso'
                            }
                        ]}               
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

            <Modal show={showUpdate} onHide={handleCloseUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdate}>
                        Close
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>    

            <Modal show={showNew} onHide={handleCloseNew}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal New</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseNew}>
                        Close
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>    

        </Fragment>        
    )
}

export default Income;