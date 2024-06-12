// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { type QueryClient } from "@tanstack/react-query";
import { AppRoutesService, InternalService, PostsService, ProfileService } from "../requests/services.gen";
import * as Common from "./common";
/**
* @returns unknown OK
* @throws ApiError
*/
export const prefetchUseAppRoutesServiceGet = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseAppRoutesServiceGetKeyFn(), queryFn: () => AppRoutesService.get() });
/**
* @returns unknown OK
* @throws ApiError
*/
export const prefetchUseAppRoutesServiceGetHealth = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseAppRoutesServiceGetHealthKeyFn(), queryFn: () => AppRoutesService.getHealth() });
/**
* Get post for the current profile.
* @param data The data for the request.
* @param data.postId
* @returns unknown Post entry.
* @throws ApiError
*/
export const prefetchUsePostsServiceGetApiPostsByPostId = (queryClient: QueryClient, { postId }: {
  postId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePostsServiceGetApiPostsByPostIdKeyFn({ postId }), queryFn: () => PostsService.getApiPostsByPostId({ postId }) });
/**
* Get posts for the current profile.
* @param data The data for the request.
* @param data.limit Limit the number of posts returned.
* @returns unknown Posts list.
* @throws ApiError
*/
export const prefetchUsePostsServiceGetApiPostsList = (queryClient: QueryClient, { limit }: {
  limit?: number;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UsePostsServiceGetApiPostsListKeyFn({ limit }), queryFn: () => PostsService.getApiPostsList({ limit }) });
/**
* Return the current user profile.
* @returns unknown User Profile
* @throws ApiError
*/
export const prefetchUseProfileServiceGetApiProfile = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseProfileServiceGetApiProfileKeyFn(), queryFn: () => ProfileService.getApiProfile() });
/**
* @returns unknown OK
* @throws ApiError
*/
export const prefetchUseInternalServiceGetNitroOpenapiJson = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseInternalServiceGetNitroOpenapiJsonKeyFn(), queryFn: () => InternalService.getNitroOpenapiJson() });
/**
* @returns unknown OK
* @throws ApiError
*/
export const prefetchUseInternalServiceGetNitroScalar = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseInternalServiceGetNitroScalarKeyFn(), queryFn: () => InternalService.getNitroScalar() });
/**
* @returns unknown OK
* @throws ApiError
*/
export const prefetchUseInternalServiceGetNitroSwagger = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseInternalServiceGetNitroSwaggerKeyFn(), queryFn: () => InternalService.getNitroSwagger() });
