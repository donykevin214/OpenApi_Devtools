import type { Schema } from "genson-js";
import { Endpoint, PartType } from "../utils/types";
import {
  OpenApiBuilder,
  ResponsesObject,
  ResponseObject,
  HeadersObject,
  MediaTypeObject,
  ContentObject,
  RequestBodyObject,
  HeaderObject,
  ParameterObject,
  SecuritySchemeObject,
} from "openapi3-ts/oas31";
import { Authentication, AuthType } from "../utils/types";

export const createSecuritySchemeTypes = (auth?: Authentication): SecuritySchemeObject | undefined => {
  if (!auth) return;
  const isBearer = auth.id === AuthType.BEARER;
  const isBasic = auth.id === AuthType.BASIC;
  const isDigest = auth.id === AuthType.DIGEST;
  if (isBearer || isBasic || isDigest) {
    const securitySchemeObject: SecuritySchemeObject = {
      type: auth.type,
      in: auth.in,
      scheme: auth.scheme,
    };
    return securitySchemeObject;
  }
}

export const shouldIncludeRequestBody = (method: string) => {
  return !new Set(["get", "delete", "head"]).has(method.toLowerCase());
};

export const createRequestTypes = (body?: Schema, mostRecentRequest?: unknown) => {
  const mediaTypeObject: MediaTypeObject = {
    schema: body,
    ...(!!mostRecentRequest && { example: mostRecentRequest }),
  };
  const contentObject: ContentObject = {
    "application/json": mediaTypeObject,
  };
  const requestBodyObject: RequestBodyObject = {
    content: contentObject,
  };
  return requestBodyObject;
};

export const createResponseTypes = (
  body: Schema | undefined,
  headers: Schema | undefined,
  statusCode: string,
  mostRecentResponse?: unknown
) => {
  const mediaTypeObject: MediaTypeObject = {
    schema: body,
    ...(!!mostRecentResponse && { example: mostRecentResponse }),
  };
  const contentObject: ContentObject = {
    "application/json": mediaTypeObject,
  };
  const headersObject: HeadersObject = {};

  if (headers && headers.properties) {
    if (headers.properties) {
      Object.entries(headers.properties).forEach(([name, schema]) => {
        const headerObj: HeaderObject = {
          required: false,
          schema,
        };
        headersObject[name] = headerObj;
      });
    }
  }

  const responseObject: ResponseObject = {
    content: contentObject,
    description: "",
    headers: headersObject,
  };
  const responsesObject: ResponsesObject = {
    [statusCode]: responseObject,
  };

  return responsesObject;
};

export const createBuilderAndDocRoot = (
  endpoints: Array<Endpoint>
): OpenApiBuilder => {
  const builder = OpenApiBuilder.create({
    openapi: "3.1.0",
    info: {
      title: "OpenAPI Specification",
      version: "1.0.0",
      description: `A specification generated by [openapi-devtools](https://github.com/AndrewWalsh/openapi-devtools). Contains ${
        endpoints.length
      } endpoint${endpoints.length === 1 ? "" : "s"}.`,
    },
    paths: {},
  });
  return builder;
};

export const createPathParameterTypes = (
  endpoint: Endpoint
): Array<ParameterObject> => {
  const dynamicParts = endpoint.parts.filter(
    ({ type }) => type === PartType.Dynamic
  );
  const parameters: ParameterObject[] = dynamicParts.map(({ part: name }) => ({
    name,
    in: "path",
    required: true,
    schema: {
      type: "string",
    },
  }));
  return parameters;
};

export const createQueryParameterTypes = (
  queryParameters: Schema | undefined
): Array<ParameterObject> => {
  if (!queryParameters?.properties) return [];
  const namesAndSchemas = Object.entries(queryParameters.properties);
  return namesAndSchemas.map(([name, schema]) => {
    const parameterObject: ParameterObject = {
      name,
      in: "query",
      required: false,
      schema,
    };
    return parameterObject;
  });
};

