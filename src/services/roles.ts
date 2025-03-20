import { Role, User } from "@beda.software/aidbox-types"
import { defaultPopulateUserInfoSharedState } from '@beda.software/emr/dist/containers/App/utils';
import { createFHIRResource } from "@beda.software/emr/services";
import { isSuccess } from "@beda.software/remote-data";
import { Organization } from "fhir/r4b";
import { createFHIRResource as createAidboxResource } from 'aidbox-react/lib/services/fhir';

export async function populateUserInfoSharedState(user: User) {
    if (typeof user.role === 'undefined') {
        const organizationResponse = await createFHIRResource<Organization>({
            resourceType: 'Organization',
            name: 'Beda EMR',
            id: 'beda-emr'
        }, { _id: 'beda -emr' });
        if (isSuccess(organizationResponse)) {
            const organization = organizationResponse.data
            console.log(organization);
            const role = await createAidboxResource<Role>({
                resourceType: 'Role',
                user: {
                    resourceType: 'User',
                    id: user.id!
                },
                name: 'admin',
                links: {
                    organization: {
                        resourceType: 'Organization',
                        id: organization.id!,
                    }
                }
            });
            if(isSuccess(role)){
                window.location.reload();
            }
        }
    }
    return await defaultPopulateUserInfoSharedState(user)
}
