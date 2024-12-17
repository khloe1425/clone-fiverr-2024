import http from "@/lib/http";
import { User } from "@/schemas/profile";

const apiProfileRequest = {
  getProfile: () =>
    http.get<{ statusCode: number; content: User }>("api/users/profile", {
      baseUrl: "",
    }),
  sGetProfile: (id: number) =>
    http.get<{ statusCode: number; content: User }>(`users/${id}`),
  sUpdateProfile: (data: Partial<Omit<User, "id">>, id: number) =>
    http.put(`users/${id}`, data),
  updateAvatar: (data: FormData) => http.post(`users/upload-avatar`, data),
};

export default apiProfileRequest;
