import apiHireRequest from "@/apiRequests/hire";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllHireQuery = () => {
  return useQuery({
    queryKey: ["danh-sach-thue-dich-vu"],
    queryFn: () => apiHireRequest.layDanhSachCongViec(),
  });
};

export const useDeleteHireMutation = () => {
  return useMutation({
    mutationFn: (id: number) => apiHireRequest.xoaCongViec(id),
  });
};

export const useAddHireMutation = () => {
  return useMutation({
    mutationFn: (data: any) => apiHireRequest.themCongViec(data),
  });
};

export const useUpdateHireMutation = () => {
  return useMutation({
    mutationFn: (data: any) =>
      apiHireRequest.suaCongViec({ id: data.id, data }),
  });
};
