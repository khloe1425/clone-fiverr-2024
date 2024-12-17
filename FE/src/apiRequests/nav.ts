import http from "@/lib/http";

const apiNavRequest = {
  getMenu: () =>
    http.get<{ statusCode: number; content: any[] }>(
      "cong-viec/lay-menu-loai-cong-viec"
    ),
};

export default apiNavRequest;
