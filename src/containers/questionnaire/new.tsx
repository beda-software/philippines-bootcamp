import { Builder } from 'aidbox-forms';
import config from '@beda.software/emr-config/config';
import { S } from '@beda.software/emr/dist/containers/AidboxFormsBuilder/styles';
import { saveFHIRResource } from '@beda.software/emr/services';
import { isSuccess } from '@beda.software/remote-data'
import { useState } from 'react';
import { Questionnaire } from 'fhir/r4b';

export function NewQuestionnaire() {
    const [id, setId] = useState<string|undefined>();
    return (
        <S.Container>
            <S.Content>
                <Builder
                    value={{}}
                    onReady={() => {
                        console.log('Builder ready');
                    }}
                    onChange={async (q:any) => {
                        const response = await saveFHIRResource<Questionnaire>({...q, id} as Questionnaire);
                        if(isSuccess(response)){
                            setId(response.data.id)
                        }
                    }}
                    onSelect={(item) => {
                        console.log('Questionnaire Item selected:', item);
                    }}
                    baseUrl={config.baseURL}
                />
            </S.Content>
        </S.Container>
    )
}
