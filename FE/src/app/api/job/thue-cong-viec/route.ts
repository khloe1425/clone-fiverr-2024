import jwt from "jsonwebtoken";

import { cookies } from "next/headers";
import { HttpError } from "@/lib/http";
import apiProfileRequest from "@/apiRequests/profile";
import { AddJobRequestBody } from "@/app/dto/request";
import apiJobRequest from "@/apiRequests/job";

export async function POST(request: Request) {
  const res = (await request.json()) as AddJobRequestBody;
  const cookieStore = await cookies();
  try {
    const accessCookie = cookieStore.get("accessToken");
    if (!accessCookie) {
      //redirect to login
      return Response.redirect("/login", 302);
    }
    const accessToken = accessCookie?.value as string;
    const { id } = jwt.decode(accessToken) as { id: string };
    const { content } = await apiJobRequest.thueCongViec({
      ...res,
      maNguoiThue: Number(id),
    });

    return Response.json(content);
  } catch (error: any) {
    // cookieStore.delete("accessToken");
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
