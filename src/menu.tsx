import { MenuLayoutValue } from "@beda.software/emr/dist/components/BaseLayout/Sidebar/SidebarTop/context";
import { PatientsIcon, QuestionnairesIcon } from "@beda.software/emr/icons";

export const menuLayout: MenuLayoutValue = () => {
    return [
        { label: 'Patients', path: '/patients', icon: <PatientsIcon /> },
        { label: 'Questionnaires', path: '/questionnaires', icon: <QuestionnairesIcon /> },
    ];
}
