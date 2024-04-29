"use client";

import { useEffect } from "react";
import { useAccessToken } from "@lens-protocol/react-web";

export const OpenAPIInterceptor = () => {
  const accessToken = useAccessToken();

  useEffect(() => {
    console.log("accessToken", accessToken);
  }, [accessToken]);

  return null;
};
