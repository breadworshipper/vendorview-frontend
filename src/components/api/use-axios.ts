"use client";

import baseAxios from "@/components/api/axios";
import { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

interface UseAxiosInterface<T> {
  fetchOnRender?: boolean;
  isAuthorized?: boolean;
  method: "get" | "post" | "delete" | "put" | "patch";
  url: string;
  body?: Object;
  config?: AxiosRequestConfig;
  callback: {
    onSuccess: (data: T) => void;
    onError: (error: unknown) => void;
  };
  dependencies?: any[];
}

const useAxios = <T>({
  method,
  url,
  body,
  config,
  callback,
  fetchOnRender = false,
  isAuthorized = false,
  dependencies = [],
}: UseAxiosInterface<T>) => {
  const [doFetch, setDoFetch] = useState<boolean>(fetchOnRender);
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const tryToFetch = async () => {
    const isAuthorizedHeaders = {
      ...config?.headers,
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    let response: any;
    if (method === "get" || method === "delete") {
      response = await baseAxios[method](url, {
        ...body,
        ...config,
        ...(isAuthorized && isAuthorizedHeaders),
      });
    } else {
      response = await baseAxios[method](url, body, {
        ...config,
        ...(isAuthorized && isAuthorizedHeaders),
      });
    }

    const { responseCode, responseMessage, responseStatus, ...data } = response;
    setData(data);
    callback.onSuccess(response.data!);
  };

  const refreshToken = async () => {
    const response = await baseAxios.get("/auth/login", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    localStorage.setItem("accessToken", response.data.accessToken);
    tryToFetch();
  };

  useEffect(() => {
    if (doFetch || dependencies.length > 0) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          await tryToFetch();
        } catch (err) {
          if (err instanceof AxiosError && err.response?.status === 401) {
            try {
              await refreshToken();
            } catch (err) {
              setIsError(true);
              callback.onError(err);
            }
          } else {
            setIsError(true);
            callback.onError(err);
          }
        } finally {
          setIsLoading(false);
          setDoFetch(false);
        }
      };

      fetchData();
    }
  }, [doFetch, ...dependencies]);

  return { data, isLoading, isError, setDoFetch };
};

export default useAxios;
