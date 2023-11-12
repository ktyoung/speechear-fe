import axios from "axios";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { jwtTokenState } from "@states/index";

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

const useAxios = (requestConfig: IRequestType | any) => {
  const [state, setState] = useState<IResponseType>({
    loading: true,
    data: null,
    error: null,
  });
  const [trigger, setTrigger] = useState(0);
  const fetchData = () => {
    setState({
      ...state,
      loading: true,
    });
    setTrigger(Date.now());
  };

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

  if (!localRequestConfig?.method) {
    localRequestConfig.method = "GET";
  }

  useEffect(() => {
    console.log("call AXIOS useEffect", trigger);
    if (trigger == 0) {
      return;
    }
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
                loading: false,
              } as IResponseType)
          );
        })
        .catch((err) => {
          setState(
            (prev) =>
              ({
                ...prev,
                error: err,
                loading: false,
              } as IResponseType)
          );
        });
    }
  }, [trigger]);

  return { ...state, fetchData };
};

export default useAxios;
