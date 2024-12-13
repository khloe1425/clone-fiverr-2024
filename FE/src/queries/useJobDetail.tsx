import apiJobTypeRequest from "@/apiRequests/job-type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getAllJobType = () => {
  return useQuery({
    queryKey: ["jobType"],
    queryFn: () => apiJobTypeRequest.layDanhSach(),
  });
};

export const useDeleteJobTypeMutation = () => {
  return useMutation({
    mutationFn: (id: number) => apiJobTypeRequest.xoaDanhSachJobType(id),
  });
};

export const useAddJobTypeMutation = () => {
  return useMutation({
    mutationFn: (data: any) => apiJobTypeRequest.themCongViec(data),
  });
};

export const useUpdateJobTypeMutation = () => {
  return useMutation({
    mutationFn: (data: any) =>
      apiJobTypeRequest.updateJobType({ id: data.id, data }),
  });
};
