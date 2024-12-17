import apiUserRequest from "@/apiRequests/user";
import { HttpError } from "@/lib/http";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getAllUser = () => {
  return useQuery({
    queryKey: ["all-user"],
    queryFn: () => apiUserRequest.getAllUser(),
  });
};

export const getUserById = (id: number) => {
  return useQuery({
    queryKey: ["user-info", id],
    queryFn: () => apiUserRequest.getUserById(id),
    cacheTime: 0, // Không cache
    staleTime: 0, // Dữ liệu sẽ được coi là không hợp lệ ngay lập tức
    refetchOnWindowFocus: false, // Không tự động làm mới khi quay lại tab
  });
};

export const deleteUserMutation = () => {
  return useMutation({
    mutationFn: (id: number) => apiUserRequest.deleteUser(id),
  });
};

export const searchUser = (keyword: string) => {
  return useQuery(
    ["searchUser", keyword], // Key của query
    () => apiUserRequest.searchUser(keyword), // Hàm fetch
    {
      enabled: !!keyword, // Chỉ fetch khi keyword không rỗng
    }
  );
};
