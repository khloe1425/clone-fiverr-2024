import http from "@/lib/http";
import { JobType } from "@/schemas/job";

const apiJobTypeRequest = {
  layDanhSach: () =>
    http.get<{ statusCode: number; content: JobType[] }>("/loai-cong-viec"),
  xoaDanhSachJobType: (id: number) =>
    http.delete<{ statusCode: number }>(`/loai-cong-viec/${id}`),
  updateJobType: ({ id, data }: { id: number; data: any }) =>
    http.put<{ statusCode: number; content: any }>(
      `/loai-cong-viec/${id}`,
      data
    ),
  themCongViec: (data: any) => http.post("/loai-cong-viec", data),
};

export default apiJobTypeRequest;
