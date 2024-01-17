import React from 'react';


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const BugDataTable = ({ bugs, onEdit, onDelete, statusBodyTemplate }) => {


    //datatable for bugs, can be sorted by id, severity or priority
    return (
        <div className="datatable-responsive">
            <DataTable value={bugs}
                paginator
                rows={10}
                rowsPerPageOptions={[10, 20, 50]}>
                <Column field="bugID" header="Bug ID" sortable />
                <Column field="title" header="Title" />
                <Column field="description" header="Description" />
                <Column field="severity" header="Severity" sortable />
                <Column field="priority" header="Priority" sortable />
                <Column field="commitLink" header="Commit Link" />
                <Column field="status" header="Status " body={statusBodyTemplate} />
                <Column
                    header="Actions"
                    body={(rowData) => (
                        <div>
                            {/* Edit Button */}
                            <Button
                                icon="pi pi-pencil"
                                className="p-button-rounded p-button-success"
                                onClick={() => onEdit(rowData)}
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
            </DataTable>
        </div>
    );

}

export default BugDataTable