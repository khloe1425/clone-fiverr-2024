import envConfig from "../configs";
import { normalizePath } from "@/lib/utils";
import { redirect } from "next/navigation";

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError extends Error {
  statusCode: number;
  content:
    | {
        message: string;
        [key: string]: unknown;
      }
    | string;
  constructor({
    statusCode,
    content,
    message = "HTTP Error",
  }: {
    statusCode: number;
    content: any;
    message?: string;
  }) {
    super(message);
    this.statusCode = statusCode;
    this.content = content;
  }
}

export class EntityError extends HttpError {
  statusCode: typeof ENTITY_ERROR_STATUS;
  content: EntityErrorPayload;
  constructor({
    statusCode,
    content,
  }: {
    statusCode: typeof ENTITY_ERROR_STATUS;
    content: EntityErrorPayload;
  }) {
    super({ statusCode, content, message: "Entity Error" });
    this.statusCode = statusCode;
    this.content = content;
  }
}

let clientLogoutRequest: null | Promise<any> = null;
const isClient = typeof window !== "undefined";

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }
  const baseHeaders: {
    [key: string]: string;
  } =
    body instanceof FormData
      ? {
          TokenCybersoft: process.env.NEXT_PUBLIC_TOKEN_CYBER || "",
        }
      : {
          "Content-Type": "application/json",
          TokenCybersoft: process.env.NEXT_PUBLIC_TOKEN_CYBER || "",
        };
  if (isClient) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      baseHeaders.token = accessToken;
    }
  }

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = `${baseUrl}/${normalizePath(url)}`;
  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
  });
  const content: Response = await res.json();
  const data = {
    statusCode: res.status,
    content,
  };

  // Interceptor for error handling
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError({
        statusCode: ENTITY_ERROR_STATUS,
        content: data.content as EntityErrorPayload,
      });
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (isClient) {
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch("/api/auth/logout", {
            method: "POST",
            headers: baseHeaders as any,
          });
          try {
            await clientLogoutRequest;
          } catch (error) {
            console.error(error);
          } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            clientLogoutRequest = null;
            location.href = "/login";
          }
        }
      } else {
        const accessToken = (options?.headers as any)?.Authorization.split(
          "Bearer "
        )[1];
        redirect(`/logout?accessToken=${accessToken}`);
      }
    } else {
      throw new HttpError(data);
    }
  }

  if (isClient) {
    const normalizeUrl = normalizePath(url);
    if (["api/auth/login", "api/guest/auth/login"].includes(normalizeUrl)) {
      const { token, user } = (content as any).content;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userLogin", JSON.stringify(user));
      // localStorage.setItem("refreshToken", refreshToken);
    } else if (["api/auth/logout"].includes(normalizeUrl)) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userLogin");
      localStorage.removeItem("refreshToken");
    }
  }
  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
};

export default http;
