import apiJobTitleRequest from "@/apiRequests/jobTitle";
import { useQuery } from "@tanstack/react-query";

export const useGetDetailJobTitle = (id: number) => {
  return useQuery({
    queryKey: ["get-detail-job-title", id],
    queryFn: () => apiJobTitleRequest.getDetailJobTitle(id),
  });
};

export const useLayThongTinTheoChiTietLoai = (id: number) => {
  return useQuery({
    queryKey: ["information-detail-job", id],
    queryFn: () => apiJobTitleRequest.layCongViecTheoChiTietLoai(id),
  });
};

export const useSearch = (keyword: string) => {
  return useQuery({
    queryKey: ["search", keyword],
    queryFn: () => apiJobTitleRequest.search(keyword),
  });
};

export const useLayThongTinChiTietJob = (id: number) => {
  return useQuery({
    queryKey: ["job-detail", id],
    queryFn: () => apiJobTitleRequest.layCongViecChiTiet(id),
  });
};
