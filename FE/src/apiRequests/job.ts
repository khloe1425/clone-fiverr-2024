import { AddJobRequestBody } from "@/app/dto/request";
import { AddJobResType } from "@/app/dto/response";
import http from "@/lib/http";
import { CongViecViewModel, Job } from "@/schemas/job";

const apiJobRequest = {
  layCongViecDaThue: () =>
    http.get<{ statusCode: number; content: Job[] }>(
      "thue-cong-viec/lay-danh-sach-da-thue"
    ),

  sThueCongViec: (data: AddJobRequestBody) => {
    return http.post<{ statusCode: number; content: AddJobResType }>(
      "api/job/thue-cong-viec",
      data,
      { baseUrl: "" }
    );
  },
  thueCongViec: (data: AddJobRequestBody & { maNguoiThue: number }) => {
    return http.post<{ statusCode: number; content: AddJobResType }>(
      "/thue-cong-viec",
      data
    );
  },
  xoaCongViec: (id: number) => {
    return http.delete<{ statusCode: number; content: null }>(
      `/thue-cong-viec/${id}`
    );
  },
  layDanhSachCongViec: () =>
    http.get<{ statusCode: number; content: CongViecViewModel[] }>(
      "/cong-viec"
    ),

  xoaCongViecAdmin: (id: number) =>
    http.delete<{ statusCode: number; content: CongViecViewModel[] | null }>(
      `/cong-viec/${id}`
    ),
};

export default apiJobRequest;
