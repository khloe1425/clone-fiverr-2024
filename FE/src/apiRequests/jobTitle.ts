import http from "@/lib/http";
import { CongViecChiTiet } from "@/schemas/job";
import { JobTitle } from "@/schemas/jobTitle";

const apiJobTitleRequest = {
  getDetailJobTitle: (id: number) =>
    http.get<{ statusCode: number; content: JobTitle[] }>(
      `cong-viec/lay-chi-tiet-loai-cong-viec/${id}`
    ),
  layCongViecTheoChiTietLoai: (id: number) =>
    http.get<{ statusCode: number; content: CongViecChiTiet[] }>(
      `/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${id}`
    ),
  layCongViecChiTiet: (id: number) =>
    http.get<{ status: number; content: CongViecChiTiet[] }>(
      `cong-viec/lay-cong-viec-chi-tiet/${id}`
    ),
  search: (keyword: string) =>
    http.get<{ status: number; content: CongViecChiTiet[] }>(
      `cong-viec/lay-danh-sach-cong-viec-theo-ten/${keyword}`
    ),
};

export default apiJobTitleRequest;
