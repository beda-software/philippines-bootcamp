import { Route } from "react-router-dom";
import { PatientList } from "./containers/patient/list";
import { PatientDetails } from "./containers/patient/detail";
import { QuestionnaireList } from "./containers/questionnaire/list";
import { NewQuestionnaire } from "./containers/questionnaire/new";

export const authenticatedRoutes = (
    <>
        <Route path="/patients" element={<PatientList />} />
        <Route path="/patients/:id/*" element={<PatientDetails />} />
        <Route path="/questionnaires" element={<QuestionnaireList />} />
        <Route path="/questionnaires/aidbox-forms-builder/new" element={<NewQuestionnaire />} />
    </>
);
