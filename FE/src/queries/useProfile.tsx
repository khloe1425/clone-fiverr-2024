import apiProfileRequest from "@/apiRequests/profile";
import { User } from "@/schemas/profile";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["get-profile"],
    queryFn: () => apiProfileRequest.getProfile(),
  });
};
export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: Partial<Omit<User, "id">>;
      id: number;
    }) => apiProfileRequest.sUpdateProfile(data, id),
  });
};

export const useUpdateAvatarMutation = () => {
  return useMutation({
    mutationFn: (data: FormData) => apiProfileRequest.updateAvatar(data),
  });
};
