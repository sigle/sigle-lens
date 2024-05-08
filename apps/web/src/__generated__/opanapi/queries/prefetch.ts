// generated with @7nohe/openapi-react-query-codegen@1.3.0 

import { type QueryClient } from "@tanstack/react-query";
import { AppRoutesService, InternalService, PostsService } from "../requests/services.gen";
import * as Common from "./common";
/**
* @returns unknown OK
* @throws ApiError
*/
export const prefetchUseAppRoutesServiceGet = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: [Common.useAppRoutesServiceGetKey, []], queryFn: () => AppRoutesService.get() });
/**
* @returns unknown OK
* @throws ApiError
*/
export const prefetchUseAppRoutesServiceGetHealth = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: [Common.useAppRoutesServiceGetHealthKey, []], queryFn: () => AppRoutesService.getHealth() });
/**
* Get post for the current profile.
* @param data The data for the request.
* @param data.postId
* @returns unknown Post entry.
* @throws ApiError
*/
export const prefetchUsePostsServiceGetApiPostsByPostId = (queryClient: QueryClient, { postId }: {
  postId: string;
}) => queryClient.prefetchQuery({ queryKey: [Common.usePostsServiceGetApiPostsByPostIdKey, [{ postId }]], queryFn: () => PostsService.getApiPostsByPostId({ postId }) });
/**
* Get posts for the current profile.
* @returns unknown Posts list.
* @throws ApiError
*/
export const prefetchUsePostsServiceGetApiPostsList = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: [Common.usePostsServiceGetApiPostsListKey, []], queryFn: () => PostsService.getApiPostsList() });
/**
* @returns unknown OK
* @throws ApiError
*/
export const prefetchUseInternalServiceGetNitroOpenapiJson = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: [Common.useInternalServiceGetNitroOpenapiJsonKey, []], queryFn: () => InternalService.getNitroOpenapiJson() });
/**
* @returns unknown OK
* @throws ApiError
*/
export const prefetchUseInternalServiceGetNitroScalar = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: [Common.useInternalServiceGetNitroScalarKey, []], queryFn: () => InternalService.getNitroScalar() });
/**
* @returns unknown OK
* @throws ApiError
*/
export const prefetchUseInternalServiceGetNitroSwagger = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: [Common.useInternalServiceGetNitroSwaggerKey, []], queryFn: () => InternalService.getNitroSwagger() });
