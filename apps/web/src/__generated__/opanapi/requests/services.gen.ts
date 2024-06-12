// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';
import type { GetApiPostsByPostIdData, GetApiPostsByPostIdResponse, GetApiPostsListData, GetApiPostsListResponse, GetApiProfileResponse, GetHealthResponse, GetNitroOpenapiJsonResponse, GetNitroScalarResponse, GetNitroSwaggerResponse, GetResponse, PostApiPostsByPostIdDeleteData, PostApiPostsByPostIdDeleteResponse, PostApiPostsByPostIdUpdateData, PostApiPostsByPostIdUpdateResponse, PostApiPostsByPostIdUploadMediaData, PostApiPostsByPostIdUploadMediaResponse, PostApiPostsByPostIdUploadMetadataData, PostApiPostsByPostIdUploadMetadataResponse, PostApiPostsCreateResponse, PostApiProfileUploadAvatarData, PostApiProfileUploadAvatarResponse, PostApiProfileUploadCoverData, PostApiProfileUploadCoverResponse, PostApiProfileUploadMetadataData, PostApiProfileUploadMetadataResponse } from './types.gen';

export class AppRoutesService {
    /**
     * @returns unknown OK
     * @throws ApiError
     */
    public static get(): CancelablePromise<GetResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: ''
        });
    }
    
    /**
     * @returns unknown OK
     * @throws ApiError
     */
    public static getHealth(): CancelablePromise<GetHealthResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/health'
        });
    }
    
}

export class PostsService {
    /**
     * Get post for the current profile.
     * @param data The data for the request.
     * @param data.postId
     * @returns unknown Post entry.
     * @throws ApiError
     */
    public static getApiPostsByPostId(data: GetApiPostsByPostIdData): CancelablePromise<GetApiPostsByPostIdResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/posts/{postId}',
            path: {
                postId: data.postId
            }
        });
    }
    
    /**
     * Delete the post for the current profile.
     * @param data The data for the request.
     * @param data.postId
     * @returns unknown OK
     * @throws ApiError
     */
    public static postApiPostsByPostIdDelete(data: PostApiPostsByPostIdDeleteData): CancelablePromise<PostApiPostsByPostIdDeleteResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/posts/{postId}/delete',
            path: {
                postId: data.postId
            }
        });
    }
    
    /**
     * Update the post for the current profile.
     * @param data The data for the request.
     * @param data.postId
     * @param data.requestBody
     * @returns unknown Post updated.
     * @throws ApiError
     */
    public static postApiPostsByPostIdUpdate(data: PostApiPostsByPostIdUpdateData): CancelablePromise<PostApiPostsByPostIdUpdateResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/posts/{postId}/update',
            path: {
                postId: data.postId
            },
            body: data.requestBody,
            mediaType: 'undefined'
        });
    }
    
    /**
     * Upload media for a post.
     * @param data The data for the request.
     * @param data.postId
     * @param data.requestBody
     * @returns unknown Metadata uploaded
     * @throws ApiError
     */
    public static postApiPostsByPostIdUploadMedia(data: PostApiPostsByPostIdUploadMediaData): CancelablePromise<PostApiPostsByPostIdUploadMediaResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/posts/{postId}/upload-media',
            path: {
                postId: data.postId
            },
            body: data.requestBody,
            mediaType: 'undefined'
        });
    }
    
    /**
     * Upload post metadata to Arweave.
     * @param data The data for the request.
     * @param data.postId
     * @param data.requestBody
     * @returns unknown Metadata uploaded.
     * @throws ApiError
     */
    public static postApiPostsByPostIdUploadMetadata(data: PostApiPostsByPostIdUploadMetadataData): CancelablePromise<PostApiPostsByPostIdUploadMetadataResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/posts/{postId}/upload-metadata',
            path: {
                postId: data.postId
            },
            body: data.requestBody,
            mediaType: 'undefined'
        });
    }
    
    /**
     * Create a new post for the current profile.
     * @returns unknown Post created.
     * @throws ApiError
     */
    public static postApiPostsCreate(): CancelablePromise<PostApiPostsCreateResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/posts/create'
        });
    }
    
    /**
     * Get posts for the current profile.
     * @param data The data for the request.
     * @param data.limit Limit the number of posts returned.
     * @returns unknown Posts list.
     * @throws ApiError
     */
    public static getApiPostsList(data: GetApiPostsListData = {}): CancelablePromise<GetApiPostsListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/posts/list',
            query: {
                limit: data.limit
            }
        });
    }
    
}

export class ProfileService {
    /**
     * Return the current user profile.
     * @returns unknown User Profile
     * @throws ApiError
     */
    public static getApiProfile(): CancelablePromise<GetApiProfileResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile'
        });
    }
    
    /**
     * Upload avatar for a profile.
     * @param data The data for the request.
     * @param data.requestBody
     * @returns unknown Metadata uploaded
     * @throws ApiError
     */
    public static postApiProfileUploadAvatar(data: PostApiProfileUploadAvatarData): CancelablePromise<PostApiProfileUploadAvatarResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/profile/upload-avatar',
            body: data.requestBody,
            mediaType: 'undefined'
        });
    }
    
    /**
     * Upload cover for a profile.
     * @param data The data for the request.
     * @param data.requestBody
     * @returns unknown Metadata uploaded
     * @throws ApiError
     */
    public static postApiProfileUploadCover(data: PostApiProfileUploadCoverData): CancelablePromise<PostApiProfileUploadCoverResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/profile/upload-cover',
            body: data.requestBody,
            mediaType: 'undefined'
        });
    }
    
    /**
     * Upload profile metadata to Arweave.
     * @param data The data for the request.
     * @param data.requestBody
     * @returns unknown Metadata uploaded
     * @throws ApiError
     */
    public static postApiProfileUploadMetadata(data: PostApiProfileUploadMetadataData): CancelablePromise<PostApiProfileUploadMetadataResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/profile/upload-metadata',
            body: data.requestBody,
            mediaType: 'undefined'
        });
    }
    
}

export class InternalService {
    /**
     * @returns unknown OK
     * @throws ApiError
     */
    public static getNitroOpenapiJson(): CancelablePromise<GetNitroOpenapiJsonResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/_nitro/openapi.json'
        });
    }
    
    /**
     * @returns unknown OK
     * @throws ApiError
     */
    public static getNitroScalar(): CancelablePromise<GetNitroScalarResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/_nitro/scalar'
        });
    }
    
    /**
     * @returns unknown OK
     * @throws ApiError
     */
    public static getNitroSwagger(): CancelablePromise<GetNitroSwaggerResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/_nitro/swagger'
        });
    }
    
}