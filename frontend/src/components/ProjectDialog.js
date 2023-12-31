import "primereact/resources/themes/lara-dark-pink/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css
import { Dialog } from 'primereact/dialog';
import ProjectAddForm from "./ProjectAddForm";

const ProjectDialog = ({ visible, onHide, onProjectAdded }) => {
    return (
        <Dialog
            header="Add New Project"
            visible={visible}
            onHide={onHide}
            style={{ width: '50vw' }}
            draggable={false}
        >
            <ProjectAddForm onProjectAdded={onProjectAdded} />
        </Dialog>
    );
};

export default ProjectDialog