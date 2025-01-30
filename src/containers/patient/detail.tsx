import { DetailPage } from "@beda.software/emr/dist/uberComponents/DetailPage/index";
import { getPatientName } from "./list";
import { Patient } from "fhir/r4b";
import { PatientOverview } from "@beda.software/emr/dist/containers/PatientDetails/PatientOverviewDynamic/index";
import { PatientDocuments } from "@beda.software/emr/dist/containers/PatientDetails/PatientDocuments/index";
import { PatientDocument } from "@beda.software/emr/dist/containers/PatientDetails/PatientDocument/index";
import { PatientDocumentDetails } from "@beda.software/emr/dist/containers/PatientDetails/PatientDocumentDetails/index";
import { Route } from "react-router-dom";


export function PatientDetails() {
    return (
        <DetailPage<Patient>
            getTitle={({ resource }) => {
                return getPatientName(resource) ?? resource.id!
            }}
            resourceType="Patient"
            getSearchParams={({ id }) => ({ _id: id })}
            basePath="patients"
            tabs={[
                {
                    label: 'Overview',
                    path: '/',
                    component: ({ resource }) => <PatientOverview patient={resource} />
                },
                {
                    label: 'Documents',
                    path: 'documents',
                    component: ({ resource }) => <PatientDocuments patient={resource} />
                }
            ]}
            extraRoutes={({ resource }) => (<>
                <Route
                    path="/documents/new/:questionnaireId"
                    element={<PatientDocument patient={resource} author={resource as any} />}
                />
                <Route
                    path="/documents/:qrId/*"
                    element={<PatientDocumentDetails patient={resource as any} />}
                />
            </>)}
        />
    );
}
