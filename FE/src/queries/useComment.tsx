import apiCommentRequest from "@/apiRequests/comment";
import apiJobTitleRequest from "@/apiRequests/jobTitle";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCommentByjob = (id: number) => {
  return useQuery({
    queryKey: ["get-comment-by-job", id],
    queryFn: () => apiCommentRequest.layDanhSachBinhLuanTheoId(id),
  });
};

export const useCreateComment = () => {
  return useMutation({
    mutationFn: (data: {
      maCongViec: number;
      noiDung: string;
      saoBinhLuan: number;
      ngayBinhLuan: string;
      maNguoiBinhLuan: number;
    }) => apiCommentRequest.sCreateComment(data),
  });
};
