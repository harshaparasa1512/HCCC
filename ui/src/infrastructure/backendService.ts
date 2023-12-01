import axios, { type AxiosRequestConfig } from 'axios';
import { isEmpty, isNil } from 'lodash';
import { API_BASE_URL } from './apiUrl';

export interface ApiRequestOptions {
   endpoint: string;
   body?: string;
   params?: object;
   method: 'GET' | 'POST' | 'DELETE' | 'PUT';
   headers?: Record<string, string>;
   includeToken?: boolean;
}

interface doFetchProps {
   url : string;
   config : any;
}

const defaultHeaders: Record<string, string> = {
   'Content-Type': 'application/json',
   Accept: 'application/json',
};

export const apiRequest = async (props: ApiRequestOptions): Promise<any> => {
   const includeTokenVerify = () => {
      if (isNil(props.includeToken)) {
         return false;
      }
      return true;
   };

   const mergedHeaders = props.headers ? { ...props.headers } : defaultHeaders;

   if (getaccessToken() && includeTokenVerify()) {
      mergedHeaders.Authorization = `Bearer ${getaccessToken()}`;
   }

   const config: AxiosRequestConfig = {
      url: `${API_BASE_URL}${props.endpoint}`,
      method: props.method,
      headers: mergedHeaders,
      params: props.params,
      data: props.body,
   };

   try {
      const response = await axios(config);
      return response;
   } catch (error) {
      throw error;
   }
};

export const getaccessToken = () : string | null => {
   return sessionStorage.getItem('user-token');
};

export const doFetch = (options : doFetchProps)=> {
   return fetch(options.url, options.config)
       .then((response: any) => {
           if (!response.ok) {
               throw new Error('Network response was not ok');
           }
           return response.json();
       })
       .catch(error => {
           console.error('There was a problem with the fetch operation:', error);
           return error;
       });
}

export const checkAuthToken = () : Boolean => {
   if(isNil(getaccessToken()) || isEmpty(getaccessToken()) || getaccessToken() === "undefined") {
      return false;
   } else {
      return true;
   }
}

export const getUserRoles = () : string[] | null | string => {
   return sessionStorage.getItem('user-roles');
}

export const checkUserRoles = () => {
   if(isNil(getUserRoles()) || isEmpty(getUserRoles()) || getUserRoles() === "undefined") {
      return false;
   } else {
      return true;
   }
}

export const authService = {
   isAuthenticated: () => {
     return checkAuthToken();
   },
   getUserRoles: () => {
     return getUserRoles();
   },
 };