// generated with @7nohe/openapi-react-query-codegen@1.2.0 

import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { AppRoutesService, InternalService, PostsService } from "../requests/services.gen";
import * as Common from "./common";
/**
* @returns unknown OK
* @throws ApiError
*/
export const useAppRoutesServiceGetSuspense = <TData = Common.AppRoutesServiceGetDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: [Common.useAppRoutesServiceGetKey, ...(queryKey ?? [])], queryFn: () => AppRoutesService.get() as TData, ...options });
/**
* @returns unknown OK
* @throws ApiError
*/
export const useAppRoutesServiceGetHealthSuspense = <TData = Common.AppRoutesServiceGetHealthDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: [Common.useAppRoutesServiceGetHealthKey, ...(queryKey ?? [])], queryFn: () => AppRoutesService.getHealth() as TData, ...options });
/**
* Get post for the current profile.
* @param data The data for the request.
* @param data.postId
* @returns unknown Post entry.
* @throws ApiError
*/
export const usePostsServiceGetApiPostsByPostIdSuspense = <TData = Common.PostsServiceGetApiPostsByPostIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ postId }: {
  postId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: [Common.usePostsServiceGetApiPostsByPostIdKey, ...(queryKey ?? [{ postId }])], queryFn: () => PostsService.getApiPostsByPostId({ postId }) as TData, ...options });
/**
* @returns unknown OK
* @throws ApiError
*/
export const useInternalServiceGetNitroOpenapiJsonSuspense = <TData = Common.InternalServiceGetNitroOpenapiJsonDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: [Common.useInternalServiceGetNitroOpenapiJsonKey, ...(queryKey ?? [])], queryFn: () => InternalService.getNitroOpenapiJson() as TData, ...options });
/**
* @returns unknown OK
* @throws ApiError
*/
export const useInternalServiceGetNitroScalarSuspense = <TData = Common.InternalServiceGetNitroScalarDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: [Common.useInternalServiceGetNitroScalarKey, ...(queryKey ?? [])], queryFn: () => InternalService.getNitroScalar() as TData, ...options });
/**
* @returns unknown OK
* @throws ApiError
*/
export const useInternalServiceGetNitroSwaggerSuspense = <TData = Common.InternalServiceGetNitroSwaggerDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: [Common.useInternalServiceGetNitroSwaggerKey, ...(queryKey ?? [])], queryFn: () => InternalService.getNitroSwagger() as TData, ...options });
