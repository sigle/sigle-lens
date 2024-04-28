// generated with @7nohe/openapi-react-query-codegen@1.2.0 

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AppRoutesService, InternalService, ProfileService } from "../requests/services.gen";
import * as Common from "./common";
/**
* @returns unknown OK
* @throws ApiError
*/
export const useAppRoutesServiceGet = <TData = Common.AppRoutesServiceGetDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: [Common.useAppRoutesServiceGetKey, ...(queryKey ?? [])], queryFn: () => AppRoutesService.get() as TData, ...options });
/**
* @returns unknown OK
* @throws ApiError
*/
export const useAppRoutesServiceGetHealth = <TData = Common.AppRoutesServiceGetHealthDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: [Common.useAppRoutesServiceGetHealthKey, ...(queryKey ?? [])], queryFn: () => AppRoutesService.getHealth() as TData, ...options });
/**
* @returns unknown OK
* @throws ApiError
*/
export const useInternalServiceGetNitroOpenapiJson = <TData = Common.InternalServiceGetNitroOpenapiJsonDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: [Common.useInternalServiceGetNitroOpenapiJsonKey, ...(queryKey ?? [])], queryFn: () => InternalService.getNitroOpenapiJson() as TData, ...options });
/**
* @returns unknown OK
* @throws ApiError
*/
export const useInternalServiceGetNitroScalar = <TData = Common.InternalServiceGetNitroScalarDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: [Common.useInternalServiceGetNitroScalarKey, ...(queryKey ?? [])], queryFn: () => InternalService.getNitroScalar() as TData, ...options });
/**
* @returns unknown OK
* @throws ApiError
*/
export const useInternalServiceGetNitroSwagger = <TData = Common.InternalServiceGetNitroSwaggerDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: [Common.useInternalServiceGetNitroSwaggerKey, ...(queryKey ?? [])], queryFn: () => InternalService.getNitroSwagger() as TData, ...options });
/**
* Upload profile metadata to Arweave.
* @param data The data for the request.
* @param data.requestBody
* @throws ApiError
*/
export const useProfileServicePostProfileUploadMetadata = <TData = Common.ProfileServicePostProfileUploadMetadataMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: { metadata?: { [key: string]: unknown; }; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: { metadata?: { [key: string]: unknown; }; };
}, TContext>({ mutationFn: ({ requestBody }) => ProfileService.postProfileUploadMetadata({ requestBody }) as unknown as Promise<TData>, ...options });
