import React from 'react';


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const BugDataTable = ({ bugs }) => {

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
            </DataTable>
        </div>
    );

}

export default BugDataTable