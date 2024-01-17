import "primereact/resources/themes/lara-dark-pink/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css
import { Dialog } from 'primereact/dialog';
import BugAddForm from "./BugAddForm";
//dialog
//pop up dialog which opens a form for adding a new bug (the form is in BugAddForm)
const BugDialog = ({ visible, onHide, onBugAdded }) => {
    return (
        <Dialog
            header="Add New Bug"
            visible={visible}
            onHide={onHide}
            style={{ width: '50vw' }}
            draggable={false}
        >
            <BugAddForm onBugAdded={onBugAdded} />
        </Dialog>
    );
};

export default BugDialog