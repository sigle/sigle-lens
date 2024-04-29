// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';
import type { $OpenApiTs } from './types.gen';

export class AppRoutesService {
    /**
     * @returns unknown OK
     * @throws ApiError
     */
    public static get(): CancelablePromise<$OpenApiTs['']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: ''
        });
    }
    
    /**
     * @returns unknown OK
     * @throws ApiError
     */
    public static getHealth(): CancelablePromise<$OpenApiTs['/health']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/health'
        });
    }
    
}

export class PostsService {
    /**
     * Create a new post for the current profile.
     * @returns unknown Post created.
     * @throws ApiError
     */
    public static postApiPostsCreate(): CancelablePromise<$OpenApiTs['/api/posts/create']['post']['res'][200]> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/posts/create'
        });
    }
    
}

export class ProfileService {
    /**
     * Upload profile metadata to Arweave.
     * @param data The data for the request.
     * @param data.requestBody
     * @returns unknown Metadata uploaded
     * @throws ApiError
     */
    public static postApiProfileUploadMetadata(data: $OpenApiTs['/api/profile/upload-metadata']['post']['req']): CancelablePromise<$OpenApiTs['/api/profile/upload-metadata']['post']['res'][200]> {
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
    public static getNitroOpenapiJson(): CancelablePromise<$OpenApiTs['/_nitro/openapi.json']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/_nitro/openapi.json'
        });
    }
    
    /**
     * @returns unknown OK
     * @throws ApiError
     */
    public static getNitroScalar(): CancelablePromise<$OpenApiTs['/_nitro/scalar']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/_nitro/scalar'
        });
    }
    
    /**
     * @returns unknown OK
     * @throws ApiError
     */
    public static getNitroSwagger(): CancelablePromise<$OpenApiTs['/_nitro/swagger']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/_nitro/swagger'
        });
    }
    
}