"use client";

import { OpenAPI } from "@/__generated__/opanapi/requests";
import { useAccessToken } from "@lens-protocol/react-web";
import { useEffect } from "react";

export const OpenAPIInterceptor = () => {
  const accessToken = useAccessToken();

  useEffect(() => {
    const doSomethingWithRequest = (request: RequestInit) => {
      request.headers = {
        ...request.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      return request;
    };

    OpenAPI.interceptors.request.use(doSomethingWithRequest);
    return () => OpenAPI.interceptors.request.eject(doSomethingWithRequest);
  }, [accessToken]);

  return null;
};
