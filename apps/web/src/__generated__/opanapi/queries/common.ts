// generated with @7nohe/openapi-react-query-codegen@1.2.0 

import { UseQueryResult } from "@tanstack/react-query";
import { AppRoutesService, InternalService, ProfileService } from "../requests/services.gen";
export type AppRoutesServiceGetDefaultResponse = Awaited<ReturnType<typeof AppRoutesService.get>>;
export type AppRoutesServiceGetQueryResult<TData = AppRoutesServiceGetDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useAppRoutesServiceGetKey = "AppRoutesServiceGet";
export type AppRoutesServiceGetHealthDefaultResponse = Awaited<ReturnType<typeof AppRoutesService.getHealth>>;
export type AppRoutesServiceGetHealthQueryResult<TData = AppRoutesServiceGetHealthDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useAppRoutesServiceGetHealthKey = "AppRoutesServiceGetHealth";
export type InternalServiceGetNitroOpenapiJsonDefaultResponse = Awaited<ReturnType<typeof InternalService.getNitroOpenapiJson>>;
export type InternalServiceGetNitroOpenapiJsonQueryResult<TData = InternalServiceGetNitroOpenapiJsonDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useInternalServiceGetNitroOpenapiJsonKey = "InternalServiceGetNitroOpenapiJson";
export type InternalServiceGetNitroScalarDefaultResponse = Awaited<ReturnType<typeof InternalService.getNitroScalar>>;
export type InternalServiceGetNitroScalarQueryResult<TData = InternalServiceGetNitroScalarDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useInternalServiceGetNitroScalarKey = "InternalServiceGetNitroScalar";
export type InternalServiceGetNitroSwaggerDefaultResponse = Awaited<ReturnType<typeof InternalService.getNitroSwagger>>;
export type InternalServiceGetNitroSwaggerQueryResult<TData = InternalServiceGetNitroSwaggerDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useInternalServiceGetNitroSwaggerKey = "InternalServiceGetNitroSwagger";
export type ProfileServicePostApiProfileUploadMetadataMutationResult = Awaited<ReturnType<typeof ProfileService.postApiProfileUploadMetadata>>;
