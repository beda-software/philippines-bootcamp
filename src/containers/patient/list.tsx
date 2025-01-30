import { ResourceListPage, navigationAction, questionnaireAction } from "@beda.software/emr/components";
import { SearchBarColumnType } from "@beda.software/emr/dist/components/SearchBar/types";
import { compileAsFirst, formatHumanDate } from "@beda.software/emr/utils";
import { Patient } from "fhir/r4b";

export const getPatientName = compileAsFirst<Patient, string>("Patient.name.given[0] + ' ' + Patient.name.family")

export function PatientList() {
    return (
        <ResourceListPage<Patient>
            headerTitle="Patients"
            resourceType="Patient"
            getTableColumns={() => [
                {
                    title: "Name",
                    key: 'name',
                    render: (_text, { resource }) => {
                        return getPatientName(resource) ?? resource.id
                    },
                },
                {
                    title: "Birthdate",
                    key: 'birthdate',
                    render: (_text, { resource }) => {
                        return formatHumanDate(resource.birthDate)
                    },
                }
            ]}
            getHeaderActions={() => [
                questionnaireAction("Add patient", "patient-create")
            ]}
            getRecordActions={({ resource }) => [
                navigationAction("Details", `${resource.id}`)
            ]}
            getFilters={() => [
                {
                    id: 'name',
                    searchParam: 'name',
                    type: SearchBarColumnType.STRING,
                    placeholder: 'Find by name',
                },
            ]}
        />
    );
}
