import {
  ICredentialType,
  INodeProperties,
  ICredentialDataDecryptedObject,
  IHttpRequestOptions,
} from "n8n-workflow";
import { TripItAuth } from "../util/auth";

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
      displayName: "Username",
      name: "username",
      type: "string",
      default: "",
    },
    {
      displayName: "Password",
      name: "password",
      type: "string",
      typeOptions: {
        password: true,
      },
      default: "",
    },
  ];

  async authenticate(
    credentials: ICredentialDataDecryptedObject,
    requestOptions: IHttpRequestOptions
  ): Promise<IHttpRequestOptions> {
    const auth = new TripItAuth({
      clientId: credentials.clientId as string,
      clientSecret: credentials.clientSecret as string,
      username: credentials.username as string,
      password: credentials.password as string,
    });

    // Get a fresh access token
    const { access_token } = await auth.getAccessToken();

    requestOptions.headers = {
      ...requestOptions.headers,
      Authorization: `Bearer ${access_token}`,
    };
    return requestOptions;
  }
}
