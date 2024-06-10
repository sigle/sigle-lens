// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AppRoutesService, InternalService, PostsService, ProfileService } from "../requests/services.gen";
import * as Common from "./common";
/**
* @returns unknown OK
* @throws ApiError
*/
export const useAppRoutesServiceGet = <TData = Common.AppRoutesServiceGetDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAppRoutesServiceGetKeyFn(queryKey), queryFn: () => AppRoutesService.get() as TData, ...options });
/**
* @returns unknown OK
* @throws ApiError
*/
export const useAppRoutesServiceGetHealth = <TData = Common.AppRoutesServiceGetHealthDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAppRoutesServiceGetHealthKeyFn(queryKey), queryFn: () => AppRoutesService.getHealth() as TData, ...options });
/**
* Get post for the current profile.
* @param data The data for the request.
* @param data.postId
* @returns unknown Post entry.
* @throws ApiError
*/
export const usePostsServiceGetApiPostsByPostId = <TData = Common.PostsServiceGetApiPostsByPostIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ postId }: {
  postId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePostsServiceGetApiPostsByPostIdKeyFn({ postId }, queryKey), queryFn: () => PostsService.getApiPostsByPostId({ postId }) as TData, ...options });
/**
* Get posts for the current profile.
* @param data The data for the request.
* @param data.limit Limit the number of posts returned.
* @returns unknown Posts list.
* @throws ApiError
*/
export const usePostsServiceGetApiPostsList = <TData = Common.PostsServiceGetApiPostsListDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit }: {
  limit?: number;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePostsServiceGetApiPostsListKeyFn({ limit }, queryKey), queryFn: () => PostsService.getApiPostsList({ limit }) as TData, ...options });
/**
* @returns unknown OK
* @throws ApiError
*/
export const useInternalServiceGetNitroOpenapiJson = <TData = Common.InternalServiceGetNitroOpenapiJsonDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseInternalServiceGetNitroOpenapiJsonKeyFn(queryKey), queryFn: () => InternalService.getNitroOpenapiJson() as TData, ...options });
/**
* @returns unknown OK
* @throws ApiError
*/
export const useInternalServiceGetNitroScalar = <TData = Common.InternalServiceGetNitroScalarDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseInternalServiceGetNitroScalarKeyFn(queryKey), queryFn: () => InternalService.getNitroScalar() as TData, ...options });
/**
* @returns unknown OK
* @throws ApiError
*/
export const useInternalServiceGetNitroSwagger = <TData = Common.InternalServiceGetNitroSwaggerDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseInternalServiceGetNitroSwaggerKeyFn(queryKey), queryFn: () => InternalService.getNitroSwagger() as TData, ...options });
/**
* Delete the post for the current profile.
* @param data The data for the request.
* @param data.postId
* @returns unknown OK
* @throws ApiError
*/
export const usePostsServicePostApiPostsByPostIdDelete = <TData = Common.PostsServicePostApiPostsByPostIdDeleteMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  postId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  postId: string;
}, TContext>({ mutationFn: ({ postId }) => PostsService.postApiPostsByPostIdDelete({ postId }) as unknown as Promise<TData>, ...options });
/**
* Update the post for the current profile.
* @param data The data for the request.
* @param data.postId
* @param data.requestBody
* @returns unknown Post updated.
* @throws ApiError
*/
export const usePostsServicePostApiPostsByPostIdUpdate = <TData = Common.PostsServicePostApiPostsByPostIdUpdateMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  postId: string;
  requestBody: { title: string; content: string; metaTitle?: string; metaDescription?: string; coverImage?: string; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  postId: string;
  requestBody: { title: string; content: string; metaTitle?: string; metaDescription?: string; coverImage?: string; };
}, TContext>({ mutationFn: ({ postId, requestBody }) => PostsService.postApiPostsByPostIdUpdate({ postId, requestBody }) as unknown as Promise<TData>, ...options });
/**
* Upload media for a post.
* @param data The data for the request.
* @param data.postId
* @param data.requestBody
* @returns unknown Metadata uploaded
* @throws ApiError
*/
export const usePostsServicePostApiPostsByPostIdUploadMedia = <TData = Common.PostsServicePostApiPostsByPostIdUploadMediaMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  postId: string;
  requestBody: { file: Blob | File; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  postId: string;
  requestBody: { file: Blob | File; };
}, TContext>({ mutationFn: ({ postId, requestBody }) => PostsService.postApiPostsByPostIdUploadMedia({ postId, requestBody }) as unknown as Promise<TData>, ...options });
/**
* Upload post metadata to Arweave.
* @param data The data for the request.
* @param data.postId
* @param data.requestBody
* @returns unknown Metadata uploaded.
* @throws ApiError
*/
export const usePostsServicePostApiPostsByPostIdUploadMetadata = <TData = Common.PostsServicePostApiPostsByPostIdUploadMetadataMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  postId: string;
  requestBody: { metadata: { [key: string]: unknown; }; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  postId: string;
  requestBody: { metadata: { [key: string]: unknown; }; };
}, TContext>({ mutationFn: ({ postId, requestBody }) => PostsService.postApiPostsByPostIdUploadMetadata({ postId, requestBody }) as unknown as Promise<TData>, ...options });
/**
* Create a new post for the current profile.
* @returns unknown Post created.
* @throws ApiError
*/
export const usePostsServicePostApiPostsCreate = <TData = Common.PostsServicePostApiPostsCreateMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => PostsService.postApiPostsCreate() as unknown as Promise<TData>, ...options });
/**
* Upload avatar for a profile.
* @param data The data for the request.
* @param data.requestBody
* @returns unknown Metadata uploaded
* @throws ApiError
*/
export const useProfileServicePostApiProfileUploadAvatar = <TData = Common.ProfileServicePostApiProfileUploadAvatarMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: { file: Blob | File; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: { file: Blob | File; };
}, TContext>({ mutationFn: ({ requestBody }) => ProfileService.postApiProfileUploadAvatar({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* Upload cover for a profile.
* @param data The data for the request.
* @param data.requestBody
* @returns unknown Metadata uploaded
* @throws ApiError
*/
export const useProfileServicePostApiProfileUploadCover = <TData = Common.ProfileServicePostApiProfileUploadCoverMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: { file: Blob | File; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: { file: Blob | File; };
}, TContext>({ mutationFn: ({ requestBody }) => ProfileService.postApiProfileUploadCover({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* Upload profile metadata to Arweave.
* @param data The data for the request.
* @param data.requestBody
* @returns unknown Metadata uploaded
* @throws ApiError
*/
export const useProfileServicePostApiProfileUploadMetadata = <TData = Common.ProfileServicePostApiProfileUploadMetadataMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: { metadata?: { [key: string]: unknown; }; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: { metadata?: { [key: string]: unknown; }; };
}, TContext>({ mutationFn: ({ requestBody }) => ProfileService.postApiProfileUploadMetadata({ requestBody }) as unknown as Promise<TData>, ...options });
