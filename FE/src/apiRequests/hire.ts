import http from "@/lib/http";

const apiHireRequest = {
  layDanhSachCongViec: () =>
    http.get<{ statusCode: number; content: any[] }>("/thue-cong-viec"),
  themCongViec: (data: any) =>
    http.post<{ statusCode: number; content: any }>("/thue-cong-viec", data),
  suaCongViec: ({ id, data }: { id: number; data: any }) =>
    http.put<{ statusCode: number; content: any }>(
      `/thue-cong-viec/${id}`,
      data
    ),
  xoaCongViec: (id: number) =>
    http.delete<{ statusCode: number; content: any }>(`/thue-cong-viec/${id}`),
};

export default apiHireRequest;
