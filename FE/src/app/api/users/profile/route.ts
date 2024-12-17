import jwt from "jsonwebtoken";

import { cookies } from "next/headers";
import { HttpError } from "@/lib/http";
import apiProfileRequest from "@/apiRequests/profile";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  try {
    const accessCookie = cookieStore.get("accessToken");
    if (!accessCookie) {
      //redirect to login
    }
    const accessToken = accessCookie?.value as string;
    const { id } = jwt.decode(accessToken) as { id: string };
    const { content } = await apiProfileRequest.sGetProfile(Number(id));

    return Response.json(content);
  } catch (error: any) {
    cookieStore.delete("accessToken");
    //redirect về login
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
