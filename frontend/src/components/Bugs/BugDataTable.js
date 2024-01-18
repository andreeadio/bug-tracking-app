import React from 'react';

import BugEditForm from './BugEditForm'
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useState, useContext } from "react";

const BugDataTable = ({ bugs, onEdit, onDelete, statusBodyTemplate, hideActionsColumn, onUpdate }) => {

    const [selectedBug, setSelectedBug] = useState(null);
    const [displayEditDialog, setDisplayEditDialog] = useState(false);

    const onEditClick = (rowData) => {
        setSelectedBug(rowData);
        setDisplayEditDialog(true);
    };

    const onHideEditDialog = () => {
        setDisplayEditDialog(false);
        setSelectedBug(null);
    };

    //datatable for bugs, can be sorted by id, severity or priority
    return (
        <div className="datatable-responsive">
            <DataTable value={bugs}
                paginator
                rows={10}
                rowsPerPageOptions={[10, 20, 50]}>
                <Column field="bugID" header="Bug ID" sortable />
                <Column field="title" header="Title" />

                <Column field="severity" header="Severity" sortable />
                <Column field="priority" header="Priority" sortable />

                <Column field="status" header="Status " body={statusBodyTemplate} />

                {!hideActionsColumn && (
                    <Column
                        header="Actions"
                        body={(rowData) => (
                            <div>
                                {/* Edit Button */}
                                <Button
                                    icon="pi pi-pencil"
                                    className="p-button-rounded p-button-success"
                                    onClick={() => onEditClick(rowData)}
                                />
                                {/* Delete Button */}
                                <Button
                                    icon="pi pi-trash"
                                    className="p-button-rounded p-button-danger"
                                    onClick={() => onDelete(rowData.bugID)}
                                />
                            </div>
                        )}
                    />
                )}
            </DataTable>

            <Dialog
                header="Edit Bug"
                visible={displayEditDialog}
                onHide={onHideEditDialog}
                modal
                style={{ width: '50vw' }}
            >
                <BugEditForm bug={selectedBug} onClose={onHideEditDialog} onUpdate={onUpdate} />
            </Dialog>
        </div>
    );

}

export default BugDataTable