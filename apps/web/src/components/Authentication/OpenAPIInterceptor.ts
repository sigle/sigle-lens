"use client";

import { OpenAPI } from "@/__generated__/opanapi/requests";
import { useAccessToken } from "@lens-protocol/react-web";
import { useEffect } from "react";

export const OpenAPIInterceptor = () => {
  const accessToken = useAccessToken();

  useEffect(() => {
    const doSomethingWithRequest = (request: RequestInit) => {
      const isMultiPartRequest = request.body
        ? request.body instanceof FormData
        : false;

      request.headers = {
        ...request.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      // For file uploads to work we need to remove the Content-Type header
      if (isMultiPartRequest) {
        delete (request.headers as any)["Content-Type"];
      }
      return request;
    };

    OpenAPI.interceptors.request.use(doSomethingWithRequest);
    return () => OpenAPI.interceptors.request.eject(doSomethingWithRequest);
  }, [accessToken]);

  return null;
};
