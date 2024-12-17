import apiJobRequest from "@/apiRequests/job";
import { AddJobRequestBody } from "@/app/dto/request";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetMyJob = () => {
  return useQuery({
    queryKey: ["lay-chi-tiet-cong-viec"],
    queryFn: () => apiJobRequest.layCongViecDaThue(),
  });
};

export const useAddjobMutation = () => {
  return useMutation({
    mutationFn: apiJobRequest.sThueCongViec,
  });
};

export const useAddjobClientMutation = () => {
  return useMutation({
    mutationFn: apiJobRequest.thueCongViec,
  });
};

export const useDeleteJobMutation = () => {
  return useMutation({
    mutationFn: (id: number) => apiJobRequest.xoaCongViec(id),
  });
};

export const useDeleteJobAdminMutation = () => {
  return useMutation({
    mutationFn: (id: number) => apiJobRequest.xoaCongViecAdmin(id),
  });
};

export const layDanhSachCongViec = () => {
  return useQuery({
    queryKey: ["lay-danh-sach-cong-viec"],
    queryFn: () => apiJobRequest.layDanhSachCongViec(),
  });
};
