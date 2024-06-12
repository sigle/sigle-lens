// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { AppRoutesService, InternalService, PostsService, ProfileService } from "../requests/services.gen";
import * as Common from "./common";
/**
* @returns unknown OK
* @throws ApiError
*/
export const useAppRoutesServiceGetSuspense = <TData = Common.AppRoutesServiceGetDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseAppRoutesServiceGetKeyFn(queryKey), queryFn: () => AppRoutesService.get() as TData, ...options });
/**
* @returns unknown OK
* @throws ApiError
*/
export const useAppRoutesServiceGetHealthSuspense = <TData = Common.AppRoutesServiceGetHealthDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseAppRoutesServiceGetHealthKeyFn(queryKey), queryFn: () => AppRoutesService.getHealth() as TData, ...options });
/**
* Get post for the current profile.
* @param data The data for the request.
* @param data.postId
* @returns unknown Post entry.
* @throws ApiError
*/
export const usePostsServiceGetApiPostsByPostIdSuspense = <TData = Common.PostsServiceGetApiPostsByPostIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ postId }: {
  postId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePostsServiceGetApiPostsByPostIdKeyFn({ postId }, queryKey), queryFn: () => PostsService.getApiPostsByPostId({ postId }) as TData, ...options });
/**
* Get posts for the current profile.
* @param data The data for the request.
* @param data.limit Limit the number of posts returned.
* @returns unknown Posts list.
* @throws ApiError
*/
export const usePostsServiceGetApiPostsListSuspense = <TData = Common.PostsServiceGetApiPostsListDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit }: {
  limit?: number;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePostsServiceGetApiPostsListKeyFn({ limit }, queryKey), queryFn: () => PostsService.getApiPostsList({ limit }) as TData, ...options });
/**
* Return the current user profile.
* @returns unknown User Profile
* @throws ApiError
*/
export const useProfileServiceGetApiProfileSuspense = <TData = Common.ProfileServiceGetApiProfileDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseProfileServiceGetApiProfileKeyFn(queryKey), queryFn: () => ProfileService.getApiProfile() as TData, ...options });
/**
* @returns unknown OK
* @throws ApiError
*/
export const useInternalServiceGetNitroOpenapiJsonSuspense = <TData = Common.InternalServiceGetNitroOpenapiJsonDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseInternalServiceGetNitroOpenapiJsonKeyFn(queryKey), queryFn: () => InternalService.getNitroOpenapiJson() as TData, ...options });
/**
* @returns unknown OK
* @throws ApiError
*/
export const useInternalServiceGetNitroScalarSuspense = <TData = Common.InternalServiceGetNitroScalarDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseInternalServiceGetNitroScalarKeyFn(queryKey), queryFn: () => InternalService.getNitroScalar() as TData, ...options });
/**
* @returns unknown OK
* @throws ApiError
*/
export const useInternalServiceGetNitroSwaggerSuspense = <TData = Common.InternalServiceGetNitroSwaggerDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseInternalServiceGetNitroSwaggerKeyFn(queryKey), queryFn: () => InternalService.getNitroSwagger() as TData, ...options });
