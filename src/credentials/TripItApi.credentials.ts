import {
  ICredentialType,
  INodeProperties,
  ICredentialDataDecryptedObject,
  IHttpRequestOptions,
} from "n8n-workflow";

export class TripItApi implements ICredentialType {
  name = "tripitApi";
  displayName = "TripIt API";
  documentationUrl = "https://www.tripit.com/developer";
  properties: INodeProperties[] = [
    {
      displayName: "Client ID",
      name: "clientId",
      type: "string",
      default: "",
    },
    {
      displayName: "Client Secret",
      name: "clientSecret",
      type: "string",
      typeOptions: {
        password: true,
      },
      default: "",
    },
    {
      displayName: "Access Token",
      name: "accessToken",
      type: "string",
      default: "",
    },
    {
      displayName: "Refresh Token",
      name: "refreshToken",
      type: "string",
      default: "",
    },
  ];

  async authenticate(
    credentials: ICredentialDataDecryptedObject,
    requestOptions: IHttpRequestOptions
  ): Promise<IHttpRequestOptions> {
    const { accessToken } = credentials;
    requestOptions.headers = {
      ...requestOptions.headers,
      Authorization: `Bearer ${accessToken}`,
    };
    return requestOptions;
  }
}
