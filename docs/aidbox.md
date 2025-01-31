## Aidbox configuration

To run Beda EMR with Aidbox you need to apply some configiraiton to it.

1. Create authentification client:
Go to http://localhost:8080/ui/console#/iam/auth/Client/new
```yaml
auth:
  implicit:
    redirect_uri: http://localhost:3001/auth
first_party: true
grant_types:
  - implicit
resourceType: Client
```
Once it is saved, you will get the id. In this example it is `fd0e702e-dce8-4589-9780-1698272d8d8b`.
2. Set client id in ./contrib/emr-config/config.js

```patch
--- a/contrib/emr-config/config.js
+++ b/contrib/emr-config/config.js
@@ -1,6 +1,6 @@

 const config = {
-    clientId: 'web',
+    clientId: 'fd0e702e-dce8-4589-9780-1698272d8d8b',

     wearablesAccessConsentCodingSystem: 'https://fhir.emr.beda.software/CodeSystem/consent-subject',

@@ -21,4 +21,4 @@ const config = {
     aiAssistantServiceUrl: null,
 };
```

3. Create Organization for Beda EMR.
Go to http://localhost:8080/ui/console#/resources-v2/Organization?__nres=true
Create an organization and copy its id.

4. Create role for your user.
Find a user you would like to allow access to Beda EMR here http://localhost:8080/ui/console#/entities/User and copy its id.

5. Create admin role for this user
Go to http://localhost:8080/ui/console#/iam/access-control/Role/new
```yaml
name: admin
user:
  id: <your user id>
  resourceType: User
links:
  organization:
    id: <organization id>
    resourceType: Organization
resourceType: Role

```

6. Create patient-create questionnaire
Go to  http://localhost:8080/ui/console#/resources-v2/Questionnaire?__nres=true


```json
{
  "title": "Patient info",
  "id": "patient-create",
  "status": "draft",
  "url": "http://forms.aidbox.io/questionnaire/patient-info-q",
  "meta": {
    "extension": [
      {
        "url": "https://fhir.aidbox.app/fhir/StructureDefinition/created-at",
        "valueInstant": "2024-08-13T10:43:11.588138Z"
      },
      {
        "url": "ex:createdAt",
        "valueInstant": "2024-08-13T11:30:29.542773Z"
      }
    ],
    "lastUpdated": "2024-08-13T11:30:44.897987Z",
    "versionId": "7181"
  },
  "resourceType": "Questionnaire",
  "item": [
    {
      "item": [
        {
          "text": "Family",
          "type": "string",
          "linkId": "yJbcSamj",
          "definition": "Patient.name.family"
        },
        {
          "text": "Given",
          "type": "string",
          "linkId": "s3mUJBd0",
          "definition": "Patient.name.given"
        },
        {
          "text": "Birthdate",
          "type": "date",
          "linkId": "mMkI03mi",
          "definition": "Patient.birthDate"
        }
      ],
      "text": "Patient info",
      "type": "group",
      "linkId": "J7OYIFMA",
      "extension": [
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-itemExtractionContext",
          "valueExpression": {
            "language": "application/x-fhir-query",
            "expression": "Patient/{%resource.subject.id}"
          }
        }
      ]
    }
  ]
}
```
