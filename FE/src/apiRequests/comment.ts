import http from "@/lib/http";
import { BinhLuan } from "@/schemas/comment";

const apiCommentRequest = {
  layDanhSachBinhLuanTheoId: (id: number) =>
    http.get<{ statusCode: number; content: BinhLuan[] }>(
      `binh-luan/lay-binh-luan-theo-cong-viec/${id}`
    ),
  createComment: (data: {
    maCongViec: number;
    noiDung: string;
    saoBinhLuan: number;
  }) => {
    return http.post<{
      statusCode: number;
      content: {
        maCongViec: number;
        noiDung: string;
        saoBinhLuan: number;
        maNguoiBinhLuan: number;
        ngayBinhLuan: string;
      };
    }>("api/binh-luan", data, { baseUrl: "" });
  },
  sCreateComment: (data: {
    maCongViec: number;
    noiDung: string;
    saoBinhLuan: number;
    ngayBinhLuan: string;
    maNguoiBinhLuan: number;
  }) => {
    return http.post<{
      statusCode: number;
      content: {
        maCongViec: number;
        noiDung: string;
        saoBinhLuan: number;
        maNguoiBinhLuan: number;
      };
    }>("/binh-luan", data);
  },
};

export default apiCommentRequest;
