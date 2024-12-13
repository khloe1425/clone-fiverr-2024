import { LoginRequestBody, RegisterRequestBody } from "@/app/dto/request";
import { LoginResType, RegisterResType } from "@/app/dto/response";
import http from "@/lib/http";

const authApiRequest = {
  login: (res: LoginRequestBody) => {
    return http.post<LoginResType>("api/auth/login", res, { baseUrl: "" });
  },
  sLogin: (res: LoginRequestBody) =>
    http.post<LoginResType>("auth/signin", res),
  sRegister: (res: RegisterRequestBody) =>
    http.post<{ statusCode: number; content: RegisterResType }>(
      "auth/signup",
      res
    ),
};

export default authApiRequest;
