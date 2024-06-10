// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { UseQueryResult } from "@tanstack/react-query";
import { AppRoutesService, InternalService, PostsService, ProfileService } from "../requests/services.gen";
export type AppRoutesServiceGetDefaultResponse = Awaited<ReturnType<typeof AppRoutesService.get>>;
export type AppRoutesServiceGetQueryResult<TData = AppRoutesServiceGetDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useAppRoutesServiceGetKey = "AppRoutesServiceGet";
export const UseAppRoutesServiceGetKeyFn = (queryKey?: Array<unknown>) => [useAppRoutesServiceGetKey, ...(queryKey ?? [])];
export type AppRoutesServiceGetHealthDefaultResponse = Awaited<ReturnType<typeof AppRoutesService.getHealth>>;
export type AppRoutesServiceGetHealthQueryResult<TData = AppRoutesServiceGetHealthDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useAppRoutesServiceGetHealthKey = "AppRoutesServiceGetHealth";
export const UseAppRoutesServiceGetHealthKeyFn = (queryKey?: Array<unknown>) => [useAppRoutesServiceGetHealthKey, ...(queryKey ?? [])];
export type PostsServiceGetApiPostsByPostIdDefaultResponse = Awaited<ReturnType<typeof PostsService.getApiPostsByPostId>>;
export type PostsServiceGetApiPostsByPostIdQueryResult<TData = PostsServiceGetApiPostsByPostIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const usePostsServiceGetApiPostsByPostIdKey = "PostsServiceGetApiPostsByPostId";
export const UsePostsServiceGetApiPostsByPostIdKeyFn = ({ postId }: {
  postId: string;
}, queryKey?: Array<unknown>) => [usePostsServiceGetApiPostsByPostIdKey, ...(queryKey ?? [{ postId }])];
export type PostsServiceGetApiPostsListDefaultResponse = Awaited<ReturnType<typeof PostsService.getApiPostsList>>;
export type PostsServiceGetApiPostsListQueryResult<TData = PostsServiceGetApiPostsListDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const usePostsServiceGetApiPostsListKey = "PostsServiceGetApiPostsList";
export const UsePostsServiceGetApiPostsListKeyFn = ({ limit }: {
  limit?: number;
} = {}, queryKey?: Array<unknown>) => [usePostsServiceGetApiPostsListKey, ...(queryKey ?? [{ limit }])];
export type InternalServiceGetNitroOpenapiJsonDefaultResponse = Awaited<ReturnType<typeof InternalService.getNitroOpenapiJson>>;
export type InternalServiceGetNitroOpenapiJsonQueryResult<TData = InternalServiceGetNitroOpenapiJsonDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useInternalServiceGetNitroOpenapiJsonKey = "InternalServiceGetNitroOpenapiJson";
export const UseInternalServiceGetNitroOpenapiJsonKeyFn = (queryKey?: Array<unknown>) => [useInternalServiceGetNitroOpenapiJsonKey, ...(queryKey ?? [])];
export type InternalServiceGetNitroScalarDefaultResponse = Awaited<ReturnType<typeof InternalService.getNitroScalar>>;
export type InternalServiceGetNitroScalarQueryResult<TData = InternalServiceGetNitroScalarDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useInternalServiceGetNitroScalarKey = "InternalServiceGetNitroScalar";
export const UseInternalServiceGetNitroScalarKeyFn = (queryKey?: Array<unknown>) => [useInternalServiceGetNitroScalarKey, ...(queryKey ?? [])];
export type InternalServiceGetNitroSwaggerDefaultResponse = Awaited<ReturnType<typeof InternalService.getNitroSwagger>>;
export type InternalServiceGetNitroSwaggerQueryResult<TData = InternalServiceGetNitroSwaggerDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useInternalServiceGetNitroSwaggerKey = "InternalServiceGetNitroSwagger";
export const UseInternalServiceGetNitroSwaggerKeyFn = (queryKey?: Array<unknown>) => [useInternalServiceGetNitroSwaggerKey, ...(queryKey ?? [])];
export type PostsServicePostApiPostsByPostIdDeleteMutationResult = Awaited<ReturnType<typeof PostsService.postApiPostsByPostIdDelete>>;
export type PostsServicePostApiPostsByPostIdUpdateMutationResult = Awaited<ReturnType<typeof PostsService.postApiPostsByPostIdUpdate>>;
export type PostsServicePostApiPostsByPostIdUploadMediaMutationResult = Awaited<ReturnType<typeof PostsService.postApiPostsByPostIdUploadMedia>>;
export type PostsServicePostApiPostsByPostIdUploadMetadataMutationResult = Awaited<ReturnType<typeof PostsService.postApiPostsByPostIdUploadMetadata>>;
export type PostsServicePostApiPostsCreateMutationResult = Awaited<ReturnType<typeof PostsService.postApiPostsCreate>>;
export type ProfileServicePostApiProfileUploadAvatarMutationResult = Awaited<ReturnType<typeof ProfileService.postApiProfileUploadAvatar>>;
export type ProfileServicePostApiProfileUploadCoverMutationResult = Awaited<ReturnType<typeof ProfileService.postApiProfileUploadCover>>;
export type ProfileServicePostApiProfileUploadMetadataMutationResult = Awaited<ReturnType<typeof ProfileService.postApiProfileUploadMetadata>>;
