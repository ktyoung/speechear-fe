import axios from "axios";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { jwtTokenState } from "../state/atom";

export interface IRequestType {
  headers?: Object;
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: Object;
}

export interface IResponseType {
  loading: boolean;
  data: any;
  error: any;
}

export const API_URL = process.env.REACT_APP_RESTAPI_URL;

const useAxios = (
  requestConfig: IRequestType | any
): IResponseType | undefined => {
  const token = useRecoilValue(jwtTokenState);

  const localRequestConfig = requestConfig || {
    url: API_URL,
    method: "GET",
    data: {},
  };

  localRequestConfig.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.accessToken}`,
  };

  const [state, setState] = useState<IResponseType>();

  if (!localRequestConfig?.method) {
    localRequestConfig.method = "GET";
  }

  useEffect(() => {
    if (!localRequestConfig.url) {
      setState(
        (prev) =>
          ({
            ...prev,
            loading: false,
            error: new Error("No URL provided!"),
          } as IResponseType)
      );
    } else if (!token) {
      setState(
        (prev) =>
          ({
            ...prev,
            loading: false,
            error: new Error("Invalid Token!"),
          } as IResponseType)
      );
    } else {
      axios(localRequestConfig)
        .then((res) => {
          setState(
            (prev) =>
              ({
                ...prev,
                data: res.data,
              } as IResponseType)
          );
        })
        .catch((err) => {
          setState(
            (prev) =>
              ({
                ...prev,
                error: err,
              } as IResponseType)
          );
        })
        .finally(() => {
          setState(
            (prev) =>
              ({
                ...prev,
                loading: false,
              } as IResponseType)
          );
        });
    }
  }, []);

  return state;
};

export default useAxios;
