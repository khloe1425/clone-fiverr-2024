import jwt from "jsonwebtoken";
import authApiRequest from "@/apiRequests/auth";

import { cookies } from "next/headers";
import { HttpError } from "@/lib/http";
import { LoginRequestBody } from "@/app/dto/request";

export async function POST(request: Request) {
  const res = (await request.json()) as LoginRequestBody;
  const cookieStore = await cookies();
  try {
    const { content } = await authApiRequest.sLogin(res);
    const accessToken = content.content.token;
    // const user = content.content.user;
    const decodeAccessToken = jwt.decode(accessToken) as { exp: number };
    cookieStore.set("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: decodeAccessToken.exp * 1000,
    });

    return Response.json(content);
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.content, {
        status: error.statusCode,
      });
    } else {
      return Response.json("Loi xay ra", {
        status: 500,
      });
    }
  }
}
