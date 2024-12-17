import http from "@/lib/http";
import { User } from "@/schemas/profile";

const apiUserRequest = {
  getAllUser: () => http.get<{ statusCode: number; content: User[] }>("/users"),
  getUserById: (id: number) =>
    http.get<{ statusCode: number; content: User }>(`/users/${id}`),
  deleteUser: (id: number) =>
    http.delete<{ statusCode: number; content: User | null }>(
      `/users/?id=${id}`
    ),

  searchUser: (keyword: string) =>
    http.get<{ statusCode: number; content: User[] }>(
      `/users/search/${keyword}`
    ),
};

export default apiUserRequest;
